/**
 * Static prerender step.
 *
 * The site is a client-rendered Vue 3 SPA. Without JavaScript the initial HTML
 * is just an empty <div id="app"> plus a <noscript> notice, so crawlers, AI
 * agents, link-preview bots, and plain fetchers see no real content.
 *
 * This script runs AFTER `vue-cli-service build`. It serves the built `dist/`
 * folder, loads every content route in a real headless Chromium (so all of the
 * app's browser-coupled runtime works), waits for the app to render, and writes
 * the fully-rendered HTML back to disk as `dist/<route>/index.html`. GitHub
 * Pages then serves real, readable HTML on first load for every route.
 *
 * It also rewrites the canonical / og:url / twitter:url tags of each snapshot to
 * the absolute https://ramphal.design/<route> URL so previews and canonicals
 * point at the custom domain rather than the github.io host.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CANONICAL_ORIGIN = 'https://ramphal.design';
const PORT = 8177;

// ---------------------------------------------------------------------------
// 1. Enumerate routes to prerender.
// ---------------------------------------------------------------------------
function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf-8'));
}

function collectRoutes() {
  const routes = new Set([
    '/',
    '/work',
    '/writing',
    '/library',
    '/play',
    '/explorations',
    '/product',
    '/resume',
    '/links',
    '/designsystem',
  ]);

  // Article / doc routes from the library registry (prefer human-readable slug).
  const library = readJson('src/assets/data/library.json');
  for (const entry of library.entries || []) {
    if (entry.slug) routes.add(`/doc/${entry.slug}`);
  }

  // Work case-study routes.
  const work = readJson('src/assets/data/work.json');
  for (const entry of work.entries || []) {
    if (entry.id != null) routes.add(`/work/${entry.id}`);
  }

  return [...routes];
}

// ---------------------------------------------------------------------------
// 2. Minimal static server for dist/ with SPA fallback to index.html.
// ---------------------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = path.join(DIST, urlPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // SPA fallback: unknown routes serve the app shell so the router can render.
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST, 'index.html');
    }

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end('server error');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

// ---------------------------------------------------------------------------
// 3. Finalize each snapshot's <head> for crawlers and link previews.
//    - canonical / og:url / twitter:url -> custom domain
//    - per-page <title> + og/twitter title + description for detail pages,
//      derived from the rendered content (the app leaves these generic for
//      docs that carry their heading in the markdown body rather than a
//      <header> block)
//    - drop the now-inaccurate "requires JavaScript" <noscript> notice
// ---------------------------------------------------------------------------
function absoluteUrl(route) {
  return route === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${route}`;
}

const GENERIC_TITLES = [
  'Jacques Ramphal - Portfolio',
  'Jacques Ramphal — Design, Systems, Code',
  'Jacques Ramphal - UX / AX Full Stack Design Lead | Portfolio',
];

function setMetaContent(html, selectorAttr, value) {
  // selectorAttr like: property="og:title" or name="description"
  const re = new RegExp(
    `(<meta[^>]+${selectorAttr}[^>]*content=["'])[^"']*(["'])`,
    'i'
  );
  return html.replace(re, `$1${value}$2`);
}

function finalizeHtml(html, route, pageMeta) {
  const url = absoluteUrl(route);
  let out = html;

  // Canonical.
  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(out)) {
    out = out.replace(
      /<link[^>]+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${url}">`
    );
  } else {
    out = out.replace(/<\/head>/i, `<link rel="canonical" href="${url}"></head>`);
  }
  out = setMetaContent(out, 'property=["\']og:url["\']', url);
  out = setMetaContent(out, 'property=["\']twitter:url["\']', url);

  // Per-page title/description for content detail pages only. Index and static
  // pages keep the site-level title the app already provides.
  const isDetail = route.startsWith('/doc/') || route.startsWith('/work/');
  if (isDetail && pageMeta.h1) {
    const currentTitle = (out.match(/<title>([^<]*)<\/title>/i) || [, ''])[1];
    if (GENERIC_TITLES.includes(currentTitle.trim())) {
      const title = escapeHtml(`${pageMeta.h1} | Jacques Ramphal`);
      out = out.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
      out = setMetaContent(out, 'property=["\']og:title["\']', title);
      out = setMetaContent(out, 'property=["\']twitter:title["\']', title);
      out = setMetaContent(out, 'name=["\']title["\']', title);
    }
    if (pageMeta.desc) {
      const desc = escapeHtml(pageMeta.desc);
      out = setMetaContent(out, 'name=["\']description["\']', desc);
      out = setMetaContent(out, 'property=["\']og:description["\']', desc);
      out = setMetaContent(out, 'property=["\']twitter:description["\']', desc);
    }
  }

  // Remove the JavaScript-required notice: the content is now in the HTML.
  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  return out;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ---------------------------------------------------------------------------
// 4. Render + snapshot each route.
// ---------------------------------------------------------------------------
function outputPath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

async function renderRoute(page, route) {
  await page.goto(`http://localhost:${PORT}${route}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  // Wait for the app to render real content into #app. The shell ships an empty
  // #app, so poll until it holds a meaningful amount of text (or time out).
  try {
    await page.waitForFunction(
      () => {
        const app = document.getElementById('app');
        if (!app) return false;
        const text = (app.innerText || '').replace(/\s+/g, ' ').trim();
        return text.length > 250;
      },
      { timeout: 20000 }
    );
  } catch {
    // Fall through and snapshot whatever rendered; reported as a warning below.
  }

  // Small settle for late meta/head updates from @vueuse/head.
  await page.waitForTimeout(300);

  const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
  const { bodyTextLen, pageMeta } = await page.evaluate(() => {
    const app = document.getElementById('app');
    const text = app ? (app.innerText || '').replace(/\s+/g, ' ').trim() : '';
    const h1 = app?.querySelector('h1')?.innerText?.replace(/\s+/g, ' ').trim() || '';
    let desc = '';
    const paras = [...(app?.querySelectorAll('p') || [])]
      .map((p) => (p.innerText || '').replace(/\s+/g, ' ').trim())
      .filter((t) => t.length > 40);
    if (paras[0]) {
      desc = paras[0];
      if (desc.length > 200) desc = desc.slice(0, 197).replace(/\s+\S*$/, '') + '…';
    }
    return { bodyTextLen: text.length, pageMeta: { h1, desc } };
  });
  return { html: finalizeHtml(html, route, pageMeta), bodyTextLen };
}

// ---------------------------------------------------------------------------
async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('✗ dist/index.html not found. Run the build first.');
    process.exit(1);
  }

  const routes = collectRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  const server = await startServer();
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Block third-party requests (analytics, fonts, CDNs) for fast, deterministic
  // renders. They never affect the readable text content.
  await page.route('**/*', (r) => {
    const host = new URL(r.request().url()).hostname;
    if (host === 'localhost' || host === '127.0.0.1') return r.continue();
    return r.abort();
  });

  let ok = 0;
  const thin = [];
  for (const route of routes) {
    try {
      const { html, bodyTextLen } = await renderRoute(page, route);
      const out = outputPath(route);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, html);
      const flag = bodyTextLen < 250 ? ' ⚠ thin' : '';
      if (bodyTextLen < 250) thin.push(route);
      console.log(`  ✓ ${route} (${bodyTextLen} chars)${flag}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message.split('\n')[0]}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerendered ${ok}/${routes.length} routes.`);
  if (thin.length) {
    console.log(`⚠ Thin content on: ${thin.join(', ')}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
