#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * @jacquesramphal/design-guard
 *
 * - Scans STAGED files only (git index)
 * - Warns on:
 *   - hardcoded lengths (px/rem/em/%/vw/vh/etc.) (except allowlisted values)
 *   - hardcoded colors (#fff, rgb(), hsl(), etc.)
 *
 * Disable on a line with: design-guard:ignore
 * Disable for an entire file with: design-guard:off
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const HARD_CODED_PX_RE = /(-?\d*\.?\d+)px\b/g;
const HARD_CODED_LENGTH_RE =
  /(-?\d*\.?\d+)(?:px|rem|em|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)\b|(-?\d*\.?\d+)%/g;
const HARD_CODED_COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(/g;

function runGit(args, opts = {}) {
  const res = spawnSync("git", args, { encoding: "utf8", ...opts });
  return {
    code: res.status ?? 0,
    stdout: res.stdout ?? "",
    stderr: res.stderr ?? "",
  };
}

function globToRegExp(glob) {
  // Very small glob implementation: *, **, ?
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "<<<ANY>>>")
    .replace(/\*/g, "[^/]*")
    .replace(/\?/g, "[^/]")
    .replace(/<<<ANY>>>/g, ".*");
  return new RegExp(`^${escaped}$`);
}

function isPlainPathPattern(pattern) {
  return typeof pattern === "string" && !/[*?]/.test(pattern);
}

function matchesAnyPattern(file, patterns) {
  const normalized = file.replace(/\\/g, "/");
  return (patterns ?? []).some((p) => {
    if (typeof p !== "string" || !p.trim()) return false;
    const pattern = p.replace(/\\/g, "/").trim();
    if (normalized === pattern) return true;
    if (isPlainPathPattern(pattern) && normalized.startsWith(`${pattern}/`)) return true;
    return globToRegExp(pattern).test(normalized);
  });
}

function loadDefaultConfig() {
  const defaultPath = path.join(__dirname, "default-config.json");
  try {
    return JSON.parse(fs.readFileSync(defaultPath, "utf8"));
  } catch {
    return {
      strict: false,
      include: ["src"],
      exclude: ["dist/**", "node_modules/**", "storybook-static/**"],
      ignoreFiles: [],
      rules: { noHardcodedLengths: true, noHardcodedColors: true },
      allow: { px: ["0px", "1px"], lengths: ["0%", "100%"] },
    };
  }
}

function loadConfig(repoRoot) {
  const defaultConfig = loadDefaultConfig();
  const configPath = path.join(repoRoot, "design-guard.config.json");

  try {
    const raw = fs.readFileSync(configPath, "utf8");
    const parsed = JSON.parse(raw);
    return {
      ...defaultConfig,
      ...parsed,
      include: Array.isArray(parsed.include) ? parsed.include : defaultConfig.include,
      exclude: Array.isArray(parsed.exclude) ? parsed.exclude : defaultConfig.exclude,
      ignoreFiles: Array.isArray(parsed.ignoreFiles) ? parsed.ignoreFiles : defaultConfig.ignoreFiles,
      rules: parsed.rules ?? defaultConfig.rules,
      allow: parsed.allow ?? defaultConfig.allow,
    };
  } catch {
    return defaultConfig;
  }
}

function writeInitConfig(destPath) {
  const raw = JSON.stringify(loadDefaultConfig(), null, 2) + "\n";
  fs.writeFileSync(destPath, raw, "utf8");
}

function shouldScanFile(file, config) {
  const normalized = file.replace(/\\/g, "/");

  const isIncluded =
    (config.include?.length ?? 0) === 0 ||
    config.include.some(
      (inc) => normalized === inc || normalized.startsWith(`${inc}/`) || globToRegExp(inc).test(normalized)
    );
  if (!isIncluded) return false;

  if (matchesAnyPattern(normalized, config.ignoreFiles)) return false;
  if (matchesAnyPattern(normalized, config.exclude)) return false;

  const ext = path.extname(normalized).toLowerCase();
  return [".vue", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less"].includes(ext);
}

function getStagedFiles() {
  const res = runGit(["diff", "--cached", "--name-only", "--diff-filter=ACMR"]);
  if (res.code !== 0) return [];
  return res.stdout
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function getStagedFileContent(file) {
  const res = runGit(["show", `:${file}`]);
  if (res.code !== 0) return null;
  const text = res.stdout;
  if (text.includes("\u0000")) return null;
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
  const fileOff = lines.some((l) => l.includes("design-guard:off"));
  if (fileOff) return warnings;

  const lengthsEnabled = Boolean(config.rules?.noHardcodedLengths);
  const pxEnabled = Boolean(config.rules?.noHardcodedPx) && !lengthsEnabled;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;
    if (line.includes("design-guard:ignore")) continue;

    if (pxEnabled) {
      HARD_CODED_PX_RE.lastIndex = 0;
      let m;
      while ((m = HARD_CODED_PX_RE.exec(line))) {
        const raw = m[0];
        if (allowPxSet.has(raw)) continue;
        warnings.push({
          rule: "noHardcodedPx",
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
        if (raw.endsWith("px") && allowPxSet.has(raw)) continue;
        if (allowLengthSet.has(raw)) continue;
        warnings.push({
          rule: "noHardcodedLengths",
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
          rule: "noHardcodedColors",
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

function help() {
  console.log(
    [
      "@jacquesramphal/design-guard",
      "",
      "Usage:",
      "  design-guard [--verbose] [--strict|--warn]",
      "  design-guard --init                      # write default design-guard.config.json in repo root",
      "",
      "Notes:",
      "- Scans STAGED files only (run `git add` first).",
      "- Add `design-guard:ignore` to silence a line; `design-guard:off` for a whole file.",
      "",
    ].join("\n")
  );
}

function main() {
  const argv = process.argv.slice(2);
  const verbose = argv.includes("--verbose") || argv.includes("-v");
  const strictArg = argv.includes("--strict");
  const warnArg = argv.includes("--warn");

  if (argv.includes("--help") || argv.includes("-h")) {
    help();
    process.exit(0);
  }

  const rootRes = runGit(["rev-parse", "--show-toplevel"]);
  const repoRoot = rootRes.code === 0 ? rootRes.stdout.trim() : process.cwd();

  if (argv.includes("--init")) {
    const dest = path.join(repoRoot, "design-guard.config.json");
    if (fs.existsSync(dest)) {
      console.log(`design-guard: config already exists at ${path.relative(process.cwd(), dest)}`);
      process.exit(0);
    }
    writeInitConfig(dest);
    console.log(`design-guard: wrote ${path.relative(process.cwd(), dest)}`);
    process.exit(0);
  }

  const config = loadConfig(repoRoot);

  const envModeRaw = (process.env.DESIGN_GUARD_MODE || "").trim().toLowerCase();
  const envStrictRaw = (process.env.DESIGN_GUARD_STRICT || "").trim().toLowerCase();
  const strictFromEnvMode = envModeRaw === "strict" ? true : envModeRaw === "warn" ? false : null;
  const strictFromEnvStrict =
    envStrictRaw === "1" || envStrictRaw === "true" || envStrictRaw === "yes"
      ? true
      : envStrictRaw === "0" || envStrictRaw === "false" || envStrictRaw === "no"
        ? false
        : null;

  const strictMode =
    warnArg ? false : strictArg ? true : strictFromEnvMode ?? strictFromEnvStrict ?? Boolean(config.strict);

  const stagedFiles = getStagedFiles().filter((f) => shouldScanFile(f, config));
  if (stagedFiles.length === 0) {
    if (verbose) console.log("design-guard: no staged files to scan (run `git add` first).");
    process.exit(0);
  }

  const allWarnings = [];
  for (const file of stagedFiles) {
    const content = getStagedFileContent(file);
    if (typeof content !== "string") continue;
    allWarnings.push(...scanText(file, content, config));
  }

  if (allWarnings.length === 0) {
    if (verbose) console.log(`design-guard: no warnings across ${stagedFiles.length} staged file(s).`);
    process.exit(0);
  }

  console.warn(`\ndesign-guard warnings (${strictMode ? "commit-blocking" : "non-blocking"}):`);
  for (const w of allWarnings.slice(0, 250)) {
    console.warn(`- [${w.rule}] ${w.file}:${w.line} (${w.match})`);
    console.warn(`  ${w.excerpt}`);
  }
  if (allWarnings.length > 250) console.warn(`- ... ${allWarnings.length - 250} more warnings omitted`);

  console.warn(
    "\nNotes:\n" +
      `- Mode: ${strictMode ? "STRICT (commit-blocking)" : "WARNING-ONLY"}.\n` +
      "- Config: `design-guard.config.json` at repo root (or package defaults).\n" +
      "- Add `design-guard:ignore` to silence a line, or `design-guard:off` to silence a whole file.\n"
  );

  process.exit(strictMode ? 1 : 0);
}

main();

