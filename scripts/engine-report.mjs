// Genera docs/engine-audit.md a partir de .tmp/engine-audit.json.
// Uso: node scripts/engine-report.mjs
import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync(".tmp/engine-audit.json", "utf8"));
const { rows, counts, analysed, totalPositions, inTop3, meanLoss, depth, afterDepth } = data;
const pct = (n, d) => (d ? ((n / d) * 100).toFixed(1) : "0.0");

const byCourse = new Map();
for (const row of rows) {
  const entry = byCourse.get(row.courseName) ?? { chapters: new Set(), positions: 0, worst: 0, errors: 0 };
  entry.chapters.add(row.chapter);
  entry.positions++;
  if (row.loss !== null && row.loss > entry.worst) entry.worst = row.loss;
  if (row.verdict === "error" || row.verdict === "error grave") entry.errors++;
  byCourse.set(row.courseName, entry);
}

const worst = rows
  .filter((r) => r.loss !== null)
  .sort((a, b) => b.loss - a.loss)
  .slice(0, 25);

const md = `# NK_Chess · auditoría con Stockfish

Generado automáticamente por \`scripts/engine-report.mjs\` el ${new Date().toISOString().slice(0, 10)}.
Motor: Stockfish 19 (binario oficial, en \`.engine/\`, fuera de git).

## Método

1. \`scripts/engine-audit.mjs\` compila los datos reales con esbuild y reproduce cada línea del
   catálogo.
2. Para cada posición consulta al motor con \`go depth ${depth} multipv 3\` y guarda las tres mejores
   jugadas.
3. Evalúa también la posición resultante de la jugada del repertorio (\`depth ${afterDepth}\`) para
   calcular la **pérdida en centipeones** desde el punto de vista de quien mueve.
4. Clasificación: correcta ≤ 30 cp · imprecisión ≤ 70 · error ≤ 150 · error grave > 150.
5. Cada posición tiene un límite de ${data.timeoutMs} ms: al agotarse se envía \`stop\`, se espera el
   \`bestmove\` y, si el motor no responde, se reinicia el proceso y se reintenta una vez.

## Cobertura

| Métrica | Valor |
| --- | --- |
| Posiciones analizadas | **${analysed} / ${totalPositions}** (${pct(analysed, totalPositions)} %) |
| Posiciones omitidas | ${data.skipped.length} |
| Jugadas dentro del top 3 | ${inTop3} (${pct(inTop3, analysed)} %) |
| Pérdida media | ${meanLoss === null ? "?" : meanLoss.toFixed(1)} cp |
| Tiempo de motor | ${(data.engineMs / 1000).toFixed(1)} s |
| Reinicios del motor | ${data.restarts} |

## Distribución

| Veredicto | Jugadas |
| --- | --- |
| Correcta | ${counts.correcta} |
| Imprecisión | ${counts["imprecisión"]} |
| Error | ${counts.error} |
| Error grave | ${counts["error grave"]} |
| Sin evaluar | ${counts["sin evaluar"]} |

## Posiciones con mayor pérdida

| Curso | Capítulo | Jugada | Pérdida | Motor |
| --- | --- | --- | --- | --- |
${worst.map((r) => `| ${r.courseName} | ${r.chapterTitle} | ${r.san} | ${r.loss} cp | ${r.best} |`).join("\n")}

## Cobertura por curso

| Curso | Capítulos | Posiciones | Errores | Peor pérdida |
| --- | --- | --- | --- | --- |
${[...byCourse.entries()]
  .sort((a, b) => b[1].worst - a[1].worst)
  .slice(0, 20)
  .map(([name, e]) => `| ${name} | ${e.chapters.size} | ${e.positions} | ${e.errors} | ${e.worst} cp |`)
  .join("\n")}

## Cómo leer esto

- El motor **no es teoría de aperturas**: en gambitos y líneas agresivas suele preferir la línea
  sólida. Una pérdida alta no implica que la jugada sea un error de repertorio, sino que hay que
  revisarla con teoría publicada.
- Las líneas marcadas como \`demo\` en los datos muestran errores a propósito (por ejemplo, la
  posición de mate en \`Beginner Openings\`) y no generan ejercicios.
- Este informe **no** dice que el catálogo esté validado teóricamente: mide legalidad, coherencia
  posicional y desviaciones frente al motor, y solo en las posiciones listadas.
`;

writeFileSync("docs/ENGINE-AUDIT.md", md);
console.log(`docs/ENGINE-AUDIT.md · ${rows.length} filas · ${analysed} posiciones`);
