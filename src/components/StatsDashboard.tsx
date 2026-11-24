import { useProgress } from "../lib/progress";
import { COURSES, STATS } from "../data";
import { useMemo } from "react";

export function StatsDashboard() {
  const { progress } = useProgress();

  const stats = useMemo(() => {
    let chaptersStudied = 0;
    let totalSolved = 0;
    const allChapterIds = COURSES.flatMap((c) => c.chapters.map((ch) => ch.id));
    const totalChapters = allChapterIds.length;

    for (const id of allChapterIds) {
      const p = progress.chapters[id];
      if (p?.studied) chaptersStudied++;
      if (p?.solved) totalSolved += p.solved.length;
    }

    const pct = totalChapters > 0 ? Math.round((chaptersStudied / totalChapters) * 100) : 0;
    return { chaptersStudied, totalChapters, totalSolved, pct };
  }, [progress]);

  return (
    <section className="stats-dashboard" style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--foreground)" }}>Tu Progreso de Maestro</h3>
        <span style={{ fontSize: "0.9rem", color: "var(--gold)", fontWeight: 600 }}>{stats.pct}% Completado</span>
      </div>
      
      <div className="progress-track" style={{ height: "8px", background: "var(--background)", borderRadius: "4px", overflow: "hidden", marginBottom: "1.5rem" }}>
        <div className="progress-fill" style={{ width: `${stats.pct}%`, height: "100%", background: "var(--gold)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", textAlign: "center" }}>
        <div style={{ background: "var(--background)", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)" }}>{stats.chaptersStudied} / {stats.totalChapters}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Capítulos estudiados</div>
        </div>
        <div style={{ background: "var(--background)", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)" }}>{stats.totalSolved}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Ejercicios resueltos</div>
        </div>
        <div style={{ background: "var(--background)", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)" }}>{STATS.courses}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Cursos disponibles</div>
        </div>
      </div>
    </section>
  );
}
