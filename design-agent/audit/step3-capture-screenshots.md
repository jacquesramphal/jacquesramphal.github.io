---
name: step3-capture-screenshots
description: Internal step of /audit — not invoked directly
user-invocable: false
---

# Step 3: Capture Screenshots (local)

Take desktop + mobile screenshots of `url`, save both to the run's `screenshots/` folder, and return the relative paths that will go into the CSV rows. Loop body in deep mode — called once per pruned URL.

**Always uses chrome-devtools MCP** (the user's local Chrome). Free, consistent quality, real scroll for lazy-loaded images, and a dismiss-overlays script that clears cookie banners, modals, and popups before the capture. Hyperbrowser is only used in Step 5 (deep-mode crawl for URL discovery).

No network uploads — screenshots are saved to disk and referenced from the CSV via relative paths.

## Inputs to this step

- `url` — the URL to capture
- `outputArtefacts.screenshotsFolder` — absolute path from Step 2
- `inputs.runId` — for temp filenames if needed
- Deep-mode loop: if multiple URLs, add a 1.5s delay between pages to avoid rate-limiting the target site

## 1. Derive a safe filename for this URL

```js
const safeUrl = url
  .replace(/^https?:\/\//, "")
  .replace(/[^a-z0-9.-]/gi, "_")
  .replace(/^_+|_+$/g, "")
  .slice(0, 80);     // keep under macOS 255-char filename limit even with suffix

const desktopPath = `${outputArtefacts.screenshotsFolder}/${safeUrl}-desktop.png`;
const mobilePath  = `${outputArtefacts.screenshotsFolder}/${safeUrl}-mobile.png`;
```

Examples:
- `https://client.com` → `client.com-desktop.png`
- `https://client.com/products/abc-123` → `client.com_products_abc-123-desktop.png`

## 2. Nav menu captures (desktop, before dismiss)

Navigate fresh and photograph each top-level nav item's open drawer **before** running dismiss. These go into `screenshots/nav/` and document navigation patterns for the audit. This must run BEFORE dismiss — the CSS injection in Phase B will suppress all menus for the full-page shots.

```js
// ── Navigate fresh at desktop viewport ──────────────────────────────
await mcp__chrome-devtools__navigate_page({ type: "url", url });
await mcp__chrome-devtools__resize_page({ width: 1440, height: 900 });
await new Promise(r => setTimeout(r, 1000)); // wait for nav JS to mount

// ── Discover nav items ───────────────────────────────────────────────
// Try site-specific ID pattern first (e.g. Claro: id="mainMenu-1_servicios"),
// then fall back to generic top-level nav link selectors.
const navItems = await mcp__chrome-devtools__evaluate_script({
  function: `() => {
    let links = Array.from(document.querySelectorAll('[id^="mainMenu-"]'));
    if (!links.length) {
      links = Array.from(document.querySelectorAll(
        'header > nav > ul > li > a, header ul.main-nav > li > a, nav > ul > li > a'
      ));
    }
    return links
      .map((el, i) => {
        const rect = el.getBoundingClientRect();
        return {
          index: i,
          id: el.id || null,
          text: el.textContent.trim(),
          cx: Math.round(rect.left + rect.width / 2),
          cy: Math.round(rect.top + rect.height / 2),
        };
      })
      .filter(item => item.cx > 0 && item.cy > 0); // skip hidden/zero-size items
  }`
});

// ── Capture each nav drawer ──────────────────────────────────────────
const navFolder = `${outputArtefacts.screenshotsFolder}/nav`;
// Bash: mkdir -p "$navFolder"

for (const item of (navItems || [])) {
  // Hover to open
  await mcp__chrome-devtools__evaluate_script({
    function: `async () => {
      const el = ${item.id ? `document.getElementById('${item.id}')` : `document.querySelectorAll('header > nav > ul > li > a, nav > ul > li > a')[${item.index}]`};
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };
      el.dispatchEvent(new MouseEvent('mouseover',  opts));
      el.dispatchEvent(new MouseEvent('mouseenter', { ...opts, bubbles: false }));
      el.dispatchEvent(new MouseEvent('mousemove',  opts));
      el.parentElement?.dispatchEvent(new MouseEvent('mouseover',  opts));
      el.parentElement?.dispatchEvent(new MouseEvent('mouseenter', { ...opts, bubbles: false }));
      await new Promise(r => setTimeout(r, 700)); // wait for drawer animation
    }`
  });

  const label = item.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  await mcp__chrome-devtools__take_screenshot({
    fullPage: false, // viewport only — shows the open drawer over the hero
    filePath: `${navFolder}/nav-${label}-desktop.png`
  });

  // Reset hover before next item
  await mcp__chrome-devtools__evaluate_script({
    function: `() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 720, clientY: 500 }));
    }`
  });
  await new Promise(r => setTimeout(r, 300));
}
```

## 3. Full-page captures (desktop + mobile, menus suppressed)

After nav captures, suppress all menus via CSS injection and take clean full-page screenshots.

### Why inline styles beat CSS injection

Two mechanisms cause menus to bleed over page content:

- **CSS `:hover`** — desktop mega menu panels open on pointer position; Puppeteer's cursor lands on the nav during page load, triggering hover state
- **JS `display: block`** — page JS adds `hover`/`open` class to nav LI, CSS shows the panel

**Suppression priority (highest to lowest):**
1. **Inline `el.style.setProperty('display','none','important')`** — beats ALL stylesheet `!important` rules unconditionally. This is the PRIMARY method in `DISMISS_SCRIPT`.
2. **CSS injection** (`<style id="audit-hide-menus">`) — belt-and-suspenders for elements the inline sweep misses; also covers `:hover` pseudo-class panels
3. **JS class removal** (`classList.remove('hover','open',...)`) — removes JS-toggled open states before inline sweep
4. **`initScript` class interceptor** — last resort for pages where `evaluate_script` times out; intercepts `classList.add` before page JS runs

On pages where `evaluate_script` times out entirely (heavy JS pages), only `initScript` is available — in those cases the CSS injection in `initScript` is the only suppressor and may be partially overridden.

### The dismiss script (identical for every viewport)

```js
const DISMISS_SCRIPT = `async () => {
  await new Promise(r => setTimeout(r, 1000));

  // 1. Blur all + move mouse to page center (deactivates CSS :hover state)
  document.activeElement?.blur();
  document.querySelectorAll('*').forEach(el => { try { el.blur(); } catch(e) {} });
  document.dispatchEvent(new MouseEvent('click',     { bubbles: true, clientX: 720, clientY: 500 }));
  document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 720, clientY: 500 }));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await new Promise(r => setTimeout(r, 300));

  // 1b. Strip JS-added open-state classes from nav/header LI elements.
  //     Class-agnostic: covers 'hover', 'open', 'active', 'expanded', etc. across all sites.
  //     This prevents mega-menu panels that are shown via JS class toggles (not just CSS :hover).
  const _openClasses = ['hover','open','active','expanded','is-open','is-active','show','visible','focused','selected'];
  document.querySelectorAll('nav li, header li, nav > ul > li, header > nav > ul > li').forEach(el => {
    _openClasses.forEach(c => el.classList.remove(c));
    el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, clientX: 720, clientY: 500 }));
    el.dispatchEvent(new MouseEvent('mouseout',   { bubbles: true, clientX: 720, clientY: 500 }));
  });
  // Also strip from any direct nav children (e.g. LI.hasSubMenu at any level)
  document.querySelectorAll('[class*="hasSubMenu"], [class*="has-submenu"], [class*="has-children"]').forEach(el => {
    _openClasses.forEach(c => el.classList.remove(c));
  });
  await new Promise(r => setTimeout(r, 200));

  // 2a. Inline-style sweep — PRIMARY method. Inline !important beats all stylesheet rules.
  //     Works even when CSS injection is overridden by page's own !important rules.
  document.querySelectorAll(
    '[class*="subMenu"],[class*="SubMenu"],[class*="submenu"],[class*="Submenu"],' +
    '[class*="mega-menu"],[class*="megamenu"],[class*="MegaMenu"],' +
    '[class*="navDrawer"],[class*="mobileMenu"],[class*="mainMenuComp"],' +
    'nav ul ul,nav li ul,header ul ul,header li ul'
  ).forEach(el => el.style.setProperty('display', 'none', 'important'));

  // 2b. CSS injection — belt-and-suspenders, suppresses mobile drawers, desktop dropdowns, backdrops
  let ex = document.getElementById('audit-hide-menus'); if (ex) ex.remove();
  const s = document.createElement('style'); s.id = 'audit-hide-menus';
  s.textContent = \`
    /* Mobile nav drawers (JS-controlled, overflow from fixed header) */
    .mainMenuComp, [class*="mainMenuComp"],
    [class*="mobileMenu"], [class*="mobile-menu"], [class*="mobileNav"], [class*="mobile-nav"],
    [class*="navDrawer"], [class*="nav-drawer"], [class*="menuPanel"], [class*="menu-panel"],
    [class*="menuDrawer"], [class*="menu-drawer"], [class*="slidingMenu"], [class*="sideMenu"],
    /* Desktop dropdown submenus (CSS :hover or JS open state) */
    nav ul ul, nav li ul, nav .sub-menu, nav .submenu, header ul ul, header li ul,
    [class*="mega-menu"], [class*="megamenu"], [class*="dropdown-menu"], [class*="nav-dropdown"],
    [class*="submenu"], [class*="sub-menu"], [class*="SubMenu"], [class*="subMenu"],
    [class*="flyout"], [class*="subnav"], [class*="nav-flyout"],
    .nivel2, .nivel3, .nivel-2, .nivel-3, .submenu-container, .dropdown-container,
    .menu-item-has-children > ul, .has-children > ul, li.open > ul, li.active > ul,
    [class*="secondlevel"], [class*="second-level"], [class*="thirdlevel"],
    nav [aria-expanded="true"] ~ *, nav li:hover > ul, nav li:focus-within > ul,
    header li:hover > ul, header li:focus-within > ul
    { display:none!important; visibility:hidden!important; opacity:0!important;
      pointer-events:none!important; max-height:0!important; overflow:hidden!important; }
    /* Nav backdrops / scrim overlays */
    [class*="nav-backdrop"], [class*="menu-backdrop"], [class*="nav-overlay"], [class*="menu-overlay"],
    [class*="header-overlay"], [class*="header-backdrop"],
    nav ~ [class*="overlay"], header ~ [class*="overlay"]
    { display:none!important; opacity:0!important; }
    /* Clip header overflow — kills mobile drawer bleed-through AND desktop mega panel bleed-through */
    header { overflow: hidden !important; }
  \`;
  document.head.appendChild(s);

  // 3. JS sweep — two passes to catch nav panels regardless of where they live in the DOM.
  // Pass 1: header/nav descendants that are fixed/absolute with height > 50px.
  //   Catches most mega-menu panels which live inside header > nav > ul > li.
  document.querySelectorAll('header *, nav *').forEach(el => {
    const cs = window.getComputedStyle(el);
    if ((cs.position === 'fixed' || cs.position === 'absolute') && el.offsetHeight > 50) {
      el.style.setProperty('display', 'none', 'important');
    }
  });
  // Pass 2: global sweep — catches panels rendered OUTSIDE header/nav (portals, teleports, etc.)
  //   Threshold: fixed + height > 200px (regardless of z-index — Claro GT's .subMenuWrap
  //   is position:fixed but z-index:1, so threshold >=200 was wrong; use height as the signal).
  //   Absolute panels also caught if z-index > 50 (skip low-z content blocks).
  const _safeNav = new Set(['HEADER','NAV','BODY','HTML']);
  document.querySelectorAll('*').forEach(el => {
    if (_safeNav.has(el.tagName)) return;
    if (el.closest('header') || el.closest('nav')) return; // already handled in Pass 1
    const cs = window.getComputedStyle(el);
    const zIdx = parseInt(cs.zIndex) || 0;
    const h = el.offsetHeight;
    // Fixed + tall = almost certainly a nav panel or modal
    if (cs.position === 'fixed' && h > 200) {
      el.style.setProperty('display', 'none', 'important');
    }
    // Absolute + high z-index + tall = dropdown panel
    if (cs.position === 'absolute' && zIdx > 50 && h > 100) {
      el.style.setProperty('display', 'none', 'important');
    }
  });

  // 4. Reset aria-expanded + body/html open-state classes
  document.querySelectorAll('nav [aria-expanded], header [aria-expanded]')
    .forEach(el => el.setAttribute('aria-expanded', 'false'));
  document.body.classList.remove('menu-open','nav-open','overlay-active','modal-open','menu-active');
  document.documentElement.classList.remove('menu-open','nav-open','overlay-active');

  // 4. Click cookie/modal/banner dismiss buttons
  const sel = [
    '[class*="cookie"] button', '[class*="consent"] button',
    '[id*="cookie"] button',    '[id*="consent"] button',
    'button[class*="accept"]',  'button[id*="accept"]',
    '[class*="modal"] [class*="close"]', '[class*="popup"] [class*="close"]',
    '[class*="overlay"] [class*="close"]', '[class*="banner"] [class*="close"]',
    '[class*="dismiss"]', 'button[class*="close"]', '.close-button', '.modal-close',
    '[aria-label="Close"]', '[aria-label="close"]',
    '[aria-label="Cerrar"]', '[aria-label="Fermer"]',
    '[aria-label="Fechar"]', '[aria-label="Schließen"]',
    '[class*="chat"] [class*="close"]', '[id*="chat"] [class*="close"]',
  ];
  for (const q of sel) document.querySelectorAll(q).forEach(el => { try { el.click(); } catch(e) {} });

  // 5. Remove any remaining fixed/sticky overlays outside nav/header
  const preserve = new Set(['NAV', 'HEADER']);
  document.querySelectorAll('*').forEach(el => {
    const st = getComputedStyle(el);
    if (
      (st.position === 'fixed' || st.position === 'sticky') &&
      (parseInt(st.zIndex) || 0) > 100 &&
      !preserve.has(el.tagName) &&
      !el.closest('nav') && !el.closest('header')
    ) { el.remove(); }
  });

  // 6. Unblock body scroll
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  return 'done';
}`;
```

### The initScript payload (used for full-page navigates only)

This runs before ANY page scripts — intercepts class mutations on nav LIs and keeps our CSS last in the cascade. Do NOT use this for the nav-capture phase navigate (it would block hover class addition, preventing drawer opens).

```js
const INIT_SCRIPT = `(() => {
  // Block JS-added open-state classes on nav/header LI elements (class-agnostic).
  const BLOCKED = new Set(['hover','open','active','expanded','is-open','is-active','show']);
  const classObs = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type !== 'attributes' || m.attributeName !== 'class') continue;
      const el = m.target;
      if (el.tagName !== 'LI') continue;
      if (!el.closest('nav') && !el.closest('header')) continue;
      BLOCKED.forEach(c => { if (el.classList.contains(c)) el.classList.remove(c); });
    }
  });
  classObs.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['class'] });

  // Keep our hide-menus style last in <head> to win the CSS cascade
  const STYLE_ID = 'audit-hide-menus';
  const CSS = \`
    [class*="subMenu"], [class*="SubMenu"], [class*="submenu"],
    [class*="mega-menu"], [class*="megamenu"],
    nav ul ul, nav li ul, header ul ul, header li ul,
    li.open > ul, li.hover > ul, li.active > ul
    { display:none!important; visibility:hidden!important; opacity:0!important;
      pointer-events:none!important; max-height:0!important; overflow:hidden!important; }
    header { overflow: hidden !important; }
  \`;
  const ensureStyle = () => {
    let s = document.getElementById(STYLE_ID);
    if (!s) { s = document.createElement('style'); s.id = STYLE_ID; s.textContent = CSS; }
    if (document.head && s !== document.head.lastElementChild) document.head.appendChild(s);
  };
  const headObs = new MutationObserver(ensureStyle);
  const attachHeadObs = () => {
    if (document.head) { ensureStyle(); headObs.observe(document.head, { childList: true }); }
    else setTimeout(attachHeadObs, 10);
  };
  attachHeadObs();
})();`;
```

### The capture pipeline

```js
// ═══════════════════════════════════════════════════════════════════
// DESKTOP (1440×900)
// Re-navigate with INIT_SCRIPT so class interception runs before
// page JS. The nav-capture phase already loaded this URL — this
// second navigate is intentional (needed for clean full-page shot).
// ═══════════════════════════════════════════════════════════════════

await mcp__chrome-devtools__navigate_page({ type: "url", url, initScript: INIT_SCRIPT, timeout: 20000 });
await mcp__chrome-devtools__resize_page({ width: 1440, height: 900 });

// 1. Dismiss — CSS injection + blur + class removal (belt-and-suspenders with initScript)
await mcp__chrome-devtools__evaluate_script({ function: DISMISS_SCRIPT });

// 2. Scroll to trigger lazy-loaded images — chunked to avoid Runtime.evaluate timeout.
//    Each call scrolls a fixed amount synchronously (fast, <200ms per call).
//    Heavy pages block evaluate_script; if any chunk times out, continue to screenshot.
const pageHeight = await mcp__chrome-devtools__evaluate_script({
  function: `() => document.body.scrollHeight`
}).catch(() => 5000);
const scrollChunk = 800;
const scrollSteps = Math.ceil((pageHeight || 5000) / scrollChunk);
for (let i = 0; i <= scrollSteps; i++) {
  await mcp__chrome-devtools__evaluate_script({
    function: `() => { window.scrollTo(0, ${i * scrollChunk}); }`
  }).catch(() => {}); // ignore timeout — continue scrolling
}
await mcp__chrome-devtools__evaluate_script({ function: `() => { window.scrollTo(0, 0); }` }).catch(() => {});
await new Promise(r => setTimeout(r, 1000)); // let lazy images paint

// 3. Lightweight strip — catch any scroll-triggered popups
await mcp__chrome-devtools__evaluate_script({
  function: `() => {
    const preserve = new Set(['NAV', 'HEADER']);
    document.querySelectorAll('*').forEach(el => {
      const st = getComputedStyle(el);
      if (
        (st.position === 'fixed' || st.position === 'sticky') &&
        (parseInt(st.zIndex) || 0) > 100 &&
        !preserve.has(el.tagName) &&
        !el.closest('nav') && !el.closest('header')
      ) { el.remove(); }
    });
  }`,
}).catch(() => {});

// 4. Full-page screenshot
await mcp__chrome-devtools__take_screenshot({ fullPage: true, format: "png", filePath: desktopPath });

// ═══════════════════════════════════════════════════════════════════
// MOBILE (375×812)
// Re-navigate with initScript — mobile drawer JS re-inits on load.
// ═══════════════════════════════════════════════════════════════════

await mcp__chrome-devtools__emulate({ viewport: "375x812,mobile,touch" });
await mcp__chrome-devtools__navigate_page({ type: "url", url, initScript: INIT_SCRIPT, timeout: 20000 });

// Dismiss
await mcp__chrome-devtools__evaluate_script({ function: DISMISS_SCRIPT }).catch(() => {});

// Scroll (chunked, same pattern)
const mobileHeight = await mcp__chrome-devtools__evaluate_script({
  function: `() => document.body.scrollHeight`
}).catch(() => 5000);
const mobileSteps = Math.ceil((mobileHeight || 5000) / scrollChunk);
for (let i = 0; i <= mobileSteps; i++) {
  await mcp__chrome-devtools__evaluate_script({
    function: `() => { window.scrollTo(0, ${i * scrollChunk}); }`
  }).catch(() => {});
}
await mcp__chrome-devtools__evaluate_script({ function: `() => { window.scrollTo(0, 0); }` }).catch(() => {});
await new Promise(r => setTimeout(r, 1000));

// Strip
await mcp__chrome-devtools__evaluate_script({
  function: `() => {
    const preserve = new Set(['NAV', 'HEADER']);
    document.querySelectorAll('*').forEach(el => {
      const st = getComputedStyle(el);
      if (
        (st.position === 'fixed' || st.position === 'sticky') &&
        (parseInt(st.zIndex) || 0) > 100 &&
        !preserve.has(el.tagName) &&
        !el.closest('nav') && !el.closest('header')
      ) { el.remove(); }
    });
  }`,
}).catch(() => {});

// Full-page screenshot
await mcp__chrome-devtools__take_screenshot({ fullPage: true, format: "png", filePath: mobilePath });

// Reset viewport
await mcp__chrome-devtools__emulate({ viewport: "1440x900" });
```

### Deep mode: rate-limit delay

In the deep-mode screenshot phase, add a 1.5s delay between URLs:

```js
if (inputs.mode === "deep" && urlIndex > 0) {
  await new Promise(r => setTimeout(r, 1500));
}
```

Hyperbrowser returns either a URL pointing at the rendered PNG, or inline base64, depending on MCP version. Normalize:

```bash
# If the shot came back as a URL, fetch it directly to the final path
curl -sSfL "$DESKTOP_URL" -o "$desktopPath"
curl -sSfL "$MOBILE_URL"  -o "$mobilePath"

# If inline base64:
echo "$DESKTOP_B64" | base64 -d > "$desktopPath"
echo "$MOBILE_B64"  | base64 -d > "$mobilePath"
```

### Chrome-devtools escape hatch (only when `useLocalBrowser === true`)

```js
await mcp__chrome-devtools__navigate_page({ type: "url", url });
await mcp__chrome-devtools__resize_page({ width: 1440, height: 900 });
await mcp__chrome-devtools__take_screenshot({
  fullPage: true,
  format: "png",
  filePath: desktopPath,
});

await mcp__chrome-devtools__emulate({ viewport: "375x812,mobile,touch" });
await mcp__chrome-devtools__navigate_page({ type: "reload" });
await mcp__chrome-devtools__take_screenshot({
  fullPage: true,
  format: "png",
  filePath: mobilePath,
});
```

## 3. Derive sheet-row paths

The XLSX's `Desktop Screenshot` / `Mobile Screenshot` columns hold **relative paths** (from the run folder). Simple and portable:

```js
const desktopCell = `screenshots/${safeUrl}-desktop.png`;
const mobileCell  = `screenshots/${safeUrl}-mobile.png`;
```

When the user opens `audit.xlsx` in Numbers or Excel, they see the text path. To follow a link, they open the file from that path. When they upload the folder to Drive, the adjacent-file references stay valid (Drive preserves folder structure on upload), so "Open with Google Sheets" on the uploaded `.xlsx` still makes sense.

If the user wants clickable hyperlinks later, they can `=HYPERLINK("screenshots/...", "Desktop")` — but that's a manual polish, not something this flow does.

## 4. Return shape

```js
{
  url,
  desktopUrl: desktopCell,     // RELATIVE path for the sheet row (e.g. "screenshots/client.com-desktop.png")
  mobileUrl:  mobileCell,
  desktopImage: { path: desktopPath },    // absolute path for Step 4's vision call
  mobileImage:  { path: mobilePath },     // absolute path for Step 4's vision call
}
```

Step 4 reads the files from `desktopImage.path` / `mobileImage.path` when making its vision call, and writes `desktopUrl` / `mobileUrl` (the relative paths) into the sheet rows.

## Failure handling

**Chrome-devtools errors:**

- **Chrome not open / MCP not connected:**
  ```
  chrome-devtools MCP is not responding. Make sure Chrome is open and the
  chrome-devtools extension is connected. Then re-run the audit.
  ```
- **Navigation failed (site down, DNS error):** surface the URL + error. In deep mode, skip the URL and continue. In lite mode, abort.
- **`evaluate_script` failed (dismiss overlays or scroll):** warn but continue to screenshot anyway — a screenshot with a modal is better than no screenshot.
- **`take_screenshot` failed:** retry once. On second failure, in deep mode skip the URL; in lite mode abort.

**In deep mode, a single-URL capture failure SKIPS that URL and continues** — push the URL into `failedUrls[]` with the reason, and move to the next. One broken URL shouldn't kill a 20-URL run.

**Disk write failures** (full disk, permission denied): abort and surface the path + reason.

## What changed from earlier versions

- **No mode-branching.** Always chrome-devtools. Hyperbrowser is only used for deep-mode URL crawling (Step 5), not screenshots.
- **Dismiss-overlays script.** Three-pass approach: click dismiss buttons → remove fixed/sticky overlays → remove backdrop divs. Runs AFTER scroll (critical — overlays can trigger on scroll depth).
- **No network uploads.** Screenshots live on disk. CSV columns hold relative paths. When the Drive-backed backend returns, this step re-adds the upload step.

## References

- `mcp__chrome-devtools__navigate_page`, `resize_page`, `emulate`, `evaluate_script`, `take_screenshot`
- n8n reference: `HTTP Request1` / `HTTP Request2` in `HyperBrowser POC.json` (superseded — local chrome replaces cloud screenshots)
- Future backend: `scripts/audit/apps-script/Code.gs` → `uploadScreenshot()` (deferred)
