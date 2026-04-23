# Lab

Standalone HTML experiments. No build step, no framework dependencies. Everything in this directory deploys as-is to `yoursite.com/lab/`.

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
