# Astro Migration Plan — `ramphal.design`

A deep, risk-first plan to port the site from **Vue 3 (Vue CLI + Webpack, SPA + Playwright prerender)** to **Astro (static)**, with an explicit contract: **keep every page, preserve every design token, zero visual change, zero feature loss.**

This plan is derived from a full inventory of the live codebase (routes, pages, 85 components, utils, data, build scripts, styling, tooling). Where something *can't* be ported straight, it is called out with a concrete mitigation.

---

## 0. Verdict up front

This is a **static-site → static-site** port, not an app rewrite. The three things that usually make SPA→Astro painful — global client state, a runtime backend, and server rendering — **don't apply here**:

- **Vuex is vestigial** (holds only newsletter-form fields; **0 components read the store**) and **`vuex-i18n` is a dead dependency** (never used).
- **Contentful is entirely dead code** — the `contentful` SDK's `createClient` is never called; every component that fetches Contentful (`InfoPage`, `MyDocs`, `MyBlog copy`, `BlogPost`) is **unrouted**. All real content is local JSON + markdown.
- **The chat backend is already a separate Vercel serverless function** (`chat-api/`), deployed independently, with a build-time corpus. Nothing to migrate.
- **Hosting is already static** (GitHub Pages via `.github/workflows/gh-pages-deploy.yml`, custom domain `ramphal.design`). Astro `output: 'static'` targets the same place.
- **"Prerendering" today is a post-build Playwright snapshot** (`scripts/prerender.mjs`) of the client-rendered SPA. This is precisely the fragile step Astro replaces natively — and Astro **closes the gaps** where routes currently ship a blank first paint (`/hire`, `/card`, `/session/:slug`, `/secured/doc/:slug`, courses).

The real work is **fidelity engineering** on a handful of subsystems (markdown rendering, image paths, inline SVGs, the persistent shell), plus the mechanical spread of explicit component imports. All of it is verifiable against a screenshot baseline (see §7).

---

## 1. Target architecture

| Concern | Today | After migration |
|---|---|---|
| Framework | Vue 3 SPA + vue-router + Vuex | Astro static, islands for interactivity |
| Build | vue-cli-service (Webpack, maintenance mode) | Astro + Vite |
| Static HTML | Playwright snapshot post-build | Native SSG (`getStaticPaths`) |
| Hosting | GitHub Pages (`ramphal.design`) | **GitHub Pages, unchanged** (`withastro/action`) |
| Routing | client-side router + `beforeEnter` guards | file-based routes + build-time redirects |
| Content | markdown loaded at runtime via `require.context` | **Astro content collections** (build-time) |
| Global state | Vuex (unused) | deleted; `localStorage` for theme/haptics/chat |
| Chat | Vue widget → Vercel fn | **same Vercel fn**, widget becomes a layout island |
| CMS | Contentful (dead) | **deleted** |
| Interactivity | full-page hydration | **islands** (`client:load/idle/visible`) |
| Styling | SCSS via `App.vue` style import | **same SCSS, imported once in `BaseLayout`** |

**Layouts: one.** A single `BaseLayout.astro` reproduces `App.vue`'s shell — `HeaderNav`, `<slot/>`, `FullscreenMenu`, `MainFooter`, `CustomChatUI` — with four boolean props mirroring the route-meta flags (`hideNav`, `hideFooter`, `hideChat`, `hidePageWrapper`). No second layout is needed; the "bare" pages just pass `hideNav hideFooter`.

---

## 2. Complete page/route map — the "keep all pages" contract

Every current route has an explicit destination. Nothing is dropped.

| # | Current route | Component | Astro destination | Layout props |
|---|---|---|---|---|
| 1 | `/` | HomePage | `pages/index.astro` | full shell |
| 2 | `/hire` | HirePage | `pages/hire.astro` | full |
| 3 | `/links` | UsefulLinks | `pages/links.astro` | full |
| 4 | `/resume` | MyResume | `pages/resume.astro` | `hideFooter` |
| 5 | `/designsystem` | DesignSystem | `pages/designsystem.astro` | full |
| 6 | `/library` | MyLibrary | `pages/library.astro` | full |
| 7 | `/writing` | WritingIndex | `pages/writing.astro` | full |
| 8 | `/work` | WorkIndex | `pages/work/index.astro` | full |
| 9 | `/play` | PlayIndex | `pages/play.astro` | full |
| 10 | `/explorations` | Explorations | `pages/explorations.astro` | full |
| 11 | `/product` | ProductPage | `pages/product.astro` | full |
| 12 | `/subscribed` | SubscribedPage | `pages/subscribed.astro` | full |
| 13 | `/login` | TheLogin | `pages/login.astro` | full |
| 14 | `/card` | BusinessCardPage | `pages/card.astro` | `hideNav hideFooter` |
| 15 | `/brb` | MaintenancePage | `pages/brb.astro` | `hideNav hideFooter hidePageWrapper` |
| 16 | `*` | NotFound | `pages/404.astro` | `hideFooter hidePageWrapper` |
| 17 | `/work/:id` | ProjectPage | `pages/work/[id].astro` + `getStaticPaths` from `work.json` | full |
| 18 | `/doc/:slug` | MarkdownPage | `pages/doc/[slug].astro` + content collection | full |
| 19 | `/doc/:id(\d+)` | (redirect) | build-time redirect page → slug (via `docRegistry`) | — |
| 20 | `/secured/doc/:slug` | MarkdownPage | `pages/secured/doc/[slug].astro` | full |
| 21 | `/course` + `/course/:slug` | CoursePage | `pages/course/[slug].astro` + soft-lock island | full |
| 22 | `/session/:slug` | SessionReader | `pages/session/[slug].astro` | `hideFooter hideChat` |
| 23 | `/menu` | FullscreenMenu | *not a route* — overlay island in layout | — |
| — | `/info`, `/about`, `/doc/about-this-site` | redirects | **Astro native `redirects` config** | — |

Dynamic path generators (`getStaticPaths`) read the exact same JSON the app uses today:
- `/doc/[slug]` ← `docRegistry` (merges `library.json`, `chapters.json`, `course-template.json`, `still-yourself.json`) + `doc_*.md` bodies.
- `/work/[id]` ← `work.json`.
- `/course/[slug]`, `/session/[slug]` ← `courseRegistry` (`course-template.json`, `still-yourself.json`).

> **Gap closed:** today `/hire`, `/card`, `/session/:slug`, `/secured/doc/:slug`, and courses are **not** in `prerender.mjs`'s route list, so they ship a blank first paint and rely on client render. In Astro every one is statically generated. This is a strict improvement in fidelity and SEO with no visual change.

---

## 3. What does NOT port straight — and the mitigation for each

Ranked by risk to the "zero visual change / zero loss" contract.

### 3.1 🔴 HIGH — The markdown render pipeline
**Today:** `MarkdownPage.vue` + `MarkdownRenderer.vue` parse each doc **twice** (Webpack `markdown-loader` at import, then `marked` at runtime), extract a `<header>` hero block + lead image via regex, substitute `{{yearsExperience}}` tokens, inject the result with `v-html`, then do **post-render DOM surgery** to wrap content into `.markdown-section`/`.markdown-subsection` for the TOC and (disabled) GSAP, add heading anchors, and build code blocks with a copy button and language label. Article metadata (title/description/date/readtime) comes from `library.json`, and JSON-LD is injected via `@vueuse/head`.

**Why it's hard:** this is bespoke behavior, not standard markdown. A naive content-collection render loses the code-copy buttons, heading anchor IDs, hero extraction, and token substitution — all visible.

**Mitigation — reproduce each behavior as a build-time plugin, validated by screenshot diff:**
- Doc bodies are **plain markdown/HTML with no embedded Vue components** (verified: the 6 files with raw HTML use `<div>/<table>/<details>` etc., not custom tags). So Astro's native markdown handles the body directly — no runtime `marked` needed.
- **Heading anchors + IDs** → `rehype-slug` + `rehype-autolink-headings` (exact ID scheme matched to current `slugify`).
- **Code blocks (copy button + language label)** → Astro's built-in **Shiki** for highlighting (build-time, *zero* client JS vs today's runtime `highlight.js`) + a tiny rehype plugin that emits the same `<figure class="codeblock">` wrapper markup, and a ~15-line island for the copy button. Only 11 docs contain code.
- **`{{yearsExperience}}` token** (1 file) → a remark plugin calling the existing `experience.ts` logic at build.
- **`<header>` hero + lead image** (6 files) → parse in the collection `getStaticPaths`/layout from the same regex, render in `DocLayout.astro`. Metadata still sourced from `library.json`.
- **JSON-LD** → rendered in `DocLayout`'s `<head>` from the collection entry.
- **`.markdown-section` wrapping** existed to drive GSAP that is **already disabled on doc pages** (`enableScrollTrigger:false`) — so it's inert; reproduce the class only where CSS actually targets it (verify against `typography.scss`).

*This is the single largest engineering task and the one to prototype first (the `/doc` prototype already proves the happy path).* 

### 3.2 🔴 HIGH — Image path resolution in markdown & pages
**Today:** `require.context('../assets/images', …)` eagerly bundles every image into a multi-key `imageMap`, and a runtime multi-strategy string lookup (`heroImageSrc`) resolves `../images/...`, `./images/...`, filename-only, and nested-path variants, with a `require()` fallback and `placeholder.png`. **34 of 84 markdown files** author images as `](../images/...)`.

**Why it's hard:** `require.context` + runtime string matching has no Astro analog, and Astro's asset pipeline wants known import paths.

**Mitigation:**
- **One-time codemod** normalizing the 34 files' image references to a single convention (e.g. `/images/...` root-relative served from `public/images/`, *or* collection-relative imports). Root-relative + `public/images/` is the lowest-risk, zero-processing option and preserves current URLs exactly.
- Move `src/assets/images/**` → `public/images/**` (or keep in `src` and use `import.meta.glob` to rebuild the same lookup map if optimized/hashed assets are wanted later).
- Component/hero images (from `library.json` `thumbnail`) resolve through the same `public/images/` base — a small helper replacing `heroImageSrc`.
- The codemod is scripted and diffable; screenshot diff catches any broken image.

### 3.3 🔴 HIGH — Inline-SVG recoloring (`vue-svg-inline-loader`)
**Today:** the Webpack loader turns `<img src="*.svg">` into inline `<svg>` at build so icons recolor via `currentColor`/CSS masks (`--icon-filter`). `Icon.vue` uses `name="icon/print.svg"`.

**Why it's hard:** loaded as a plain `<img>`, themed icons render the wrong color — a visible diff.

**Mitigation:** replace with **`astro-icon`** (build-time inline SVG sprite) or import `*.svg?raw` and `set:html`. Port `Icon.vue`'s API 1:1 so call sites are unchanged. Verify each icon recolors in light/dark.

### 3.4 🟠 MEDIUM — Inter-page fade + menu slide transitions
**Today:** `App.vue` wraps `<router-view>` in `<transition name="fade">` (page cross-fade) and the menu in `<transition name="slide">` (0.5s cubic-bezier translateX). These are Vue-runtime SPA behaviors; an MPA does full document loads.

**Mitigation:** enable **Astro View Transitions** (`<ClientRouter />`) in `BaseLayout`. It gives cross-document fade equivalent to the current page fade **and** keeps client-side-feeling navigation, so the shell islands (chat/menu) persist across nav. The menu `slide` keyframes port as plain CSS wired to the menu island's open/close. *If a pixel-identical fade curve matters, tune the View Transition CSS to match.* This is the one place behavior is reproduced rather than copied — flagged honestly.

### 3.5 🟠 MEDIUM — Global component registration → explicit imports
**Today:** `main.ts` globally registers ~40 components; pages assume they're ambient.

**Mitigation:** mechanical, not risky — add explicit `import` statements to the 25 pages and any component using a previously-global child. TypeScript/Astro **fails the build** on a missing import, so nothing silently breaks (unlike a runtime SPA). A codemod can auto-insert most imports from the known registration list. No visual risk once it compiles.

### 3.6 🟠 MEDIUM — The `provide/inject` heading bridge
**Today:** `MarkdownPage` sends its live TOC headings *up* to `HeaderNav` (mobile TOC bar) via App-level `provide/inject` — a cross-tree reactive channel.

**Mitigation:** in Astro the doc page **knows its headings at build time** (`render()` returns them), so pass them into `BaseLayout`/`HeaderNav` as props — simpler than today. The scroll-spy *active* heading (runtime) lives inside the doc island; if `HeaderNav` needs it live, use a 3-line nanostore or a `CustomEvent`. No visual change.

### 3.7 🟠 MEDIUM — Persistent shell islands + theme FOUC
**Today (all mount once in `App.vue`, live for the session):** `HeaderNav` (hide-on-scroll), `FullscreenMenu` (scroll-lock via `menu-open` class on `<html>`), `MainFooter` theme toggle (system/light/dark → `document.documentElement.className`, `localStorage['user-theme']`), `CustomChatUI` (session/history in `localStorage`, a `MutationObserver` watching the menu's `menu-open` class).

**Mitigation:**
- Render each as **one island in `BaseLayout`** (`client:load` for nav/menu/chat). Their continuity already rides on `localStorage`, not memory, so MPA nav is fine; with View Transitions (§3.4) they persist anyway.
- **FOUC fix:** the SPA sets the theme class in JS after boot (so today a reload briefly shows the OS theme). Add a **tiny inline `<head>` script** in `BaseLayout` that reads `localStorage['user-theme']` and sets the root class *before paint* — strictly better than today, no flash.
- **Decouple** the chat↔menu `MutationObserver` coupling into a small shared store (`menu-open` state), or keep the class-on-`<html>` contract identical so the observer still works verbatim.
- Global **haptics + click-sound** listeners (`main.ts`, gated on `localStorage['user-haptic']`/`['user-sound']`) → move into a single layout `<script>`. `v-appear`/`v-highlightjs` directives → island logic or drop (`v-highlightjs` superseded by build-time Shiki).

### 3.8 🟡 LOW-MEDIUM — `readTime.ts` (`raw-loader` + `require.context`)
Uses Webpack-only `!!raw-loader!` to eager-load all doc bodies and compute read time. **Mitigation:** compute in the content-collection loader / a remark plugin from the entry `body`. No visual change.

### 3.9 🟡 LOW-MEDIUM — `counter-fill` heading word-wrap
A bespoke canvas typography lib wraps heading words (`span.cf-word` targeted in `typography.scss`). **Mitigation:** port `packages/counter-fill` as a small `client:visible` script/island on pages that use it; verify headings match. Confirm which pages actually invoke it (may be near-dead).

### 3.10 🟢 LOW — Config-level replicas (build-blocking but trivial)
- **`@/` alias** → mirror in `tsconfig.json` `paths` **and** `astro.config` `vite.resolve.alias { '@': '/src' }`. High blast radius if missed; one-line fix.
- **Build scripts** → `@astrojs/sitemap` (replaces `generate-sitemap`), `@astrojs/rss` (replaces `generate-rss`), a `src/pages/llms.txt.ts` endpoint (replaces `generate-llms`), keep `generate-lab-css.js` as a prebuild step. `prerender.mjs` is **deleted** (native SSG). `gh-pages-deploy` → `withastro/action`.
- **Storybook** → swap `@storybook/vue3-webpack5` for `@storybook/vue3-vite`, re-wire the `@` alias + SCSS preset. Dev-only, no site risk.

---

## 4. What ports verbatim (the reassuring majority)

- **All design tokens** — `_config.scss` (721 lines of CSS custom properties: colors, `--size-*` scale, spacing, radius, `clamp()` fluid type, weights, shadows, gradients, image filters), `:root.dark-theme`/`.light-theme`/`@media prefers-color-scheme`, and the full `@media print` block. Astro has native Dart Sass.
- **`html { font-size: 10px }`** (rem base) — preserved exactly; every `rem` stays correct.
- **Typography, spacing, motion, form SCSS** — copied unchanged; imported **once** in `BaseLayout` via the existing `css/all.css` barrel (same mechanism as `App.vue` today).
- **Fonts** — Manrope (`<link>` to Google Fonts + preconnect, moved to layout `<head>`) and self-hosted Epilogue (`@font-face` → `src/assets/type/`). `font-variation-settings` axes preserved as-is.
- **Labs** (`public/lab/**` — scroll-audio, counter-fill, gradient-placeholders, photo-filters) — self-contained static apps, copied verbatim; `generate-lab-css.js` stays a prebuild step.
- **Chat backend** (`chat-api/` Vercel fn + `build-chat-context.mjs` + its GitHub Action) — untouched.
- **Email** — EmailJS (`emailjs-com`) contact forms, Buttondown newsletter `fetch`, `mailto:` modal — all client-side, become small `client:visible` islands. No backend migration.
- **Data files** — `library.json`, `work.json`, `chapters.json`, `course-template.json`, `still-yourself.json`, `quotes.json` used as-is by `getStaticPaths`.
- **Dev tooling** — `design-guard` (scans source text, framework-agnostic; keep `design-guard:ignore` comments when copying SCSS), `smart-quotes`, Prettier (+ `prettier-plugin-astro`), Husky `pre-commit`. Survive unchanged.

---

## 5. Cleanup opportunities (optional — flag, don't force)
Surfaced during inventory; **not required** for the port, but the migration is a natural moment to drop dead weight (each removal must still pass the screenshot diff):
- **Delete Contentful**: `contentful`, `contentful-rich-text-vue-renderer`, `@contentful/*` deps + `InfoPage.vue`, `MyDocs.vue`, `MyBlog copy.vue`, `BlogPost.vue`, `.env` Contentful keys.
- **Dead components**: `ProductCarousel.vue` (0 uses), `HeroAnimated copy.vue`, `SidebarNav copy.vue`, `SideNav`(verify), legacy `ThemeButton.vue`, commented `StickyNav`.
- **Duplicated GSAP block** copy-pasted across 4 files → one shared island/script.
- **Two EmailJS packages** installed (`@emailjs/browser` + `emailjs-com`); only `emailjs-com` used.
- **`markdown-it`, `marked`, `vue-markdown-loader`, `front-matter`, `highlight.js`** runtime deps become build-time (Shiki/remark) or unnecessary.

---

## 6. Phased execution plan (incremental, reversible)

The Astro app is built **alongside** the current site on the migration branch; the old build keeps working until the new one passes parity. Risk-first ordering so the scariest unknowns are proven early.

**Phase 0 — Scaffold & config (0.5 day).** Astro project, `output:'static'`, `@astrojs/vue`, `@/` alias in tsconfig + Vite, copy `src/assets/styles/**` and import `all.css` in a stub `BaseLayout`, move fonts, wire `@astrojs/sitemap`/`@astrojs/rss`. *Exit:* a blank page renders with correct tokens/fonts.

**Phase 1 — The hard core: one `/doc/[slug]` end-to-end (2–3 days).** Content collection, remark/rehype plugins for anchors + code blocks + tokens + hero extraction, image codemod (§3.2), `DocLayout`, JSON-LD, read time. *(The committed `experiments/astro-doc-proto` is the seed.)* *Exit:* three representative docs (article w/ code, case study w/ many images, `<header>`-hero doc) **screenshot-match** the current build.

**Phase 2 — Shell & layout (2 days).** `BaseLayout` with the 4 hide-flags; port `HeaderNav`, `FullscreenMenu`, `MainFooter`(theme), `CustomChatUI`, `Icon` (astro-icon), global haptics/sound script, pre-paint theme script, View Transitions. *Exit:* shell matches on a full-shell and a bare page; theme toggle + menu + chat work; no FOUC.

**Phase 3 — Static pages (2–3 days).** The ~13 non-dynamic pages (`/`, `/hire`, `/library`, `/writing`, `/work`, `/play`, etc.), adding explicit component imports as needed, porting the GSAP reveal island. *Exit:* each page screenshot-matches.

**Phase 4 — Remaining dynamic routes (2 days).** `/work/[id]`, `/course/[slug]` (+ soft-lock island reading the same `localStorage` key), `/session/[slug]`, `/secured/doc/[slug]`, numeric-id redirects, `redirects` config for `/info` `/about`. *Exit:* every route in §2 resolves and matches.

**Phase 5 — Tooling & deploy (1 day).** Storybook→Vite builder, `llms.txt` endpoint, delete `prerender.mjs`, swap the GitHub Pages workflow to `withastro/action`, keep `generate-lab-css` prebuild, Husky/design-guard intact. *Exit:* CI builds & deploys to `ramphal.design` from a preview.

**Phase 6 — Parity gate & cutover (1 day).** Full screenshot diff of **all routes** (§7), fix diffs, optional dead-code cleanup (§5), then point `main`'s deploy at Astro. Old build stays in git history for rollback.

*Rough total: ~2 weeks of focused work, front-loaded on the two HIGH-risk subsystems.*

---

## 7. How we *prove* "no visual change" — the parity gate

The contract is enforced, not asserted. You already have **Playwright** installed and `prerender.mjs` already enumerates every route — repurpose both:

1. **Baseline:** run the *current* build, screenshot every route (desktop + mobile widths, light + dark theme) → `baseline/`.
2. **Candidate:** run the *Astro* build, screenshot the same routes/URLs → `candidate/`.
3. **Diff:** pixel-diff each pair (e.g. `pixelmatch`); any route over a small threshold is a blocking regression with a visual artifact showing exactly what moved.
4. Gate each phase on its subset; gate cutover on the full set (all §2 routes × 2 widths × 2 themes).

This turns "zero visual change" from a hope into a CI check. Doc pages, code blocks, themed icons, hero blocks, and the shell are exactly where diffs would appear — and exactly what the harness covers.

**Residual risks the diff is designed to catch:** themed inline-SVG icons (§3.3), code-block markup (§3.1), image path breakage (§3.2), the fade/slide transition feel (§3.4, the one behavioral—not pixel—difference), and `counter-fill` headings (§3.9).

---

## 8. Summary

| | |
|---|---|
| **Feasible as a 1:1 port?** | Yes. Every route in §2 has a destination; every token in §4 ports verbatim. |
| **Biggest risks** | Markdown pipeline (§3.1) and image paths (§3.2) — both prototype-first, both diff-gated. |
| **Only true behavioral change** | Page transitions become Astro View Transitions (§3.4) instead of Vue `<transition>` — reproduced, not copied. |
| **Net wins** | ~879 kB → ~6 kB critical JS per doc, no Playwright prerender, closed prerender gaps, build-time syntax highlighting, dead Contentful/Vuex removed. |
| **What stays exactly** | Design tokens, typography, theme, fonts, labs, chat backend, email, data, design-guard. |
| **Proof mechanism** | Full-route screenshot diff (§7), gating every phase and cutover. |
