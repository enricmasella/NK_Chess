import { useEffect, useState } from "react";

interface BottomBarProps {
  currentRoute: string;
  xp?: number;
}

const NAV_ITEMS = [
  { id: "home", label: "index", href: "#/" },
  { id: "play", label: "jugar", href: "#/play" },
  { id: "courses", label: "cursos", href: "#/cursos" },
  { id: "train", label: "entrenar", href: "#/train" },
  { id: "progress", label: "progreso", href: "#/progreso" },
  { id: "terminal", label: "terminal", href: "#/terminal" },
];

const SCRAMBLE_CHARS = "0123456789ABCDEF_+-*/=!#<>";

function ScrambleLink({
  label,
  href,
  isCurrent,
}: {
  label: string;
  href: string;
  isCurrent: boolean;
}) {
  const [displayText, setDisplayText] = useState(label);

  const handleMouseEnter = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        label
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return char;
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= label.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);
  };

  const handleMouseLeave = () => {
    setDisplayText(label);
  };

  return (
    <a
      className={`bar__btn ${isCurrent ? "is-current" : ""}`}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="bar__label">{displayText}</span>
      <svg className="bar__mark" viewBox="0 0 6 6.667" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 0v6.667M0 3.333h6" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    </a>
  );
}

export function BottomBar({ currentRoute, xp }: BottomBarProps) {
  const [timeStr, setTimeStr] = useState("");
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds}`);
      setIsNight(now.getHours() >= 20 || now.getHours() < 7);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bar" aria-label="Navegación inferior">
      {/* Izquierda: Enlaces principales con efecto scramble y marca + */}
      <div className="bar__left">
        {NAV_ITEMS.map((item) => (
          <ScrambleLink
            key={item.id}
            label={item.label}
            href={item.href}
            isCurrent={currentRoute === item.id}
          />
        ))}
      </div>

      {/* Centro: Reloj en tiempo real con icono solar/lunar y zona horaria */}
      <div className={`bar__clock ${isNight ? "is-night" : ""}`}>
        {isNight ? (
          <svg className="bar__moon" viewBox="0 0 12 12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2 7.6A4.6 4.6 0 0 1 4.4 1.8 4.9 4.9 0 1 0 10.2 7.6Z" fill="currentColor" />
          </svg>
        ) : (
          <svg className="bar__sun" viewBox="0 0 12 12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="2.4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
              <path d="M6 .6v1.5M6 9.9v1.5M.6 6h1.5M9.9 6h1.5" />
              <path d="M2.2 2.2l1.05 1.05M8.75 8.75l1.05 1.05M9.8 2.2L8.75 3.25M3.25 8.75L2.2 9.8" />
            </g>
          </svg>
        )}
        <span className="bar__clockZone">CET</span>
        <i className="bar__clockMark" aria-hidden="true" />
        <span className="bar__clockTime">{timeStr || "00:00:00"}</span>
      </div>

      {/* Derecha: XP y Botón de acción */}
      <div className="bar__right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {typeof xp === "number" && (
          <span
            className="bar__xp"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#e0e0e0",
              letterSpacing: "0.08em",
              padding: "4px 8px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.04)",
              userSelect: "none",
            }}
            title="Puntos de experiencia táctica acumulados"
          >
            {xp} XP
          </span>
        )}
        <a className="bar__mail" href="#/cursos">
          <span className="bar__mailLabel">DON'T RESIGN</span>
          <svg className="bar__mark" viewBox="0 0 6 6.667" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 0v6.667M0 3.333h6" stroke="currentColor" strokeWidth="0.9" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
