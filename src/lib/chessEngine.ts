import { Chess, type Move } from "chess.js";

export type BotDifficulty = "Muy fácil" | "Fácil" | "Intermedio" | "Avanzado" | "Experto" | "Máximo";

export interface BotProfile {
  id: string;
  name: string;
  elo: number;
  difficulty: BotDifficulty;
  style: string;
  description: string;
  depth: number;
  blunderRate: number; // Probabilidad 0.0 - 1.0 de cometer imprecisión
}

export const BOTS: BotProfile[] = [
  {
    id: "bot-01",
    name: "01 — Novato",
    elo: 400,
    difficulty: "Muy fácil",
    style: "Caótico / Impulsivo",
    description: "Mueve sin plan definido. Cuelga piezas frecuentemente y no calcula amenazas a 1 jugada.",
    depth: 1,
    blunderRate: 0.45,
  },
  {
    id: "bot-02",
    name: "02 — Principiante",
    elo: 600,
    difficulty: "Muy fácil",
    style: "Pasivo",
    description: "Desarrollo elemental. Cede material ante capturas directas y descuida su rey.",
    depth: 1,
    blunderRate: 0.32,
  },
  {
    id: "bot-03",
    name: "03 — Aficionado",
    elo: 800,
    difficulty: "Fácil",
    style: "Básico",
    description: "Respeta principios básicos de apertura pero comete errores tácticos de dos jugadas.",
    depth: 2,
    blunderRate: 0.22,
  },
  {
    id: "bot-04",
    name: "04 — Aprendiz",
    elo: 1000,
    difficulty: "Fácil",
    style: "Agresivo lineal",
    description: "Captura piezas desprotegidas y busca jaques directos, pero olvida la defensa.",
    depth: 2,
    blunderRate: 0.14,
  },
  {
    id: "bot-05",
    name: "05 — Club",
    elo: 1200,
    difficulty: "Intermedio",
    style: "Equilibrado",
    description: "Enroca rápido, disputa el centro y no regala piezas con facilidad en la apertura.",
    depth: 3,
    blunderRate: 0.07,
  },
  {
    id: "bot-06",
    name: "06 — Estratega",
    elo: 1400,
    difficulty: "Intermedio",
    style: "Posicional",
    description: "Busca casillas fuertes para sus caballos y aprovecha columnas abiertas con torres.",
    depth: 3,
    blunderRate: 0.03,
  },
  {
    id: "bot-07",
    name: "07 — Táctico",
    elo: 1600,
    difficulty: "Avanzado",
    style: "Táctico / Dinámico",
    description: "Especialista en clavadas, tenedores y ataques calculados hacia la posición del rey.",
    depth: 4,
    blunderRate: 0.01,
  },
  {
    id: "bot-08",
    name: "08 — Experto",
    elo: 1800,
    difficulty: "Avanzado",
    style: "Castigador",
    description: "Castiga severamente imprecisiones de desarrollo y posee buena técnica de finales.",
    depth: 4,
    blunderRate: 0.0,
  },
  {
    id: "bot-09",
    name: "09 — Maestro",
    elo: 2100,
    difficulty: "Experto",
    style: "Universal",
    description: "Profundidad táctica sólida, armonía de piezas y dominación de estructuras de peones.",
    depth: 5,
    blunderRate: 0.0,
  },
  {
    id: "bot-10",
    name: "10 — Élite",
    elo: 2500,
    difficulty: "Máximo",
    style: "Stockfish Implacable",
    description: "Cálculo táctico sin concesiones. Detección inmediata de cualquier fallo posicional.",
    depth: 6,
    blunderRate: 0.0,
  },
];

// Valores de piezas en centipeones
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Tablas de valores posicionales por casilla (desde perspectiva blanca)
const PAWN_TABLE: readonly number[] = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0,
];

const KNIGHT_TABLE: readonly number[] = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

const BISHOP_TABLE: readonly number[] = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
];

const ROOK_TABLE: readonly number[] = [
  0,  0,  0,  0,  0,  0,  0,  0,
  5, 10, 10, 10, 10, 10, 10,  5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
  0,  0,  0,  5,  5,  0,  0,  0,
];

const QUEEN_TABLE: readonly number[] = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20,
];

const KING_TABLE: readonly number[] = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20,
];

/**
 * Evalúa estáticamente una posición desde el punto de vista de las Blancas en centipeones.
 * Positivo = ventaja blanca, Negativo = ventaja negra.
 */
export function evaluateBoard(chess: Chess): number {
  if (chess.isCheckmate()) {
    return chess.turn() === "w" ? -30000 : 30000;
  }
  if (chess.isDraw()) {
    return 0;
  }

  let score = 0;
  const board = chess.board();

  for (let r = 0; r < 8; r++) {
    const row = board[r];
    if (!row) continue;
    for (let c = 0; c < 8; c++) {
      const piece = row[c];
      if (!piece) continue;

      const val = PIECE_VALUES[piece.type] ?? 0;
      let posVal = 0;
      const idx = r * 8 + c;
      const flipIdx = (7 - r) * 8 + c;

      if (piece.type === "p") {
        posVal = (piece.color === "w" ? PAWN_TABLE[idx] : PAWN_TABLE[flipIdx]) ?? 0;
      } else if (piece.type === "n") {
        posVal = (piece.color === "w" ? KNIGHT_TABLE[idx] : KNIGHT_TABLE[flipIdx]) ?? 0;
      } else if (piece.type === "b") {
        posVal = (piece.color === "w" ? BISHOP_TABLE[idx] : BISHOP_TABLE[flipIdx]) ?? 0;
      } else if (piece.type === "r") {
        posVal = (piece.color === "w" ? ROOK_TABLE[idx] : ROOK_TABLE[flipIdx]) ?? 0;
      } else if (piece.type === "q") {
        posVal = (piece.color === "w" ? QUEEN_TABLE[idx] : QUEEN_TABLE[flipIdx]) ?? 0;
      } else if (piece.type === "k") {
        posVal = (piece.color === "w" ? KING_TABLE[idx] : KING_TABLE[flipIdx]) ?? 0;
      }

      const total = val + posVal;
      score += piece.color === "w" ? total : -total;
    }
  }

  return score;
}

/**
 * Búsqueda de quietud (Quiescence Search) para resolver capturas pendientes
 */
function quiescence(chess: Chess, alpha: number, beta: number, depth: number): number {
  const standPat = evaluateBoard(chess) * (chess.turn() === "w" ? 1 : -1);
  if (depth === 0) return standPat;
  if (standPat >= beta) return beta;
  if (alpha < standPat) alpha = standPat;

  const captures = chess.moves({ verbose: true }).filter((m) => m.captured);
  for (const move of captures) {
    chess.move(move);
    const score = -quiescence(chess, -beta, -alpha, depth - 1);
    chess.undo();

    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
  }
  return alpha;
}

/**
 * Minimax con poda Alpha-Beta para cálculo táctico de los bots
 */
function minimax(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): { score: number; bestMove?: Move } {
  if (depth === 0 || chess.isGameOver()) {
    const sideFactor = chess.turn() === "w" ? 1 : -1;
    const qScore = quiescence(chess, alpha, beta, 2) * sideFactor;
    return { score: qScore };
  }

  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) {
    return { score: evaluateBoard(chess) };
  }

  // Ordenar jugadas: capturas y jaques primero para optimizar la poda
  moves.sort((a, b) => {
    const scoreA = (a.captured ? 100 : 0) + (a.san.includes("+") ? 50 : 0);
    const scoreB = (b.captured ? 100 : 0) + (b.san.includes("+") ? 50 : 0);
    return scoreB - scoreA;
  });

  const firstMove = moves[0];
  if (!firstMove) return { score: evaluateBoard(chess) };

  let bestMove: Move = firstMove;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, false).score;
      chess.undo();

      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestMove = move;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return { score: maxEval, bestMove };
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, true).score;
      chess.undo();

      if (evaluation < minEval) {
        minEval = evaluation;
        bestMove = move;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return { score: minEval, bestMove };
  }
}

/**
 * Calcula la mejor jugada para un bot según su perfil y nivel Elo
 */
export function getBotMove(fen: string, bot: BotProfile): { move: Move; evalCp: number } | null {
  const chess = new Chess(fen);
  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) return null;

  const isWhite = chess.turn() === "w";
  const defaultMove = moves[0]!;

  // Inyección de errores para bots de menor nivel
  if (Math.random() < bot.blunderRate && moves.length > 1) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    const blunderedMove = moves[randomIndex] ?? defaultMove;
    chess.move(blunderedMove);
    const evalCp = evaluateBoard(chess);
    chess.undo();
    return { move: blunderedMove, evalCp };
  }

  // Cálculo por minimax con profundidad según bot
  const result = minimax(
    chess,
    bot.depth,
    -Infinity,
    Infinity,
    isWhite
  );

  const chosenMove = result.bestMove ?? defaultMove;
  return {
    move: chosenMove,
    evalCp: result.score,
  };
}

export type MoveClassification = "BEST" | "EXCELLENT" | "GOOD" | "INACCURACY" | "MISTAKE" | "BLUNDER";

export interface LiveCorrectionResult {
  classification: MoveClassification;
  centipawnLoss: number;
  evalBefore: number;
  evalAfter: number;
  bestMove: { from: string; to: string; san: string };
  playedMove: { from: string; to: string; san: string };
  explanation: string;
}

/**
 * Analiza en tiempo real la jugada ejecutada por el usuario comparándola con la mejor jugada del motor.
 */
export function analyzeLiveMove(
  beforeFen: string,
  playedMove: { from: string; to: string; san: string; promotion?: string }
): LiveCorrectionResult {
  const chess = new Chess(beforeFen);
  const turn = chess.turn();
  const isWhite = turn === "w";
  const legalMoves = chess.moves({ verbose: true });
  const fallbackMove = legalMoves[0] ?? { from: playedMove.from, to: playedMove.to, san: playedMove.san };

  // 1. Evaluar posición previa y encontrar mejor jugada
  const bestSearch = minimax(chess, 3, -Infinity, Infinity, isWhite);
  const bestMove = bestSearch.bestMove ?? fallbackMove;
  const evalBefore = bestSearch.score;

  // 2. Ejecutar la jugada jugada por el usuario y evaluar
  try {
    chess.move({ from: playedMove.from, to: playedMove.to, promotion: playedMove.promotion || "q" });
  } catch {
    // Si ya era el estado siguiente
  }
  const evalAfter = evaluateBoard(chess);

  // 3. Pérdida de evaluación desde la perspectiva del jugador
  const evalPlayerBefore = isWhite ? evalBefore : -evalBefore;
  const evalPlayerAfter = isWhite ? evalAfter : -evalAfter;
  const centipawnLoss = Math.max(0, evalPlayerBefore - evalPlayerAfter);

  // 4. Clasificación según centipawn loss
  let classification: MoveClassification = "BEST";
  let explanation = "";

  if (bestMove.from === playedMove.from && bestMove.to === playedMove.to) {
    classification = "BEST";
    explanation = "Jugada óptima de máxima precisión táctica y posicional.";
  } else if (centipawnLoss <= 25) {
    classification = "BEST";
    explanation = "Excelente elección. Conserva la armonía de la posición.";
  } else if (centipawnLoss <= 65) {
    classification = "EXCELLENT";
    explanation = "Muy sólida. Mantiene la ventaja y la iniciativa en el tablero.";
  } else if (centipawnLoss <= 130) {
    classification = "GOOD";
    explanation = "Jugada correcta, aunque la alternativa recomendada presionaba con mayor precisión.";
  } else if (centipawnLoss <= 260) {
    classification = "INACCURACY";
    explanation = `Imprecisión leve. La alternativa ${bestMove.san} ofrecía un control superior sobre casillas clave.`;
  } else if (centipawnLoss <= 480) {
    classification = "MISTAKE";
    explanation = `Error táctico. Permite al rival contrarrestar la posición. La jugada crítica era ${bestMove.san}.`;
  } else {
    classification = "BLUNDER";
    explanation = `Error grave. Cede material o iniciativa decisiva. La defensa obligada era ${bestMove.san}.`;
  }

  return {
    classification,
    centipawnLoss,
    evalBefore,
    evalAfter,
    bestMove: { from: bestMove.from, to: bestMove.to, san: bestMove.san },
    playedMove,
    explanation,
  };
}
