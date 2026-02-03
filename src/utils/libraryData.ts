export type LibraryKind = "writing" | "work" | "play";

export function parseTags(raw: unknown): string[] {
  if (typeof raw !== "string") return [];
  // Supports: "A, B, C" and/or "A B C" legacy formats.
  return raw
    .split(/[,]/g)
    .flatMap((chunk) => chunk.split(/\s{2,}|\s\|\s/g))
    .flatMap((chunk) => chunk.split(/\s+/g))
    .map((t) => t.trim())
    .filter(Boolean);
}

export function uniqueTags(values: Array<string | undefined | null>): string[] {
  const set = new Set<string>();
  for (const v of values) {
    for (const t of parseTags(v)) set.add(t);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// getWorkLogoEntries() removed - data migrated to library.json as design-project entries

