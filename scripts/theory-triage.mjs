/**
 * Clasificación de las jugadas que el motor marca con pérdida > UMBRAL.
 *
 * No decide si una jugada es "buena o mala" por sí sola: añade datos externos
 * verificables para que la revisión teórica tenga base.
 *
 *  - CDB (Chess Cloud Database, chessdb.cn) devuelve las jugadas conocidas de la
 *    posición con su puntuación y una marca de calidad (`note` + `rank`).
 *  - Si CDB marca la jugada como dudosa (`?`, rank 0) y el motor la penaliza, es
 *    candidata a corrección. Si CDB la marca como buena (`!`) el motor está
 *    discrepando de la teoría y hay que revisarla, no reescribirla a ciegas.
 *  - El capítulo marcado `demo` es intencional y no cuenta como error.
 *
 * Uso: node scripts/theory-triage.mjs [--threshold 30]
 * Salida: .tmp/theory-triage.json y docs/THEORY-TRIAGE.md
 */
import { readFileSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";

const THRESHOLD = Number(
  process.argv.includes("--threshold")
    ? process.argv[process.argv.indexOf("--threshold") + 1]
    : 30,
);
const CACHE = ".tmp/cdb.json";
const audit = JSON.parse(readFileSync(".tmp/engine-audit.json", "utf8"));

let cache = {};
try {
  cache = JSON.parse(readFileSync(CACHE, "utf8"));
} catch {
  cache = {};
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function queryCdb(fen) {
  if (cache[fen] !== undefined) return cache[fen];
  const url = `https://www.chessdb.cn/cdb.php?action=queryall&board=${encodeURIComponent(fen)}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const text = (await response.text()).trim();
  const entry = { raw: text, moves: {}, status: "ok" };
  if (text === "invalid board" || text === "unknown" || text === "checkmate" || text === "stalemate") {
    entry.status = text;
  } else if (text.startsWith("move:")) {
    for (const chunk of text.split("|")) {
      const fields = Object.fromEntries(
        chunk
          .split(",")
          .map((part) => part.split(":"))
          .filter((pair) => pair.length === 2),
      );
      if (fields.move) entry.moves[fields.move] = fields;
    }
  } else {
    entry.status = text.slice(0, 40);
  }
  cache[fen] = entry;
  writeFileSync(CACHE, JSON.stringify(cache));
  return entry;
}

const demos = new Set();
const { COURSES } = await import("../.tmp/data.mjs");
for (const course of COURSES) {
  for (const chapter of course.chapters) {
    if (chapter.demo) demos.add(`${course.name} / ${chapter.title}`);
  }
}

const targets = audit.rows.filter((row) => row.loss !== null && row.loss > THRESHOLD);
const results = [];
let i = 0;
for (const row of targets) {
  i++;
  const board = new Chess(row.fen);
  const move = board.move(row.san.replace(/[+#!?]/g, ""));
  const uci = `${move.from}${move.to}${move.promotion ?? ""}`;
  let entry = { status: "error" };
  try {
    entry = await queryCdb(row.fen);
  } catch (error) {
    entry = { status: `red: ${error.message}` };
  }
  if (!cache[row.fen]) await sleep(900);
  const known = Object.keys(entry.moves ?? {});
  const played = entry.moves?.[uci] ?? (move.promotion ? entry.moves?.[`${move.from}${move.to}`] : undefined);
  const demo = demos.has(`${row.courseName} / ${row.chapterTitle}`);
  const note = played?.note ?? null;
  const rank = played?.rank ? Number(played.rank) : played ? 0 : null;
  const bookQuality = !played
    ? "fuera de libro"
    : rank === 2
      ? "recomendada"
      : rank === 1
        ? "jugable"
        : "dudosa";
  results.push({
    course: row.courseName,
    chapter: row.chapterTitle,
    san: row.san,
    uci,
    loss: row.loss,
    verdict: row.verdict,
    engineBest: row.best,
    cdb: entry.status,
    inBook: played !== undefined,
    bookQuality,
    note,
    cdbMoves: known.length,
    cdbScore: played?.score ? Number(played.score) : null,
    cdbRank: rank,
    cdbWinrate: played?.winrate ? Number(played.winrate) : null,
    demo,
  });
  if (i % 20 === 0) console.log(`${i}/${targets.length} consultadas`);
}

const counts = {
  total: results.length,
  demo: results.filter((r) => r.demo).length,
  recommended: results.filter((r) => r.bookQuality === "recomendada" && !r.demo).length,
  playable: results.filter((r) => r.bookQuality === "jugable" && !r.demo).length,
  dubious: results.filter((r) => r.bookQuality === "dudosa" && !r.demo).length,
  offBook: results.filter((r) => r.bookQuality === "fuera de libro" && !r.demo).length,
  unknown: results.filter((r) => r.cdb === "unknown").length,
  failed: results.filter((r) => r.cdb !== "ok" && r.cdb !== "unknown").length,
};

writeFileSync(".tmp/theory-triage.json", JSON.stringify({ threshold: THRESHOLD, counts, results }, null, 1));

const sorted = [...results].sort((a, b) => b.loss - a.loss);
const md = `# Triaje teórico de las jugadas señaladas por Stockfish

Generado por \`scripts/theory-triage.mjs\` el ${new Date().toISOString().slice(0, 10)}.
Umbral: pérdida > ${THRESHOLD} cp. Datos: \`.tmp/engine-audit.json\` + Chess Cloud
Database (\`chessdb.cn\`).

## Qué significa cada categoría

| Categoría | Significado |
| --- | --- |
| \`demo\` | Capítulo marcado como demostración: el error se muestra a propósito. |
| \`recomendada\` | CDB marca la jugada con \`!\` y rank 2: jugada de la base, el motor discrepa. |
| \`jugable\` | CDB la marca con \`*\` y rank 1: aceptable, no la mejor según el motor. |
| \`dudosa\` | CDB la marca con \`?\` y rank 0: la base también la considera inferior. |
| \`fuera de libro\` | CDB conoce la posición pero no esa jugada. |

## Recuento

| Categoría | Jugadas |
| --- | --- |
| Total señaladas (> ${THRESHOLD} cp) | ${counts.total} |
| Demo intencional | ${counts.demo} |
| Recomendada por CDB (revisar con teoría) | ${counts.recommended} |
| Jugable según CDB | ${counts.playable} |
| Dudosa según CDB (candidatas reales) | ${counts.dubious} |
| Fuera de libro | ${counts.offBook} |
| Error de consulta | ${counts.failed} |

## Candidatas reales (CDB también las considera dudosas)

| Curso | Capítulo | Jugada | Pérdida | Motor | Nota CDB |
| --- | --- | --- | --- | --- | --- |
${sorted
  .filter((r) => r.bookQuality === "dudosa" && !r.demo)
  .slice(0, 40)
  .map(
    (r) =>
      `| ${r.course} | ${r.chapter} | ${r.san} | ${r.loss} cp | ${r.engineBest} | ${r.note ?? "?"} |`,
  )
  .join("\n")}

## Discrepancias motor/teoría (CDB la recomienda, Stockfish la penaliza)

No se tocan sin leer teoría: la base las respalda.

| Curso | Capítulo | Jugada | Pérdida | Motor | Nota CDB |
| --- | --- | --- | --- | --- | --- |
${sorted
  .filter((r) => r.bookQuality === "recomendada" && !r.demo)
  .slice(0, 25)
  .map(
    (r) =>
      `| ${r.course} | ${r.chapter} | ${r.san} | ${r.loss} cp | ${r.engineBest} | ${r.note ?? "?"} |`,
  )
  .join("\n")}
`;
writeFileSync("docs/THEORY-TRIAGE.md", md);
console.log(JSON.stringify(counts, null, 1));
