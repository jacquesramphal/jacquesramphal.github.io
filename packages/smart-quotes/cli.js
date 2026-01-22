#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const { toSmartQuotes, toSmartQuotesInsideAttributeValue } = require("./index.js");

function help() {
  console.log(
    [
      "@jacquesramphal/smart-quotes",
      "",
      "Usage:",
      "  smart-quotes [paths...]               # scan repo/files (default: .) in check mode",
      "  smart-quotes [paths...] --write       # apply fixes",
      "  smart-quotes [paths...] --check       # check only (exit 1 if changes needed)",
      "",
      "Options:",
      "  --ext .vue,.md,.mdx                   # extensions to scan (default: .vue,.md,.mdx)",
      "  --paths src,content                   # comma-separated roots (alternative to positional paths)",
      "  --stdin                               # read from stdin → stdout (string transform mode)",
      "  --attr                                # (stdin mode) preserve outer attribute quotes",
      "",
      "Examples:",
      "  smart-quotes --check",
      "  smart-quotes src/pages/HomePage.vue --write",
      "  smart-quotes --paths src --ext .vue --write",
      "  echo '\"I\\'m \"Jacques\"\"' | smart-quotes --stdin --attr",
      "",
    ].join("\n")
  );
}

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  help();
  process.exit(0);
}

function parseArgValue(args, flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  const v = args[idx + 1];
  if (!v || v.startsWith("--")) return null;
  return v;
}

function readTextFile(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.includes(0)) return null;
  return buf.toString("utf8");
}

function writeTextFile(filePath, text) {
  fs.writeFileSync(filePath, text, "utf8");
}

function applyEdits(source, edits) {
  if (edits.length === 0) return source;
  const sorted = edits.slice().sort((a, b) => b.start - a.start);
  let out = source;
  for (const e of sorted) {
    if (e.start < 0 || e.end < e.start || e.end > out.length) continue;
    const current = out.slice(e.start, e.end);
    if (typeof e.old === "string" && current !== e.old) continue;
    out = out.slice(0, e.start) + e.replacement + out.slice(e.end);
  }
  return out;
}

function shouldTransformAttribute(name) {
  const n = String(name || "").toLowerCase();
  if (!n) return false;

  if (
    n === "class" ||
    n === "style" ||
    n === "id" ||
    n === "href" ||
    n === "src" ||
    n === "srcset" ||
    n === "to" ||
    n === "name" ||
    n === "type" ||
    n === "rel" ||
    n === "target"
  ) {
    return false;
  }

  if (n.startsWith("aria-")) return true;

  return new Set([
    "title",
    "subtitle",
    "label",
    "labeltwo",
    "eyebrow",
    "description",
    "detail",
    "detail1",
    "detail2",
    "alt",
    "placeholder",
  ]).has(n);
}

function processMarkdownText(text) {
  if (!text || (!text.includes("'") && !text.includes('"'))) return { changed: false, output: text, changeCount: 0 };

  const edits = [];
  let i = 0;
  let inFence = false;
  let fenceMarker = "";
  let inlineTick = false;
  let segmentStart = 0;

  function flushSegment(endExclusive) {
    if (endExclusive <= segmentStart) return;
    const seg = text.slice(segmentStart, endExclusive);
    const next = toSmartQuotes(seg);
    if (next !== seg) edits.push({ start: segmentStart, end: endExclusive, old: seg, replacement: next });
  }

  function isLineStart(idx) {
    return idx === 0 || text[idx - 1] === "\n";
  }

  function advanceToAfterLine(idx) {
    let k = idx;
    while (k < text.length && text[k] !== "\n") k += 1;
    if (k < text.length && text[k] === "\n") k += 1;
    return k;
  }

  function findMatchingParen(openParenIdx) {
    let depth = 0;
    for (let k = openParenIdx; k < text.length; k += 1) {
      const ch = text[k];
      if (ch === "\\" && k + 1 < text.length) {
        k += 1; // skip escaped next char
        continue;
      }
      if (ch === "(") depth += 1;
      if (ch === ")") {
        depth -= 1;
        if (depth === 0) return k;
      }
      // stop at newline to avoid eating the whole doc on malformed links
      if (ch === "\n" && depth > 0) return -1;
    }
    return -1;
  }

  while (i < text.length) {
    // fenced code blocks (only at line start). Never transform content inside.
    if (!inlineTick && isLineStart(i) && (text.startsWith("```", i) || text.startsWith("~~~", i))) {
      const marker = text.slice(i, i + 3);
      if (!inFence) {
        flushSegment(i);
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = "";
      }
      i = advanceToAfterLine(i);
      segmentStart = i;
      continue;
    }

    if (inFence) {
      i += 1;
      continue;
    }

    // Skip raw HTML tags so we don't "smart quote" attribute delimiters.
    // Supports multi-line tags (e.g. <img ...\n ...>).
    if (!inlineTick && text[i] === "<") {
      const next = text[i + 1] ?? "";
      const looksLikeTag = /[A-Za-z!/]/.test(next);
      if (looksLikeTag) {
        const gt = text.indexOf(">", i + 1);
        // Safety: don't skip huge ranges if the tag is malformed.
        if (gt !== -1 && gt - i <= 2000) {
          flushSegment(i);
          i = gt + 1;
          segmentStart = i;
          continue;
        }
      }
    }

    // Skip markdown link/image destinations: ]( ... ) (including ![alt](...))
    if (!inlineTick && text[i] === "]" && text[i + 1] === "(") {
      const close = findMatchingParen(i + 1);
      if (close !== -1) {
        flushSegment(i + 2);
        i = close + 1;
        segmentStart = i;
        continue;
      }
    }

    if (text[i] === "`") {
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

function processVueFile(filePath, source) {
  // Lazy-load Vue compilers (keeps require cost low in non-.vue runs)
  const { parse: parseSfc } = require("@vue/compiler-sfc");
  const { parse: parseTemplate, NodeTypes } = require("@vue/compiler-dom");

  const parsed = parseSfc(source, { filename: filePath });
  const tpl = parsed.descriptor.template;
  if (!tpl || typeof tpl.content !== "string") {
    return { changed: false, output: source, changeCount: 0 };
  }

  const templateContent = tpl.content;
  const baseGuess = tpl.loc?.start?.offset ?? 0;
  const base = source.indexOf(templateContent, Math.max(0, baseGuess - 50));
  if (base < 0) return { changed: false, output: source, changeCount: 0 };

  const ast = parseTemplate(templateContent, { comments: true });
  const edits = [];

  function addEdit(relStart, relEnd, oldText, newText) {
    if (newText === oldText) return;
    if (!newText) return;
    edits.push({ start: base + relStart, end: base + relEnd, old: oldText, replacement: newText });
  }

  function walk(node, inCode) {
    if (!node) return;

    if (node.type === NodeTypes.ELEMENT) {
      const tag = String(node.tag || "").toLowerCase();
      const nextInCode = inCode || tag === "pre" || tag === "code";

      if (!nextInCode && Array.isArray(node.props)) {
        for (const p of node.props) {
          if (!p) continue;
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
      const oldText = node.loc?.source ?? "";
      if (!oldText) return;
      const newText = toSmartQuotes(oldText);
      addEdit(node.loc.start.offset, node.loc.end.offset, oldText, newText);
      return;
    }

    if (node.type === NodeTypes.INTERPOLATION) return;
    if (node.type === NodeTypes.COMMENT) return;
    if (Array.isArray(node.children)) for (const c of node.children) walk(c, inCode);
  }

  if (Array.isArray(ast.children)) for (const c of ast.children) walk(c, false);

  const output = applyEdits(source, edits);
  return { changed: output !== source, output, changeCount: edits.length };
}

function walkFiles(startPath, opts) {
  const results = [];
  const stack = [startPath];
  const ignoreDirs = new Set(["node_modules", "dist", "storybook-static", ".git", ".output", "coverage", "build"]);

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
      for (const e of fs.readdirSync(current)) stack.push(path.join(current, e));
      continue;
    }

    if (!st.isFile()) continue;
    const ext = path.extname(current).toLowerCase();
    if (!opts.exts.has(ext)) continue;
    results.push(current);
  }

  return results;
}

function runScanner() {
  const write = argv.includes("--write");
  const check = argv.includes("--check") || !write;

  const extArg = parseArgValue(argv, "--ext");
  const exts = new Set(
    (extArg ? extArg.split(",") : [".vue", ".md", ".mdx"]).map((e) => e.trim().toLowerCase()).filter(Boolean)
  );

  const pathsArg = parseArgValue(argv, "--paths");
  // If --paths is present, do NOT also treat its value as a positional path
  // (otherwise we scan the same file twice).
  const rootsRaw = (pathsArg ? pathsArg.split(",") : argv.filter((a) => a && !a.startsWith("-")))
    .map((p) => p.trim())
    .filter(Boolean);

  const roots = rootsRaw.length ? rootsRaw : ["."];
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
    if (typeof text !== "string") continue;

    const ext = path.extname(filePath).toLowerCase();
    const res =
      ext === ".vue"
        ? processVueFile(filePath, text)
        : ext === ".md" || ext === ".mdx"
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
    console.log("smart-quotes: no changes needed.");
    process.exit(0);
  }

  if (check) {
    console.error(`smart-quotes: ${totalChangedFiles} file(s) need changes (${totalChanges} change(s)).`);
    process.exit(1);
  }

  console.log(`smart-quotes: updated ${totalChangedFiles} file(s) (${totalChanges} change(s)).`);
  process.exit(0);
}

function runStdin() {
  const asAttr = argv.includes("--attr");
  let input = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    input += chunk;
  });
  process.stdin.on("end", () => {
    const out = asAttr ? toSmartQuotesInsideAttributeValue(input.trimEnd()) : toSmartQuotes(input.trimEnd());
    process.stdout.write(out);
    if (!out.endsWith("\n")) process.stdout.write("\n");
  });
}

if (argv.includes("--stdin")) {
  runStdin();
} else {
  runScanner();
}

