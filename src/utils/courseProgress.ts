// Course progress tracking.
//
// Progress lives in a single localStorage object keyed by course slug, then by
// chapter slug:
//
//   { "design-qa-101": { "usability-and-user-experience-testing": true } }
//
// The old implementation wrote per-chapter keys (readStatus_<id>) but read a
// single `readStatus` object that was never written, so progress never survived
// a reload. Centralising read/write here keeps the hub and the chapter pages in
// agreement.

const STORAGE_KEY = 'courseProgress';

type ProgressStore = Record<string, Record<string, boolean>>;

function readStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore write failures (private mode, quota) — progress is non-critical.
  }
}

/** Map of chapterSlug -> true for a course. Never null. */
export function getCourseProgress(courseSlug: string): Record<string, boolean> {
  if (!courseSlug) return {};
  return readStore()[courseSlug] || {};
}

export function isChapterRead(courseSlug: string, chapterSlug: string): boolean {
  if (!courseSlug || !chapterSlug) return false;
  return !!getCourseProgress(courseSlug)[chapterSlug];
}

export function setChapterRead(courseSlug: string, chapterSlug: string, read = true): void {
  if (!courseSlug || !chapterSlug) return;
  const store = readStore();
  const course = store[courseSlug] || {};
  if (read) {
    course[chapterSlug] = true;
  } else {
    delete course[chapterSlug];
  }
  store[courseSlug] = course;
  writeStore(store);
}

/** Number of chapters (from the given slugs) marked read for a course. */
export function countRead(courseSlug: string, chapterSlugs: string[]): number {
  const progress = getCourseProgress(courseSlug);
  return chapterSlugs.reduce((n, slug) => n + (progress[slug] ? 1 : 0), 0);
}
