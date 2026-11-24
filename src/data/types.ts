export type Category = "white" | "black" | "skills";
export type SourceKind = "engine" | "database" | "book" | "game" | "original";
export type Confidence = "A" | "B" | "C" | "D" | "E" | "F";

/** Trazabilidad de una afirmación del capítulo. */
export interface Source {
  kind: SourceKind;
  label: string;
  url?: string;
  /** Fecha en que se comprobó la fuente. */
  checked: string;
}

/** Trampa o error típico, con la línea que lo castiga. */
export interface Trap {
  line: string;
  note: string;
}

/** Partida de referencia citada (no inventada). */
export interface ModelGame {
  label: string;
  source: string;
}
export type Stage = "opening" | "middlegame" | "endgame" | "all";
export type Level = "beginner" | "intermediate" | "advanced";
export type Side = "white" | "black";

export interface Alternative {
  /** Name of the alternative line, e.g. "4...Nf6 - Berlin". */
  name: string;
  /** Space separated SAN moves, starting from the chapter position. */
  line: string;
  /** Original explanation of the idea behind the line. */
  note: string;
}

export interface Chapter {
  id: string;
  title: string;
  /** Original prose explaining the educational goal of the chapter. */
  idea: string;
  /** Space separated SAN moves for the main line. */
  line: string;
  /** Optional FEN the line starts from (studies and tactics). */
  fen?: string;
  /** Alternative / opponent responses. */
  alternatives?: Alternative[];
  /** 1-based plies whose idea deserves an extra comment. */
  keyMoves?: number[];
  /** Línea de demostración: se estudia, pero no genera ejercicios. */
  demo?: boolean;
  /** Plan estratégico de cada bando en la posición final del capítulo. */
  plans?: { white: string; black: string };
  /** A qué otras líneas o cursos lleva el mismo esquema. */
  transpositions?: string[];
  /** Errores típicos y la jugada que los castiga. */
  traps?: Trap[];
  /** Partidas reales citadas como referencia. */
  modelGames?: ModelGame[];
  /** Fuentes consultadas, con fecha de comprobación. */
  sources?: Source[];
  /** Nivel de confianza global del capítulo. */
  confidence?: Confidence;
}

export interface Course {
  id: string;
  name: string;
  category: Category;
  stage: Stage;
  levels: Level[];
  /** Side the student trains. `null` for "both sides" skills courses. */
  side: Side | null;
  elo: string;
  summary: string;
  status: "published" | "soon";
  tags: string[];
  chapters: Chapter[];
}

export interface Drill {
  /** FEN before the move to find. */
  fen: string;
  /** Expected move in SAN. */
  answer: string;
  /** Move number label, e.g. "12...". */
  label: string;
  chapterId: string;
  chapterTitle: string;
}

export interface StudyStep {
  fen: string;
  san: string;
  from: string;
  to: string;
  ply: number;
  color: Side;
}
