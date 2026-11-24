import { useEffect, useState } from "react";
import { getChapter, getCourse } from "./data";
import { useProgress, xpOf } from "./lib/progress";
import { ChapterView } from "./views/ChapterView";
import { CourseView } from "./views/CourseView";
import { Home } from "./views/Home";
import { CoursesView } from "./views/CoursesView";
import { ProgressView } from "./views/ProgressView";
import { TrainView } from "./views/TrainView";
import { TerminalView } from "./views/TerminalView";
import { PlayView } from "./views/Play";
import { BottomBar } from "./components/BottomBar";

type Route =
  | { name: "home" }
  | { name: "play" }
  | { name: "courses" }
  | { name: "course"; courseId: string }
  | { name: "chapter"; courseId: string; chapterId: string }
  | { name: "train" }
  | { name: "progress" }
  | { name: "terminal" }
  | { name: "missing" };

function parseRoute(hash: string): Route {
  const clean = hash.replace(/^#/, "").replace(/^\/+|\/+$/g, "");
  if (clean === "") return { name: "home" };
  const parts = clean.split("/").map(decodeURIComponent);
  if (parts[0] === "play" || parts[0] === "jugar") return { name: "play" };
  if (parts[0] === "cursos") return { name: "courses" };
  if (parts[0] === "curso" && parts[1] && parts[2]) {
    return { name: "chapter", courseId: parts[1], chapterId: parts[2] };
  }
  if (parts[0] === "curso" && parts[1]) return { name: "course", courseId: parts[1] };
  if (parts[0] === "train") return { name: "train" };
  if (parts[0] === "progreso") return { name: "progress" };
  if (parts[0] === "terminal") return { name: "terminal" };
  return { name: "missing" };
}

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function App() {
  const route = useRoute();
  const { progress } = useProgress();
  const xp = xpOf(progress);

  useEffect(() => {
    if (route.name === "home") {
      document.title = "NK_CHESS // Tactical Repertoire & Engine System";
    } else if (route.name === "play") {
      document.title = "NK_CHESS // Play, Bots & Live Coaching";
    } else if (route.name === "courses") {
      document.title = "NK_CHESS // Catálogo de 73 Protocolos";
    } else if (route.name === "train") {
      document.title = "NK_CHESS // Entrenamiento Táctico";
    } else if (route.name === "progress") {
      document.title = "NK_CHESS // Telemetría de Progreso";
    } else if (route.name === "terminal") {
      document.title = "NK_CHESS // Terminal Táctica";
    } else if (route.name === "course") {
      const course = getCourse(route.courseId);
      document.title = course ? `NK_CHESS // ${course.name}` : "NK_CHESS // Curso";
    } else if (route.name === "chapter") {
      const found = getChapter(route.courseId, route.chapterId);
      document.title = found ? `NK_CHESS // ${found.chapter.title}` : "NK_CHESS // Capítulo";
    } else {
      document.title = "NK_CHESS // 404";
    }
  }, [route]);

  let content: React.ReactNode;
  if (route.name === "home") {
    content = <Home />;
  } else if (route.name === "play") {
    content = <PlayView />;
  } else if (route.name === "courses") {
    content = <CoursesView />;
  } else if (route.name === "train") {
    content = <TrainView />;
  } else if (route.name === "progress") {
    content = <ProgressView />;
  } else if (route.name === "terminal") {
    content = <TerminalView />;
  } else if (route.name === "course") {
    const course = getCourse(route.courseId);
    content = course ? <CourseView course={course} /> : <Missing />;
  } else if (route.name === "chapter") {
    const found = getChapter(route.courseId, route.chapterId);
    content = found ? <ChapterView course={found.course} chapter={found.chapter} /> : <Missing />;
  } else {
    content = <Missing />;
  }

  return (
    <>
      <main style={{ paddingBottom: "70px" }}>{content}</main>

      <footer className="wrap footer" style={{ marginBottom: "60px" }}>
        <span>NK_CHESS // TACTICAL CALCULATION & REPERTOIRE ENGINE</span>
        <span>ENGINE: STOCKFISH 16.1 // PRECISION CHESS ARCHITECTURE</span>
      </footer>

      {/* Barra de navegación inferior estilo UnbelievablyCrap */}
      <BottomBar currentRoute={route.name} xp={xp} />
    </>
  );
}

function Missing() {
  return (
    <div className="wrap page">
      <h1 className="page-title">ERROR 404 // CASO NO ENCONTRADO</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
        El vector táctico o capítulo solicitado no se encuentra en la base de datos actual.
      </p>
      <a className="btn-awwwards primary" href="#/cursos" style={{ display: "inline-flex" }}>
        <span>VOLVER AL CATÁLOGO DE CURSOS</span>
      </a>
    </div>
  );
}
