#!/usr/bin/env node
/**
 * Extracts CSS custom properties from _config.scss and generates
 * public/lab/lab.css — a standalone stylesheet that gives lab
 * experiments access to the same design tokens and theme support
 * as the main site.
 *
 * Run: node scripts/generate-lab-css.js
 * Hooked into: pnpm build (pre-build step)
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../src/assets/styles/scss/_config.scss');
const OUTPUT_PATH = path.join(__dirname, '../public/lab/lab.css');

const scss = fs.readFileSync(CONFIG_PATH, 'utf-8');

// ── Extract CSS blocks ──────────────────────────────────────

function extractBlock(source, startPattern) {
  const idx = source.indexOf(startPattern);
  if (idx === -1) return null;
  let depth = 0;
  let start = -1;
  for (let i = idx; i < source.length; i++) {
    if (source[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (source[i] === '}') {
      depth--;
      if (depth === 0) {
        return source.slice(idx, i + 1);
      }
    }
  }
  return null;
}

function extractMediaBlock(source, mediaQuery) {
  const idx = source.indexOf(mediaQuery);
  if (idx === -1) return null;
  let depth = 0;
  for (let i = idx; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) return source.slice(idx, i + 1);
    }
  }
  return null;
}

// Filter out SCSS-only syntax ($variables, @media print nested inside :root, etc.)
function cleanBlock(block) {
  return block
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove SCSS variables
      if (trimmed.startsWith('$')) return false;
      // Remove @media print (nested inside :root — invalid in plain CSS)
      if (trimmed.startsWith('@media print')) return false;
      if (trimmed.startsWith('@page')) return false;
      // Remove design-guard comments on their own line
      if (trimmed === '/* design-guard:ignore */') return false;
      return true;
    })
    .join('\n')
    // Remove the @media print block entirely (it's nested in :root which is invalid CSS)
    .replace(/@media print\s*\{[\s\S]*?\n\s*\}/g, '');
}

// Remove the nested @media print block from :root (multi-level nesting)
function removeNestedMediaPrint(block) {
  // Find @media print inside the block and remove everything until its closing brace
  let result = block;
  const printIdx = result.indexOf('@media print');
  if (printIdx === -1) return result;

  // Find the matching closing brace
  let depth = 0;
  let startBrace = -1;
  for (let i = printIdx; i < result.length; i++) {
    if (result[i] === '{') {
      if (startBrace === -1) startBrace = i;
      depth++;
    } else if (result[i] === '}') {
      depth--;
      if (depth === 0) {
        // Remove from @media print to this closing brace
        result = result.slice(0, printIdx) + result.slice(i + 1);
        break;
      }
    }
  }
  return result;
}

const rootBlock = extractBlock(scss, '\n:root {');
const darkBlock = extractBlock(scss, ':root.dark-theme {');
const lightBlock = extractBlock(scss, ':root.light-theme {');
const prefersBlock = extractMediaBlock(scss, '@media (prefers-color-scheme: dark)');

const cleanRoot = rootBlock ? cleanBlock(removeNestedMediaPrint(rootBlock)) : '';
const cleanDark = darkBlock ? cleanBlock(darkBlock) : '';
const cleanLight = lightBlock ? cleanBlock(lightBlock) : '';
const cleanPrefers = prefersBlock ? cleanBlock(prefersBlock) : '';

// ── Generate output ─────────────────────────────────────────

const output = `/*
 * lab.css — Auto-generated from _config.scss
 * DO NOT EDIT — run: node scripts/generate-lab-css.js
 *
 * Provides the same design tokens and theme support as the main site.
 * Labs automatically respect light/dark mode via prefers-color-scheme
 * and the .dark-theme / .light-theme class toggles.
 */

/* ── Google Fonts ────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@250;300;350;400;450;500;550;600;700;800&display=swap');

/* ── Reset ───────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Tokens (extracted from _config.scss) ── */

${cleanRoot}

${cleanDark}

${cleanPrefers}

${cleanLight}

/* ── Base & reset (from typography.scss) ── */

* {
  font-kerning: auto;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5, h6, p { margin: 0; }

html {
  font-size: 62.5%; /* 1rem = 10px, matching main site */
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--fontFamily-primary);
  font-weight: var(--fontWeight-normal);
  letter-spacing: var(--letterSpacing-base);
  min-height: 100vh;
}

/* ── Headings (matching main site) ───────── */

h1 {
  font-size: var(--font-900);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-shorter);
  letter-spacing: var(--letterSpacing-tight);
  font-variation-settings: 'YAXS' 400, 'wdth' 110, 'opsz' 96;
}

h2 {
  font-size: var(--size-9);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-base);
  letter-spacing: var(--letterSpacing-tight);
  font-variation-settings: 'YAXS' 400, 'wdth' 105, 'opsz' 56;
}

h3 {
  font-size: var(--font-700);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-base);
  letter-spacing: var(--letterSpacing-base);
  font-variation-settings: 'YAXS' 400, 'wdth' 110, 'opsz' 36;
}

h4 {
  font-size: var(--font-600);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-tall);
  font-variation-settings: 'YAXS' 400, 'wdth' 100, 'opsz' 24;
}

h5 {
  font-size: var(--font-500);
  font-weight: var(--fontWeight-medium);
  line-height: var(--lineHeight-tall);
  font-variation-settings: 'YAXS' 400, 'wdth' 110, 'opsz' 18;
}

h6 {
  font-size: var(--font-400);
  font-weight: var(--fontWeight-medium);
  line-height: var(--lineHeight-tall);
  letter-spacing: var(--letterSpacing-loose);
  text-transform: uppercase;
  font-variation-settings: 'YAXS' 400, 'wdth' 115, 'opsz' 14;
}

/* ── Body text ───────────────────────────── */

p, li, blockquote, td, label {
  font-weight: var(--fontWeight-medium);
  font-size: var(--font-500);
  line-height: var(--lineHeight-taller);
  color: rgba(var(--foreground-rgb), 0.75);
  font-variation-settings: 'wdth' 102, 'opsz' 14;
}

h1 + p {
  font-size: var(--font-p-lead);
}

strong, b {
  color: rgba(var(--foreground-rgb), 1);
  font-weight: var(--fontWeight-bold);
}

/* ── Links ────────────────────────────────── */

a {
  color: var(--foreground);
  font-weight: var(--fontWeight-medium);
  font-size: var(--font-500);
  text-decoration: underline;
  text-underline-offset: var(--link-underline-offset);
  text-decoration-thickness: var(--link-underline-thickness);
  font-variation-settings: 'wdth' 100, 'opsz' 19;
  transition: font-variation-settings 0.2s ease;
}

a:hover {
  text-decoration: underline wavy var(--foreground);
  text-underline-offset: var(--link-underline-offset);
  text-decoration-thickness: var(--link-underline-thickness-hover);
  font-variation-settings: 'wdth' 112, 'opsz' 19;
}

code, pre {
  font-family: 'Courier New', Courier, monospace;
}

/* ── Responsive (from typography.scss) ───── */

@media only screen and (max-width: 767px) {
  h2 { font-size: var(--size-9); }
  h3 { font-size: var(--size-7); }
  h4 { font-size: var(--size-6); }
  h5 { font-size: var(--size-5); }
  h6 { font-size: var(--size-4); }
}

@media only screen and (min-width: 768px) {
  h2 { font-size: var(--size-12); }
}

/* ── Utility classes ─────────────────────── */

.eyebrow {
  font-size: var(--font-3xs);
  font-weight: var(--fontWeight-medium);
  letter-spacing: var(--letterSpacing-loose);
  text-transform: uppercase;
  color: var(--text-muted);
}

.muted { color: var(--text-muted); }
.subtle { opacity: 0.75; }

/* ── Lab layout patterns ─────────────────── */

.lab-header {
  max-width: 96rem;
  margin: 0 auto;
  padding: var(--spacing-big) var(--spacing-sm);
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.lab-header h1 {
  font-size: var(--font-2xs);
  font-weight: var(--fontWeight-medium);
  letter-spacing: var(--letterSpacing-loose);
  text-transform: uppercase;
}

.lab-header p {
  font-size: var(--font-3xs);
  color: var(--text-muted);
  margin-bottom: 0;
}

.lab-toggle {
  display: flex;
  border: var(--border);
  border-radius: var(--radius-sm);
}

.lab-toggle button {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--fontFamily-primary);
  font-size: var(--font-3xs);
  font-weight: var(--fontWeight-medium);
  letter-spacing: var(--letterSpacing-loose);
  padding: var(--spacing-xxs) var(--spacing-xs);
  cursor: pointer;
  text-transform: uppercase;
  transition: color 0.15s, background 0.15s;
}

.lab-toggle button.active {
  background: var(--background-darker);
  color: var(--foreground);
}

.lab-toggle button:not(:last-child) {
  border-right: var(--border);
}

.lab-toggle button:hover:not(.active) {
  color: var(--foreground);
}

.lab-label {
  font-size: var(--font-3xs);
  font-weight: var(--fontWeight-medium);
  letter-spacing: var(--letterSpacing-loose);
  text-transform: uppercase;
  color: var(--text-muted);
  padding-bottom: var(--spacing-xxxs);
  border-bottom: var(--border);
  margin-bottom: var(--spacing-xxs);
}

/* ── Scrollbar ───────────────────────────── */

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-medium); border-radius: 2px; }

/* ── Hidden ──────────────────────────────── */

[hidden] { display: none !important; }
`;

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');
console.log('✓ Generated public/lab/lab.css from _config.scss');
