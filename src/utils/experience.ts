// Single source of truth for years-of-experience across the site.
//
// The figure is computed from a fixed career-start year so it stays correct
// as time passes — no hardcoded "12+ years" to go stale. Anything that shows
// how long Jacques has been working (HomePage meta, the resume summary, prose
// tokens in markdown) should read from here. The chat API mirrors this anchor
// in chat-api/api/chat.js (CAREER_START_YEAR); keep the two in sync.

export const CAREER_START_YEAR = 2013;

// Whole years of experience as of now.
export function yearsOfExperience(now: Date = new Date()): number {
  return now.getFullYear() - CAREER_START_YEAR;
}

// Render-time token substitution for markdown/prose. Replaces {{yearsExperience}}
// (and the {{ years }}-spaced variant) with the current figure.
export function fillExperienceTokens(text: string): string {
  if (!text || typeof text !== 'string') return text;
  const years = String(yearsOfExperience());
  return text.replace(/\{\{\s*yearsExperience\s*\}\}/g, years);
}
