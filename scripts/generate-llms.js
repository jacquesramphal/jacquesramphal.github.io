/**
 * llms.txt generator (https://llmstxt.org).
 *
 * Writes public/llms.txt: a clean, LLM-readable index of the site's best
 * content, so answer engines can find and cite the writing, case studies, and
 * tools without executing JavaScript or guessing at structure. Runs before the
 * site build so the file is copied into dist/.
 */

const fs = require('fs');
const path = require('path');
const { BASE_URL, urlFor, publishableEntries } = require('./content-utils');

const SUMMARY =
  'Personal site of Jacques Ramphal — a design lead working where design systems, code, and agentic AI meet.';

const INTRO =
  'This is a record of work and writing, not a portfolio pitch. It covers design systems, ' +
  'design tokens, agentic AI, and the practice of bridging design and engineering. Content is ' +
  'employer-agnostic and written to stay useful over time.';

function line(entry) {
  const url = urlFor(entry);
  const desc = (entry.description || '').trim();
  return desc ? `- [${entry.title}](${url}): ${desc}` : `- [${entry.title}](${url})`;
}

// A block is a chunk with no leading/trailing blank lines; blocks are joined
// by a single blank line. Empty sections drop out entirely.
function section(heading, entries) {
  if (!entries.length) return null;
  return `## ${heading}\n\n${entries.map(line).join('\n')}`;
}

function buildLlmsTxt() {
  const blocks = [
    `# Jacques Ramphal\n\n> ${SUMMARY}\n\n${INTRO}`,
    section('Writing', publishableEntries(['article'])),
    section('Case Studies', publishableEntries(['case-study'])),
    section('Tools', publishableEntries(['tool'])),
    [
      '## Key Pages',
      '',
      `- [About](${BASE_URL}/doc/info): Who I am and what this site is.`,
      `- [Résumé](${BASE_URL}/resume): Experience and background.`,
      `- [Writing index](${BASE_URL}/writing): All essays.`,
      `- [Work index](${BASE_URL}/work): Selected case studies.`,
    ].join('\n'),
  ];

  return blocks.filter(Boolean).join('\n\n') + '\n';
}

function main() {
  const txt = buildLlmsTxt();
  const outputPath = path.join(__dirname, '../public/llms.txt');
  fs.writeFileSync(outputPath, txt);
  const count = (txt.match(/^- \[/gm) || []).length;
  console.log(`✅ llms.txt generated: ${count} links → ${outputPath}`);
}

if (require.main === module) main();

module.exports = { buildLlmsTxt };
