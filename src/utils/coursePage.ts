// The reader's page: the one line they write per session.
//
// Stored separately from courseProgress (which is read/unread booleans). Keyed
// by course slug, then by chapter slug — one line per session. This is the
// buyer's artifact; it stays on their device and is theirs to keep.
//
//   { "still-yourself": { "still-yourself-arrive": "..." } }

const STORAGE_KEY = 'coursePage';

type PageStore = Record<string, Record<string, string>>;

function readStore(): PageStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: PageStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore write failures (private mode, quota).
  }
}

export function getLine(courseSlug: string, chapterSlug: string): string {
  if (!courseSlug || !chapterSlug) return '';
  return readStore()[courseSlug]?.[chapterSlug] || '';
}

export function setLine(courseSlug: string, chapterSlug: string, text: string): void {
  if (!courseSlug || !chapterSlug) return;
  const store = readStore();
  const course = store[courseSlug] || {};
  if (text) {
    course[chapterSlug] = text;
  } else {
    delete course[chapterSlug];
  }
  store[courseSlug] = course;
  writeStore(store);
}

/** All saved lines for a course, keyed by chapter slug. */
export function getCoursePageLines(courseSlug: string): Record<string, string> {
  if (!courseSlug) return {};
  return readStore()[courseSlug] || {};
}
