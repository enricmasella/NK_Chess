import { useState, useRef, useEffect } from "react";
import { COURSES, STATS } from "../data";

interface HistoryItem {
  cmd: string;
  output: string | React.ReactNode;
}

export function TerminalView() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      cmd: "sys.init",
      output: (
        <div>
          <div>========================================================================</div>
          <div>NK_CHESS PROTOCOL KERNEL // BUILD 2026.11.08</div>
          <div>AUTHENTICATION: GUEST [CLEARANCE_LEVEL: MAXIMUM]</div>
          <div>TELEMETRY: 41.3879° N, 002.1699° E | STOCKFISH_V16.1 READY</div>
          <div>========================================================================</div>
          <div style={{ marginTop: 8 }}>Escribe <span style={{ color: "#ffffff", fontWeight: "bold" }}>help</span> para listar los comandos disponibles.</div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = input.trim();
    if (!clean) return;

    const parts = clean.toLowerCase().split(" ");
    const cmd = parts[0];

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "4px 12px" }}>
            <span style={{ color: "var(--text)" }}>help</span>
            <span style={{ color: "var(--text-muted)" }}>Muestra esta lista de comandos de diagnóstico.</span>
            <span style={{ color: "var(--text)" }}>courses</span>
            <span style={{ color: "var(--text-muted)" }}>Muestra estadísticas y muestras del catálogo.</span>
            <span style={{ color: "var(--text)" }}>status</span>
            <span style={{ color: "var(--text-muted)" }}>Estado de motor, memoria y subsistemas.</span>
            <span style={{ color: "var(--text)" }}>random</span>
            <span style={{ color: "var(--text-muted)" }}>Genera una recomendación de estudio aleatoria.</span>
            <span style={{ color: "var(--text)" }}>clear</span>
            <span style={{ color: "var(--text-muted)" }}>Limpia el buffer de la terminal.</span>
            <span style={{ color: "var(--text)" }}>exit</span>
            <span style={{ color: "var(--text-muted)" }}>Regresa a la base de operaciones (home).</span>
          </div>
        );
        break;

      case "courses":
        output = (
          <div>
            <div>[SYS_CATALOGUE] Total cursos: {STATS.courses} | Capítulos: {STATS.chapters}</div>
            <div style={{ marginTop: 6 }}>
              {COURSES.slice(0, 6).map((c) => (
                <div key={c.id}>
                  • <a href={`#/curso/${c.id}`} style={{ textDecoration: "underline" }}>{c.name}</a> [{c.elo} - {c.stage}]
                </div>
              ))}
              <div style={{ opacity: 0.6, marginTop: 4 }}>...y 67 protocolos adicionales en `#/cursos`</div>
            </div>
          </div>
        );
        break;

      case "status":
        output = (
          <div>
            <div>ENGINE_CORE: Stockfish 16.1 WASM (Active)</div>
            <div>VERIFIED_LINES: {STATS.lines} (100% engine proofed)</div>
            <div>LATENCY: 14ms (Local deterministic evaluation)</div>
            <div>MEMORY_SYNC: C:\Users\enrad\.omo\memory (Connected)</div>
            <div>UI_RENDERER: Brutalist Monospace ASCII Engine</div>
          </div>
        );
        break;

      case "random": {
        const rand = COURSES[Math.floor(Math.random() * COURSES.length)];
        if (!rand) return;
        output = (
          <div>
            <div>OBJETIVO TÁCTICO RECOMENDADO:</div>
            <div style={{ color: "var(--text)", fontWeight: "bold" }}>{rand.name}</div>
            <div style={{ color: "var(--text-muted)" }}>{rand.summary}</div>
            <div style={{ marginTop: 6 }}>
              <a href={`#/curso/${rand.id}`} className="btn" style={{ display: "inline-block", padding: "4px 10px", border: "1px solid var(--text)" }}>
                INICIAR ESTUDIO [{rand.id}] →
              </a>
            </div>
          </div>
        );
        break;
      }

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        window.location.hash = "#/";
        return;

      default:
        output = (
          <div style={{ color: "#ff5555" }}>
            Comando no reconocido: "{clean}". Escribe `help` para ver comandos válidos.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: clean, output }]);
    setInput("");
  };

  return (
    <div className="wrap page terminal-page" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
      <div style={{ border: "1px solid var(--line-strong)", background: "#050505", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            TERMINAL // NK_CHESS_KERNEL_V2.0
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#55ff55" }}>
            ● ONLINE
          </span>
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", minHeight: "360px", overflowY: "auto" }}>
          {history.map((h, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <div style={{ color: "var(--text-muted)" }}>
                guest@nk-chess:~$ <span style={{ color: "#ffffff" }}>{h.cmd}</span>
              </div>
              <div style={{ marginTop: "4px", color: "var(--text)", lineHeight: 1.6 }}>{h.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleCommand} style={{ display: "flex", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: "0.75rem", marginTop: "1rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#55ff55", marginRight: "8px" }}>
            guest@nk-chess:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              outline: "none",
            }}
            autoFocus
            placeholder="Escribe un comando..."
          />
        </form>
      </div>
    </div>
  );
}
