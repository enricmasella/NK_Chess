import { useCallback, useSyncExternalStore } from "react";

const KEY = "nkchess.progress.v1";

export interface ChapterProgress {
  studied: boolean;
  solved: string[];
}

export interface ProgressState {
  chapters: Record<string, ChapterProgress>;
}
const EMPTY: ProgressState = { chapters: {} };

function read(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "chapters" in parsed) {
      return parsed as ProgressState;
    }
    return EMPTY;
  } catch {
    return EMPTY;
  }
}

let state: ProgressState = typeof localStorage === "undefined" ? EMPTY : read();
const listeners = new Set<() => void>();

function commit(next: ProgressState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full or disabled: progress stays in memory */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useProgress() {
  const snapshot = useSyncExternalStore(subscribe, () => state, () => state);

  const markStudied = useCallback((chapterId: string) => {
    const current = state.chapters[chapterId] ?? { studied: false, solved: [] };
    if (current.studied) return;
    commit({
      chapters: { ...state.chapters, [chapterId]: { ...current, studied: true } },
    });
  }, []);

  const markSolved = useCallback((chapterId: string, drillKey: string) => {
    const current = state.chapters[chapterId] ?? { studied: false, solved: [] };
    if (current.solved.includes(drillKey)) return;
    commit({
      chapters: {
        ...state.chapters,
        [chapterId]: { ...current, solved: [...current.solved, drillKey] },
      },
    });
  }, []);

  const reset = useCallback(() => commit(EMPTY), []);

  return { progress: snapshot, markStudied, markSolved, reset };
}

export function xpOf(progress: ProgressState): number {
  return Object.values(progress.chapters).reduce(
    (total, chapter) => total + (chapter.studied ? 20 : 0) + chapter.solved.length * 10,
    0,
  );
}

export function courseProgress(progress: ProgressState, chapterIds: string[]): number {
  if (chapterIds.length === 0) return 0;
  const done = chapterIds.filter((id) => progress.chapters[id]?.studied).length;
  return Math.round((done / chapterIds.length) * 100);
}
