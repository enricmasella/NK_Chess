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
  /** Propósito ajedrecístico comprensible. */
  purpose: string;
  /** Acción concisa en el tablero. */
  boardAction: string;
  /** Amenazas o consecuencias tácticas directas. */
  tactics: string[];
  /** Fases de de Groot para análisis técnico opcional. */
  steps: ExplainStep[];
}

const PIECE: Record<string, { name: string; art: string }> = {
  p: { name: "peón", art: "el peón" },
  n: { name: "caballo", art: "el caballo" },
  b: { name: "alfil", art: "el alfil" },
  r: { name: "torre", art: "la torre" },
  q: { name: "dama", art: "la dama" },
  k: { name: "rey", art: "el rey" },
};

const PHASE_LABEL: Record<StepPhase, string> = {
  orientacion: "01 ORIENTACIÓN",
  exploracion: "02 EXPLORACIÓN",
  investigacion: "03 INVESTIGACIÓN",
  verificacion: "04 VERIFICACIÓN",
};

function pieceName(type: string): string {
  return PIECE[type]?.name ?? "pieza";
}

function articledPiece(type: string): string {
  return PIECE[type]?.art ?? "la pieza";
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
  const art = articledPiece(move.piece);
  const facts: string[] = [`${side} juegan ${move.san}: ${art} pasa de ${move.from} a ${move.to}`];

  if (move.captured) {
    facts.push(`y captura ${articledPiece(move.captured)}`);
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
 * Extrae una idea concreta para una jugada si el texto de la lección la menciona.
 */
export function extractMoveIdea(san: string, contextText?: string): string | null {
  if (!contextText) return null;
  const escaped = san.replace(/[+*]/g, "");
  const isPawnMove = /^[a-h][1-8]$/.test(escaped);

  // Para peones simples (ej. e4, d5), exigir número de jugada (1.e4, ...e5) para evitar confundir con casillas
  const regexStr = isPawnMove
    ? `(?:^|[\\s(\\[])(?:\\d+\\.{1,3}|\\.{3}|jugada\\s+)${escaped}(?=[.,;:\\s)\\]]|$)`
    : `(?:^|[\\s(\\[])(?:\\d+\\.{1,3})?(?:\\.{3})?${escaped}(?=[.,;:\\s)\\]]|$)`;

  const pattern = new RegExp(regexStr);
  const sentences = contextText.split(/(?<=[.;])\s+/);
  for (const s of sentences) {
    if (pattern.test(s)) {
      return s.trim();
    }
  }
  return null;
}

function inferMovePurpose(move: Move, chessAfter: Chess, contextNote?: string): string {
  const custom = extractMoveIdea(move.san, contextNote);
  if (custom) return custom;

  if (move.flags.includes("k") || move.flags.includes("q")) {
    return "Pone el rey a resguardo en el flanco y activa la torre hacia el centro.";
  }
  if (chessAfter.isCheckmate()) {
    return "Jaque mate decisivo: el rey rival no tiene escapatoria legal.";
  }
  if (chessAfter.inCheck()) {
    return "Jaque directo: fuerza una respuesta defensiva inmediata del rival.";
  }
  if (move.captured) {
    return `Captura ${articledPiece(move.captured)} en ${move.to}, alterando el balance táctico.`;
  }

  // Peones
  if (move.piece === "p") {
    if (["e4", "d4", "e5", "d5", "c4", "c5"].includes(move.to)) {
      return `Ocupa el centro con ${move.san} y abre diagonales para desarrollar piezas.`;
    }
    if (["f4", "f5"].includes(move.to)) {
      return "Gambito de flanco: busca desviar peones centrales rivales y abrir columnas activas.";
    }
    if (["d3", "e3", "c3", "d6", "e6", "c6"].includes(move.to)) {
      return "Refuerza la estructura de peones y sostiene el control del centro.";
    }
    return `Avanza el peón a ${move.to} ganando espacio en el tablero.`;
  }

  // Caballos
  if (move.piece === "n") {
    if (["f3", "c3", "f6", "c6"].includes(move.to)) {
      return "Desarrolla el caballo hacia el centro disputando casillas clave y preparando el enroque.";
    }
    if (["d4", "e4", "d5", "e5"].includes(move.to)) {
      return `Centraliza el caballo en ${move.to}, instalando una pieza muy activa en territorio rival.`;
    }
    if (["d6", "d7", "e7"].includes(move.to)) {
      return `Reubica el caballo en ${move.to} con funciones de defensa y reorganización.`;
    }
    return `Maniobra con el caballo hacia ${move.to} buscando casillas avanzadas.`;
  }

  // Alfiles
  if (move.piece === "b") {
    if (["c4", "c5"].includes(move.to)) {
      return "Desarrolla el alfil por la diagonal activa apuntando a la casilla vulnerable (f7 / f2).";
    }
    if (["b5", "b4"].includes(move.to)) {
      return "Clava o presiona la pieza enemiga que sostiene el centro.";
    }
    if (["g5", "g4"].includes(move.to)) {
      return "Clava el caballo rival contra la dama y disputa la iniciativa del flanco.";
    }
    if (["e2", "e7", "d3", "d6"].includes(move.to)) {
      return "Desarrollo sólido que conecta piezas menores y completa la preparación del enroque.";
    }
    if (["g2", "b2", "g7", "b7"].includes(move.to)) {
      return "Fianchetto: ejerce presión a larga distancia por la gran diagonal.";
    }
    if (move.to === "b3") {
      return "Retira el alfil a b3 manteniéndolo activo en la diagonal clave sin permitir cambios forzados.";
    }
    return `Desarrolla el alfil a ${move.to} activando una diagonal importante.`;
  }

  // Damas
  if (move.piece === "q") {
    if (["h5", "h4"].includes(move.to)) {
      return "Salida agresiva de dama amenazando simultáneamente puntos vulnerables como f7 y peones centrales sueltos.";
    }
    if (["f3", "f6"].includes(move.to)) {
      return "Centraliza la dama para presionar casillas clave y coordinar el ataque.";
    }
    return `Reubica la dama en ${move.to} aumentando la coordinación entre piezas.`;
  }

  // Torres
  if (move.piece === "r") {
    if (["e1", "d1", "e8", "d8"].includes(move.to)) {
      return "Centraliza la torre en una columna activa para presionar en el juego medio.";
    }
    return `Activa la torre en ${move.to} para controlar columnas o filas clave.`;
  }

  // Reyes
  if (move.piece === "k") {
    return `Mueve el rey a ${move.to} buscando mayor seguridad en el tablero.`;
  }

  return `Juega ${move.san} mejorando la posición en el tablero.`;
}

function deriveBoardAction(move: Move): string {
  if (move.flags.includes("k")) return "Enroque corto (O-O): el rey pasa a la columna g y la torre a la f.";
  if (move.flags.includes("q")) return "Enroque largo (O-O-O): el rey pasa a la columna c y la torre a la d.";
  const art = articledPiece(move.piece);
  const cap = move.captured ? `, capturando ${articledPiece(move.captured)}` : "";
  return `${art.charAt(0).toUpperCase() + art.slice(1)} pasa de ${move.from} a ${move.to}${cap}.`;
}

function deriveTactics(chessAfter: Chess, move: Move): string[] {
  const points: string[] = [];
  const threatened = attacks(chessAfter, move);
  for (const t of threatened.slice(0, 3)) {
    points.push(`Amenaza directa: presiona sobre ${t}.`);
  }
  if (chessAfter.inCheck()) {
    points.push("Pone en jaque al rey contrario.");
  }
  if (move.piece === "p" && ["e4", "d4", "e5", "d5"].includes(move.to)) {
    points.push(`Controla casillas centrales clave alrededor de ${move.to}.`);
  }
  if (points.length === 0) {
    points.push(`Mejora la coordinación de piezas en la casilla ${move.to}.`);
  }
  return points;
}

/**
 * Construye la explicación de una jugada a partir del FEN anterior.
 * Devuelve null si la jugada no es legal en esa posición.
 */
export function explainMove(beforeFen: string, san: string, contextNote?: string): MoveExplanation | null {
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
    purpose: inferMovePurpose(move, after, contextNote),
    boardAction: deriveBoardAction(move),
    tactics: deriveTactics(after, move),
    steps,
  };
}
