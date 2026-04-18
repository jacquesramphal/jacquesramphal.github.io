#!/usr/bin/env node
/**
 * Runs the component validation agent against one or more Storybook story files.
 * Loads client rules + COMPONENT_MANIFEST, calls Claude via start-agent.js,
 * writes a JSON report, and exits non-zero if any component fails.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY          — required
 *   STORYBOOK_ROOT             — path to the client Storybook root (default: ./storybook-blank)
 *   CLIENT_RULES_PATH          — path to client-rules.md (default: ./rules/client-rules.md)
 *   VALIDATION_OUTPUT          — where to write the report (default: ./validation-report.json)
 *
 * Usage:
 *   node scripts/validate.js                              # validate all stories
 *   node scripts/validate.js src/components/Hero.stories.tsx   # validate one file
 *   node scripts/validate.js --summary                   # print summary only (no full JSON)
 */

const fs = require('fs');
const path = require('path');
const { runAgent } = require('./start-agent');

const STORYBOOK_ROOT = process.env.STORYBOOK_ROOT || './storybook-blank';
const CLIENT_RULES_PATH = process.env.CLIENT_RULES_PATH || './rules/client-rules.md';
const VALIDATION_OUTPUT = process.env.VALIDATION_OUTPUT || './validation-report.json';
const PROMPT_PATH = path.join(__dirname, '../prompts/validate-component.md');
const MANIFEST_PATH = path.join(STORYBOOK_ROOT, 'COMPONENT_MANIFEST.json');

async function main() {
  const args = process.argv.slice(2).filter(a => a !== '--summary');
  const summaryOnly = process.argv.includes('--summary');

  const systemPrompt = loadRequired(PROMPT_PATH, 'Validation system prompt');
  const clientRules = loadRequired(CLIENT_RULES_PATH, 'Client rules');
  const manifest = loadManifest(MANIFEST_PATH);

  const storyFiles = args.length > 0
    ? args
    : findStoryFiles(STORYBOOK_ROOT);

  if (storyFiles.length === 0) {
    console.error(`No story files found under ${STORYBOOK_ROOT}`);
    process.exit(1);
  }

  console.log(`Validating ${storyFiles.length} story file(s)...\n`);

  const results = [];
  let failCount = 0;
  let reviewCount = 0;

  for (const storyFile of storyFiles) {
    process.stdout.write(`  ${path.relative(process.cwd(), storyFile)} ... `);

    const storyContent = fs.readFileSync(storyFile, 'utf8');

    let result;
    try {
      result = await runAgent({ systemPrompt, storyContent, manifest, clientRules });
      result.storyFile = path.relative(STORYBOOK_ROOT, storyFile);
    } catch (err) {
      result = {
        component: path.basename(storyFile, '.stories.tsx'),
        storyFile: path.relative(STORYBOOK_ROOT, storyFile),
        validatedAt: new Date().toISOString(),
        overallStatus: 'fail',
        checks: {},
        proposed: [],
        humanReviewRequired: true,
        humanReviewReasons: [`Agent error: ${err.message}`]
      };
    }

    results.push(result);

    if (result.overallStatus === 'fail') {
      failCount++;
      console.log('FAIL');
    } else if (result.overallStatus === 'needs-review') {
      reviewCount++;
      console.log('NEEDS REVIEW');
    } else {
      console.log('pass');
    }
  }

  console.log('');
  printSummary(results, failCount, reviewCount);

  if (!summaryOnly) {
    fs.writeFileSync(VALIDATION_OUTPUT, JSON.stringify(results, null, 2));
    console.log(`\nFull report written to: ${VALIDATION_OUTPUT}`);
  }

  if (failCount > 0) {
    printFailDetails(results);
    process.exit(1);
  }

  if (reviewCount > 0) {
    printReviewDetails(results);
  }
}

function printSummary(results, failCount, reviewCount) {
  const total = results.length;
  const passCount = total - failCount - reviewCount;
  console.log(`Results: ${passCount} passed · ${reviewCount} need review · ${failCount} failed`);
}

function printFailDetails(results) {
  const failed = results.filter(r => r.overallStatus === 'fail');
  console.log('\n── Failures ─────────────────────────────────────');
  for (const r of failed) {
    console.log(`\n${r.component} (${r.storyFile})`);
    for (const [checkName, check] of Object.entries(r.checks || {})) {
      if (check.status === 'fail' || check.status === 'mismatch') {
        console.log(`  ${checkName}: ${check.status}`);
        for (const finding of check.findings || []) {
          console.log(`    · ${finding}`);
        }
      }
    }
    for (const reason of r.humanReviewReasons || []) {
      console.log(`  · ${reason}`);
    }
  }
}

function printReviewDetails(results) {
  const needsReview = results.filter(r => r.overallStatus === 'needs-review');
  console.log('\n── Needs human review ───────────────────────────');
  for (const r of needsReview) {
    console.log(`\n${r.component} (${r.storyFile})`);
    for (const item of r.proposed || []) {
      console.log(`  ⚠ Proposed: ${item.argType} — ${item.action}`);
    }
    for (const reason of r.humanReviewReasons || []) {
      console.log(`  · ${reason}`);
    }
  }
}

function loadRequired(filePath, label) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    console.error(`${label} not found at: ${resolved}`);
    process.exit(1);
  }
  return fs.readFileSync(resolved, 'utf8');
}

function loadManifest(manifestPath) {
  const resolved = path.resolve(manifestPath);
  if (!fs.existsSync(resolved)) {
    console.warn(`COMPONENT_MANIFEST.json not found at ${resolved} — running without manifest.`);
    return { components: [] };
  }
  return JSON.parse(fs.readFileSync(resolved, 'utf8'));
}

function findStoryFiles(storybookRoot) {
  const root = path.resolve(storybookRoot);
  if (!fs.existsSync(root)) {
    return [];
  }
  return walk(root).filter(f => f.endsWith('.stories.tsx') || f.endsWith('.stories.ts'));
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
