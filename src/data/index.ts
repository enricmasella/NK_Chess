import { BLACK_COURSES } from "./black";
import { LEARNING_PATHS, type LearningPath } from "./paths";
import { SKILL_COURSES } from "./skills";
import { WHITE_COURSES } from "./white";
import type { Category, Course, Level } from "./types";

export const COURSES: Course[] = [...WHITE_COURSES, ...BLACK_COURSES, ...SKILL_COURSES];
export { LEARNING_PATHS, type LearningPath };

export const CATEGORY_LABEL: Record<Category | "all", string> = {
  all: "Todos",
  white: "Blancas",
  black: "Negras",
  skills: "Habilidades",
};

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export function getCourse(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}

export function getChapter(courseId: string, chapterId: string) {
  const course = getCourse(courseId);
  const chapter = course?.chapters.find((item) => item.id === chapterId);
  return course && chapter ? { course, chapter } : undefined;
}

export function searchCourses(query: string, category: Category | "all"): Course[] {
  const q = query.trim().toLowerCase();
  return COURSES.filter((course) => {
    if (category !== "all" && course.category !== category) return false;
    if (!q) return true;
    return [course.name, course.summary, ...course.tags, ...course.chapters.map((c) => c.title)]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}

export const STATS = {
  courses: COURSES.filter((course) => course.status === "published").length,
  soon: COURSES.filter((course) => course.status === "soon").length,
  chapters: COURSES.reduce((total, course) => total + course.chapters.length, 0),
  lines: COURSES.reduce(
    (total, course) =>
      total + course.chapters.reduce((sum, chapter) => sum + 1 + (chapter.alternatives?.length ?? 0), 0),
    0,
  ),
};

export type { Category, Course, Chapter, Level } from "./types";
