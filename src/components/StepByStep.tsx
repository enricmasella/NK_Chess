import { useEffect, useState } from "react";
import type { MoveExplanation } from "../lib/explain";

interface StepByStepProps {
  explanation: MoveExplanation | null;
  /** Aviso cuando todavía no hay jugada que explicar. */
  empty?: string;
  /** Revelar todas las fases por defecto para lectura fluida. */
  defaultAll?: boolean;
  /** Ocultar controles internos de revelar fases cuando el contenedor ya maneja la navegación. */
  hideControls?: boolean;
}

/**
 * Recorre la explicación de una jugada de uno en uno o en modo completo.
 * El avance es deliberado: cada paso se lee antes de pasar al siguiente,
 * que es la condición que hace útil la autoexplicación (de Bruin, Rikers y
 * Schmidt, 2007).
 */
export function StepByStep({
  explanation,
  empty,
  defaultAll = true,
  hideControls = false,
}: StepByStepProps) {
  const [revealed, setRevealed] = useState(defaultAll ? 4 : 1);
  const [playing, setPlaying] = useState(false);

  const signature = explanation ? `${explanation.san}:${explanation.steps.length}` : "";

  useEffect(() => {
    setRevealed(defaultAll ? (explanation?.steps.length ?? 4) : 1);
    setPlaying(false);
  }, [signature, defaultAll]);

  useEffect(() => {
    if (!playing || !explanation) return;
    if (revealed >= explanation.steps.length) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setRevealed((current) => current + 1), 1600);
    return () => clearTimeout(timer);
  }, [playing, revealed, explanation]);

  if (!explanation) {
    return <p className="steps-empty">{empty ?? "Avanza una jugada para ver su explicación paso a paso."}</p>;
  }

  const total = explanation.steps.length;
  const atEnd = revealed >= total;

  return (
    <div className="steps">
      <div className="steps-head">
        <span className="steps-method">MÉTODO DE GROOT · 4 FASES</span>
        <span className="steps-move">
          {explanation.side} · {explanation.san}
        </span>
      </div>

      <ol className="steps-list">
        {explanation.steps.map((step, index) => {
          const visible = index < revealed;
          const current = index === revealed - 1;
          return (
            <li key={step.phase} className={`step ${visible ? "visible" : "pending"} ${current ? "current" : ""}`}>
              <span className="step-label">{step.label}</span>
              {visible ? (
                <p className="step-text">{step.text}</p>
              ) : (
                <p className="step-text step-hidden">paso pendiente</p>
              )}
            </li>
          );
        })}
      </ol>

      {!hideControls && (
        <div className="steps-controls">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              setPlaying(false);
              setRevealed((current) => Math.max(1, current - 1));
            }}
            disabled={revealed <= 1}
          >
            [←] Anterior
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setPlaying((current) => !current)}
            disabled={atEnd && !playing}
          >
            {playing ? "[ ] Pausa" : "[>] Reproducir"}
          </button>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              setPlaying(false);
              setRevealed((current) => Math.min(total, current + 1));
            }}
            disabled={atEnd}
          >
            Siguiente [→]
          </button>
          <span className="steps-count">
            {revealed} / {total}
          </span>
        </div>
      )}
    </div>
  );
}
