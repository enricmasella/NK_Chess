import type {
  Chapter,
  Confidence,
  Course,
  Level,
  ModelGame,
  Side,
  Source,
  SourceKind,
  Stage,
  Trap,
} from "./types";

type ChInput = [
  string,
  string,
  string,
  {
    fen?: string;
    alts?: Array<[string, string, string]>;
    keys?: number[];
    demo?: boolean;
    plans?: [string, string];
    trans?: string[];
    traps?: Array<[string, string]>;
    games?: Array<[string, string]>;
    sources?: Array<[SourceKind, string, string?]>;
    conf?: Confidence;
  }?,
];

interface CourseInput {
  id: string;
  name: string;
  category: Course["category"];
  side: Side | null;
  levels: Level[];
  elo: string;
  summary: string;
  chapters: ChInput[];
  stage?: Stage;
  tags?: string[];
  status?: Course["status"];
}

/** Fecha de la última comprobación de fuentes de esta tanda de datos. */
export const SOURCES_CHECKED = "2026-11-06";

function toSource([kind, label, url]: [SourceKind, string, string?]): Source {
  return url ? { kind, label, url, checked: SOURCES_CHECKED } : { kind, label, checked: SOURCES_CHECKED };
}

function toTrap([line, note]: [string, string]): Trap {
  return { line, note };
}

function toGame([label, source]: [string, string]): ModelGame {
  return { label, source };
}

export function course(input: CourseInput): Course {
  const chapters: Chapter[] = input.chapters.map(([title, idea, line, extra], index) => {
    const chapter: Chapter = {
      id: `${input.id}-${index + 1}`,
      title,
      idea,
      line,
      fen: extra?.fen,
      keyMoves: extra?.keys,
      demo: extra?.demo,
    };
    if (extra?.alts) {
      chapter.alternatives = extra.alts.map(([name, altLine, note]) => ({ name, line: altLine, note }));
    }
    if (extra?.plans) chapter.plans = { white: extra.plans[0], black: extra.plans[1] };
    if (extra?.trans) chapter.transpositions = extra.trans;
    if (extra?.traps) chapter.traps = extra.traps.map(toTrap);
    if (extra?.games) chapter.modelGames = extra.games.map(toGame);
    if (extra?.sources) chapter.sources = extra.sources.map(toSource);
    if (extra?.conf) chapter.confidence = extra.conf;
    return chapter;
  });
  return {
    id: input.id,
    name: input.name,
    category: input.category,
    stage: input.stage ?? "opening",
    levels: input.levels,
    side: input.side,
    elo: input.elo,
    summary: input.summary,
    status: input.status ?? "published",
    tags: input.tags ?? [],
    chapters,
  };
}
