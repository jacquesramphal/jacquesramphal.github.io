# Lab

Standalone HTML experiments. No build step, no framework dependencies. Everything in this directory deploys as-is to `yoursite.com/lab/`.

## What Labs is

Labs is the single home for everything playful — **play, experiments, and
games**. There's no separate "Play" page: `/play` redirects to `/library`, and
Library (which has a built-in **Lab** filter) is the browse surface. To surface
an experiment, add a `type: "lab"` entry to `src/assets/data/library.json` with
`published: true` and a `link` into `public/lab/…`. When an experiment earns a
proper write-up it graduates to a `/doc/` and shows up alongside the tools — the
path Counter Fill took.

### In Labs today

- **Scroll-Driven Audio** — `/lab/scroll-audio/`
- **Editorial Photo Filters** — `/lab/photo-filters/`
- **Counter Fill** — `/lab/counter-fill/`
- **Gradient Placeholders** — `/lab/gradient-placeholders/` (live, not yet listed)
- **The Everything Button** — `/lab/everything-button/` (ideation in `IDEAS.md`, not built yet)

### Games to fold in

- **Unique Word Counter** — built; lives at `/play/word-counter` and in the
  private `unique-word-counter` repo. Ready to add as a Labs entry.
- **The Lost in Connection** — TBD. Needs a one-line description and a pointer
  to the code before it can be listed.

## Local preview

```
npx serve public
```

Then open `http://localhost:3000/lab/`.

Canvas pixel operations (thermal, halftone, chromatic aberration in filters.html) require HTTP — they won't work on `file://`.

## Adding an experiment

Create a folder or file under `public/lab/`. Keep experiments self-contained: inline styles, inline scripts, no imports from `src/`. Each experiment should work as a single HTML file (or a folder with its own assets).

```
public/lab/
  filters.html          ← CSS/SVG/Canvas photo filters
  portrait.jpg          ← shared test image
  scroll-audio/         ← scroll-driven audio synthesis
    index.html
    crescendo.js
    engine.js
    style.css
```

## Conventions

- Plain HTML, CSS, JS. No JSX, no build tools, no node_modules.
- Each experiment is self-contained and independently loadable.
- Keep assets (images, audio) local to the experiment folder or shared at the lab root.
- Use `public/lab/` as the canonical path. Don't put experiments at the repo root.
