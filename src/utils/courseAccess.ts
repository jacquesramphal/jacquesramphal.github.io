// Soft access gate for locked courses.
//
// This mirrors the site's existing maintenance bypass (`?bypass=secret`): a
// locked course hub is hidden until the visitor arrives once with the unlock
// query, which sets a flag in localStorage that persists for future visits.
//
// IMPORTANT: this is NOT real security. The site is static, so course content
// ships in the bundle and a determined person can read it regardless. Use this
// only to keep work-in-progress courses out of sight, not to protect anything
// sensitive.
//
// To change the secret, edit COURSE_UNLOCK_KEY below. To unlock, visit the
// course hub once with `?unlock=<key>` appended, e.g.
//   /course/course-template?unlock=preview

export const COURSE_UNLOCK_KEY = 'preview';

const STORAGE_KEY = 'courseAccess';
const UNLOCK_PARAM = 'unlock';

export function hasCourseAccess(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function grantCourseAccess(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Ignore write failures (private mode, quota).
  }
}

/**
 * If the given query carries the correct unlock key, persist access and return
 * true. Accepts the route `query` object (string or string[] values).
 */
export function tryUnlockFromQuery(query: Record<string, unknown> | undefined): boolean {
  const raw = query?.[UNLOCK_PARAM];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value === 'string' && value === COURSE_UNLOCK_KEY) {
    grantCourseAccess();
    return true;
  }
  return false;
}

/** True when the visitor may view a locked course (already unlocked, or unlocking now). */
export function canViewLockedCourse(query?: Record<string, unknown>): boolean {
  return hasCourseAccess() || tryUnlockFromQuery(query);
}
