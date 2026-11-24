import { Chess } from "chess.js";
import { useEffect, useMemo, useState } from "react";
import { Board } from "../components/Board";
import { DrillRunner } from "../components/DrillRunner";
import { StepByStep } from "../components/StepByStep";
import type { Chapter, Course, StudyStep } from "../data/types";
import { chapterDrills, parseLine } from "../lib/chess";
import { explainMove, extractMoveIdea } from "../lib/explain";
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
  const [autoPlay, setAutoPlay] = useState(false);
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
  const contextNote = active?.note ?? chapter.idea;
  const specificIdea = lastMove ? extractMoveIdea(lastMove.san, contextNote) : null;
  const explanation = useMemo(
    () => (lastMove ? explainMove(beforeFen, lastMove.san, contextNote) : null),
    [beforeFen, lastMove, contextNote],
  );

  const drills = useMemo(() => chapterDrills(course, chapter), [course, chapter]);
  const solvedKeys = progress.chapters[chapter.id]?.solved ?? [];

  useEffect(() => {
    if (steps.length > 0 && step === steps.length - 1) markStudied(chapter.id);
  }, [step, steps.length, chapter.id, markStudied]);

  // Reproducción automática jugada a jugada.
  useEffect(() => {
    if (!autoPlay || tab !== "estudio") return;
    if (step >= steps.length - 1) {
      setAutoPlay(false);
      return;
    }
    const timer = setTimeout(() => {
      setStep((current) => {
        const next = current + 1;
        if (next >= steps.length - 1) {
          setAutoPlay(false);
          markStudied(chapter.id);
        }
        return Math.min(next, steps.length - 1);
      });
    }, 2800);
    return () => clearTimeout(timer);
  }, [autoPlay, step, steps.length, tab, chapter.id, markStudied]);

  // Navegación por teclado: flechas y barra espaciadora.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (tab !== "estudio") return;
      if (event.key === "ArrowRight") {
        setAutoPlay(false);
        setStep((current) => Math.min(current + 1, steps.length - 1));
      } else if (event.key === "ArrowLeft") {
        setAutoPlay(false);
        setStep((current) => Math.max(current - 1, -1));
      } else if (event.key === " " && event.target === document.body) {
        event.preventDefault();
        setAutoPlay((playing) => !playing);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, steps.length]);

  const jump = (index: number) => {
    setAutoPlay(false);
    setStep(index);
    if (index === steps.length - 1) markStudied(chapter.id);
  };

  const handleSelectVariation = (index: number) => {
    setAutoPlay(false);
    setVariation(index - 1);
    setStep(-1);
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

      <div className="lesson-header-row">
        <div>
          <p className="eyebrow">
            Capítulo {String(courseIndex + 1).padStart(2, "0")} · {drills.length} ejercicios
            {chapterState?.studied ? " · Estudiado" : ""}
          </p>
          <h1 className="lesson-title">{chapter.title}</h1>
        </div>

        <div className="tabs" role="tablist" aria-label="Modo de la lección">
          <button role="tab" aria-selected={tab === "estudio"} onClick={() => setTab("estudio")}>
            Estudio interactivo
          </button>
          <button role="tab" aria-selected={tab === "ejercicios"} onClick={() => setTab("ejercicios")}>
            Ejercicios ({drills.length})
          </button>
        </div>
      </div>

      {tab === "estudio" ? (
        <div className="study-flow">
          {/* Selector de línea: elegir una abre el tablero en su posición inicial. */}
          {variations.length > 1 && (
            <div className="line-selector-bar" role="group" aria-label="Selector de variante">
              <span className="line-selector-label">LÍNEA:</span>
              <div className="line-chips">
                {variations.map((item, index) => {
                  const isSelected = variation + 1 === index;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={`line-chip ${isSelected ? "active" : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectVariation(index)}
                    >
                      <span className="chip-indicator">{isSelected ? "[*]" : "[ ]"}</span>
                      <span className="chip-name">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="study-layout">
            <div className="study-board-col">
              <div className="board-frame">
                <Board
                  fen={fen}
                  orientation={course.side === "black" ? "black" : "white"}
                  lastMove={lastMove}
                />
              </div>

              <div className="board-bar">
                <button
                  className="btn"
                  onClick={() => { setAutoPlay(false); setStep(-1); }}
                  disabled={step < 0}
                  aria-label="Ir al inicio"
                  title="Posición inicial"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M2 3h2v10H2zm3 5l8 5V3z" />
                  </svg>
                </button>
                <button
                  className="btn"
                  onClick={() => { setAutoPlay(false); setStep((current) => Math.max(current - 1, -1)); }}
                  disabled={step < 0}
                  aria-label="Jugada anterior"
                  title="Jugada anterior (←)"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M10 3L4 8l6 5V3z" />
                  </svg>
                </button>
                <button
                  className={`btn ${autoPlay ? "btn-active-play" : ""}`}
                  onClick={() => {
                    if (step >= steps.length - 1) setStep(0);
                    setAutoPlay((playing) => !playing);
                  }}
                  title="Reproducción automática jugada a jugada (barra espaciadora)"
                >
                  <span>{autoPlay ? "[Pausa]" : "[Reproducir]"}</span>
                </button>
                <button
                  className="btn primary"
                  onClick={() => jump(Math.min(step + 1, steps.length - 1))}
                  disabled={step >= steps.length - 1}
                  title="Siguiente jugada (→)"
                >
                  <span>Siguiente jugada</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ marginLeft: 6 }}>
                    <path d="M6 3l6 5-6 5V3z" />
                  </svg>
                </button>
                <button
                  className="btn"
                  onClick={() => jump(steps.length - 1)}
                  disabled={step >= steps.length - 1}
                  aria-label="Ir al final"
                  title="Final de la línea"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M12 3h2v10h-2zM3 13l8-5-8-5v10z" />
                  </svg>
                </button>

                <span className="spacer" />
                <span className="badge" title="Flechas ← → para avanzar, barra espaciadora para reproducir">
                  {step + 1} / {steps.length}
                </span>
              </div>

              {/* Cinta de jugadas: cada botón salta a esa posición del tablero. */}
              <div className="moves-tape" role="group" aria-label="Línea de jugadas">
                <button
                  type="button"
                  className={`tape-btn ${step === -1 ? "active" : ""}`}
                  onClick={() => { setAutoPlay(false); setStep(-1); }}
                >
                  Inicio
                </button>
                {steps.map((s, idx) => {
                  const isWhite = idx % 2 === 0;
                  const moveNum = Math.floor(idx / 2) + 1;
                  return (
                    <button
                      key={`${idx}-${s.san}`}
                      type="button"
                      className={`tape-btn ${step === idx ? "active" : ""}`}
                      aria-current={step === idx}
                      onClick={() => jump(idx)}
                    >
                      {isWhite ? `${moveNum}.` : ""}
                      <span className="tape-san">{s.san}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Columna derecha: la explicación pertenece a la jugada visible. */}
            <div className="study-coach-col">
              {step < 0 ? (
                <div className="coach-card welcome">
                  <div className="coach-tag">LÍNEA SELECCIONADA</div>
                  <h3 className="coach-line-title">{active?.name ?? "Línea principal"}</h3>
                  <p className="coach-line-desc">{active?.note ?? chapter.idea}</p>
                  <div className="coach-actions">
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => setStep(0)}
                      disabled={steps.length === 0}
                    >
                      <span>Comenzar estudio paso a paso</span>
                      <span>[→]</span>
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => { setStep(0); setAutoPlay(true); }}
                      disabled={steps.length === 0}
                    >
                      <span>[Reproducir]</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="coach-card active-move">
                  <div className="coach-header">
                    <span className="coach-ply-num">
                      {Math.floor(step / 2) + 1}{step % 2 === 0 ? "." : "..."} <strong>{lastMove?.san}</strong>
                    </span>
                    <span className="coach-side-badge">
                      {step % 2 === 0 ? "Blancas" : "Negras"} · Jugada {step + 1} de {steps.length}
                    </span>
                  </div>

                  {specificIdea && (
                    <div className="coach-specific-idea">
                      <span className="idea-marker">IDEA:</span> {specificIdea}
                    </div>
                  )}

                  <StepByStep
                    explanation={explanation}
                    empty="Analizando jugada..."
                    defaultAll
                    hideControls
                  />

                  <div className="coach-footer-nav">
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => { setAutoPlay(false); setStep((current) => Math.max(current - 1, -1)); }}
                      disabled={step < 0}
                    >
                      [←] Anterior
                    </button>
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => jump(Math.min(step + 1, steps.length - 1))}
                      disabled={step >= steps.length - 1}
                    >
                      <span>{step >= steps.length - 1 ? "Fin de línea" : "Siguiente jugada"}</span> [→]
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Teoría de fondo, fuera del flujo principal. */}
          {(chapter.plans ?? chapter.traps ?? chapter.sources ?? chapter.transpositions ?? chapter.modelGames) && (
            <details className="theory-drawer">
              <summary className="theory-summary">
                <span>[+] Ver planes estratégicos, trampas y fuentes teóricas</span>
              </summary>
              <div className="theory-body">
                {chapter.plans && (
                  <div className="theory-block">
                    <h4>Plan del blanco</h4>
                    <p>{chapter.plans.white}</p>
                    <h4 style={{ marginTop: 12 }}>Plan del negro</h4>
                    <p>{chapter.plans.black}</p>
                  </div>
                )}

                {chapter.traps && chapter.traps.length > 0 && (
                  <div className="theory-block">
                    <h4>Trampas tácticas</h4>
                    {chapter.traps.map((trap) => (
                      <div key={trap.line} style={{ marginBottom: 10 }}>
                        <p>{trap.note}</p>
                        <code className="mono-line">{trap.line}</code>
                      </div>
                    ))}
                  </div>
                )}

                {chapter.transpositions && chapter.transpositions.length > 0 && (
                  <div className="theory-block">
                    <h4>Transposiciones</h4>
                    <ul>
                      {chapter.transpositions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {chapter.modelGames && chapter.modelGames.length > 0 && (
                  <div className="theory-block">
                    <h4>Partidas de referencia</h4>
                    <ul>
                      {chapter.modelGames.map((game) => (
                        <li key={game.label}>
                          {game.label} <span className="research-src">— {game.source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {chapter.sources && chapter.sources.length > 0 && (
                  <div className="theory-block">
                    <h4>Fuentes teóricas y verificación ({chapter.confidence ?? "C"})</h4>
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
                  </div>
                )}
              </div>
            </details>
          )}

          {nextChapter && (
            <div style={{ marginTop: 24, textAlign: "right" }}>
              <a className="btn" href={`#/curso/${course.id}/${nextChapter.id}`}>
                Siguiente capítulo: {nextChapter.title} [→]
              </a>
            </div>
          )}
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
