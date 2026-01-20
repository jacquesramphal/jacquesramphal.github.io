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

export function getWorkLogoEntries() {
  return [
    {
      id: "work-logo-dod",
      title: "",
      description: "",
      alt: "Work logo",
      filename1: "work/dod.svg",
      // 2-wide card (spans 2 columns at >= 768px)
      size: "large",
      variant: "small",
    },
    {
      id: "work-logo-j",
      title: "",
      description: "",
      alt: "Work logo",
      filename1: "work/j.svg",
      size: "small",
      variant: "small",
    },
    {
      id: "work-logo-gob",
      title: "",
      description: "",
      alt: "Work logo",
      filename1: "work/gob.svg",
      size: "small",
      variant: "small",
    },
    {
      id: "work-logo-glo",
      title: "",
      description: "",
      alt: "Work logo",
      filename1: "work/glo.svg",
      size: "small",
      variant: "small",
    },
    {
      id: "work-logo-mailback",
      title: "",
      description: "",
      alt: "Work logo",
      filename1: "work/mailback.svg",
      // 2-wide card (spans 2 columns at >= 768px)
      size: "large",
      variant: "small",
    },
  ];
}

