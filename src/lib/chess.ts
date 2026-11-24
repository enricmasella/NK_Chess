import { Chess, type Move, type Square } from "chess.js";
import type { Chapter, Course, Drill, Side, StudyStep } from "../data/types";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

export function parseLine(fen: string | undefined, line: string): StudyStep[] {
  const chess = fen ? new Chess(fen) : new Chess();
  const steps: StudyStep[] = [];
  for (const san of line.trim().split(/\s+/).filter(Boolean)) {
    const move = chess.move(san);
    if (!move) throw new Error(`Illegal move ${san}`);
    steps.push({
      fen: chess.fen(),
      san: move.san,
      from: move.from,
      to: move.to,
      ply: steps.length + 1,
      color: move.color === "w" ? "white" : "black",
    });
  }
  return steps;
}

export function replay(fen: string | undefined, steps: StudyStep[], upto: number): Chess {
  const chess = fen ? new Chess(fen) : new Chess();
  for (const step of steps.slice(0, upto)) chess.move(step.san);
  return chess;
}

export function movesFrom(fen: string): Move[] {
  return new Chess(fen).moves({ verbose: true });
}

export function squareColor(square: Square): "light" | "dark" {
  const file = FILES.indexOf(square[0] as (typeof FILES)[number]);
  const rank = Number(square[1]) - 1;
  return (file + rank) % 2 === 0 ? "dark" : "light";
}

/** Drills derived from a chapter: every position where the student must move. */
export function chapterDrills(course: Course, chapter: Chapter): Drill[] {
  // Las líneas de demostración muestran errores a propósito: no se entrenan.
  if (chapter.demo) return [];
  const side: Side = course.side ?? "white";
  const steps = parseLine(chapter.fen, chapter.line);
  const out: Drill[] = [];
  steps.forEach((step, index) => {
    if (step.color !== side) return;
    const before = replay(chapter.fen, steps, index).fen();
    out.push({
      fen: before,
      answer: step.san,
      label: moveLabel(before, step.san),
      chapterId: chapter.id,
      chapterTitle: chapter.title,
    });
  });
  // Las trampas también se entrenan: la última jugada de cada una es el castigo.
  for (const trap of chapter.traps ?? []) {
    const trapSteps = parseLine(undefined, trap.line);
    const last = trapSteps[trapSteps.length - 1];
    if (!last || last.color !== side) continue;
    const before = replay(undefined, trapSteps, trapSteps.length - 1).fen();
    out.push({
      fen: before,
      answer: last.san,
      label: moveLabel(before, last.san),
      chapterId: chapter.id,
      chapterTitle: chapter.title,
    });
  }
  return out;
}

export function moveLabel(fen: string, san: string): string {
  const parts = fen.split(" ");
  const number = Number(parts[5] ?? 1);
  const black = parts[1] === "b";
  return `${number}${black ? "..." : "."} ${san}`;
}

export function courseDrills(course: Course): Drill[] {
  return course.chapters.flatMap((chapter) => chapterDrills(course, chapter));
}

export interface Position {
  fen: string;
  squares: Array<{ square: Square; piece: { color: Side; type: string } | null }>;
}

export function positionFrom(fen: string): Position {
  const chess = new Chess(fen);
  const squares: Position["squares"] = [];
  for (let rank = 8; rank >= 1; rank--) {
    for (const file of FILES) {
      const square = `${file}${rank}` as Square;
      const piece = chess.get(square);
      squares.push({
        square,
        piece: piece ? { color: piece.color === "w" ? "white" : "black", type: piece.type } : null,
      });
    }
  }
  return { fen, squares };
}
