import data from '@/assets/data/personalization.json';

/**
 * Per-recipient personalization for the /hire page.
 *
 * A recipient is addressed by a `?for=<slug>` query param. Every field except
 * `client` is optional: an omitted field falls back to the page's default copy,
 * so a partial record (see "northwind") degrades field-by-field rather than
 * all-or-nothing. An unknown or missing slug resolves to null and the page
 * renders its default, un-personalized state.
 */
export interface Personalization {
  /** Display name of the recipient, e.g. "Meridian Financial". Required. */
  client: string;
  /** Role being hired for, appended to the "prepared for" line. Optional. */
  role?: string;
  /** Short personal note shown under the hero. Optional. */
  note?: string;
  /** Overrides the closing CTA subtitle. Optional. */
  ctaSubtitle?: string;
  /** Key of the proof card to carry the filled "lead" badge. Optional. */
  leadProof?: string;
}

const RECORDS = data as Record<string, Personalization>;

/**
 * Resolve a `?for=` query value to a personalization record, or null.
 * Normalizes case and whitespace so `?for=Meridian` and `?for=meridian` match.
 */
export function resolvePersonalization(param: unknown): Personalization | null {
  if (typeof param !== 'string') return null;
  const key = param.trim().toLowerCase();
  if (!key) return null;
  return RECORDS[key] ?? null;
}
