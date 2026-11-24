import { Chess } from "chess.js";
import { useEffect, useMemo, useState } from "react";
import { Board } from "../components/Board";
import { DrillRunner } from "../components/DrillRunner";
import type { Chapter, Course, StudyStep } from "../data/types";
import { chapterDrills, parseLine } from "../lib/chess";
import { explainMove } from "../lib/explain";
import { StepByStep } from "../components/StepByStep";
import { useProgress } from "../lib/progress";

interface ChapterViewProps {
  course: Course;
  chapter: Chapter;
}

function safeLine(fen: string | undefined, line: string): StudyStep[] {
  try {
    return parseLine(fen, line);
  } catch {
    return [];
  }
}

export function ChapterView({ course, chapter }: ChapterViewProps) {
  const [tab, setTab] = useState<"estudio" | "ejercicios">("estudio");
  const [variation, setVariation] = useState<number>(-1);
  const [step, setStep] = useState(-1);
  const { progress, markStudied, markSolved } = useProgress();

  const variations = useMemo(
    () => [
      { name: "Línea principal", line: chapter.line, note: chapter.idea },
      ...(chapter.alternatives ?? []).map((alt) => ({
        name: alt.name,
        line: alt.line,
        note: alt.note,
      })),
    ],
    [chapter],
  );

  const active = variations[variation + 1] ?? variations[0];
  const steps = useMemo(
    () => (active ? safeLine(chapter.fen, active.line) : []),
    [active, chapter.fen],
  );

  const startFen = useMemo(() => chapter.fen ?? new Chess().fen(), [chapter.fen]);
  const fen = step < 0 ? startFen : (steps[step]?.fen ?? startFen);
  const lastMove = step >= 0 ? steps[step] : null;

  // FEN anterior a la jugada actual: de ahí salen los cuatro pasos.
  const beforeFen = step <= 0 ? startFen : (steps[step - 1]?.fen ?? startFen);
  const explanation = useMemo(
    () => (lastMove ? explainMove(beforeFen, lastMove.san) : null),
    [beforeFen, lastMove],
  );

  const drills = useMemo(() => chapterDrills(course, chapter), [course, chapter]);
  const solvedKeys = progress.chapters[chapter.id]?.solved ?? [];

  useEffect(() => {
    if (steps.length > 0 && step === steps.length - 1) markStudied(chapter.id);
  }, [step, steps.length, chapter.id, markStudied]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (tab !== "estudio") return;
      if (event.key === "ArrowRight") setStep((current) => Math.min(current + 1, steps.length - 1));
      if (event.key === "ArrowLeft") setStep((current) => Math.max(current - 1, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, steps.length]);

  const jump = (index: number) => {
    setStep(index);
    if (index === steps.length - 1) markStudied(chapter.id);
  };

  const courseIndex = course.chapters.findIndex((item) => item.id === chapter.id);
  const nextChapter = course.chapters[courseIndex + 1];
  const chapterState = progress.chapters[chapter.id];

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Migas de pan">
        <a href="#/">Catálogo</a>
        <span>/</span>
        <a href={`#/curso/${course.id}`}>{course.name}</a>
        <span>/</span>
        <span>Capítulo {courseIndex + 1}</span>
      </nav>

      <div style={{ padding: "8px 0 4px" }}>
        <p className="eyebrow">
          Capítulo {String(courseIndex + 1).padStart(2, "0")} · {drills.length} ejercicios
          {chapterState?.studied ? " · Estudiado" : ""}
        </p>
        <h1 className="lesson-title">{chapter.title}</h1>
        <p className="lesson-idea">{active?.note ?? chapter.idea}</p>
        {tab === "estudio" && (
          <StepByStep
            explanation={explanation}
            empty="Pulsa la jugada siguiente. Cada movimiento se explica en cuatro pasos: orientación, exploración, investigación y verificación."
          />
        )}
      </div>

      <div className="tabs" role="tablist" aria-label="Modo de la lección">
        <button role="tab" aria-selected={tab === "estudio"} onClick={() => setTab("estudio")}>
          Estudio
        </button>
        <button role="tab" aria-selected={tab === "ejercicios"} onClick={() => setTab("ejercicios")}>
          Ejercicios
        </button>
      </div>

      {tab === "estudio" ? (
        <div className="lesson">
          <div>
            <div className="board-col">
              <div className="board-frame">
                <Board
                  fen={fen}
                  orientation={course.side === "black" ? "black" : "white"}
                  lastMove={lastMove}
                />
              </div>
              <div className="board-bar">
                <button className="btn" onClick={() => setStep(-1)} disabled={step < 0} aria-label="Inicio" title="Ir al inicio (primera posición)">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M2 3h2v10H2zm3 5l8 5V3z" />
                  </svg>
                </button>
                <button
                  className="btn"
                  onClick={() => setStep((current) => Math.max(current - 1, -1))}
                  disabled={step < 0}
                  aria-label="Jugada anterior"
                  title="Jugada anterior (Flecha Izquierda)"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M10 3L4 8l6 5V3z" />
                  </svg>
                </button>
                <button
                  className="btn primary"
                  onClick={() => jump(Math.min(step + 1, steps.length - 1))}
                  disabled={step >= steps.length - 1}
                  title="Siguiente jugada (Flecha Derecha)"
                >
                  <span>Siguiente jugada</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ marginLeft: 6 }}>
                    <path d="M6 3l6 5-6 5V3z" />
                  </svg>
                </button>
                <button
                  className="btn"
                  onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}
                  disabled={step >= steps.length - 1}
                  aria-label="Jugada siguiente"
                  title="Jugada siguiente (Flecha Derecha)"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M6 3l6 5-6 5V3z" />
                  </svg>
                </button>
                <span className="spacer" />
                <span className="badge" title="Navega jugadas con las flechas del teclado">
                  [← / →]
                </span>
                <span className="badge">
                  {step + 1} / {steps.length}
                </span>
              </div>
            </div>
          </div>

          <aside>
            {variations.length > 1 && (
              <div className="variation-picker">
                <h4>Variantes</h4>
                {variations.map((item, index) => (
                  <button
                    key={item.name}
                    className="variation"
                    aria-pressed={variation + 1 === index}
                    onClick={() => {
                      setVariation(index - 1);
                      setStep(-1);
                    }}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.note}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="moves">
              <div className="moves-head">
                <span>Jugadas</span>
                <span>{steps.length} plies</span>
              </div>
              <div className="move-grid">
                {Array.from({ length: Math.ceil(steps.length / 2) }, (_, row) => {
                  const white = steps[row * 2];
                  const black = steps[row * 2 + 1];
                  return (
                    <div key={row} style={{ display: "contents" }}>
                      <span className="n">{row + 1}.</span>
                      {white && (
                        <button
                          aria-current={step === row * 2}
                          onClick={() => jump(row * 2)}
                        >
                          {white.san}
                        </button>
                      )}
                      {black ? (
                        <button
                          aria-current={step === row * 2 + 1}
                          onClick={() => jump(row * 2 + 1)}
                        >
                          {black.san}
                        </button>
                      ) : (
                        <span />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <p style={{ marginTop: 18, fontSize: 12.5, color: "var(--text-dim)" }}>
              Usa las flechas ← → del teclado para recorrer la línea. Los ejercicios se generan con
              las posiciones donde te toca mover.
            </p>

            {(chapter.plans ?? chapter.traps ?? chapter.sources) && (
              <div className="research">
                {chapter.plans && (
                  <>
                    <h4>Plan del blanco</h4>
                    <p>{chapter.plans.white}</p>
                    <h4>Plan del negro</h4>
                    <p>{chapter.plans.black}</p>
                  </>
                )}

                {chapter.traps?.map((trap) => (
                  <div key={trap.line}>
                    <h4>Trampa</h4>
                    <p>{trap.note}</p>
                    <p className="mono-line">{trap.line}</p>
                  </div>
                ))}

                {chapter.transpositions && chapter.transpositions.length > 0 && (
                  <>
                    <h4>Transposiciones</h4>
                    <ul>
                      {chapter.transpositions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {chapter.modelGames && chapter.modelGames.length > 0 && (
                  <>
                    <h4>Partidas de referencia</h4>
                    <ul>
                      {chapter.modelGames.map((game) => (
                        <li key={game.label}>
                          {game.label} <span className="research-src">— {game.source}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {chapter.sources && chapter.sources.length > 0 && (
                  <>
                    <h4>
                      Fuentes <span className="badge">{chapter.confidence ?? "F"}</span>
                    </h4>
                    <ul>
                      {chapter.sources.map((source) => (
                        <li key={`${source.kind}-${source.label}`}>
                          {source.url ? (
                            <a href={source.url} target="_blank" rel="noreferrer">
                              {source.label}
                            </a>
                          ) : (
                            source.label
                          )}{" "}
                          <span className="research-src">
                            {source.kind} · {source.checked}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {nextChapter && (
              <a
                className="btn"
                style={{ marginTop: 18, width: "100%", justifyContent: "center" }}
                href={`#/curso/${course.id}/${nextChapter.id}`}
              >
                Siguiente capítulo: {nextChapter.title}
              </a>
            )}
          </aside>
        </div>
      ) : (
        <div style={{ paddingBottom: 60 }}>
          <DrillRunner
            drills={drills}
            side={course.side}
            solvedKeys={solvedKeys}
            onSolved={(drill) => markSolved(chapter.id, `${drill.chapterId}:${drill.fen}`)}
          />
        </div>
      )}
    </div>
  );
}
