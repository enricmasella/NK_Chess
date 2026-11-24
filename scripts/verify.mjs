/**
 * Verificación del proyecto NK_Chess.
 *
 * 1. Compila el catálogo de datos y lo importa (esbuild) para leer datos reales, no regex.
 * 2. Valida la legalidad de cada línea y de cada variante con chess.js.
 * 3. Compara el catálogo implementado con la lista pública verificada de
 *    chessly.com/public/courses (docs/source-catalogue.txt).
 * 4. Genera docs/course-inventory.md con el inventario real.
 *
 * Sale con código 1 si alguna comprobación falla.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";

const OUT = ".tmp/data.mjs";
mkdirSync(".tmp", { recursive: true });
const bundle = (entry, out) =>
  execFileSync(process.execPath, [
    "node_modules/esbuild/bin/esbuild",
    entry,
    "--bundle",
    "--format=esm",
    "--platform=node",
    "--outfile=" + out,
  ], { stdio: "inherit" });

bundle("src/data/index.ts", OUT);
bundle("src/lib/chess.ts", ".tmp/chess.mjs");

const { COURSES, STATS } = await import("../.tmp/data.mjs");
const { chapterDrills } = await import("../.tmp/chess.mjs");
const errors = [];
let chapters = 0;
let lines = 0;
let plies = 0;
let traps = 0;

/**
 * Valida la posición inicial, no solo las jugadas: dos reyes, sin peones en la
 * primera u octava fila y sin que el bando que acaba de mover esté en jaque.
 * Un FEN así es imposible en una partida y el motor se niega a analizarlo.
 */
function validateFen(fen, label) {
  if (!fen) return;
  let board;
  try {
    board = new Chess(fen);
  } catch {
    errors.push(`${label}: FEN inválido "${fen}"`);
    return;
  }
  const pieces = board.board().flat().filter(Boolean);
  if (pieces.filter((piece) => piece.type === "k").length !== 2) {
    errors.push(`${label}: el FEN no tiene exactamente dos reyes`);
  }
  const [rows, turn] = fen.split(" ");
  const backRanks = [board.board()[0], board.board()[7]].flat();
  if (backRanks.some((piece) => piece && piece.type === "p")) {
    errors.push(`${label}: peón en la primera u octava fila`);
  }
  const other = turn === "w" ? "b" : "w";
  try {
    if (new Chess(`${rows} ${other} - - 0 1`).inCheck()) {
      errors.push(`${label}: posición ilegal, el bando que acaba de mover está en jaque`);
    }
  } catch {
    errors.push(`${label}: FEN inválido "${fen}"`);
  }
}

function walkLine(fen, line, label) {
  validateFen(fen, label);
  const board = fen ? new Chess(fen) : new Chess();
  for (const raw of line.trim().split(/\s+/).filter(Boolean)) {
    const san = raw.replace(/[+#!?]/g, "");
    try {
      board.move(san);
      plies++;
    } catch {
      errors.push(`${label}: jugada ilegal "${raw}"`);
      return;
    }
  }
}

for (const course of COURSES) {
  for (const chapter of course.chapters) {
    chapters++;
    lines++;
    walkLine(chapter.fen, chapter.line, `${course.name} / ${chapter.title}`);
    for (const alt of chapter.alternatives ?? []) {
      lines++;
      walkLine(chapter.fen, alt.line, `${course.name} / ${chapter.title} / ${alt.name}`);
    }
    for (const trap of chapter.traps ?? []) {
      traps++;
      walkLine(undefined, trap.line, `${course.name} / ${chapter.title} / trampa`);
    }
  }
}

// Los ejercicios derivados deben tener siempre una respuesta legal.
let drills = 0;
for (const course of COURSES) {
  for (const chapter of course.chapters) {
    for (const drill of chapterDrills(course, chapter)) {
      drills++;
      validateFen(drill.fen, `${course.name} / ${chapter.title}`);
      try {
        new Chess(drill.fen).move(drill.answer.replace(/[+#!?]/g, ""));
      } catch {
        errors.push(`${course.name} / ${chapter.title}: ejercicio inválido ${drill.answer}`);
      }
    }
  }
}
const source = readFileSync("docs/source-catalogue.txt", "utf8")
  .split("\n")
  .map((name) => name.trim())
  .filter(Boolean);
const normalize = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();
const implemented = new Set(COURSES.map((course) => normalize(course.name)));
const expected = new Set(source.map(normalize));

for (const name of source) {
  if (!implemented.has(normalize(name))) errors.push(`Falta en el catálogo: ${name}`);
}
for (const course of COURSES) {
  if (!expected.has(normalize(course.name))) errors.push(`No está en la fuente: ${course.name}`);
}

// Inventario.
const rows = COURSES.map((course) => {
  const chapterLines = course.chapters.reduce(
    (total, chapter) => total + 1 + (chapter.alternatives?.length ?? 0),
    0,
  );
  return `| ${course.name} | ${course.category} | ${course.status} | ${course.chapters.length} | ${chapterLines} | ${course.elo} |`;
});

const inventory = `# Inventario de cursos NK_Chess

Generado por \`npm run verify\` a partir de \`src/data/*.ts\`.
La lista de referencia está en \`docs/source-catalogue.txt\` (73 nombres extraídos de
chessly.com/public/courses el 2026-11-06).

| Curso | Categoría | Estado | Capítulos | Líneas | Elo |
| --- | --- | --- | --- | --- | --- |
${rows.join("\n")}

**Totales:** ${STATS.courses} cursos publicados, ${STATS.soon} en preparación, ${chapters} capítulos, ${lines} líneas.
`;
writeFileSync("docs/course-inventory.md", inventory);

console.log(`Cursos: ${COURSES.length} (publicados ${STATS.courses}, en preparación ${STATS.soon})`);
console.log(`Capítulos: ${chapters} · líneas y variantes: ${lines} · jugadas verificadas: ${plies}`);
console.log(`Líneas de trampa verificadas: ${traps}`);
console.log(`Nombres de la fuente: ${source.length} · ejercicios generados: ${drills}`);

if (errors.length) {
  console.error(`\n${errors.length} problemas:`);
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
console.log("Catálogo y líneas verificados.");
