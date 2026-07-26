// Course (series) registry.
//
// A "course" is a multipage series layered on top of the normal doc system:
// each chapter is an ordinary markdown doc rendered by MarkdownPage, and the
// manifest below defines the title, order, and which chapters are live. This
// keeps chapter ordering as one source of truth and lets both the course hub
// (CoursePage) and the chapter pages (MarkdownPage/BreadCrumb) share the same
// prev/next/index logic instead of each re-deriving it.
//
// Today there is a single course (chapters.json). The shape here is written so
// additional courses can be added without changing consumers.

import designQa from '@/assets/data/chapters.json';

export type CourseChapter = {
  id: number;
  docId?: number;
  tag: string;
  title: string;
  description: string;
  slug: string;
  route: string;
  contentFile: string;
  published: boolean;
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  entries: CourseChapter[];
};

export type ChapterContext = {
  course: Course;
  /** Published chapters only, in order. */
  chapters: CourseChapter[];
  /** Index of the current chapter within `chapters`. */
  index: number;
  current: CourseChapter;
  prev: CourseChapter | null;
  next: CourseChapter | null;
};

function normalizeCourse(raw: any): Course {
  const entries: CourseChapter[] = ((raw?.entries as any[]) || []).map((e) => ({
    id: e.id,
    docId: e.docId,
    tag: e.tag ?? '',
    title: e.title ?? '',
    description: e.description ?? '',
    slug: e.slug ?? '',
    route: e.route ?? (e.slug ? `/doc/${e.slug}` : ''),
    contentFile: e.contentFile ?? '',
    // Treat a chapter as published unless it is explicitly false, so older
    // manifests without the flag keep working.
    published: e.published !== false,
  }));

  return {
    slug: raw?.slug ?? '',
    title: raw?.title ?? '',
    subtitle: raw?.subtitle ?? '',
    entries,
  };
}

const COURSES: Course[] = [normalizeCourse(designQa)];

export function getAllCourses(): Course[] {
  return COURSES;
}

export function getCourseBySlug(slug: string): Course | undefined {
  if (!slug) return undefined;
  return COURSES.find((c) => c.slug === slug);
}

/** The first course — convenience for the single-course `/Course` route. */
export function getDefaultCourse(): Course | undefined {
  return COURSES[0];
}

/** Published chapters of a course, in manifest order. */
export function getPublishedChapters(course: Course): CourseChapter[] {
  return course.entries.filter((e) => e.published && e.slug);
}

/**
 * Given a doc slug, return its course context (course, ordered published
 * chapters, position, and prev/next neighbours) — or null if the slug is not a
 * chapter of any course. prev/next are computed over published chapters only.
 */
export function getChapterContext(docSlug: string): ChapterContext | null {
  if (!docSlug) return null;

  for (const course of COURSES) {
    const chapters = getPublishedChapters(course);
    const index = chapters.findIndex((c) => c.slug === docSlug);
    if (index === -1) continue;

    return {
      course,
      chapters,
      index,
      current: chapters[index],
      prev: index > 0 ? chapters[index - 1] : null,
      next: index < chapters.length - 1 ? chapters[index + 1] : null,
    };
  }

  return null;
}
