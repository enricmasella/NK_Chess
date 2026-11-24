// Contraste con el Lichess Opening Explorer (base de partidas de maestros).
//
// Desde mediados de 2026 el explorer exige un token personal de Lichess en todas
// las peticiones (401 sin él), sin scopes: https://lichess.org/account/oauth/token
// Se lee de LICHESS_TOKEN o de .env.local. Sin token el script se detiene en vez
// de reportar ceros.
//
// Uso: node scripts/theory-check.mjs [--refresh]
// Guarda .tmp/explorer.json y resume qué jugadas del repertorio tienen respaldo en partidas.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";

const REFRESH = process.argv.includes("--refresh");
const PING = process.argv.includes("--ping");
const CACHE = ".tmp/explorer.json";
const API = "https://explorer.lichess.org/masters";

function readToken() {
  if (process.env.LICHESS_TOKEN) return process.env.LICHESS_TOKEN.trim();
  if (existsSync(".env.local")) {
    const line = readFileSync(".env.local", "utf8")
      .split("\n")
      .find((row) => row.trim().startsWith("LICHESS_TOKEN="));
    if (line) return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

const TOKEN = readToken();
if (!TOKEN) {
  console.error(
    "Falta LICHESS_TOKEN. El Opening Explorer devuelve 401 sin autenticación (requisito de\n" +
      "Lichess desde mediados de 2026). Crea un token gratuito sin scopes en\n" +
      "https://lichess.org/account/oauth/token y guárdalo en .env.local como\n" +
      "LICHESS_TOKEN=lip_... — este script no se ejecuta sin él.",
  );
  process.exit(2);
}

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

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf8")) : {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function lookup(fen) {
  if (!REFRESH && cache[fen]) return cache[fen];
  for (let attempt = 0; attempt < 4; attempt++) {
    const url = `${API}?fen=${encodeURIComponent(fen)}&moves=8&topGames=0`;
    const response = await fetch(url, {
      headers: { accept: "application/json", authorization: `Bearer ${TOKEN}` },
    });
    if (response.ok) {
      const data = await response.json();
      const entry = {
        games: data.white + data.draws + data.black,
        white: data.white,
        draws: data.draws,
        black: data.black,
        moves: (data.moves ?? []).map((m) => ({
          san: m.san,
          uci: m.uci,
          games: m.white + m.draws + m.black,
          white: m.white,
          draws: m.draws,
          black: m.black,
          avgRating: m.averageRating ?? null,
        })),
      };
      cache[fen] = entry;
      return entry;
    }
    if (response.status === 429) {
      await sleep(2000 * (attempt + 1));
      continue;
    }
    if (response.status === 401 || response.status === 403) {
      return { blocked: response.status, games: 0, moves: [] };
    }
    if (response.status === 404) {
      return { games: 0, moves: [] };
    }
    return { error: response.status, games: 0, moves: [] };
  }
  return { error: "rate-limited", games: 0, moves: [] };
}

if (PING) {
  const res = await fetch(`${API}?fen=${encodeURIComponent(new Chess().fen())}&moves=3`, {
    headers: { accept: "application/json", authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) {
    console.error(`Token inválido: HTTP ${res.status}. Revisa LICHESS_TOKEN en .env.local.`);
    process.exit(1);
  }
  const data = await res.json();
  const games = data.white + data.draws + data.black;
  console.log(`Token válido. Partidas de maestros en la posición inicial: ${games}`);
  console.log((data.moves ?? []).slice(0, 3).map((m) => `${m.san} (${m.white + m.draws + m.black})`).join(" · "));
  process.exit(0);
}

const rows = [];
let done = 0;
const total = COURSES.reduce((n, c) => n + c.chapters.length, 0);

for (const course of COURSES) {
  for (const chapter of course.chapters) {
    const fen = chapter.fen ?? new Chess().fen();
    const first = chapter.line.split(/\s+/).filter(Boolean)[0];
    const chess = new Chess(fen);
    let san = null;
    let uci = null;
    try {
      const move = chess.move(first.replace(/[+#!?]/g, ""));
      if (move) {
        san = move.san;
        uci = `${move.from}${move.to}${move.promotion ?? ""}`;
      }
    } catch {
      san = null;
    }
    const data = await lookup(fen);
    if (data.blocked) {
      console.error(
        `\nEl token de Lichess no es válido (HTTP ${data.blocked}).\n` +
          "Comprueba LICHESS_TOKEN en .env.local. No se ha guardado ningún dato.",
      );
      process.exit(2);
    }
    await sleep(120);
    const hit = san ? data.moves?.find((m) => m.uci === uci) : undefined;
    rows.push({
      course: course.id,
      courseName: course.name,
      chapter: chapter.id,
      chapterTitle: chapter.title,
      fen,
      san,
      totalGames: data.games ?? 0,
      moveGames: hit?.games ?? 0,
      frequency: data.games ? Math.round(((hit?.games ?? 0) / data.games) * 1000) / 10 : 0,
      engineTop: data.moves?.[0]?.san ?? null,
      engineTopGames: data.moves?.[0]?.games ?? 0,
    });
    done++;
    if (done % 40 === 0) console.log(`${done}/${total} posiciones consultadas`);
  }
}

writeFileSync(CACHE, JSON.stringify(cache, null, 0));
writeFileSync(".tmp/theory-check.json", JSON.stringify(rows, null, 1));

const withGames = rows.filter((r) => r.totalGames >= 10);
const inTheory = withGames.filter((r) => r.frequency >= 5);
const unknown = rows.filter((r) => r.totalGames < 10);
console.log(`\nCapítulos: ${rows.length}`);
console.log(`Posición con partidas de maestros (>=10): ${withGames.length}`);
console.log(`Primera jugada del repertorio jugada por maestros (>=5%): ${inTheory.length}`);
console.log(`Posición sin datos (estudio propio o posición rara): ${unknown.length}`);
console.log(`Media de partidas por posición: ${(rows.reduce((n, r) => n + r.totalGames, 0) / rows.length).toFixed(0)}`);
const weak = withGames.filter((r) => r.frequency < 1).sort((a, b) => b.totalGames - a.totalGames).slice(0, 10);
for (const w of weak) {
  console.log(` - ${w.courseName} / ${w.chapterTitle}: ${w.san} (${w.frequency}% de ${w.totalGames}, maestros: ${w.engineTop})`);
}
