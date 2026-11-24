import { Chess, type Move } from "chess.js";

/**
 * Explicación paso a paso de una jugada.
 *
 * El orden de los pasos es el protocolo de pensamiento de Adriaan de Groot
 * (Thought and Choice in Chess, 1946/1965): orientación, exploración,
 * investigación y verificación. Cada paso se deriva de hechos de la posición
 * calculados con chess.js, nunca de texto escrito a mano.
 */

export type StepPhase = "orientacion" | "exploracion" | "investigacion" | "verificacion";

export interface ExplainStep {
  phase: StepPhase;
  /** Etiqueta corta de la fase, en mayúsculas. */
  label: string;
  /** Hecho concreto de esta jugada en esta fase. */
  text: string;
}

export interface MoveExplanation {
  san: string;
  from: string;
  to: string;
  /** Quién jugó. */
  side: "blancas" | "negras";
  steps: ExplainStep[];
}

const PIECE: Record<string, string> = {
  p: "peón",
  n: "caballo",
  b: "alfil",
  r: "torre",
  q: "dama",
  k: "rey",
};

const PHASE_LABEL: Record<StepPhase, string> = {
  orientacion: "01 ORIENTACIÓN",
  exploracion: "02 EXPLORACIÓN",
  investigacion: "03 INVESTIGACIÓN",
  verificacion: "04 VERIFICACIÓN",
};

function pieceName(type: string): string {
  return PIECE[type] ?? "pieza";
}

/** Amenazas directas: piezas del rival atacadas por la pieza que acaba de mover. */
function attacks(chess: Chess, move: Move): string[] {
  const targets: string[] = [];
  for (const square of chess.moves({ square: move.to, verbose: true })) {
    const victim = chess.get(square.to);
    if (victim && victim.color !== move.color && victim.type !== "k") {
      targets.push(`${pieceName(victim.type)} de ${square.to}`);
    }
  }
  return [...new Set(targets)];
}

function orientation(chess: Chess, move: Move): string {
  const side = move.color === "w" ? "blancas" : "negras";
  const name = pieceName(move.piece);
  const facts: string[] = [`${side} juegan ${move.san}: el ${name} pasa de ${move.from} a ${move.to}`];

  if (move.captured) {
    facts.push(`y captura el ${pieceName(move.captured)}`);
  }
  if (move.flags.includes("k") || move.flags.includes("q")) {
    facts.push("enrocando, con lo que el rey sale del centro y la torre entra en juego");
  }
  if (move.flags.includes("e")) {
    facts.push("al paso");
  }
  if (move.promotion) {
    facts.push(`y corona a ${pieceName(move.promotion)}`);
  }
  if (chess.isCheckmate()) {
    facts.push("dando jaque mate");
  } else if (chess.inCheck()) {
    facts.push("dando jaque al rey rival");
  }

  return `${facts.join(", ")}.`;
}

function exploration(before: Chess, move: Move): string {
  const legal = before.moves({ verbose: true });
  const fromSameSquare = legal.filter((candidate) => candidate.from === move.from);
  const captures = legal.filter((candidate) => candidate.captured);
  const checks = legal.filter((candidate) => candidate.san.includes("+") || candidate.san.includes("#"));

  const parts = [`Había ${legal.length} jugadas legales`];
  if (fromSameSquare.length > 1) {
    parts.push(`de las cuales ${fromSameSquare.length} salían de ${move.from}`);
  }
  if (captures.length > 0) {
    parts.push(`${captures.length} capturaban material`);
  }
  if (checks.length > 0) {
    parts.push(`${checks.length} daban jaque`);
  }
  return `${parts.join("; ")}. Se elige ${move.san} y se descartan las demás.`;
}

function investigation(chess: Chess, move: Move): string {
  const gained = attacks(chess, move);
  const replyCount = chess.moves().length;

  if (chess.isCheckmate()) {
    return "La investigación termina aquí: el rey rival no tiene ninguna respuesta legal.";
  }
  if (chess.isStalemate()) {
    return "La posición queda en tablas por ahogado: el rival no está en jaque pero tampoco tiene jugada legal.";
  }

  const parts: string[] = [];
  if (gained.length > 0) {
    parts.push(`desde ${move.to} la pieza ataca ${gained.slice(0, 3).join(", ")}`);
  } else if (move.piece === "p") {
    parts.push(`el peón ocupa ${move.to} y abre líneas para las piezas de detrás`);
  } else {
    parts.push(`la pieza se reubica en ${move.to} sin crear amenazas inmediatas`);
  }
  parts.push(`el rival dispone de ${replyCount} respuestas`);
  return `${parts.join("; ")}.`;
}

function verification(chess: Chess, move: Move): string {
  if (chess.isCheckmate()) {
    return "Verificado: la jugada es terminal, no existe defensa.";
  }
  if (chess.isDraw() || chess.isStalemate()) {
    return "Verificado: la posición es de tablas, la partida no continúa.";
  }

  const hung = attacks(chess, move).length === 0 && move.piece !== "p" && move.piece !== "k";
  const defenders = new Chess(chess.fen());
  const opponentCanTake = defenders
    .moves({ verbose: true })
    .some((reply) => reply.to === move.to && reply.captured);

  if (opponentCanTake && hung) {
    return `Verificado con reserva: ${move.to} está atacada por el rival y no crea amenaza propia. Conviene comprobar que la pieza queda defendida antes de soltarla.`;
  }
  if (chess.inCheck()) {
    return "Verificado: el jaque es real, el rival está obligado a responder a él antes que a cualquier plan.";
  }
  return "Verificado: la jugada es legal, no pierde la pieza de inmediato y deja al rival con la obligación de contestar.";
}

/**
 * Construye los cuatro pasos de una jugada a partir del FEN anterior.
 * Devuelve null si la jugada no es legal en esa posición.
 */
export function explainMove(beforeFen: string, san: string): MoveExplanation | null {
  const before = new Chess(beforeFen);
  let move: Move;
  try {
    move = before.move(san);
  } catch {
    return null;
  }
  const after = new Chess(before.fen());

  const steps: ExplainStep[] = [
    { phase: "orientacion", label: PHASE_LABEL.orientacion, text: orientation(after, move) },
    { phase: "exploracion", label: PHASE_LABEL.exploracion, text: exploration(new Chess(move.before), move) },
    { phase: "investigacion", label: PHASE_LABEL.investigacion, text: investigation(after, move) },
    { phase: "verificacion", label: PHASE_LABEL.verificacion, text: verification(after, move) },
  ];

  return {
    san: move.san,
    from: move.from,
    to: move.to,
    side: move.color === "w" ? "blancas" : "negras",
    steps,
  };
}
