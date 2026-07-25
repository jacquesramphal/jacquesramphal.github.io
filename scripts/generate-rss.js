/**
 * RSS 2.0 feed generator.
 *
 * Writes public/rss.xml from library.json so feed readers and AI crawlers can
 * discover and track new writing. Runs before the site build so the file is
 * copied into dist/.
 */

const fs = require('fs');
const path = require('path');
const { BASE_URL, parseEntryDate, urlFor, publishableEntries } = require('./content-utils');

const FEED_TITLE = 'Jacques Ramphal — Writing';
const FEED_DESCRIPTION =
  'Essays and case studies on design systems, agentic AI, and design engineering by Jacques Ramphal.';

function escapeXml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss() {
  const entries = publishableEntries(['article', 'case-study']);
  const now = new Date();

  const items = entries
    .map((e) => {
      const url = urlFor(e);
      const date = parseEntryDate(e.date) || now;
      const categories = (e.tags || [])
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');
      return [
        '    <item>',
        `      <title>${escapeXml(e.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${date.toUTCString()}</pubDate>`,
        `      <description>${escapeXml(e.description || '')}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE_URL}/</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function main() {
  const xml = buildRss();
  const outputPath = path.join(__dirname, '../public/rss.xml');
  fs.writeFileSync(outputPath, xml);
  const count = (xml.match(/<item>/g) || []).length;
  console.log(`✅ RSS feed generated: ${count} items → ${outputPath}`);
}

if (require.main === module) main();

module.exports = { buildRss };
