# Astro `/doc` route — prototype

An isolated, throwaway prototype that rebuilds **one** page from the site — the
`/doc/the-ramstack` article — in [Astro](https://astro.build), to compare it
head-to-head against the current Vue CLI + Webpack build.

It is deliberately kept **out of the pnpm workspace** (`pnpm-workspace.yaml`
globs `apps/**` and `packages/**`, not `experiments/**`) and has its own
`node_modules`, so it cannot affect the real site's build.

## What it demonstrates

1. **Content collections** (`src/content.config.ts`) are the Astro-native
   equivalent of `docs.json` / `library.json` — frontmatter is validated at
   build time, so a malformed doc fails the build instead of rendering broken.
2. **File-based routing** (`src/pages/doc/[slug].astro`) replaces the runtime
   `docRegistry` lookup — every doc is a static HTML file generated at build.
3. **Islands + Vue reuse** — the only interactive piece (the scroll-spy
   "On this page" TOC) is a plain `.vue` SFC hydrated with `client:visible`.
   It's the *only* thing that ships JS. This proves your existing
   `src/components/*.vue` can be reused incrementally during a migration.

## The numbers (real, from `pnpm build` on both sides)

Measured on the same article (`doc_58.md`, "The Ramstack").

| | Current Vue CLI build | This Astro prototype |
|---|---|---|
| **JS to render the article** (critical path, gzip) | **~879 kB** (`app.js` 389 kB + `chunk-vendors.js` 490 kB, loaded before any route paints) | **0 kB** — the article is static HTML (5.8 kB gzip) and readable instantly |
| **Deferred/interactive JS** | included in the above | **~29 kB gzip**, and only for the TOC scroll-spy — of which ~26 kB is Vue's runtime I *opted into*. Drop Vue for the TOC → ~0. |
| **Total JS shipped (all chunks)** | ~1,015 kB gzip across 101 chunks | ~29 kB gzip |
| Build tooling | `vue-cli-service` (maintenance mode) + Webpack | Astro + Vite |
| Syntax highlighting | `highlight.js` at **runtime** (ships to client) | Shiki at **build time** (zero client JS) |

That's the critical-path JS to read one article going from **~879 kB → ~6 kB**
of blocking payload. The gap widens on mobile/slow connections, where the SPA
has to download, parse, and boot the framework before a single word appears.

### Honest caveats

- The current `app.js` is fat partly because it's an SPA that bundles every
  route, GSAP, `marked`, `highlight.js`, Contentful, Vuex and the router into
  the initial load. Some of that could be code-split *within* Vue too — but the
  SPA model still ships the framework runtime + router + app shell before
  rendering anything. Astro's model ships nothing by default.
- This prototype replicates the **core reading experience** (hero, content,
  TOC, on-brand tokens), not every feature (presenter mode, share widget,
  lightbox, related-writing rail). Each of those becomes its own island; none
  changes the "static-by-default" baseline.
- As you add the homepage, nav, and animations, Astro's total JS rises — but
  each stays an island, and the content pages (the bulk of the site) stay
  near-static.

## Run it

```bash
cd experiments/astro-doc-proto
pnpm install --ignore-workspace
pnpm build      # outputs to ./dist
pnpm preview    # serve the build locally
```

`proto-screenshot.png` is a render of the built page for quick reference.
