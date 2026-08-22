# Static clone

A minimal, dependency-free translation of ramphal.design: two pages and one stylesheet.

- `index.html` — the homepage: hero, Select Work, About, Writing, subscribe band, footer
- `about.html` — a doc/markdown page (`/doc/info`): lead image, sticky TOC, prose, footer
- `style.css` — tokens, type scale, and layout

Open `index.html` in a browser. No build step, no server, no network requests.

## What was kept

Tokens, the fluid type scale, container padding, grid columns and gaps are copied from the Vue
source (`src/assets/styles/scss/_config.scss`, `typography.scss`, `src/components/grid/*`) rather
than re-guessed, so sizes and rhythm match at every breakpoint. Light and dark both work, driven by
`prefers-color-scheme`. Content is the real content: the same headline, case studies, articles, and
the full text of `src/assets/content/doc_70.md`.

## What was dropped, and why

- **Fonts.** The site ships a variable Manrope. No font files here, so the stack falls back to
  `system-ui` — which is what a visitor sees before the webfont loads anyway.
- **Images.** Card thumbnails, the portrait, and the doc lead image are CSS gradients. The offset
  and rotation of the `angled` card variant are reproduced exactly; only the pixels are stand-ins.
- **Anything that needed JS.** The scroll-hide navbar (sticky here instead), scroll-triggered
  fades, the counter-fill headline effect, the theme/font/sound toggles in the footer's Config
  column, the TOC's active-heading highlight, the mobile card slider, the lightbox, share and print
  buttons, and the related-writing row at the foot of a doc page.
- **The rest of the site.** Links to pages that don't exist in the clone point at the live site.
  The subscribe form posts to the same Buttondown endpoint the real one uses.
