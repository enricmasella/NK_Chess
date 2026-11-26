import { useState } from "react";
import type { MoveExplanation } from "../lib/explain";

interface StepByStepProps {
  explanation: MoveExplanation | null;
  /** Aviso cuando todavía no hay jugada que explicar. */
  empty?: string;
  /** Revelar todas las fases de de Groot por defecto si se abren (compatibilidad). */
  defaultAll?: boolean;
  /** Si debe mostrar abiertas las 4 fases de de Groot por defecto (default: false). */
  defaultOpenPhases?: boolean;
  /** Ocultar controles internos de revelar fases cuando el contenedor ya maneja la navegación. */
  hideControls?: boolean;
}

/**
 * Explicación didáctica y directa de una jugada.
 * Muestra el propósito ajedrecístico, la acción física y las amenazas directas
 * de forma intuitiva, con el protocolo de 4 fases de de Groot disponible en un
 * desplegable técnico para evitar sobrecargar al estudiante con texto repetitivo.
 */
export function StepByStep({
  explanation,
  empty,
  defaultOpenPhases = false,
}: StepByStepProps) {
  const [showPhases, setShowPhases] = useState(defaultOpenPhases);

  if (!explanation) {
    return <p className="steps-empty">{empty ?? "Avanza una jugada para ver su explicación."}</p>;
  }

  const sideLabel = explanation.side === "blancas" ? "BLANCAS" : "NEGRAS";

  return (
    <div className="move-card">
      <div className="move-card-header">
        <div className="move-tag">
          <span className="move-san">{explanation.san}</span>
          <span className="move-coords">{explanation.from} &rarr; {explanation.to}</span>
        </div>
        <span className="move-side-badge">{sideLabel}</span>
      </div>

      {/* Idea didáctica principal */}
      <div className="move-purpose-box">
        <span className="move-box-label">[ IDEA CLAVE ]</span>
        <p className="move-purpose-text">{explanation.purpose}</p>
      </div>

      {/* Acción en el tablero y táctica */}
      <div className="move-details-grid">
        <div className="move-detail-item">
          <span className="move-detail-title">EN EL TABLERO</span>
          <p className="move-detail-desc">{explanation.boardAction}</p>
        </div>

        {explanation.tactics && explanation.tactics.length > 0 && (
          <div className="move-detail-item">
            <span className="move-detail-title">AMENAZA Y CONTROL</span>
            <ul className="move-tactics-list">
              {explanation.tactics.map((tac, idx) => (
                <li key={idx}>{tac}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Protocolo técnico de 4 fases de de Groot opcional */}
      <div className="technical-phases-drawer">
        <button
          type="button"
          className="technical-phases-toggle"
          onClick={() => setShowPhases((prev) => !prev)}
          aria-expanded={showPhases}
        >
          <span>{showPhases ? "[-] Ocultar análisis técnico" : "[+] Ver desglose técnico (4 fases de de Groot)"}</span>
        </button>

        {showPhases && (
          <ol className="steps-list" style={{ marginTop: 10 }}>
            {explanation.steps.map((step) => (
              <li key={step.phase} className="step visible">
                <span className="step-label">{step.label}</span>
                <p className="step-text">{step.text}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
