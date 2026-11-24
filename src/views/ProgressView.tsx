import { COURSES, CATEGORY_LABEL } from "../data";
import type { Category } from "../data/types";
import { courseProgress, useProgress, xpOf } from "../lib/progress";

export function ProgressView() {
  const { progress, reset } = useProgress();
  const chapters = Object.entries(progress.chapters);
  const studied = chapters.filter(([, value]) => value.studied).length;
  const solved = chapters.reduce((total, [, value]) => total + value.solved.length, 0);
  const totalChapters = COURSES.reduce((total, course) => total + course.chapters.length, 0);
  const xp = xpOf(progress);

  const categories: Array<{ key: Category; courses: typeof COURSES }> = [
    { key: "white", courses: COURSES.filter((course) => course.category === "white") },
    { key: "black", courses: COURSES.filter((course) => course.category === "black") },
    { key: "skills", courses: COURSES.filter((course) => course.category === "skills") },
  ];

  const activeCourses = COURSES.filter((course) =>
    course.chapters.some((chapter) => progress.chapters[chapter.id]?.studied),
  );

  return (
    <div className="wrap page">
      <p className="eyebrow">Tu progreso</p>
      <h1 className="page-title">Constancia sobre intensidad</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "60ch" }}>
        El progreso se guarda en este navegador. Cada capítulo estudiado vale 20 XP y cada ejercicio
        resuelto 10 XP.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">{xp}</div>
          <div className="stat-label">XP</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {studied}
            <span style={{ fontSize: 16, color: "var(--text-dim)" }}> / {totalChapters}</span>
          </div>
          <div className="stat-label">Capítulos estudiados</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{solved}</div>
          <div className="stat-label">Ejercicios resueltos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeCourses.length}</div>
          <div className="stat-label">Cursos empezados</div>
        </div>
      </div>

      <div className="section-title">
        <h2>Progreso por categoría</h2>
        <span>{totalChapters} capítulos en total</span>
      </div>

      <div className="breakdown" style={{ paddingBottom: 40 }}>
        {categories.map(({ key, courses }) => {
          const ids = courses.flatMap((course) => course.chapters.map((chapter) => chapter.id));
          const done = ids.filter((id) => progress.chapters[id]?.studied).length;
          const percent = ids.length ? Math.round((done / ids.length) * 100) : 0;
          return (
            <div className="breakdown-row" key={key}>
              <div className="row-head">
                <span>{CATEGORY_LABEL[key]}</span>
                <span>
                  {done} / {ids.length}
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title">
        <h2>Cursos en marcha</h2>
        <span>{activeCourses.length ? "Continúa donde lo dejaste" : "Todavía sin empezar"}</span>
      </div>

      <div className="breakdown" style={{ paddingBottom: 40 }}>
        {activeCourses.length === 0 && (
          <div className="empty">
            Aún no has estudiado ningún capítulo. <a href="#/" style={{ color: "var(--gold)" }}>Elige un curso</a>.
          </div>
        )}
        {activeCourses.map((course) => {
          const percent = courseProgress(
            progress,
            course.chapters.map((chapter) => chapter.id),
          );
          return (
            <a className="breakdown-row" key={course.id} href={`#/curso/${course.id}`}>
              <div className="row-head">
                <span style={{ color: "var(--text)" }}>{course.name}</span>
                <span>{percent}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
            </a>
          );
        })}
      </div>

      <button
        className="btn"
        onClick={() => {
          if (window.confirm("¿Borrar todo el progreso guardado en este navegador?")) reset();
        }}
      >
        Reiniciar progreso
      </button>
    </div>
  );
}
