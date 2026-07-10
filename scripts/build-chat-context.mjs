// Build the chat context corpus for the site-guide chatbot.
//
// Reads the site's own content (bio, work cards, published library entries)
// and assembles a single text corpus that the serverless chat function
// (chat-api/api/chat.js) sends to Claude as a prompt-cached system block.
//
// Content selection is deliberately conservative: a PUBLIC bot must never
// surface private or draft writing. An entry is included only when it is
// NOT private, NOT explicitly unpublished, has a real title, and is not the
// case-study template. Widen or narrow the filter in `isPublic()` below.
//
// Run:  node scripts/build-chat-context.mjs
// Out:  chat-api/_context.json   (committed; the function reads it at runtime)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/assets/content');
const DATA_DIR = join(ROOT, 'src/assets/data');
// Colocated with the function so Vercel always bundles it into the deployment.
const OUT_DIR = join(ROOT, 'chat-api/api');
const OUT_FILE = join(OUT_DIR, '_context.json');

const readJSON = (p) => JSON.parse(readFileSync(p, 'utf8'));

// Strip YAML frontmatter (--- ... ---) if present, then trim.
function stripFrontmatter(md) {
  if (md.startsWith('---')) {
    const end = md.indexOf('\n---', 3);
    if (end !== -1) return md.slice(md.indexOf('\n', end + 1) + 1).trim();
  }
  return md.trim();
}

// A public bot must not reveal private or draft pieces.
function isPublic(entry) {
  if (!entry.contentFile) return false;
  if (!entry.title || String(entry.title).includes('undefined')) return false;
  if (entry.private === true) return false; // explicitly private
  if (entry.published === false) return false; // explicit draft
  const cf = String(entry.contentFile).toLowerCase();
  if (cf.includes('template')) return false; // scaffolding, not real content
  return true;
}

const sections = [];
const sources = [];

// 1) Bio / résumé — answers "who is Jacques Ramphal?"
const resumePath = join(ROOT, 'public/resume.md');
if (existsSync(resumePath)) {
  sections.push('# About Jacques Ramphal\n\n' + stripFrontmatter(readFileSync(resumePath, 'utf8')));
  sources.push('public/resume.md');
}

// 1b) Ask Me Anything — curated FAQ (doc_30). High-value Q&A for the guide;
// its library entry has no title so the generic loader below skips it. The
// chatbot is intended to replace this static page, so it must know its answers.
const amaPath = join(CONTENT_DIR, 'doc_30.md');
if (existsSync(amaPath)) {
  const ama = stripFrontmatter(readFileSync(amaPath, 'utf8'))
    .replace(/<summary>\s*([\s\S]*?)<\/summary>/g, (_, q) => `**Q: ${q.trim()}**`)
    .replace(/<\/?(details|span)>/g, '')
    .replace(/<\/?br\s*\/?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  sections.push('# Ask Me Anything (FAQ)\n\n' + ama);
  sources.push('src/assets/content/doc_30.md');
}

// 2) Selected work — card-level summaries from work.json
if (existsSync(join(DATA_DIR, 'work.json'))) {
  const work = readJSON(join(DATA_DIR, 'work.json'));
  const items = (work.entries || []).filter((w) => w.title && w.private !== true);
  if (items.length) {
    const blocks = items.map((w) => {
      const lines = [`## ${w.title}`];
      if (w.role) lines.push(`Role: ${w.role}`);
      if (w.tag) lines.push(`Focus: ${w.tag}`);
      if (w.btnroute) lines.push(`Link: /${String(w.btnroute).replace(/^\//, '')}`);
      if (w.description) lines.push('', String(w.description).trim());
      if (Array.isArray(w.keyTakeaways) && w.keyTakeaways.length) {
        lines.push('', 'Key takeaways:');
        for (const t of w.keyTakeaways) {
          lines.push(`- ${typeof t === 'string' ? t : t.text || t.title || JSON.stringify(t)}`);
        }
      }
      return lines.join('\n');
    });
    sections.push('# Selected Work\n\n' + blocks.join('\n\n'));
    sources.push('src/assets/data/work.json');
  }
}

// 3) Published writing, case studies, and tools from the library
if (existsSync(join(DATA_DIR, 'library.json'))) {
  const lib = readJSON(join(DATA_DIR, 'library.json'));
  const entries = (lib.entries || []).filter(isPublic);
  const byType = { 'case-study': [], 'design-project': [], article: [], tool: [], other: [] };
  for (const e of entries) (byType[e.type] || byType.other).push(e);

  const groups = [
    ['Case Studies & Projects', [...byType['case-study'], ...byType['design-project']]],
    ['Articles', byType.article],
    ['Tools', byType.tool],
    ['Other', byType.other],
  ];

  for (const [heading, list] of groups) {
    if (!list.length) continue;
    const blocks = [];
    for (const e of list) {
      const file = join(CONTENT_DIR, e.contentFile);
      if (!existsSync(file)) continue;
      const body = stripFrontmatter(readFileSync(file, 'utf8'));
      if (!body) continue;
      const meta = [`## ${e.title}`];
      if (e.eyebrow) meta.push(`Category: ${e.eyebrow}`);
      if (e.route) meta.push(`Link: ${e.route}`);
      if (Array.isArray(e.tags) && e.tags.length) meta.push(`Tags: ${e.tags.join(', ')}`);
      blocks.push(meta.join('\n') + '\n\n' + body);
      sources.push(`src/assets/content/${e.contentFile}`);
    }
    if (blocks.length) sections.push(`# ${heading}\n\n` + blocks.join('\n\n---\n\n'));
  }
}

const content = sections.join('\n\n\n');
const approxTokens = Math.round(content.length / 4);

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  OUT_FILE,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceCount: sources.length,
      approxTokens,
      sources,
      content,
    },
    null,
    2,
  ),
);

console.log(`Wrote ${OUT_FILE}`);
console.log(`  sources: ${sources.length}`);
console.log(`  chars:   ${content.length}`);
console.log(`  ~tokens: ${approxTokens}`);
