import { Chess } from "chess.js";
import { useEffect, useMemo, useState } from "react";
import { Board } from "./Board";
import type { Drill, Side } from "../data/types";

interface DrillRunnerProps {
  drills: Drill[];
  side?: Side | null;
  onSolved?: (drill: Drill) => void;
  solvedKeys?: string[];
}

const strip = (san: string) => san.replace(/[+#!?]/g, "");

export function DrillRunner({ drills, side = null, onSolved, solvedKeys = [] }: DrillRunnerProps) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "good" | "bad" | "shown">("idle");
  const [attempt, setAttempt] = useState<string | null>(null);
  const [hint, setHint] = useState<string | undefined>();

  const drill = drills[index];
  const orientation = side === "black" ? "black" : "white";
  const key = useMemo(() => (drill ? `${drill.chapterId}:${drill.fen}` : ""), [drill]);
  const solvedSignature = solvedKeys.join("|");

  useEffect(() => {
    setStatus(solvedSignature.split("|").includes(key) ? "good" : "idle");
    setAttempt(null);
    setHint(undefined);
  }, [key, solvedSignature]);

  if (!drill) {
    return <div className="empty">No hay ejercicios disponibles para este capítulo.</div>;
  }

  const solve = (from: string, to: string, promotion?: string) => {
    const chess = new Chess(drill.fen);
    let san: string;
    try {
      san = chess.move({ from, to, promotion: promotion ?? "q" }).san;
    } catch {
      return;
    }
    setAttempt(san);
    if (strip(san) === strip(drill.answer)) {
      setStatus("good");
      onSolved?.(drill);
    } else {
      setStatus("bad");
    }
  };

  const next = () => {
    setIndex((current) => (current + 1) % drills.length);
    setStatus("idle");
    setAttempt(null);
    setHint(undefined);
  };

  const solved = drills.filter((item) => solvedKeys.includes(`${item.chapterId}:${item.fen}`)).length;

  return (
    <div className="two-col">
      <div>
        <div className="board-frame">
          <Board
            fen={drill.fen}
            orientation={orientation}
            interactive={status === "idle" || status === "bad"}
            onMove={(from, to, promotion) => solve(from, to, promotion)}
            hintSquare={hint}
          />
        </div>
        <div className="board-bar">
          <span className="badge">
            {index + 1} / {drills.length}
          </span>
          <span className="badge">{solved} resueltos</span>
          <span className="spacer" />
          <button className="btn ghost" onClick={() => setHint(findHint(drill))} disabled={status === "good"}>
            Pista
          </button>
          <button
            className="btn"
            onClick={() => {
              setStatus("shown");
              setHint(undefined);
            }}
            disabled={status === "good" || status === "shown"}
          >
            Ver solución
          </button>
          <button className="btn primary" onClick={next}>
            Siguiente
          </button>
        </div>
      </div>

      <aside className="panel">
        <h4>{`Ejercicio · ${drill.chapterTitle}`}</h4>
        <p className="drill-prompt" style={{ marginBottom: 12 }}>
          {orientation === "black" ? "Juegan negras" : "Juegan blancas"} · {drill.label}
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
          Encuentra la jugada del repertorio. Mueve la pieza en el tablero; el ejercicio se corrige al
          instante.
        </p>

        <div style={{ marginTop: 16 }} className="drill-state">
          {status === "good" && (
            <div className="drill-feedback good">
              Correcto: <strong>{drill.answer}</strong>. Esta jugada es la que sostiene el plan del curso.
            </div>
          )}
          {status === "bad" && (
            <div className="drill-feedback bad">
              Has jugado {attempt}. No es la jugada del repertorio: vuelve a intentarlo o pide una pista.
            </div>
          )}
          {status === "shown" && (
            <div className="drill-feedback">
              La jugada correcta es <strong>{drill.answer}</strong>. Repítela en el tablero la próxima vez.
            </div>
          )}
          {status === "shown" && <span className="solution-pill">{drill.answer}</span>}
        </div>
      </aside>
    </div>
  );
}

function findHint(drill: Drill): string {
  const chess = new Chess(drill.fen);
  const move = chess.moves({ verbose: true }).find((candidate) => strip(candidate.san) === strip(drill.answer));
  return move ? move.from : "";
}
