// Imprime la línea principal de Stockfish para un FEN.
// Uso: node scripts/best-line.mjs "<fen>" [depth]
import { readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { Chess } from "chess.js";

const fen = process.argv[2];
const depth = Number(process.argv[3] ?? 18);
if (!fen) throw new Error('Falta el FEN: node scripts/best-line.mjs "<fen>" [depth]');

const dir = ".engine/stockfish";
const file = readdirSync(dir).find((f) => f.endsWith(".exe") || f === "stockfish");
const proc = spawn(`${dir}/${file}`, [], { stdio: ["pipe", "pipe", "inherit"] });

let buffer = "";
let pv = [];
proc.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  let nl;
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    const match = / depth (\d+).*score (cp|mate) (-?\d+).* pv (.+)$/.exec(line);
    if (match && Number(match[1]) >= depth - 1 && !line.includes(" lowerbound") && !line.includes(" upperbound")) {
      pv = match[4].split(/\s+/);
      console.log(`depth ${match[1]} · ${match[2]} ${match[3]} · ${pv.join(" ")}`);
    }
  }
});

proc.stdin.write(`uci\nposition fen ${fen}\ngo depth ${depth}\n`);
setTimeout(() => {
  const chess = new Chess(fen);
  const san = [];
  for (const uci of pv) {
    try {
      const move = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] ?? "q" });
      san.push(move.san);
    } catch {
      break;
    }
  }
  console.log("SAN:", san.join(" "));
  proc.stdin.write("quit\n");
  setTimeout(() => process.exit(0), 300);
}, 6000);
