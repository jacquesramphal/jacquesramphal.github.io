// Minimal build: bundle the split source (index.html + styles.css + app.js +
// content/*.md + fonts/*) into a single self-contained preview.html.
//
// This exists only because a Claude artifact (and any strict-CSP host) can't load
// external files or fetch — so we inline the CSS with fonts as data URIs, inline the
// JS, and embed the article Markdown as base64. The SPLIT files are the real source;
// preview.html is generated. Run:  node build-inline.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url));
const b64 = (p) => read(p).toString('base64');

// 1) CSS with fonts inlined as data URIs
let css = read('./styles.css').toString('utf8');
css = css.replace("url('./fonts/manrope-latin.woff2') format('woff2')",
  `url(data:font/woff2;base64,${b64('./fonts/manrope-latin.woff2')}) format('woff2')`);
css = css.replace("url('./fonts/epilogue-regular.ttf') format('truetype')",
  `url(data:font/truetype;base64,${b64('./fonts/epilogue-regular.ttf')}) format('truetype')`);

// 2) JS module (unchanged)
const js = read('./app.js').toString('utf8').replace(/^export\s+/gm, ''); // drop `export` for inline

// 3) Article markdown as base64 (fetch isn't available in the sandbox)
const mdB64 = b64('./content/the-ramstack.md');

// 4) Body markup: take index.html's #app, but point md-article at the inline block
let html = read('./index.html').toString('utf8');
const app = html.match(/<div id="app">[\s\S]*<\/div>/)[0]; // greedy → up to the final (#app) </div>
const appInline = app.replace('src="./content/the-ramstack.md"', 'src="#md-ramstack"');

let out = `<meta charset="utf-8">
<style>
${css}
</style>
${appInline}
<script type="application/octet-stream" id="md-ramstack">${mdB64}</script>
<script>
${js}
</script>`;

// charset-independent: escape non-ASCII (base64 + JS are ASCII already)
out = Array.from(out).map((c) => (c.charCodeAt(0) > 127 ? `&#${c.codePointAt(0)};` : c)).join('');

writeFileSync(new URL('./preview.html', import.meta.url), out, 'ascii');
console.log('wrote preview.html', out.length, 'bytes; non-ascii:', [...out].filter((c) => c.charCodeAt(0) > 127).length);
