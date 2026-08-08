# Plain HTML + Web Components prototype

A throwaway prototype exploring the "plain HTML / CSS / Web Components / minimal JS"
approach for the site. Not wired into the build; **nothing about the live site changes.**

Structured like the real site — separate stylesheet, separate JS, self-hosted fonts,
content as its own Markdown file — rather than one inlined blob.

## Files

```
index.html              markup only; links styles.css + app.js
styles.css              @font-face (self-hosted) + the site's compiled tokens/typography + layout
app.js                  ES module: <md-article>, <theme-toggle>, tiny hash router, md parser
content/the-ramstack.md the article, as its own Markdown file (fetched at runtime)
fonts/                  self-hosted Manrope (woff2) + Epilogue (ttf)
build-inline.mjs        generates preview.html (self-contained bundle)
preview.html            GENERATED — do not edit by hand
```

## Two views, two vanilla Web Components (no framework, no library)

- `<md-article src="...">` — renders Markdown into **light DOM** (so the site's global CSS
  styles the content). `src` is either a URL to a `.md` file (dev: fetched over HTTP) or a
  `#id` selector pointing at an inline base64 block (used by the preview build).
- `<theme-toggle>` — cycles System / Light / Dark using the site's own `.light-theme` /
  `.dark-theme` class mechanism, persisted to `localStorage`.

## Renders the real styles

`styles.css` is the site's SCSS (`src/assets/styles/scss/*`, the full `all.css` chain)
**compiled to CSS** — so tokens, the `html{font-size:10px}` scale, `#app` colour, and all
`h1–h6 / p / blockquote / a` rules apply verbatim. Manrope is the real UI face; Epilogue
covers the fallback stacks.

## Run it

```bash
# dev (split files, article fetched over HTTP — fetch needs a server):
npx serve .            # or any static server, then open http://localhost:3000

# regenerate the self-contained preview (for a strict-CSP host / Claude artifact):
node build-inline.mjs  # → preview.html
```

## Why the preview is a separate build

A Claude artifact (and any strict-CSP host) can't load external files or `fetch()`.
`build-inline.mjs` inlines the CSS (fonts → data URIs), inlines the JS, and embeds the
article Markdown as base64, emitting a single charset-independent `preview.html`. The
**split files are the source of truth**; `preview.html` is generated.
