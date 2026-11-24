
export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  accent: string;
  courseIds: string[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "cimientos",
    title: "Cimientos del Ajedrez",
    subtitle: "De 0 a 1200 ELO",
    description: "Domina los patrones de mate más comunes, principios básicos del centro y el juego posicional sólido sin complicaciones.",
    level: "beginner",
    accent: "#f39c12",
    courseIds: ["common-checkmates", "italian", "london", "french", "exchange-caro"],
  },
  {
    id: "ataque-total",
    title: "Ataque Total & Gambitos",
    subtitle: "Agresividad y Rupturas",
    description: "Aprende a desequilibrar la partida desde la jugada dos con aperturas punzantes y ataques directos al rey rival.",
    level: "intermediate",
    accent: "#e74c3c",
    courseIds: ["king-s-gambit", "latvian", "smith-morra", "center-game", "benko"],
  },
  {
    id: "maestria-siciliana",
    title: "Maestría Siciliana",
    subtitle: "El repertorio negro definitivo",
    description: "Explora las variantes más afiladas contra 1.e4: Najdorf, Kalashnikov, Dragón y Sveshnikov con precisión de motor.",
    level: "advanced",
    accent: "#9b59b6",
    courseIds: ["najdorf", "kalashnikov", "dragon", "sveshnikov", "scheveningen"],
  },
  {
    id: "peon-rey-blancas",
    title: "Repertorio 1.e4 Pro",
    subtitle: "Blancas implacables",
    description: "Construye un repertorio completo con blancas basado en 1.e4 dominando las respuestas principales del negro.",
    level: "intermediate",
    accent: "#3498db",
    courseIds: ["ruy-lopez", "italian", "sicilian-rossolimo", "french", "caro-kann"],
  },
];
