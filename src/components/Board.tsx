import { Chess } from "chess.js";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Side } from "../data/types";

const PIECE_URL: Record<string, string> = {
  kw: "/pieces/kw.svg", kb: "/pieces/kb.svg",
  qw: "/pieces/qw.svg", qb: "/pieces/qb.svg",
  rw: "/pieces/rw.svg", rb: "/pieces/rb.svg",
  bw: "/pieces/bw.svg", bb: "/pieces/bb.svg",
  nw: "/pieces/nw.svg", nb: "/pieces/nb.svg",
  pw: "/pieces/pw.svg", pb: "/pieces/pb.svg",
};

function Piece({ type, color }: { type: string; color: "w" | "b" }) {
  const url = PIECE_URL[`${type}${color}`];
  return <img src={url} alt={`${type}${color}`} className="piece-img" draggable={false} />;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const PIECE_NAME: Record<string, string> = {
  k: "rey",
  q: "dama",
  r: "torre",
  b: "alfil",
  n: "caballo",
  p: "peón",
};

interface BoardProps {
  fen: string;
  orientation?: Side;
  interactive?: boolean;
  lastMove?: { from: string; to: string } | null;
  onMove?: (from: string, to: string, promotion?: string) => void;
  hintSquare?: string;
  recommendationArrow?: { from: string; to: string } | null;
}

export function Board({
  fen,
  orientation = "white",
  interactive = false,
  lastMove = null,
  onMove,
  hintSquare,
  recommendationArrow = null,
}: BoardProps) {
  const chess = useMemo(() => new Chess(fen), [fen]);
  const boardRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [pending, setPending] = useState<{ from: string; to: string } | null>(null);

  // Dragging state
  const [dragState, setDragState] = useState<{
    fromSquare: string;
    piece: { type: string; color: "w" | "b" };
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    isDragging: boolean;
  } | null>(null);

  const [hoverSquare, setHoverSquare] = useState<string | null>(null);

  // Animation states
  const [slidingSquare, setSlidingSquare] = useState<{
    to: string;
    dx: number;
    dy: number;
  } | null>(null);
  const [capturingSquare, setCapturingSquare] = useState<string | null>(null);
  const [promotedSquare, setPromotedSquare] = useState<string | null>(null);

  const prevFenRef = useRef(fen);
  const prevLastMoveRef = useRef<{ from: string; to: string } | null>(null);
  const lastDragDroppedRef = useRef<string | null>(null);

  useEffect(() => {
    setSelected(null);
    setPending(null);
  }, [fen]);

  const rows = chess.board();
  const files = orientation === "white" ? FILES : [...FILES].reverse();
  const ordered = orientation === "white" ? rows : [...rows].reverse();

  // Detect move animations: slide, capture, promotion
  useEffect(() => {
    if (!lastMove) {
      prevFenRef.current = fen;
      return;
    }

    if (
      !prevLastMoveRef.current ||
      prevLastMoveRef.current.from !== lastMove.from ||
      prevLastMoveRef.current.to !== lastMove.to
    ) {
      try {
        const prevGame = new Chess(prevFenRef.current);
        const testMove = prevGame
          .moves({ verbose: true })
          .find((m) => m.from === lastMove.from && m.to === lastMove.to);

        if (testMove) {
          // 1. Capture detection (including en-passant)
          if (testMove.captured) {
            setCapturingSquare(lastMove.to);
            setTimeout(() => setCapturingSquare(null), 380);
          }

          // 2. Promotion detection
          if (testMove.promotion) {
            setPromotedSquare(lastMove.to);
            setTimeout(() => setPromotedSquare(null), 500);
          }

          // 3. Slide animation (if not dropped by drag directly onto square)
          if (lastDragDroppedRef.current !== lastMove.to) {
            const fromCol = files.indexOf(lastMove.from[0] ?? "");
            const fromR = parseInt(lastMove.from[1] ?? "1", 10);
            const fromRow = orientation === "white" ? 8 - fromR : fromR - 1;
            const toCol = files.indexOf(lastMove.to[0] ?? "");
            const toR = parseInt(lastMove.to[1] ?? "1", 10);
            const toRow = orientation === "white" ? 8 - toR : toR - 1;

            if (fromCol !== -1 && toCol !== -1) {
              const dx = (fromCol - toCol) * 100;
              const dy = (fromRow - toRow) * 100;
              setSlidingSquare({ to: lastMove.to, dx, dy });
              setTimeout(() => setSlidingSquare(null), 220);
            }
          } else {
            lastDragDroppedRef.current = null;
          }
        }
      } catch {
        // Fallback silently if fen parsing has an edge case
      }

      prevLastMoveRef.current = lastMove;
    }

    prevFenRef.current = fen;
  }, [fen, lastMove, files, orientation]);

  const inCheckSquare = useMemo(() => {
    if (!chess.inCheck()) return null;
    const turn = chess.turn();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = rows[r]?.[c];
        if (piece && piece.type === "k" && piece.color === turn) {
          const file = FILES[c];
          const rank = 8 - r;
          return `${file}${rank}`;
        }
      }
    }
    return null;
  }, [chess, rows]);

  const targets = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(chess.moves({ square: selected as never, verbose: true }).map((move) => move.to));
  }, [chess, selected]);

  const moveTo = (from: string, to: string) => {
    const move = chess
      .moves({ verbose: true })
      .find((candidate) => candidate.from === from && candidate.to === to);
    if (!move) return;
    if (move.flags.includes("p")) {
      setPending({ from, to });
      return;
    }
    setSelected(null);
    onMove?.(from, to);
  };

  // Pointer drag and drop listeners
  useEffect(() => {
    if (!dragState) return;

    const onPointerMove = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - dragState.startX, e.clientY - dragState.startY);
      const isDragging = dist > 4 || dragState.isDragging;

      let hover: string | null = null;
      if (boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          const col = Math.floor((x / rect.width) * 8);
          const row = Math.floor((y / rect.height) * 8);
          if (col >= 0 && col < 8 && row >= 0 && row < 8) {
            const file = files[col];
            const realRank = orientation === "white" ? 8 - row : row + 1;
            hover = `${file}${realRank}`;
          }
        }
      }

      setHoverSquare(hover);
      setDragState((prev) =>
        prev ? { ...prev, currentX: e.clientX, currentY: e.clientY, isDragging } : null
      );
    };

    const onPointerUp = () => {
      if (dragState.isDragging && hoverSquare && hoverSquare !== dragState.fromSquare) {
        if (targets.has(hoverSquare)) {
          lastDragDroppedRef.current = hoverSquare;
          moveTo(dragState.fromSquare, hoverSquare);
        }
      }
      setDragState(null);
      setHoverSquare(null);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragState, hoverSquare, targets, files, orientation]);

  const handleSquarePointerDown = (
    e: React.PointerEvent,
    square: string,
    piece: { color: "w" | "b"; type: string } | null
  ) => {
    if (!interactive) return;

    // 1. If piece is selected and tapping on a target move square, execute move immediately
    if (selected && targets.has(square) && selected !== square) {
      moveTo(selected, square);
      return;
    }

    // 2. If clicking player's active piece, initiate drag & selection
    if (piece && piece.color === chess.turn()) {
      e.preventDefault();
      setSelected(square);
      setDragState({
        fromSquare: square,
        piece,
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
        isDragging: false,
      });
      return;
    }

    // 3. Clicking elsewhere cancels selection
    setSelected(null);
  };

  // Coordenadas en porcentaje (0 a 100) para flechas SVG
  const getSquareCenter = (sq: string) => {
    const f = sq[0] ?? "a";
    const r = parseInt(sq[1] ?? "1", 10);
    const colIdx = orientation === "white" ? FILES.indexOf(f) : 7 - FILES.indexOf(f);
    const rowIdx = orientation === "white" ? 8 - r : r - 1;
    return {
      x: (colIdx + 0.5) * 12.5,
      y: (rowIdx + 0.5) * 12.5,
    };
  };

  return (
    <div
      ref={boardRef}
      className="board"
      role="grid"
      aria-label="Tablero de ajedrez"
    >
      {ordered.map((row, rowIndex) =>
        files.map((file, fileIndex) => {
          const piece = row[FILES.indexOf(file)];
          if (piece === undefined) return null;
          const realRank = orientation === "white" ? 8 - rowIndex : rowIndex + 1;
          const sn = `${file}${realRank}`;
          const isDark = (FILES.indexOf(file) + realRank) % 2 === 1;
          const isLast = lastMove && (lastMove.from === sn || lastMove.to === sn);
          const isCheck = inCheckSquare === sn;
          const isSelected = selected === sn;
          const isHoveredTarget = hoverSquare === sn && targets.has(sn);
          const isBeingDragged = dragState?.fromSquare === sn && dragState.isDragging;
          const isSliding = slidingSquare?.to === sn;
          const isCapturingThis = capturingSquare === sn;
          const isPromoted = promotedSquare === sn;
          const showFile = orientation === "white" ? rowIndex === 7 : rowIndex === 0;
          const showRank = orientation === "white" ? fileIndex === 0 : fileIndex === 7;

          return (
            <button
              key={sn}
              type="button"
              className={`sq ${isDark ? "dark" : "light"}${isLast ? " last" : ""}${isCheck ? " check" : ""}${isSelected ? " selected" : ""}${isHoveredTarget ? " drag-over" : ""}`}
              onPointerDown={(e) =>
                handleSquarePointerDown(
                  e,
                  sn,
                  piece ? { color: piece.color, type: piece.type } : null
                )
              }
              aria-label={`${sn}${piece ? `, ${PIECE_NAME[piece.type]} ${piece.color === "w" ? "blanca" : "negra"}` : ", vacía"}`}
              aria-pressed={isSelected}
              style={{
                boxShadow: hintSquare === sn ? "inset 0 0 0 3px var(--gold)" : undefined,
              }}
            >
              {isCapturingThis && <span className="capture-burst" />}

              {piece && (
                <span
                  className={`piece ${piece.color === "w" ? "white" : "black"}${isSliding ? " piece-sliding" : ""}${isCapturingThis ? " piece-impact" : ""}${isPromoted ? " piece-promoted" : ""}`}
                  style={{
                    opacity: isBeingDragged ? 0.15 : 1,
                    ...(isSliding
                      ? ({
                          "--slide-dx": `${slidingSquare?.dx}%`,
                          "--slide-dy": `${slidingSquare?.dy}%`,
                        } as React.CSSProperties)
                      : {}),
                  }}
                >
                  <Piece type={piece.type} color={piece.color} />
                </span>
              )}

              {targets.has(sn) && (piece ? <span className="ring" /> : <span className="dot" />)}
              {showFile && <span className="coord">{file}</span>}
              {showRank && <span className="coord">{realRank}</span>}
            </button>
          );
        })
      )}

      {/* Floating Drag Ghost Piece */}
      {dragState && dragState.isDragging && (
        <div
          className="piece-drag-ghost"
          style={{
            left: dragState.currentX,
            top: dragState.currentY,
          }}
        >
          <Piece type={dragState.piece.type} color={dragState.piece.color} />
        </div>
      )}

      {/* Tactical Recommendation Arrow */}
      {recommendationArrow && (
        <svg
          className="board-arrow-overlay"
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 8,
          }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="var(--gold, #f59e0b)" opacity="0.95" />
            </marker>
          </defs>
          {(() => {
            const start = getSquareCenter(recommendationArrow.from);
            const end = getSquareCenter(recommendationArrow.to);
            return (
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="var(--gold, #f59e0b)"
                strokeWidth="2.8"
                strokeDasharray="4 2"
                opacity="0.9"
                markerEnd="url(#arrowhead)"
              />
            );
          })()}
        </svg>
      )}

      {/* Floating Brutalist Promotion Dialog */}
      {pending && (
        <div
          className="promotion-dialog"
          role="dialog"
          aria-label="Elige la pieza de promoción"
        >
          <div className="promotion-title">CORONACIÓN // SELECCIONA PIEZA</div>
          <div className="promotion-pieces">
            {[
              { type: "q", label: "DAMA" },
              { type: "n", label: "CABALLO" },
              { type: "r", label: "TORRE" },
              { type: "b", label: "ALFIL" },
            ].map(({ type, label }) => (
              <button
                key={type}
                className="promotion-btn"
                onClick={() => {
                  const move = pending;
                  setPending(null);
                  setSelected(null);
                  onMove?.(move.from, move.to, type);
                }}
                title={label}
              >
                <div className="promo-piece-wrap">
                  <Piece type={type} color={chess.turn()} />
                </div>
                <span className="promo-label">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
