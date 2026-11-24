// Auditoría con Stockfish de todas las líneas del catálogo.
// Uso: node scripts/engine-audit.mjs [--depth 10] [--after-depth 8] [--limit N] [--timeout 8000]
//
// Para cada posición: busca las mejores jugadas (MultiPV) y evalúa la posición resultante
// después de la jugada del repertorio, de modo que se puede medir la pérdida en centipeones.
// Si una posición no responde en `--timeout` ms se manda `stop`, se espera el `bestmove` y, si
// el motor no vuelve, se reinicia el proceso. Una posición problemática nunca detiene la auditoría.
import { execFileSync, spawn } from "node:child_process";
import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(process.argv[i + 1]);
};
const DEPTH = arg("depth", 10);
const AFTER_DEPTH = arg("after-depth", 8);
const LIMIT = arg("limit", Infinity);
const TIMEOUT = arg("timeout", 8000);
const MULTIPV = 3;

class TimeoutError extends Error {}

class Engine {
  constructor(path, { threads = 2, hash = 128 } = {}) {
    this.path = path;
    this.threads = threads;
    this.hash = hash;
    this.proc = null;
    this.buffer = "";
    this.queue = [];
    this.pending = null;
    this.restarts = 0;
  }

  async start() {
    this.buffer = "";
    this.queue = [];
    this.pending = null;
    this.proc = spawn(this.path, [], { stdio: ["pipe", "pipe", "inherit"] });
    this.proc.on("exit", () => {
      this.dead = true;
    });
    this.proc.stdout.on("data", (chunk) => {
      this.buffer += chunk.toString();
      let nl;
      while ((nl = this.buffer.indexOf("\n")) !== -1) {
        const line = this.buffer.slice(0, nl).trim();
        this.buffer = this.buffer.slice(nl + 1);
        if (!line) continue;
        if (this.pending) {
          const resolve = this.pending;
          this.pending = null;
          resolve(line);
        } else {
          this.queue.push(line);
        }
      }
    });
    this.dead = false;
    this.write("uci");
    await this.waitFor((l) => l === "uciok", TIMEOUT);
    this.write(`setoption name Threads value ${this.threads}`);
    this.write(`setoption name Hash value ${this.hash}`);
    this.write("isready");
    await this.waitFor((l) => l === "readyok", TIMEOUT);
  }

  write(cmd) {
    if (this.proc?.stdin.writable) this.proc.stdin.write(cmd + "\n");
  }

  readLine(timeoutMs) {
    if (this.queue.length) return Promise.resolve(this.queue.shift());
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending = null;
        reject(new TimeoutError(`sin respuesta en ${timeoutMs} ms`));
      }, timeoutMs);
      this.pending = (line) => {
        clearTimeout(timer);
        resolve(line);
      };
    });
  }

  async waitFor(test, timeoutMs) {
    for (;;) {
      const line = await this.readLine(timeoutMs);
      if (test(line)) return line;
    }
  }

  async search(fen, depth, multipv, timeoutMs) {
    const started = Date.now();
    this.write(`position fen ${fen}`);
    this.write(`go depth ${depth} multipv ${multipv}`);
    const lines = new Map();
    const result = { status: "ok", lines: [], bestmove: null, ms: 0 };
    try {
      for (;;) {
        const line = await this.readLine(timeoutMs);
        if (line.startsWith("bestmove")) {
          result.bestmove = line.split(/\s+/)[1] ?? null;
          break;
        }
        if (!line.startsWith("info ")) continue;
        const pv = /multipv (\d+)/.exec(line);
        const score = /score (cp|mate) (-?\d+)/.exec(line);
        const pvMove = / pv (\S+)/.exec(line);
        const d = / depth (\d+)/.exec(line);
        if (pv && score && pvMove && d && Number(d[1]) >= depth - 1) {
          lines.set(Number(pv[1]), {
            move: pvMove[1],
            mate: score[1] === "mate" ? Number(score[2]) : null,
            cp: score[1] === "cp" ? Number(score[2]) : null,
          });
        }
      }
    } catch (error) {
      if (!(error instanceof TimeoutError)) throw error;
      result.status = "timeout";
      this.write("stop");
      try {
        await this.waitFor((l) => l.startsWith("bestmove"), 2000);
      } catch {
        result.status = "restart";
        await this.restart();
      }
    }
    result.ms = Date.now() - started;
    result.lines = [...lines.entries()].sort((a, b) => a[0] - b[0]).map((e) => e[1]);
    return result;
  }

  async restart() {
    this.restarts++;
    this.proc?.stdin.end();
    this.proc?.kill();
    await new Promise((r) => setTimeout(r, 250));
    await this.start();
  }

  stop() {
    this.write("quit");
    setTimeout(() => this.proc?.kill(), 200).unref();
  }
}

/** Convierte `score cp/mate` a centipeones desde el punto de vista del que mueve. */
const toCp = (line) => {
  if (!line) return null;
  if (line.mate !== null && line.mate !== undefined) {
    return line.mate > 0 ? 10000 - line.mate * 100 : -10000 - line.mate * 100;
  }
  return line.cp;
};

const classify = (loss) => {
  if (loss === null) return "sin evaluar";
  if (loss <= 30) return "correcta";
  if (loss <= 70) return "imprecisión";
  if (loss <= 150) return "error";
  return "error grave";
};

mkdirSync(".tmp", { recursive: true });
execFileSync(process.execPath, [
  "node_modules/esbuild/bin/esbuild",
  "src/data/index.ts",
  "--bundle",
  "--format=esm",
  "--platform=node",
  "--outfile=.tmp/data.mjs",
]);
const { COURSES } = await import("../.tmp/data.mjs");

const engineDir = ".engine/stockfish";
const engineFile = readdirSync(engineDir).find((f) => f.endsWith(".exe") || f === "stockfish");
if (!engineFile) throw new Error("No se encontró el binario de Stockfish en " + engineDir);
const engine = new Engine(`${engineDir}/${engineFile}`);
await engine.start();

const uciToSan = (fen, uci) => {
  if (!uci || uci === "(none)") return uci ?? "?";
  try {
    const chess = new Chess(fen);
    const move = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] ?? "q" });
    return move ? move.san : uci;
  } catch {
    return uci;
  }
};

const rows = [];
const skipped = [];
let analysed = 0;
let engineMs = 0;
let positions = 0;

const total = COURSES.reduce(
  (n, c) => n + c.chapters.reduce((m, ch) => m + ch.line.split(/\s+/).filter(Boolean).length, 0),
  0,
);
console.log(`Posiciones a analizar: ${total} · depth ${DEPTH}/${AFTER_DEPTH} · timeout ${TIMEOUT} ms`);

outer: for (const course of COURSES) {
  for (const chapter of course.chapters) {
    const startFen = chapter.fen ?? new Chess().fen();
    const moves = chapter.line.split(/\s+/).filter(Boolean);
    const chess = new Chess(startFen);
    for (let i = 0; i < moves.length; i++) {
      if (analysed >= LIMIT) break outer;
      const fen = chess.fen();
      let played;
      try {
        played = chess.move(moves[i].replace(/[+#!?]/g, ""));
      } catch {
        skipped.push({ course: course.name, chapter: chapter.title, san: moves[i], reason: "ilegal" });
        break;
      }
      if (!played) break;
      positions++;

      let search = await engine.search(fen, DEPTH, MULTIPV, TIMEOUT);
      if (search.status !== "ok") {
        search = await engine.search(fen, DEPTH, MULTIPV, TIMEOUT);
      }
      if (search.status !== "ok" || search.lines.length === 0) {
        skipped.push({ course: course.name, chapter: chapter.title, san: played.san, reason: search.status });
        continue;
      }
      engineMs += search.ms;

      const best = search.lines[0];
      const bestCp = toCp(best);
      const uciPlayed = `${played.from}${played.to}${played.promotion ?? ""}`;
      const rank = search.lines.findIndex((l) => l.move === uciPlayed);
      const rankCp = rank === -1 ? null : toCp(search.lines[rank]);

      // Evaluación de la posición resultante: sirve cuando la jugada no está en el MultiPV.
      let playedCp = rankCp;
      if (playedCp === null) {
        const after = await engine.search(chess.fen(), AFTER_DEPTH, 1, TIMEOUT);
        engineMs += after.ms;
        if (after.status === "ok" && after.lines.length) {
          const opponent = toCp(after.lines[0]);
          playedCp = opponent === null ? null : -opponent;
        }
      }

      const loss = bestCp !== null && playedCp !== null ? Math.max(0, bestCp - playedCp) : null;
      const row = {
        course: course.id,
        courseName: course.name,
        chapter: chapter.id,
        chapterTitle: chapter.title,
        ply: i + 1,
        san: played.san,
        fen,
        best: uciToSan(fen, best.move),
        bestCp,
        rank: rank === -1 ? null : rank + 1,
        playedCp,
        loss,
        verdict: classify(loss),
      };
      rows.push(row);
      analysed++;
      if (analysed % 250 === 0) {
        console.log(`${analysed}/${total} posiciones · motor ${(engineMs / 1000).toFixed(0)}s · reinicios ${engine.restarts}`);
      }
    }
  }
}

engine.stop();

const bucket = (r) => r.verdict;
const counts = { correcta: 0, imprecisión: 0, error: 0, "error grave": 0, "sin evaluar": 0 };
for (const row of rows) counts[bucket(row)]++;
const inTop3 = rows.filter((r) => r.rank !== null).length;
const withLoss = rows.filter((r) => r.loss !== null);
const meanLoss = withLoss.length ? withLoss.reduce((n, r) => n + r.loss, 0) / withLoss.length : null;

const payload = {
  generatedAt: new Date().toISOString(),
  depth: DEPTH,
  afterDepth: AFTER_DEPTH,
  timeoutMs: TIMEOUT,
  totalPositions: total,
  analysed,
  skipped,
  engineMs,
  restarts: engine.restarts,
  counts,
  inTop3,
  meanLoss,
  rows,
};
writeFileSync(".tmp/engine-audit.json", JSON.stringify(payload, null, 1));

const pct = (n, d) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
console.log(`\nPosiciones analizadas: ${analysed}/${total} · omitidas: ${skipped.length}`);
console.log(`En el top ${MULTIPV}: ${inTop3} (${pct(inTop3, analysed)}%)`);
console.log(
  `Correctas ${counts.correcta} · imprecisiones ${counts["imprecisión"]} · errores ${counts.error} · errores graves ${counts["error grave"]} · sin evaluar ${counts["sin evaluar"]}`,
);
console.log(`Pérdida media: ${meanLoss === null ? "?" : meanLoss.toFixed(1)} cp · motor ${(engineMs / 1000).toFixed(1)}s · reinicios ${engine.restarts}`);
const worst = rows.filter((r) => r.loss !== null).sort((a, b) => b.loss - a.loss).slice(0, 12);
for (const w of worst) {
  console.log(` - ${w.courseName} / ${w.chapterTitle} ${w.san} (${w.loss} cp, motor: ${w.best})`);
}
