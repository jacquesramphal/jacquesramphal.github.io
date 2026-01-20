import docsJson from "@/assets/data/docs.json";
import chaptersJson from "@/assets/data/chapters.json";
import docSlugsJson from "@/assets/data/docSlugs.json";

export type DocRegistryRecord = {
  docId: number;
  slug: string;
  contentFile: string;
};

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

export function isNumericRouteParam(v: unknown): v is string {
  return typeof v === "string" && /^\d+$/.test(v);
}

function normalizeSlug(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s : null;
}

function normalizeContentFile(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s) return null;
  // Safety: avoid path traversal; only allow filenames.
  if (s.includes("/") || s.includes("\\")) return null;
  if (!s.toLowerCase().endsWith(".md")) return null;
  return s;
}

function collectRecords(): DocRegistryRecord[] {
  const out: DocRegistryRecord[] = [];
  const add = (candidate: any) => {
    const docId = candidate?.docId;
    const slug = normalizeSlug(candidate?.slug);
    const contentFile = normalizeContentFile(candidate?.contentFile);

    if (!isFiniteNumber(docId) || !slug || !contentFile) return;
    out.push({ docId, slug, contentFile });
  };

  const docsEntries = (docsJson as any)?.entries || [];
  const chapterEntries = (chaptersJson as any)?.entries || [];
  const slugEntries = (docSlugsJson as any)?.entries || [];

  for (const e of docsEntries) add(e);
  for (const e of chapterEntries) add(e);
  for (const e of slugEntries) add(e);

  return out;
}

const records = collectRecords();

const byId = new Map<number, DocRegistryRecord>();
const bySlug = new Map<string, DocRegistryRecord>();

for (const r of records) {
  if (!byId.has(r.docId)) byId.set(r.docId, r);
  if (!bySlug.has(r.slug)) bySlug.set(r.slug, r);
}

export function getDocRecordById(docId: number): DocRegistryRecord | undefined {
  return byId.get(docId);
}

export function getDocRecordBySlug(slug: string): DocRegistryRecord | undefined {
  return bySlug.get(slug);
}

