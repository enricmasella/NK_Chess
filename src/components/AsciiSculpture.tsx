import { useEffect, useRef, useState } from "react";

/**
 * Visualizador Táctico 3D Monocromo de NK_CHESS.
 * Proyecta en tiempo real modelos 3D de ajedrez (Caballo táctico / Matriz de 64 casillas)
 * convertidos en caracteres ASCII con sombreado de profundidad y parallax reactivo al ratón.
 */
export function AsciiSculpture({ width = 46, height = 22 }: { width?: number; height?: number }) {
  const preRef = useRef<HTMLPreElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef<number | 0>(0);
  const [model, setModel] = useState<"knight" | "matrix">("knight");

  useEffect(() => {
    let rotY = 0.5;
    let rotX = 0.2;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx * 1.4;
      mouseRef.current.targetY = ny * 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generar nube de puntos para el CABALLO (Knight)
    const knightPoints: Array<[number, number, number, number]> = [];

    // Base circular
    for (const r of [2.2, 1.8]) {
      for (let a = 0; a < 24; a++) {
        const ang = (a * Math.PI * 2) / 24;
        knightPoints.push([r * Math.cos(ang), -2.2, r * Math.sin(ang), 0.45]);
      }
    }
    // Peana / Pedestal
    for (const y of [-1.9, -1.5, -1.1]) {
      const r = 1.3 - y * 0.12;
      for (let a = 0; a < 18; a++) {
        const ang = (a * Math.PI * 2) / 18;
        knightPoints.push([r * Math.cos(ang), y, r * Math.sin(ang), 0.55]);
      }
    }
    // Cuello arqueado
    for (let t = 0; t < 22; t++) {
      const prog = t / 21;
      const y = -0.9 + prog * 2.7;
      const neckZ = Math.sin(prog * Math.PI * 0.9) * 0.85;
      const neckW = 0.85 * (1 - prog * 0.25);
      for (let a = 0; a < 14; a++) {
        const ang = (a * Math.PI * 2) / 14;
        const px = Math.cos(ang) * neckW * 0.65;
        const pz = neckZ + Math.sin(ang) * neckW;
        knightPoints.push([px, y, pz, 0.7 + Math.sin(ang) * 0.25]);
      }
    }
    // Cabeza y hocico
    for (let t = 0; t < 12; t++) {
      const prog = t / 11;
      const hy = 1.65 - prog * 0.85;
      const hz = 0.45 + prog * 1.4;
      const hw = 0.52 * (1 - prog * 0.35);
      for (let a = 0; a < 10; a++) {
        const ang = (a * Math.PI * 2) / 10;
        knightPoints.push([Math.cos(ang) * hw, hy, hz + Math.sin(ang) * hw * 0.65, 0.85]);
      }
    }
    // Orejas
    for (const side of [-0.35, 0.35]) {
      for (let ey = 0; ey < 6; ey++) {
        const eprog = ey / 5;
        knightPoints.push([side * (1 - eprog * 0.4), 1.8 + eprog * 0.7, 0.15 - eprog * 0.2, 1.0]);
      }
    }
    // Crin
    for (let m = 0; m < 16; m++) {
      const mprog = m / 15;
      const my = -0.6 + mprog * 2.3;
      const mz = Math.sin(mprog * Math.PI * 0.9) * 0.85 - 0.7;
      knightPoints.push([0, my, mz, 0.95]);
      knightPoints.push([-0.14, my, mz + 0.1, 0.75]);
      knightPoints.push([0.14, my, mz + 0.1, 0.75]);
    }

    // Generar nube de puntos para la MATRIZ 8x8 (3D Chessboard)
    const matrixPoints: Array<[number, number, number, number]> = [];
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const x = (file - 3.5) * 0.65;
        const z = (rank - 3.5) * 0.65;
        const isDark = (rank + file) % 2 === 1;
        // Puntos de la casilla
        matrixPoints.push([x, -0.6, z, isDark ? 0.3 : 0.85]);
        matrixPoints.push([x + 0.25, -0.6, z, isDark ? 0.3 : 0.85]);
        matrixPoints.push([x, -0.6, z + 0.25, isDark ? 0.3 : 0.85]);
        // Tensión en el centro (e4, d4, e5, d5)
        if ((rank === 3 || rank === 4) && (file === 3 || file === 4)) {
          for (let elev = 0; elev < 4; elev++) {
            matrixPoints.push([x, -0.6 + elev * 0.4, z, 1.0]);
          }
        }
      }
    }

    const CHARS = " ·:-=+*#%@0M";

    const renderFrame = () => {
      // Lerp del ratón suave
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      rotY += 0.02 + mouseRef.current.x * 0.02;
      rotX = 0.25 + mouseRef.current.y * 0.35;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const buffer: string[] = new Array(width * height).fill(" ");
      const zBuffer: number[] = new Array(width * height).fill(-9999);

      const activePoints = model === "knight" ? knightPoints : matrixPoints;

      for (let i = 0; i < activePoints.length; i++) {
        const pt = activePoints[i];
        if (!pt) continue;
        const [x, y, z, lum] = pt;

        // Rotación Y
        const rx = x * cosY + z * sinY;
        const rz = -x * sinY + z * cosY;

        // Rotación X
        const ry = y * cosX - rz * sinX;
        const rz2 = y * sinX + rz * cosX;

        const dist = 5.2 + rz2;
        if (dist > 0.4) {
          const invZ = 1 / dist;
          const xp = Math.floor(width / 2 + rx * invZ * 38 * 1.8);
          const yp = Math.floor(height / 2 - ry * invZ * 34);

          if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
            const bufIdx = xp + yp * width;
            const prevZ = zBuffer[bufIdx] ?? -9999;
            if (invZ > prevZ) {
              zBuffer[bufIdx] = invZ;
              const charIdx = Math.floor(lum * (CHARS.length - 1));
              buffer[bufIdx] = CHARS[Math.max(0, Math.min(CHARS.length - 1, charIdx))] ?? " ";
            }
          }
        }
      }

      let output = "";
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          output += buffer[x + y * width];
        }
        output += "\n";
      }

      if (preRef.current) {
        preRef.current.textContent = output;
      }

      animFrameRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [width, height, model]);

  return (
    <div className="ascii-sculpture-container" style={{ position: "relative", userSelect: "none" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-muted)",
        }}
      >
        <span>
          // MODELO 3D:{" "}
          <strong style={{ color: "var(--text)" }}>
            {model === "knight" ? "CABALLO TÁCTICO (KNIGHT)" : "MATRIZ 8x8 (64 CASILLAS)"}
          </strong>
        </span>
        <button
          onClick={() => setModel((m) => (m === "knight" ? "matrix" : "knight"))}
          style={{
            color: "var(--text)",
            border: "1px solid var(--line-strong)",
            padding: "3px 8px",
            fontSize: "10px",
            fontFamily: "var(--font-mono)",
            background: "rgba(255, 255, 255, 0.05)",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          title="Alternar entre Caballo 3D y Tablero 8x8"
        >
          [CAMBIAR A {model === "knight" ? "MATRIZ 8x8" : "CABALLO"}]
        </button>
      </div>

      <pre
        ref={preRef}
        className="ascii-sculpture"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10.5px",
          lineHeight: "1.05",
          letterSpacing: "0.08em",
          color: "var(--text)",
          background: "radial-gradient(circle at center, rgba(30, 30, 30, 0.4) 0%, rgba(0, 0, 0, 0.95) 85%)",
          border: "1px solid var(--line)",
          padding: "16px",
          margin: 0,
          overflow: "hidden",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.35)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.85), 0 12px 40px rgba(0,0,0,0.8)",
          minHeight: "240px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--text-dim)",
        }}
      >
        <span>
          {model === "knight"
            ? "El caballo salta casillas: alteración no-lineal del espacio táctico."
            : "Tensión central proyectada en e4, d4, e5, d5 con Stockfish 16.1."}
        </span>
        <span style={{ color: "var(--text-muted)", letterSpacing: "0.06em" }}>
          [PARALLAX AL RATÓN]
        </span>
      </div>
    </div>
  );
}
