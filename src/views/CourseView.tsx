import { CATEGORY_LABEL, LEVEL_LABEL } from "../data";
import type { Course } from "../data/types";
import { courseProgress, useProgress } from "../lib/progress";

export function CourseView({ course }: { course: Course }) {
  const { progress } = useProgress();
  const percent = courseProgress(
    progress,
    course.chapters.map((chapter) => chapter.id),
  );
  const lines = course.chapters.reduce(
    (total, chapter) => total + 1 + (chapter.alternatives?.length ?? 0),
    0,
  );

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Migas de pan">
        <a href="#/">Catálogo</a>
        <span>/</span>
        <span>{CATEGORY_LABEL[course.category]}</span>
      </nav>

      <header className="course-head">
        <div>
          <p className="eyebrow">
            {course.status === "soon" ? "En preparación" : "Curso"} · {course.elo} Elo
          </p>
          <h1>{course.name}</h1>
          <p className="lede">{course.summary}</p>
          <div className="meta-row">
            <span className="badge">{CATEGORY_LABEL[course.category]}</span>
            {course.levels.map((level) => (
              <span className="badge" key={level}>
                {LEVEL_LABEL[level]}
              </span>
            ))}
            {course.tags.map((tag) => (
              <span className="badge" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="panel">
          <h4>Progreso</h4>
          <dl>
            <div>
              <dt>Capítulos</dt>
              <dd>{course.chapters.length}</dd>
            </div>
            <div>
              <dt>Líneas</dt>
              <dd>{lines}</dd>
            </div>
            <div>
              <dt>Completado</dt>
              <dd>{percent}%</dd>
            </div>
          </dl>
          <div className="progress-track" style={{ marginTop: 16 }}>
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          {course.chapters[0] && (
            <a
              className="btn primary"
              style={{ marginTop: 18, width: "100%", justifyContent: "center" }}
              href={`#/curso/${course.id}/${course.chapters[0].id}`}
            >
              {percent > 0 ? "Continuar" : "Empezar curso"}
            </a>
          )}
        </aside>
      </header>

      <div className="section-title">
        <h2>Capítulos</h2>
        <span>Estudio + ejercicios</span>
      </div>

      <div className="chapter-list">
        {course.chapters.map((chapter, index) => {
          const state = progress.chapters[chapter.id];
          return (
            <a className="chapter-row" key={chapter.id} href={`#/curso/${course.id}/${chapter.id}`}>
              <span className="chapter-num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{chapter.title}</h3>
                <p>{chapter.idea}</p>
              </div>
              <span className={`chapter-state${state?.studied ? " done" : ""}`}>
                {state?.studied ? "Estudiado" : `${chapter.alternatives?.length ?? 0} variantes`}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
