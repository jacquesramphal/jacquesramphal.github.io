# Plain HTML + Web Components prototype

A throwaway prototype exploring the "plain HTML / CSS / Web Components / minimal JS"
approach for the site. Not wired into the build; **nothing about the live site changes.**

`index.html` is a single self-contained page (publishable as a Claude artifact) with:

- **Two views** via a ~10-line hash router: a homepage (`#/`) and a markdown-powered
  article page (`#/doc/the-ramstack`).
- **Two vanilla Web Components** (no framework, no library):
  - `<md-article src="#id">` — reads markdown from a script tag and renders it into
    light DOM (so the site's global CSS applies), using a tiny inline markdown parser.
  - `<theme-toggle>` — cycles System / Light / Dark using the site's own
    `.light-theme` / `.dark-theme` class mechanism, persisted to `localStorage`.

## Renders the real styles

- The site's SCSS (`src/assets/styles/scss/*`, the full `all.css` chain) is **compiled
  to CSS and inlined**, so tokens, the `html{font-size:10px}` scale, `#app` colour, and
  all `h1–h6 / p / blockquote / a` rules apply verbatim.
- **Fonts are embedded as data URIs** (Manrope + Epilogue) because the artifact sandbox's
  CSP blocks external font URLs.
- The whole file is charset-independent: the markdown is base64 (decoded as UTF-8 in JS),
  everything else is ASCII, so it renders correctly regardless of how it's served.

## Regenerate

The file is produced by a build script (compile SCSS → strip the relative-path Epilogue
`@font-face` → embed fonts + compiled CSS + article markdown). Re-run that against the
current `src/assets/styles/` to refresh it after token changes.
