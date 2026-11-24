import { useEffect, useMemo, useState } from "react";
import { Chess } from "chess.js";
import { Board } from "../components/Board";
import { StepByStep } from "../components/StepByStep";
import { explainMove, type MoveExplanation } from "../lib/explain";
import {
  BOTS,
  type BotProfile,
  getBotMove,
  analyzeLiveMove,
  type LiveCorrectionResult,
} from "../lib/chessEngine";
import {
  MultiplayerClient,
  type MultiplayerGameState,
} from "../lib/multiplayer";
import type { Side } from "../data/types";

type PlayMode = "bots" | "online" | "coach";

export function PlayView() {
  const [mode, setMode] = useState<PlayMode>("bots");

  // Configuración de partida
  const [selectedBot, setSelectedBot] = useState<BotProfile>(BOTS[0]!);
  const [userSide, setUserSide] = useState<Side>("white");
  const [timeLimitMin, setTimeLimitMin] = useState<number>(10);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Estado del ajedrez
  const [fen, setFen] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [history, setHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [gameOverReason, setGameOverReason] = useState<string | null>(null);

  // Relojes
  const [whiteClock, setWhiteClock] = useState<number>(600);
  const [blackClock, setBlackClock] = useState<number>(600);

  // Live Coaching
  const [liveCoachEnabled, setLiveCoachEnabled] = useState<boolean>(true);
  const [latestCorrection, setLatestCorrection] = useState<LiveCorrectionResult | null>(null);
  const [showCoachArrow, setShowCoachArrow] = useState<boolean>(true);
  const [moveExplanation, setMoveExplanation] = useState<MoveExplanation | null>(null);

  // Multiplayer
  const [mpClient] = useState(() => new MultiplayerClient());
  const [mpRoomInput, setMpRoomInput] = useState<string>("");
  const [mpState, setMpState] = useState<MultiplayerGameState | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const chess = useMemo(() => new Chess(fen), [fen]);

  // Manejo de suscripción multijugador
  useEffect(() => {
    const unsub = mpClient.subscribe((state) => {
      setMpState(state);
      setFen(state.fen);
      setHistory(state.history);
      setLastMove(state.lastMove);
      if (state.status !== "active" && state.status !== "waiting") {
        setGameOverReason(`Fin de partida: ${state.status} (Ganador: ${state.winner || "Tablas"})`);
      }
    });
    return () => unsub();
  }, [mpClient]);

  // Reloj regresivo
  useEffect(() => {
    if (!isPlaying || gameOverReason) return;
    const interval = setInterval(() => {
      if (chess.turn() === "w") {
        setWhiteClock((prev) => {
          if (prev <= 1) {
            setGameOverReason("Tiempo agotado: Negras ganan");
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackClock((prev) => {
          if (prev <= 1) {
            setGameOverReason("Tiempo agotado: Blancas ganan");
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameOverReason, chess]);

  // Turno del bot
  useEffect(() => {
    if (!isPlaying || gameOverReason || mode === "online") return;

    const isBotTurn = (userSide === "white" && chess.turn() === "b") || (userSide === "black" && chess.turn() === "w");
    if (!isBotTurn) return;

    const timer = setTimeout(() => {
      const activeBot = mode === "coach" ? BOTS[4]! : selectedBot;
      const botRes = getBotMove(fen, activeBot);
      if (botRes) {
        const nextChess = new Chess(fen);
        const mv = nextChess.move(botRes.move);
        if (mv) {
          setFen(nextChess.fen());
          setHistory((prev) => [...prev, mv.san]);
          setLastMove({ from: mv.from, to: mv.to });
          checkGameOver(nextChess);
        }
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [isPlaying, fen, userSide, mode, selectedBot, gameOverReason, chess]);

  const checkGameOver = (c: Chess) => {
    if (c.isCheckmate()) {
      setGameOverReason(c.turn() === "w" ? "Jaque mate: Negras ganan" : "Jaque mate: Blancas ganan");
    } else if (c.isDraw()) {
      setGameOverReason("Tablas (Rey ahogado / Material insuficiente / Regla de 50 jugadas)");
    }
  };

  const startNewGame = (overrideMode?: PlayMode) => {
    const currentMode = overrideMode || mode;
    const initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    setFen(initialFen);
    setHistory([]);
    setLastMove(null);
    setGameOverReason(null);
    setLatestCorrection(null);
    setMoveExplanation(null);
    const secs = timeLimitMin * 60;
    setWhiteClock(secs);
    setBlackClock(secs);
    setIsPlaying(true);

    if (currentMode === "online") {
      const room = mpClient.createRoom(userSide === "white" ? "w" : "b", timeLimitMin);
      setMpState(room);
    }
  };

  const handleUserMove = (from: string, to: string, promotion?: string) => {
    if (gameOverReason) return;

    // Validación de turno
    if (mode === "online" && mpState) {
      const myTurn = (mpState.creatorSide === "w" && chess.turn() === "w") || (mpState.creatorSide === "b" && chess.turn() === "b");
      if (!myTurn) return;
    } else {
      const isMyTurn = (userSide === "white" && chess.turn() === "w") || (userSide === "black" && chess.turn() === "b");
      if (!isMyTurn) return;
    }

    const testChess = new Chess(fen);
    try {
      const mv = testChess.move({ from, to, promotion: promotion || "q" });
      if (!mv) return;

      // Si live coach está activo (en modo coach o bots con coach encendido)
      if (liveCoachEnabled && (mode === "coach" || mode === "bots")) {
        const analysis = analyzeLiveMove(fen, { from, to, san: mv.san, promotion });
        setLatestCorrection(analysis);
        setMoveExplanation(explainMove(fen, mv.san));
      }

      const nextFen = testChess.fen();
      const nextHistory = [...history, mv.san];

      setFen(nextFen);
      setHistory(nextHistory);
      setLastMove({ from, to });
      checkGameOver(testChess);

      if (mode === "online" && mpState) {
        mpClient.sendMove(from, to, promotion, nextFen, nextHistory);
      }
    } catch {
      // Movimiento ilegal
    }
  };

  const formatClock = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyRoomCode = () => {
    if (!mpState) return;
    navigator.clipboard.writeText(mpState.roomId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="play-container">
      {/* Selector superior de modos editorial monocromo */}
      <div className="play-header-terminal">
        <div className="play-header-brand">
          <span className="dot active" />
          <span className="terminal-tag">[ SISTEMA_PLAY // V1.0 ]</span>
        </div>
        <div className="play-mode-tabs">
          <button
            type="button"
            className={`play-tab-btn ${mode === "bots" ? "active" : ""}`}
            onClick={() => {
              setMode("bots");
              setIsPlaying(false);
            }}
          >
            OPONENTES STOCKFISH
          </button>
          <button
            type="button"
            className={`play-tab-btn ${mode === "coach" ? "active" : ""}`}
            onClick={() => {
              setMode("coach");
              setIsPlaying(false);
            }}
          >
            ENTRENADOR EN VIVO
          </button>
          <button
            type="button"
            className={`play-tab-btn ${mode === "online" ? "active" : ""}`}
            onClick={() => {
              setMode("online");
              setIsPlaying(false);
            }}
          >
            MULTIJUGADOR ONLINE
          </button>
        </div>
      </div>

      <div className="play-layout">
        {/* Columna Izquierda / Lateral: Configuración y Bots */}
        <div className="play-sidebar">
          {mode === "bots" && (
            <div className="bot-selector-card">
              <div className="section-subtitle">[ SELECCIÓN DE OPONENTE ]</div>
              <div className="bot-list">
                {BOTS.map((bot) => (
                  <button
                    key={bot.id}
                    type="button"
                    className={`bot-item-btn ${selectedBot.id === bot.id ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedBot(bot);
                      setIsPlaying(false);
                    }}
                  >
                    <div className="bot-item-head">
                      <span className="bot-name">{bot.name}</span>
                      <span className="bot-elo">{bot.elo} ELO</span>
                    </div>
                    <div className="bot-item-desc">{bot.description}</div>
                    <div className="bot-item-meta">
                      <span>ESTILO: {bot.style}</span>
                      <span>{bot.difficulty.toUpperCase()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === "coach" && (
            <div className="coach-config-card">
              <div className="section-subtitle">[ ENTRENAMIENTO ASISTIDO ]</div>
              <p className="coach-desc">
                Stockfish analiza cada una de tus jugadas en tiempo real. Si detecta una imprecisión, error o blunder, te muestra la línea recomendada y la pérdida de evaluación posicional.
              </p>
              <div className="coach-toggle-box">
                <button
                  type="button"
                  className={`btn-toggle ${liveCoachEnabled ? "active" : ""}`}
                  onClick={() => setLiveCoachEnabled(!liveCoachEnabled)}
                >
                  LIVE CORRECTION: {liveCoachEnabled ? "[ ON ]" : "[ OFF ]"}
                </button>
                <button
                  type="button"
                  className={`btn-toggle ${showCoachArrow ? "active" : ""}`}
                  onClick={() => setShowCoachArrow(!showCoachArrow)}
                >
                  FLECHA TÁCTICA: {showCoachArrow ? "[ ON ]" : "[ OFF ]"}
                </button>
              </div>
            </div>
          )}

          {mode === "online" && (
            <div className="online-lobby-card">
              <div className="section-subtitle">[ SALA SINCRONIZADA ]</div>
              {!mpState ? (
                <div className="online-setup">
                  <p className="online-desc">
                    Genera una sala privada para retarte con otro jugador en tiempo real sincronizado mediante eventos nativos de red.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "100%", marginBottom: 16 }}
                    onClick={() => startNewGame("online")}
                  >
                    CREAR NUEVA SALA PRIVADA
                  </button>

                  <div className="room-divider">O UNIRSE A UNA SALA EXISTENTE</div>
                  <div className="room-join-row">
                    <input
                      type="text"
                      className="room-input"
                      placeholder="CÓDIGO (EJ. NK-1234)"
                      value={mpRoomInput}
                      onChange={(e) => setMpRoomInput(e.target.value.toUpperCase())}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        const joined = mpClient.joinRoom(mpRoomInput);
                        if (joined) {
                          setMpState(joined);
                          setUserSide(joined.creatorSide === "w" ? "black" : "white");
                          setIsPlaying(true);
                        }
                      }}
                    >
                      UNIRSE
                    </button>
                  </div>
                </div>
              ) : (
                <div className="online-active-room">
                  <div className="room-badge">
                    <span>SALA ACTIVA:</span>
                    <strong>{mpState.roomId}</strong>
                    <button type="button" className="copy-btn" onClick={copyRoomCode}>
                      {isCopied ? "[ COPIADO ]" : "[ COPIAR ]"}
                    </button>
                  </div>
                  <div className="room-telemetry">
                    <div>JUGADORES: {mpState.connectedPlayers}/2</div>
                    <div>ESTADO: {mpState.status.toUpperCase()}</div>
                    <div>TU COLOR: {userSide.toUpperCase()}</div>
                  </div>
                  <div className="room-actions">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => mpClient.offerDraw(userSide === "white" ? "w" : "b")}
                    >
                      OFRECER TABLAS
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => mpClient.resign(userSide === "white" ? "w" : "b")}
                    >
                      RENDIRSE
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Opciones Generales de Partida */}
          <div className="game-options-card">
            <div className="section-subtitle">[ AJUSTES DE PARTIDA ]</div>
            <div className="opt-row">
              <span className="opt-label">COLOR:</span>
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn-opt ${userSide === "white" ? "active" : ""}`}
                  onClick={() => setUserSide("white")}
                >
                  BLANCAS
                </button>
                <button
                  type="button"
                  className={`btn-opt ${userSide === "black" ? "active" : ""}`}
                  onClick={() => setUserSide("black")}
                >
                  NEGRAS
                </button>
              </div>
            </div>

            <div className="opt-row">
              <span className="opt-label">RITMO:</span>
              <div className="btn-group">
                {[3, 5, 10, 15].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`btn-opt ${timeLimitMin === m ? "active" : ""}`}
                    onClick={() => setTimeLimitMin(m)}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {!isPlaying ? (
              <button
                type="button"
                className="btn btn-primary start-btn"
                onClick={() => startNewGame()}
              >
                COMENZAR PARTIDA
              </button>
            ) : (
              <button
                type="button"
                className="btn start-btn"
                onClick={() => setIsPlaying(false)}
              >
                PAUSAR / SALIR
              </button>
            )}
          </div>
        </div>

        {/* Columna Central: Tablero y Relojes */}
        <div className="play-board-area">
          {/* Reloj Superior (Oponente) */}
          <div className="player-bar top">
            <div className="player-info">
              <span className="player-badge">
                {mode === "bots"
                  ? `[ BOT ] ${selectedBot.name} (${selectedBot.elo})`
                  : mode === "coach"
                    ? "[ BOT ] Entrenador Stockfish"
                    : "[ JUGADOR 2 ] Oponente Online"}
              </span>
            </div>
            <div className="player-clock">
              {formatClock(userSide === "white" ? blackClock : whiteClock)}
            </div>
          </div>

          {/* Tablero Principal Ampliado */}
          <div className="board-wrapper-play">
            <Board
              fen={fen}
              orientation={userSide}
              interactive={isPlaying && !gameOverReason}
              lastMove={lastMove}
              onMove={handleUserMove}
              recommendationArrow={
                showCoachArrow && latestCorrection && latestCorrection.classification !== "BEST"
                  ? latestCorrection.bestMove
                  : null
              }
            />
          </div>

          {/* Reloj Inferior (Usuario) */}
          <div className="player-bar bottom">
            <div className="player-info">
              <span className="player-badge">
                [ TÚ ] {userSide.toUpperCase()}
              </span>
              {chess.inCheck() && <span className="check-alert">[ JAQUE ]</span>}
            </div>
            <div className="player-clock">
              {formatClock(userSide === "white" ? whiteClock : blackClock)}
            </div>
          </div>

          {/* Notificación de Fin de Partida */}
          {gameOverReason && (
            <div className="game-over-banner">
              <div className="banner-title">[ PARTIDA FINALIZADA ]</div>
              <div className="banner-reason">{gameOverReason}</div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginTop: 12 }}
                onClick={() => startNewGame()}
              >
                NUEVA PARTIDA
              </button>
            </div>
          )}
        </div>

        {/* Columna Derecha: Telemetría, Movimientos y Análisis Post/Live */}
        <div className="play-telemetry-panel">
          {/* Panel de Análisis en Vivo / Corrección */}
          {latestCorrection && (
            <div className={`live-correction-box ${latestCorrection.classification.toLowerCase()}`}>
              <div className="correction-header">
                <span className="tag">[ ANÁLISIS EN VIVO ]</span>
                <span className={`badge-class ${latestCorrection.classification.toLowerCase()}`}>
                  {latestCorrection.classification}
                </span>
              </div>
              <div className="correction-details">
                <div className="corr-stat">
                  <span>JUGADA:</span>
                  <strong>{latestCorrection.playedMove.san}</strong>
                </div>
                <div className="corr-stat">
                  <span>MEJOR LÍNEA:</span>
                  <strong>{latestCorrection.bestMove.san}</strong>
                </div>
                <div className="corr-stat">
                  <span>PÉRDIDA:</span>
                  <strong>-{latestCorrection.centipawnLoss} cp</strong>
                </div>
              </div>
              <p className="corr-explanation">{latestCorrection.explanation}</p>
              <div style={{ marginTop: 12 }}>
                <StepByStep explanation={moveExplanation} />
              </div>
            </div>
          )}

          {/* Historial Notación SAN */}
          <div className="move-history-card">
            <div className="section-subtitle">[ REGISTRO NOTACIÓN SAN ]</div>
            <div className="move-history-scroll">
              {history.length === 0 ? (
                <div className="history-empty">Esperando primer movimiento...</div>
              ) : (
                <div className="history-grid">
                  {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => {
                    const whiteMove = history[i * 2];
                    const blackMove = history[i * 2 + 1];
                    return (
                      <div key={i} className="history-row">
                        <span className="ply-number">{i + 1}.</span>
                        <span className="ply-move">{whiteMove}</span>
                        <span className="ply-move">{blackMove || ""}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Telemetría del Motor */}
          <div className="engine-stats-card">
            <div className="section-subtitle">[ TELEMETRÍA MOTOR ]</div>
            <div className="telemetry-item">
              <span>ESTADO STOCKFISH:</span>
              <strong className="status-online">ACTIVO / WASM</strong>
            </div>
            <div className="telemetry-item">
              <span>EVALUACIÓN EN CURSO:</span>
              <strong>{latestCorrection ? `${(latestCorrection.evalAfter / 100).toFixed(2)}` : "0.00"}</strong>
            </div>
            <div className="telemetry-item">
              <span>PROFUNDIDAD CALCULO:</span>
              <strong>{mode === "coach" ? "4 plies" : `${selectedBot.depth} plies`}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
