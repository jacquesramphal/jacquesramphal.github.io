/* eslint-disable no-console */
/**
 * Smart quotes fixer (safe for Vue templates).
 *
 * Goals:
 * - Convert dumb ASCII quotes in rendered content to Unicode smart quotes.
 * - Do NOT touch code:
 *   - <script>, <style> blocks (SFC parsing handles this)
 *   - moustache expressions ({{ ... }})
 *   - directive expressions (:foo="...", v-if="...", @click="...")
 *   - <pre>/<code> descendants in templates
 *
 * Usage:
 *   node scripts/smart-quotes.js --check
 *   node scripts/smart-quotes.js --write
 *
 * Optional:
 *   --paths src,content
 *   --ext .vue,.md
 */
const fs = require('fs');
const path = require('path');

const { parse: parseSfc } = require('@vue/compiler-sfc');
const { parse: parseTemplate, NodeTypes } = require('@vue/compiler-dom');

function readTextFile(filePath) {
  const buf = fs.readFileSync(filePath);
  // skip binary-ish
  if (buf.includes(0)) return null;
  return buf.toString('utf8');
}

function writeTextFile(filePath, text) {
  fs.writeFileSync(filePath, text, 'utf8');
}

function isWordChar(ch) {
  return Boolean(ch) && /[A-Za-z0-9]/.test(ch);
}

function isOpeningQuote(prevCh, nextCh) {
  // Use immediate neighbors (not prevNonSpace), otherwise: `word "Quote"` gets misclassified.
  const prevIsBoundary =
    !prevCh || /\s/.test(prevCh) || /[([{<]/.test(prevCh) || /[–—-]/.test(prevCh);
  const nextIsWordish = Boolean(nextCh) && !/[\s)\]}>.,;:!?]/.test(nextCh);
  return prevIsBoundary && nextIsWordish;
}

function toSmartQuotes(input) {
  if (!input || (!input.includes("'") && !input.includes('"'))) return input;

  let out = '';
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];

    if (ch === '"') {
      const prevCh = input[i - 1] ?? '';
      const nextCh = input[i + 1] ?? '';
      out += isOpeningQuote(prevCh, nextCh) ? '“' : '”';
      continue;
    }

    if (ch === "'") {
      const prevCh = input[i - 1] ?? '';
      const nextCh = input[i + 1] ?? '';

      // Apostrophes inside words: I'm, designers', Orium's, 1990's (common prose)
      if (isWordChar(prevCh) && isWordChar(nextCh)) {
        out += '’';
        continue;
      }

      out += isOpeningQuote(prevCh, nextCh) ? '‘' : '’';
      continue;
    }

    out += ch;
  }

  return out;
}

function toSmartQuotesInsideAttributeValue(valueSource) {
  const src = String(valueSource ?? '');
  if (!src) return src;

  // Vue compiler-dom attribute value `loc.source` includes the surrounding quotes, e.g. `"I'm ..."`
  // Preserve the delimiter quotes (must remain ' or "), only smarten the inside.
  const first = src[0];
  const last = src[src.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    const inner = src.slice(1, -1);
    const innerNext = toSmartQuotes(inner);
    return first + innerNext + last;
  }

  // Fallback (rare): treat as plain text.
  return toSmartQuotes(src);
}

function shouldTransformAttribute(name) {
  const n = String(name || '').toLowerCase();
  if (!n) return false;

  // Definitely NOT prose:
  if (
    n === 'class' ||
    n === 'style' ||
    n === 'id' ||
    n === 'href' ||
    n === 'src' ||
    n === 'srcset' ||
    n === 'to' ||
    n === 'name' ||
    n === 'type' ||
    n === 'rel' ||
    n === 'target'
  ) {
    return false;
  }

  // ARIA labels are user-facing.
  if (n.startsWith('aria-')) return true;

  // Common “copy” props in this repo.
  return new Set([
    'title',
    'subtitle',
    'label',
    'labeltwo',
    'eyebrow',
    'description',
    'detail',
    'detail1',
    'detail2',
    'alt',
    'placeholder',
  ]).has(n);
}

function applyEdits(source, edits) {
  if (edits.length === 0) return source;
  const sorted = edits.slice().sort((a, b) => b.start - a.start);
  let out = source;
  for (const e of sorted) {
    if (e.start < 0 || e.end < e.start || e.end > out.length) continue;
    const current = out.slice(e.start, e.end);
    if (typeof e.old === 'string' && current !== e.old) {
      // If offsets drifted (unexpected), skip to avoid corrupting the file.
      continue;
    }
    out = out.slice(0, e.start) + e.replacement + out.slice(e.end);
  }
  return out;
}

function processVueFile(filePath, source) {
  const parsed = parseSfc(source, { filename: filePath });
  const tpl = parsed.descriptor.template;
  if (!tpl || typeof tpl.content !== 'string') {
    return { changed: false, output: source, changeCount: 0 };
  }

  const templateContent = tpl.content;
  const baseGuess = tpl.loc?.start?.offset ?? 0;
  const base = source.indexOf(templateContent, Math.max(0, baseGuess - 50));
  if (base < 0) {
    return { changed: false, output: source, changeCount: 0 };
  }

  const ast = parseTemplate(templateContent, { comments: true });
  const edits = [];

  function addEdit(relStart, relEnd, oldText, newText) {
    if (newText === oldText) return;
    if (!newText) return;
    edits.push({
      start: base + relStart,
      end: base + relEnd,
      old: oldText,
      replacement: newText,
    });
  }

  function walk(node, inCode) {
    if (!node) return;

    if (node.type === NodeTypes.ELEMENT) {
      const tag = String(node.tag || '').toLowerCase();
      const nextInCode = inCode || tag === 'pre' || tag === 'code';

      if (!nextInCode && Array.isArray(node.props)) {
        for (const p of node.props) {
          if (!p) continue;
          // Only static attributes, never directives (which can contain JS).
          if (p.type !== NodeTypes.ATTRIBUTE) continue;
          if (!p.value || !p.value.loc) continue;
          if (!shouldTransformAttribute(p.name)) continue;

          const oldText = p.value.loc.source;
          const newText = toSmartQuotesInsideAttributeValue(oldText);
          addEdit(p.value.loc.start.offset, p.value.loc.end.offset, oldText, newText);
        }
      }

      if (Array.isArray(node.children)) {
        for (const c of node.children) walk(c, nextInCode);
      }
      return;
    }

    if (node.type === NodeTypes.TEXT) {
      if (inCode) return;
      const oldText = node.loc?.source ?? '';
      if (!oldText) return;
      const newText = toSmartQuotes(oldText);
      addEdit(node.loc.start.offset, node.loc.end.offset, oldText, newText);
      return;
    }

    // Never traverse into interpolations / expressions.
    if (node.type === NodeTypes.INTERPOLATION) return;
    if (node.type === NodeTypes.COMMENT) return;

    // Fallback: traverse known child arrays where present.
    if (Array.isArray(node.children)) {
      for (const c of node.children) walk(c, inCode);
    }
  }

  if (Array.isArray(ast.children)) {
    for (const c of ast.children) walk(c, false);
  }

  const output = applyEdits(source, edits);
  return { changed: output !== source, output, changeCount: edits.length };
}

function processMarkdownText(text) {
  // Minimal Markdown safety:
  // - Skip fenced code blocks (``` ... ```)
  // - Skip inline code (`...`)
  if (!text || (!text.includes("'") && !text.includes('"'))) return { changed: false, output: text, changeCount: 0 };

  const edits = [];
  let i = 0;
  let inFence = false;
  let fenceSeq = '';
  let inlineTick = false;
  let segmentStart = 0;

  function flushSegment(endExclusive) {
    if (endExclusive <= segmentStart) return;
    const seg = text.slice(segmentStart, endExclusive);
    const next = toSmartQuotes(seg);
    if (next !== seg) edits.push({ start: segmentStart, end: endExclusive, old: seg, replacement: next });
  }

  while (i < text.length) {
    // fenced code start/end
    if (!inlineTick && (text.startsWith('```', i) || text.startsWith('~~~', i))) {
      flushSegment(i);
      const seq = text.slice(i, i + 3);
      inFence = !inFence;
      fenceSeq = seq;
      // move to end of line
      while (i < text.length && text[i] !== '\n') i += 1;
      segmentStart = i;
      continue;
    }

    if (inFence) {
      i += 1;
      continue;
    }

    // inline code toggles on backticks
    if (text[i] === '`') {
      flushSegment(i);
      inlineTick = !inlineTick;
      i += 1;
      segmentStart = i;
      continue;
    }

    i += 1;
  }

  if (!inFence && !inlineTick) flushSegment(text.length);

  const output = applyEdits(text, edits);
  return { changed: output !== text, output, changeCount: edits.length };
}

function walkFiles(startPath, opts) {
  const results = [];
  const stack = [startPath];
  const ignoreDirs = new Set(['node_modules', 'dist', 'storybook-static', '.git', '.output']);

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    let st;
    try {
      st = fs.statSync(current);
    } catch {
      continue;
    }

    if (st.isDirectory()) {
      const base = path.basename(current);
      if (ignoreDirs.has(base)) continue;
      const entries = fs.readdirSync(current);
      for (const e of entries) stack.push(path.join(current, e));
      continue;
    }

    if (!st.isFile()) continue;

    const ext = path.extname(current).toLowerCase();
    if (!opts.exts.has(ext)) continue;
    results.push(current);
  }

  return results;
}

function parseArgValue(argv, flag) {
  const idx = argv.indexOf(flag);
  if (idx === -1) return null;
  const v = argv[idx + 1];
  if (!v || v.startsWith('--')) return null;
  return v;
}

function main() {
  const argv = process.argv.slice(2);
  const write = argv.includes('--write');
  const check = argv.includes('--check') || !write;

  const pathsArg = parseArgValue(argv, '--paths');
  const roots = (pathsArg ? pathsArg.split(',') : ['src']).map((p) => p.trim()).filter(Boolean);

  const extArg = parseArgValue(argv, '--ext');
  const exts = new Set(
    (extArg ? extArg.split(',') : ['.vue']).map((e) => e.trim().toLowerCase()).filter(Boolean)
  );

  const repoRoot = process.cwd();
  const files = [];
  for (const r of roots) {
    const abs = path.isAbsolute(r) ? r : path.join(repoRoot, r);
    files.push(...walkFiles(abs, { exts }));
  }

  let totalChangedFiles = 0;
  let totalChanges = 0;

  for (const filePath of files) {
    const text = readTextFile(filePath);
    if (typeof text !== 'string') continue;

    const ext = path.extname(filePath).toLowerCase();
    const res =
      ext === '.vue'
        ? processVueFile(filePath, text)
        : ext === '.md' || ext === '.mdx'
          ? processMarkdownText(text)
          : { changed: false, output: text, changeCount: 0 };

    if (!res.changed) continue;

    totalChangedFiles += 1;
    totalChanges += res.changeCount;

    const rel = path.relative(repoRoot, filePath);
    if (write) {
      writeTextFile(filePath, res.output);
      console.log(`smart-quotes: wrote ${rel} (${res.changeCount} change(s))`);
    } else {
      console.log(`smart-quotes: needs changes ${rel} (${res.changeCount} change(s))`);
    }
  }

  if (totalChangedFiles === 0) {
    console.log('smart-quotes: no changes needed.');
    process.exit(0);
  }

  if (check) {
    console.error(`smart-quotes: ${totalChangedFiles} file(s) need changes (${totalChanges} change(s)).`);
    process.exit(1);
  }

  console.log(`smart-quotes: updated ${totalChangedFiles} file(s) (${totalChanges} change(s)).`);
  process.exit(0);
}

main();

