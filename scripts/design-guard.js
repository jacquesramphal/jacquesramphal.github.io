/* eslint-disable no-console */
/**
 * Repo-local "design guard" (lightweight)
 *
 * - Scans STAGED files only (git index)
 * - Warns on:
 *   - hardcoded lengths (px/rem/em/%/vw/vh/etc.) (except allowlisted values)
 *   - hardcoded colors (#fff, rgb(), hsl(), etc.)
 * - Never blocks commit (always exits 0)
 *
 * Disable on a line with: design-guard:ignore
 * Disable for an entire file with: design-guard:off
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const HARD_CODED_PX_RE = /(-?\d*\.?\d+)px\b/g;
// Includes common CSS length units. `%` is handled specially (no word-boundary).
// Notes:
// - We intentionally do NOT flag unitless numbers (e.g. line-height: 1.4)
// - We do flag hardcoded numeric lengths anywhere they appear on a line
const HARD_CODED_LENGTH_RE =
  /(-?\d*\.?\d+)(?:px|rem|em|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)\b|(-?\d*\.?\d+)%/g;
const HARD_CODED_COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(/g;

function runGit(args, opts = {}) {
  const res = spawnSync('git', args, { encoding: 'utf8', ...opts });
  return {
    code: res.status ?? 0,
    stdout: res.stdout ?? '',
    stderr: res.stderr ?? '',
  };
}

function globToRegExp(glob) {
  // Very small glob implementation: *, **, ?
  // - *  => any chars except path separator
  // - ** => any chars (including path separators)
  // - ?  => any single char except path separator
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '<<<ANY>>>')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]')
    .replace(/<<<ANY>>>/g, '.*');
  return new RegExp(`^${escaped}$`);
}

function loadConfig(repoRoot) {
  const configPath = path.join(repoRoot, 'design-guard.config.json');
  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      strict: Boolean(parsed.strict),
      include: Array.isArray(parsed.include) ? parsed.include : ['src'],
      exclude: Array.isArray(parsed.exclude) ? parsed.exclude : [],
      ignoreFiles: Array.isArray(parsed.ignoreFiles) ? parsed.ignoreFiles : [],
      rules: parsed.rules ?? { noHardcodedPx: true, noHardcodedColors: true },
      allow: parsed.allow ?? { px: ['0px', '1px'] },
    };
  } catch (e) {
    return {
      strict: false,
      include: ['src'],
      exclude: ['dist/**', 'node_modules/**', 'storybook-static/**'],
      ignoreFiles: [],
      rules: { noHardcodedPx: true, noHardcodedColors: true },
      allow: { px: ['0px', '1px'] },
    };
  }
}

function isPlainPathPattern(pattern) {
  return typeof pattern === 'string' && !/[*?]/.test(pattern);
}

function matchesAnyPattern(file, patterns) {
  const normalized = file.replace(/\\/g, '/');
  return (patterns ?? []).some((p) => {
    if (typeof p !== 'string' || !p.trim()) return false;
    const pattern = p.replace(/\\/g, '/').trim();
    if (normalized === pattern) return true;
    if (isPlainPathPattern(pattern) && normalized.startsWith(`${pattern}/`)) return true;
    return globToRegExp(pattern).test(normalized);
  });
}

function shouldScanFile(file, config) {
  const normalized = file.replace(/\\/g, '/');
  const isIncluded =
    config.include.length === 0 ||
    config.include.some((inc) => normalized === inc || normalized.startsWith(`${inc}/`) || globToRegExp(inc).test(normalized));

  if (!isIncluded) return false;

  if (matchesAnyPattern(normalized, config.ignoreFiles)) return false;
  const isExcluded = matchesAnyPattern(normalized, config.exclude);

  if (isExcluded) return false;

  // Only scan code + styles where px/colors matter
  const ext = path.extname(normalized).toLowerCase();
  return [
    '.vue',
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.css',
    '.scss',
    '.sass',
    '.less',
  ].includes(ext);
}

function getStagedFiles() {
  const res = runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMR']);
  if (res.code !== 0) return [];
  return res.stdout
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function getStagedFileContent(file) {
  // Read from git index, not working tree
  const res = runGit(['show', `:${file}`]);
  if (res.code !== 0) return null;
  const text = res.stdout;
  // skip binary-ish
  if (text.includes('\u0000')) return null;
  return text;
}

function stripForExcerpt(line) {
  return line.length > 160 ? `${line.slice(0, 157)}...` : line;
}

function scanText(file, text, config) {
  const allowPxSet = new Set((config.allow?.px ?? []).map(String));
  const allowLengthSet = new Set((config.allow?.lengths ?? []).map(String));
  const warnings = [];

  const lines = text.split(/\r?\n/);
  const fileOff = lines.some((l) => l.includes('design-guard:off'));
  if (fileOff) return warnings;

  const lengthsEnabled = Boolean(config.rules?.noHardcodedLengths);
  const pxEnabled = Boolean(config.rules?.noHardcodedPx) && !lengthsEnabled;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;
    if (line.includes('design-guard:ignore')) continue;

    if (pxEnabled) {
      HARD_CODED_PX_RE.lastIndex = 0;
      let m;
      while ((m = HARD_CODED_PX_RE.exec(line))) {
        const raw = m[0];
        if (allowPxSet.has(raw)) continue;
        warnings.push({
          rule: 'noHardcodedPx',
          file,
          line: i + 1,
          match: raw,
          excerpt: stripForExcerpt(line.trim()),
        });
      }
    }

    if (lengthsEnabled) {
      HARD_CODED_LENGTH_RE.lastIndex = 0;
      let m;
      while ((m = HARD_CODED_LENGTH_RE.exec(line))) {
        const raw = m[0];
        // Back-compat: still respect allow.px for px values
        if (raw.endsWith('px') && allowPxSet.has(raw)) continue;
        if (allowLengthSet.has(raw)) continue;
        warnings.push({
          rule: 'noHardcodedLengths',
          file,
          line: i + 1,
          match: raw,
          excerpt: stripForExcerpt(line.trim()),
        });
      }
    }

    if (config.rules?.noHardcodedColors) {
      HARD_CODED_COLOR_RE.lastIndex = 0;
      let m;
      while ((m = HARD_CODED_COLOR_RE.exec(line))) {
        const raw = m[0];
        warnings.push({
          rule: 'noHardcodedColors',
          file,
          line: i + 1,
          match: raw,
          excerpt: stripForExcerpt(line.trim()),
        });
      }
    }
  }

  return warnings;
}

function main() {
  const argv = process.argv.slice(2);
  const verbose = argv.includes('--verbose') || argv.includes('-v');
  const strictArg = argv.includes('--strict');
  const warnArg = argv.includes('--warn');

  const rootRes = runGit(['rev-parse', '--show-toplevel']);
  const repoRoot = rootRes.code === 0 ? rootRes.stdout.trim() : process.cwd();
  const config = loadConfig(repoRoot);

  const envModeRaw = (process.env.DESIGN_GUARD_MODE || '').trim().toLowerCase();
  const envStrictRaw = (process.env.DESIGN_GUARD_STRICT || '').trim().toLowerCase();

  const strictFromEnvMode = envModeRaw === 'strict' ? true : envModeRaw === 'warn' ? false : null;
  const strictFromEnvStrict =
    envStrictRaw === '1' || envStrictRaw === 'true' || envStrictRaw === 'yes'
      ? true
      : envStrictRaw === '0' || envStrictRaw === 'false' || envStrictRaw === 'no'
        ? false
        : null;

  const strictMode =
    warnArg ? false : strictArg ? true : strictFromEnvMode ?? strictFromEnvStrict ?? Boolean(config.strict);

  const stagedFiles = getStagedFiles().filter((f) => shouldScanFile(f, config));
  if (stagedFiles.length === 0) {
    if (verbose) {
      console.log('Design guard: no staged files to scan (run `git add` first).');
    }
    process.exit(0);
  }

  const allWarnings = [];

  for (const file of stagedFiles) {
    const content = getStagedFileContent(file);
    if (typeof content !== 'string') continue;
    const warnings = scanText(file, content, config);
    allWarnings.push(...warnings);
  }

  if (allWarnings.length === 0) {
    if (verbose) {
      console.log(`Design guard: no warnings across ${stagedFiles.length} staged file(s).`);
    }
    process.exit(0);
  }

  console.warn(`\nDesign guard warnings (${strictMode ? 'commit-blocking' : 'non-blocking'}):`);
  for (const w of allWarnings.slice(0, 250)) {
    console.warn(`- [${w.rule}] ${w.file}:${w.line} (${w.match})`);
    console.warn(`  ${w.excerpt}`);
  }
  if (allWarnings.length > 250) {
    console.warn(`- ... ${allWarnings.length - 250} more warnings omitted`);
  }
  console.warn(
    '\nNotes:\n' +
      `- Mode: ${strictMode ? 'STRICT (commit-blocking)' : 'WARNING-ONLY'}.\n` +
      '- Add `design-guard:ignore` to silence a single line, or `design-guard:off` to silence a whole file.\n' +
      '- Config supports `include`, `exclude`, and `ignoreFiles` (globs/paths) to control which staged files are scanned.\n'
  );

  if (strictMode) {
    console.warn('- Failing due to strict mode.\n');
    process.exit(1);
  }

  process.exit(0);
}

main();

