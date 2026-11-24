import { useState } from "react";
import { AsciiSculpture } from "../components/AsciiSculpture";
import { COURSES, LEARNING_PATHS } from "../data";
import { useProgress, courseProgress } from "../lib/progress";

const LEVEL_TEXT: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

// Protocolos destacados para el flujo editorial
const FEATURED_IDS = ["fried-liver", "dutch-gotham", "smith-morra", "vienna", "sicilian-dragon", "ruy-lopez"];

interface BoardStudy {
  id: string;
  name: string;
  moves: string[];
  evalScore: string;
  commentary: string;
  boardAscii: string[];
}

const DEFAULT_STUDY: BoardStudy = {
  id: "dragon",
  name: "SICILIANA DRAGÓN",
  moves: ["1.e4", "c5", "2.Nf3", "d6", "3.d4", "cxd4", "4.Nxd4", "Nf6", "5.Nc3", "g6"],
  evalScore: "= (0.15)",
  commentary: "El fianchetto en g7 desata el Dragón. La diagonal h8-a1 apunta directamente al flanco de dama blanco.",
  boardAscii: [
    "  +---+---+---+---+---+---+---+---+",
    "8 | r | . | b | q | k | . | . | r |",
    "7 | p | p | . | . | p | p | b | p |  <-- DRAGÓN: Alfil activo en g7",
    "6 | . | . | n | p | . | n | p | . |      Tensión máxima en el centro",
    "5 | . | . | . | . | . | . | . | . |      Presión en la columna c",
    "4 | . | . | B | P | P | . | . | . |",
    "3 | . | . | N | . | . | N | . | . |",
    "2 | P | P | P | . | . | P | P | P |",
    "1 | R | . | B | Q | K | . | . | R |",
    "  +---+---+---+---+---+---+---+---+",
    "    a   b   c   d   e   f   g   h  ",
  ],
};

const TACTICAL_STUDIES: Record<string, BoardStudy> = {
  dragon: DEFAULT_STUDY,
  fried: {
    id: "fried",
    name: "ATAQUE FRIED LIVER",
    moves: ["1.e4", "e5", "2.Nf3", "Nc6", "3.Bc4", "Nf6", "4.Ng5", "d5", "5.exd5", "Nxd5", "6.Nxf7!"],
    evalScore: "+1.65 (Stockfish 16.1)",
    commentary: "El sacrificio de caballo en f7 destrona al rey negro. La dama y el alfil coordinan una cacería decisiva.",
    boardAscii: [
      "  +---+---+---+---+---+---+---+---+",
      "8 | r | . | b | q | . | . | . | r |",
      "7 | p | p | p | . | . | k | p | p |  <-- REY EXPUESTO EN f7 TRAS 6.Nxf7!",
      "6 | . | . | . | . | . | . | . | . |      Ataque fulgurante con Df3+",
      "5 | . | . | b | . | p | . | . | . |      Iniciativa táctica arrolladora",
      "4 | . | . | B | . | . | . | . | . |",
      "3 | . | . | . | . | . | Q | . | . |",
      "2 | P | P | P | P | . | P | P | P |",
      "1 | R | N | B | . | K | . | . | R |",
      "  +---+---+---+---+---+---+---+---+",
      "    a   b   c   d   e   f   g   h  ",
    ],
  },
  vienna: {
    id: "vienna",
    name: "GAMBITO VIENA",
    moves: ["1.e4", "e5", "2.Nc3", "Nf6", "3.f4", "d5", "4.fxe5", "Nxe4"],
    evalScore: "+0.80 (Stockfish 16.1)",
    commentary: "El golpe 3.f4 demuele la estructura negra. El caballo blanco en c3 apuntala el centro mientras se abre la columna f.",
    boardAscii: [
      "  +---+---+---+---+---+---+---+---+",
      "8 | r | n | b | q | k | b | . | r |",
      "7 | p | p | p | . | . | p | p | p |  <-- 3.f4 DESAFÍA EL CENTRO",
      "6 | . | . | . | . | . | . | . | . |      Columna f semiabierta para la torre",
      "5 | . | . | . | p | . | . | . | . |      Desarrollo dinámico acelerado",
      "4 | . | . | . | . | P | P | . | . |",
      "3 | . | . | N | . | . | . | . | . |",
      "2 | P | P | P | P | . | . | P | P |",
      "1 | R | . | B | Q | K | B | N | R |",
      "  +---+---+---+---+---+---+---+---+",
      "    a   b   c   d   e   f   g   h  ",
    ],
  },
};

export function Home() {
  const { progress } = useProgress();
  const [activeStudy, setActiveStudy] = useState<string>("dragon");
  const [stepIndex, setStepIndex] = useState<number>(3);

  const study = TACTICAL_STUDIES[activeStudy] ?? DEFAULT_STUDY;
  const featuredCourses = COURSES.filter((c) => FEATURED_IDS.includes(c.id));

  return (
    <div className="stream-canvas">
      {/* Ticker Superior de Telemetría */}
      <div className="cyber-ticker">
        <span className="ticker-badge">[LIVE]</span>
        <span>
          NK_CHESS // 73 REPERTORIOS VERIFICADOS · MOTOR STOCKFISH 16.1 (PROFUNDIDAD 35) ·
          SIN VÍDEOS · ENTRENAMIENTO ACTIVO INTERACTIVO · ARQUITECTURA MONOCROMO
        </span>
      </div>

      <div className="wrap stream-flow">
        {/* ====================================================================
            BLOQUE 1: BRAND IDENTITY & HERO MANIFESTO (FLUIDO, SIN CORTE)
            ==================================================================== */}
        <div className="flow-block hero-flow">
          <div className="stream-spine-marker">01 // BRAND IDENT</div>

          <div className="hero-columns">
            <div className="hero-typography">
              <div className="hero-tag">
                <span className="bracket">[</span>
                <span>SISTEMA DE PRECISIÓN TÁCTICA</span>
                <span className="bracket">]</span>
              </div>

              <h1 className="hero-title">
                THE ARCHITECTURE <br />
                <span className="glitch-text" data-text="OF SILENCE.">
                  OF SILENCE.
                </span>
              </h1>

              <p className="hero-lede">
                Aprende ajedrez como se domina un lenguaje: <strong>decidiendo</strong>. Sin vídeos
                de 40 minutos ni explicaciones pasivas. 73 repertorios completos analizados jugada a
                jugada con Stockfish 16.1 donde cada imprecisión se refuta al instante.
              </p>

              <div className="hero-actions">
                <a href="#/cursos" className="btn-awwwards primary">
                  <span>EXPLORAR 73 CURSOS</span>
                  <svg viewBox="0 0 10 10" fill="none" className="arrow-icon" aria-hidden="true">
                    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
                <a href="#/train" className="btn-awwwards secondary">
                  <span>MODO ENTRENAMIENTO</span>
                </a>
                <a href="#/terminal" className="btn-awwwards text-btn">
                  <span>[TERMINAL TÁCTICA]</span>
                </a>
              </div>

              <div className="telemetry-bar">
                <div className="telemetry-cell">
                  <span className="t-label">REPERTORIOS</span>
                  <span className="t-val">73</span>
                </div>
                <div className="t-divider">/</div>
                <div className="telemetry-cell">
                  <span className="t-label">CAPÍTULOS</span>
                  <span className="t-val">181</span>
                </div>
                <div className="t-divider">/</div>
                <div className="telemetry-cell">
                  <span className="t-label">PLIES VERIFICADOS</span>
                  <span className="t-val">3.976</span>
                </div>
                <div className="t-divider">/</div>
                <div className="telemetry-cell">
                  <span className="t-label">MOTOR</span>
                  <span className="t-val">STOCKFISH 16.1</span>
                </div>
              </div>
            </div>

            {/* Visualizador 3D ASCII Monocromo */}
            <div className="hero-sculpture-col">
              <div className="visual-frame">
                <div className="corner-mark top-left">+</div>
                <div className="corner-mark top-right">+</div>
                <div className="corner-mark bottom-left">+</div>
                <div className="corner-mark bottom-right">+</div>
                <AsciiSculpture width={44} height={22} />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            BLOQUE 2: FLUJO NARRATIVO EDITORIAL & DUELO TÁCTICO INTERACTIVO
            ==================================================================== */}
        <div className="flow-block tactical-flow">
          <div className="stream-spine-marker">02 // ESTUDIO TÁCTICO INTERACTIVO</div>

          <div className="tactical-layout">
            <div className="tactical-copy">
              <span className="mono-sub">// EL ERROR DE MIRAR EN VEZ DE CALCULAR</span>
              <h2 className="tactical-headline">
                "LA ATENCIÓN NO SE PIDE.
                <br />
                SE TOMA EN EL TABLERO."
              </h2>
              <p>
                Ver a un Gran Maestro jugar en YouTube produce una falsa sensación de entendimiento:
                parece fácil porque él ya resolvió la tensión por ti. Pero al sentarte a jugar, tu
                cerebro no tiene memoria muscular.
              </p>
              <p>
                En <strong>NK_CHESS</strong> cada capítulo es un estudio activo. Mueves la pieza,
                evalúas la réplica del rival y entiendes el porqué de cada casilla. Si fallas, el
                sistema no te juzga: te enseña la refutación exacta.
              </p>
              <div className="tactical-quote">
                "Una casilla cedida es territorio que jamás podrás volver a reclamar."
              </div>
            </div>

            {/* Consola Interactiva del Estudio */}
            <div className="tactical-widget-box card-aw">
              <div className="widget-header">
                <span className="widget-tag">// ESTUDIO TÁCTICO // STOCKFISH 16.1</span>
                <div className="study-tabs">
                  {Object.values(TACTICAL_STUDIES).map((s) => (
                    <button
                      key={s.id}
                      className={`s-tab ${activeStudy === s.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveStudy(s.id);
                        setStepIndex(3);
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tablero ASCII reactivo */}
              <pre className="ascii-board-display">
                {study.boardAscii.join("\n")}
              </pre>

              {/* Línea de jugadas interactiva */}
              <div className="study-moves-track">
                <span className="track-label">LÍNEA TEÓRICA:</span>
                <div className="moves-chip-list">
                  {study.moves.map((move, idx) => (
                    <button
                      key={idx}
                      className={`move-chip ${idx === stepIndex ? "current" : ""}`}
                      onClick={() => setStepIndex(idx)}
                      title={`Ver posición tras ${move}`}
                    >
                      {move}
                    </button>
                  ))}
                </div>
              </div>

              <div className="widget-footer">
                <div className="eval-pill">
                  <span className="eval-dot" />
                  <span>EVAL: {study.evalScore}</span>
                </div>
                <span className="commentary-text">{study.commentary}</span>
                <a href="#/cursos" className="study-link">
                  <span>ESTUDIAR CURSO COMPLETO</span>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 3l6 5-6 5V3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            BLOQUE 3: PROTOCOLOS EMBLEMÁTICOS (BLOQUE 1: 1.e4 Y LÍNEAS MAESTRAS)
            ==================================================================== */}
        <div className="flow-block catalog-flow">
          <div className="stream-spine-marker">03 // PROTOCOLOS SELECCIONADOS</div>

          <div className="flow-header">
            <div>
              <span className="mono-sub">// REPERTORIOS CRÍTICOS</span>
              <h2 className="flow-title">BLOQUE 1: LÍNEAS MAESTRAS Y 1.e4</h2>
            </div>
            <a href="#/cursos" className="see-more-link">
              <span>VER CATÁLOGO COMPLETO (73 PROTOCOLOS)</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 3l6 5-6 5V3z" />
              </svg>
            </a>
          </div>

          <div className="grid">
            {featuredCourses.map((course) => {
              const percent = courseProgress(
                progress,
                course.chapters.map((ch) => ch.id),
              );
              return (
                <a className="card card-aw" key={course.id} href={`#/curso/${course.id}`}>
                  <div className="card-top">
                    <span>
                      {course.category === "white"
                        ? "Blancas"
                        : course.category === "black"
                          ? "Negras"
                          : "Habilidades"}
                    </span>
                    <span className="dot" />
                    <span>
                      {course.stage === "endgame"
                        ? "Final"
                        : course.stage === "middlegame"
                          ? "Medio juego"
                          : "Apertura"}
                    </span>
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
        </div>

        {/* ====================================================================
            BLOQUE 4: RUTAS DE APRENDIZAJE ESTRUCTURADAS
            ==================================================================== */}
        <div className="flow-block paths-flow">
          <div className="stream-spine-marker">04 // RUTAS DE APRENDIZAJE</div>

          <div className="flow-header">
            <div>
              <span className="mono-sub">// PLANES DE ESTUDIO INTEGRADOS</span>
              <h2 className="flow-title">MATRICES DE MAESTRÍA</h2>
            </div>
            <span className="mono-label">[4 REPERTORIOS COMPLETOS]</span>
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
                <div className="card-foot" style={{ marginTop: "1.2rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    {path.courseIds.length} PROTOCOLOS VINCULADOS
                  </span>
                  <a href="#/cursos" className="inline-arrow-link">
                    <span>INICIAR RUTA</span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 3l6 5-6 5V3z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================================
            BLOQUE 5: LOS CUATRO MANDAMIENTOS DE NK_CHESS (MARCA)
            ==================================================================== */}
        <div className="flow-block brand-flow">
          <div className="stream-spine-marker">05 // CÓDIGO DE MARCA</div>

          <div className="flow-header">
            <div>
              <span className="mono-sub">// IDENTIDAD Y PRECISIÓN</span>
              <h2 className="flow-title">LOS CUATRO PILARES DE NK_CHESS</h2>
            </div>
          </div>

          <div className="principles-grid">
            <div className="principle-card card-aw">
              <span className="principle-num">01</span>
              <div className="corner-mark top-right">+</div>
              <h3>CÁLCULO ACTIVO</h3>
              <p>
                La memoria pasiva de ver vídeos se olvida a los tres días. El cálculo activo
                interactivo en el tablero fija patrones indelebles en la corteza cognitiva.
              </p>
            </div>
            <div className="principle-card card-aw">
              <span className="principle-num">02</span>
              <div className="corner-mark top-right">+</div>
              <h3>CERTIFICACIÓN STOCKFISH 16.1</h3>
              <p>
                Cada variante y ejercicio ha sido verificado con el motor de referencia mundial a
                profundidad de torneo. Cero jugadas dudosas o recomendaciones engañosas.
              </p>
            </div>
            <div className="principle-card card-aw">
              <span className="principle-num">03</span>
              <div className="corner-mark top-right">+</div>
              <h3>MONOCROMO Y CERO RUIDO</h3>
              <p>
                Sin puntos de colores que distraen ni ludificación barata. Sólo la geometría desnuda
                de 64 casillas, las piezas de alta definición y tu razonamiento táctico.
              </p>
            </div>
            <div className="principle-card card-aw">
              <span className="principle-num">04</span>
              <div className="corner-mark top-right">+</div>
              <h3>DOMINIO DEL REPERTORIO</h3>
              <p>
                73 protocolos completos diseñados para que sepas exactamente qué responder en cada
                fase de la partida: desde la primera jugada hasta el final de torres.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================================
            BLOQUE 6: LANZADERA FINAL DE LA MARCA
            ==================================================================== */}
        <div className="flow-block footer-flow">
          <div className="banner-box card-aw">
            <div className="corner-mark top-left">+</div>
            <div className="corner-mark top-right">+</div>
            <div className="corner-mark bottom-left">+</div>
            <div className="corner-mark bottom-right">+</div>

            <pre className="banner-ascii">
{`
 _   _ _  __     ____ _                     
| \ | | |/ /    / ___| |__   ___  ___ ___   
|  \| | ' /    | |   | '_ \ / _ \/ __/ __|  
| |\  | . \    | |___| | | |  __/\__ \__ \  
|_| \_|_|\_\    \____|_| |_|\___||___/___/  
              [SYSTEM_STATUS: ONLINE]
`}
            </pre>

            <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.6rem", fontSize: "15px" }}>
                Comienza ahora tu entrenamiento táctico con el catálogo completo de repertorios.
              </p>
              <a href="#/cursos" className="btn-awwwards primary" style={{ display: "inline-flex" }}>
                <span>ACCEDER AL CATÁLOGO (73 CURSOS)</span>
                <svg viewBox="0 0 10 10" fill="none" className="arrow-icon" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
