// Comprueba que la jugada final de cada trampa (el castigo) es la mejor del motor
// o da mate. Así una trampa no puede quedarse con una "línea bonita" que no funciona.
//
// Uso: node scripts/trap-check.mjs [depth]
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { Chess } from "chess.js";

const depth = Number(process.argv[2] ?? 16);

execFileSync(process.execPath, [
  "node_modules/esbuild/bin/esbuild",
  "src/data/index.ts",
  "--bundle",
  "--format=esm",
  "--platform=node",
  "--outfile=.tmp/data.mjs",
  "--log-level=error",
]);
const { COURSES } = await import(`../.tmp/data.mjs?${Date.now()}`);

const dir = ".engine/stockfish";
const file = readdirSync(dir).find((f) => f.endsWith(".exe") || f === "stockfish");
const proc = spawn(`${dir}/${file}`, [], { stdio: ["pipe", "pipe", "inherit"] });

function analyse(fen) {
  return new Promise((resolve) => {
    let buffer = "";
    const found = new Map();
    const onData = (chunk) => {
      buffer += chunk.toString();
      let nl;
      while ((nl = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        const info = / depth (\d+).*multipv (\d+).*score (cp|mate) (-?\d+).* pv (\S+)/.exec(line);
        if (info && Number(info[1]) >= depth) {
          found.set(Number(info[2]), { score: `${info[3]} ${info[4]}`, move: info[5] });
        }
        if (line.startsWith("bestmove")) {
          proc.stdout.off("data", onData);
          resolve([...found.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v));
        }
      }
    };
    proc.stdout.on("data", onData);
    proc.stdin.write(`position fen ${fen}\ngo depth ${depth}\n`);
  });
}

let checked = 0;
const failures = [];
for (const course of COURSES) {
  for (const chapter of course.chapters) {
    for (const trap of chapter.traps ?? []) {
      const board = new Chess();
      const moves = trap.line.trim().split(/\s+/).filter(Boolean);
      let uci = null;
      let fen = null;
      for (const [index, raw] of moves.entries()) {
        if (index === moves.length - 1) {
          fen = board.fen();
          const move = board.move(raw.replace(/[+#!?]/g, ""));
          uci = `${move.from}${move.to}${move.promotion ?? ""}`;
        } else {
          board.move(raw.replace(/[+#!?]/g, ""));
        }
      }
      if (!fen || !uci) continue;
      const lines = await analyse(fen);
      checked++;
      const best = lines[0];
      const match = lines.find((line) => line.move === uci);
      const isBest = match?.move === best?.move;
      if (!isBest) {
        failures.push({ course: course.name, chapter: chapter.title, uci, best });
      }
      console.log(
        `${isBest ? "OK  " : "FALLA"} ${course.name} / ${chapter.title} · castigo ${moves.at(-1)} · ` +
          `motor ${best?.score ?? "?"} (${best?.move ?? "?"})` +
          (match ? ` · jugada evaluada ${match.score}` : " · jugada fuera del top 3"),
      );
    }
  }
}

proc.stdin.write("quit\n");
console.log(`\nTrampas comprobadas: ${checked} · fallos: ${failures.length}`);
if (failures.length) process.exitCode = 1;
setTimeout(() => process.exit(process.exitCode ?? 0), 300);
