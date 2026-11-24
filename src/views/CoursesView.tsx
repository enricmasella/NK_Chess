import { useMemo, useState } from "react";
import { useProgress, courseProgress } from "../lib/progress";
import { CATEGORY_LABEL, STATS, searchCourses, LEARNING_PATHS } from "../data";
import { StatsDashboard } from "../components/StatsDashboard";
import type { Category } from "../data/types";

const CATEGORIES: Array<Category | "all"> = ["all", "white", "black", "skills"];

const LEVEL_TEXT: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export function CoursesView() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const { progress } = useProgress();

  const courses = useMemo(() => searchCourses(query, category), [query, category]);

  return (
    <div className="wrap page courses-page" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      {/* Header bar de catálogo estilo dossier */}
      <div className="catalogue-header" style={{ marginBottom: "2rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
              // ARCHIVO_CENTRAL · 73 PROTOCOLOS DISPONIBLES
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              CATÁLOGO DE ENTRENAMIENTO
            </h1>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            [ TOTAL: <span style={{ color: "var(--text)" }}>{STATS.courses} CURSOS</span> /{" "}
            <span style={{ color: "var(--text)" }}>{STATS.chapters} CAPÍTULOS</span> /{" "}
            <span style={{ color: "var(--text)" }}>{STATS.lines} LÍNEAS</span> ]
          </div>
        </div>
      </div>

      {category === "all" && !query && <StatsDashboard />}

      {/* Toolbar de filtros y búsqueda */}
      <div className="toolbar" style={{ margin: "2rem 0" }}>
        <div className="chips" role="group" aria-label="Filtrar por categoría">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className="chip"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {CATEGORY_LABEL[item]}
            </button>
          ))}
        </div>
        <input
          className="search"
          type="search"
          placeholder="Buscar apertura, tema, capítulo…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Buscar cursos"
        />
      </div>

      {/* Rutas de aprendizaje destacadas si no hay filtro */}
      {category === "all" && !query && (
        <section className="learning-paths" style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--foreground)" }}>
              // RUTAS DE APRENDIZAJE RECOMENDADAS
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
              [4 MATRICES ESTRUCTURADAS]
            </span>
          </div>
          <div className="grid">
            {LEARNING_PATHS.map((path) => (
              <div
                key={path.id}
                className="card card-aw"
                style={{ borderLeft: `3px solid ${path.accent}`, background: "var(--card)" }}
              >
                <div className="card-top">
                  <span>{LEVEL_TEXT[path.level]}</span>
                  <span className="dot" />
                  <span>{path.subtitle}</span>
                </div>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="card-foot" style={{ marginTop: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", opacity: 0.8, fontFamily: "var(--font-mono)" }}>
                    {path.courseIds.length} CURSOS ASIGNADOS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid de cursos con el efecto hover que le gusta al usuario */}
      {courses.length === 0 ? (
        <div className="empty" style={{ padding: "4rem 2rem", textAlign: "center", border: "1px dashed var(--line)" }}>
          Ningún protocolo coincide con “{query}”.
        </div>
      ) : (
        <div className="grid">
          {courses.map((course) => {
            const percent = courseProgress(
              progress,
              course.chapters.map((chapter) => chapter.id),
            );
            return (
              <a className="card card-aw" key={course.id} href={`#/curso/${course.id}`}>
                <div className="card-top">
                  <span>{CATEGORY_LABEL[course.category]}</span>
                  <span className="dot" />
                  <span>
                    {course.stage === "endgame"
                      ? "Final"
                      : course.stage === "middlegame"
                      ? "Medio juego"
                      : course.stage === "all"
                      ? "Todo el juego"
                      : "Apertura"}
                  </span>
                  {course.status === "soon" && <span className="badge soon">En preparación</span>}
                </div>
                <h3>{course.name}</h3>
                <p>{course.summary}</p>
                <div className="card-foot">
                  <span>
                    {course.chapters.length} cap. · {course.elo}
                  </span>
                  <span>{LEVEL_TEXT[course.levels[0] ?? "beginner"]}</span>
                </div>
                <div className="progress-track" aria-hidden="true">
                  <div className="progress-fill" style={{ width: `${percent}%` }} />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
