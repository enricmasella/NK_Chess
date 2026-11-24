import { useMemo, useState } from "react";
import { DrillRunner } from "../components/DrillRunner";
import { COURSES, CATEGORY_LABEL } from "../data";
import { courseDrills } from "../lib/chess";
import type { Category, Drill, Side } from "../data/types";
import { useProgress } from "../lib/progress";

const CATEGORIES: Array<Category | "all"> = ["all", "white", "black", "skills"];

interface PoolEntry extends Drill {
  courseId: string;
  courseName: string;
  side: Side | null;
}

function buildPool(category: Category | "all"): PoolEntry[] {
  return COURSES.filter(
    (course) =>
      course.status === "published" &&
      (category === "all" || course.category === category),
  ).flatMap((course) =>
    courseDrills(course).map((drill) => ({
      ...drill,
      courseId: course.id,
      courseName: course.name,
      side: course.side,
    })),
  );
}

export function TrainView() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [seed, setSeed] = useState(0);
  const { progress, markSolved } = useProgress();

  const pool = useMemo(() => {
    const drills = buildPool(category);
    const order = drills.map((_, index) => index);
    let random = seed * 9301 + 49297;
    for (let i = order.length - 1; i > 0; i--) {
      random = (random * 9301 + 49297) % 233280;
      const j = Math.floor((random / 233280) * (i + 1));
      const a = order[i] ?? 0;
      const b = order[j] ?? 0;
      order[i] = b;
      order[j] = a;
    }
    return order.map((index) => drills[index]).filter((item): item is PoolEntry => Boolean(item));
  }, [category, seed]);

  const current = pool[0];
  const solvedAll = useMemo(
    () =>
      Object.values(progress.chapters).reduce((total, chapter) => total + chapter.solved.length, 0),
    [progress],
  );

  return (
    <div className="wrap page">
      <p className="eyebrow">Entrenamiento</p>
      <h1 className="page-title">Practica hasta que salga solo</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "60ch" }}>
        Ejercicios generados a partir de las líneas del catálogo: la posición aparece antes de la
        jugada teórica y tú tienes que encontrarla. {solvedAll} ejercicios resueltos hasta ahora.
      </p>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filtrar el entrenamiento">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className="chip"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setSeed((value) => value + 1);
              }}
            >
              {CATEGORY_LABEL[item]}
            </button>
          ))}
        </div>
        <button className="btn ghost spacer" onClick={() => setSeed((value) => value + 1)}>
          Mezclar de nuevo
        </button>
      </div>

      {current ? (
        <DrillRunner
          key={`${seed}-${category}`}
          drills={pool}
          side={current.side}
          solvedKeys={Object.values(progress.chapters).flatMap((chapter) => chapter.solved)}
          onSolved={(drill) => markSolved(drill.chapterId, `${drill.chapterId}:${drill.fen}`)}
        />
      ) : (
        <div className="empty">No hay ejercicios en esta categoría.</div>
      )}
    </div>
  );
}
