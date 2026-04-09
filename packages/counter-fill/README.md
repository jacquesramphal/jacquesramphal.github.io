# Counter Fill: Colouring the Holes in Your Type

Fills the enclosed counter spaces inside letterforms — the holes in **o, e, a, g, d, b, p** — with any colour or gradient.

Fully generative. Works on any word, any font, any size. No hardcoded letterforms. Real DOM text — accessible, selectable, screen-readable.

---

## Files

| File | Purpose |
|---|---|
| `counter-fill.js` | The library |
| `demo.html` | Self-contained working demo — open in any browser or paste into CodeSandbox |

---

## Usage

Required CSS is injected automatically — no stylesheet needed.

### 1. Load the library

```html
<script src="counter-fill.js"></script>
```

### 2. Mark your elements

Single-line — canvas first (behind text), span.text second (in front):

```html
<h1 class="wrap" id="heading-golden">
  <canvas></canvas>
  <span class="text">Golden</span>
</h1>
```

Multi-line — just write the text, JS splits words automatically:

```html
<h2 class="wrap-multi" id="heading-multi">
  Golden Baroque Obsidian
</h2>
```

### 3. Init with your colours

```js
document.fonts.ready.then(() => {
  CounterFill.init({
    'heading-golden': { stops: ['#f5c842', '#d4820a', '#7a3a08'] },
    'heading-multi':  { stops: ['#f5c842', '#d4820a', '#7a3a08'] },
  });
});
```

---

## Framework integration

### Vanilla JS

If the script loads after the DOM exists (e.g. `<script>` at the end of `<body>`), `document.fonts.ready` is all you need — no lifecycle hook required:

```html
<script src="counter-fill.js"></script>
<script>
  document.fonts.ready.then(() => {
    CounterFill.init({
      'my-heading': { stops: ['#f5c842', '#d4820a'] },
    });
  });
</script>
```

---

### Vue

Use `mounted()` — this is Vue's equivalent of "DOM is ready". `document.fonts.ready` is still required inside it.

**Simple case — you control the element in your template:**

```vue
<template>
  <h1 class="wrap" id="my-heading">
    <canvas></canvas>
    <span class="text">Golden</span>
  </h1>
</template>

<script>
import CounterFill from './counter-fill.js';

export default {
  mounted() {
    document.fonts.ready.then(() => {
      CounterFill.init({
        'my-heading': { stops: ['#f5c842', '#d4820a'] },
      });
    });
  },
};
</script>
```

**Edge case — targeting a child component's rendered output:**

If the element is rendered by a child component (you can't add `class`/`id` to it directly), use `$nextTick` to wait for child components to finish rendering:

```js
mounted() {
  this.$nextTick(() => {
    const el = this.$el.querySelector('h1.title');
    if (el) {
      el.id = 'my-heading';
      el.classList.add('wrap-multi');
      document.fonts.ready.then(() => {
        CounterFill.init({
          'my-heading': { stops: ['#f5c842', '#d4820a'] },
        });
      });
    }
  });
},
```

`$nextTick` is only needed in this case. If you control the element in your own template, skip it.

---

### React

Use `useEffect` with an empty dependency array — this runs after the first render, equivalent to `mounted()`:

```jsx
import { useEffect } from 'react';
import CounterFill from './counter-fill.js';

export default function Heading() {
  useEffect(() => {
    document.fonts.ready.then(() => {
      CounterFill.init({
        'my-heading': { stops: ['#f5c842', '#d4820a'] },
      });
    });
  }, []);

  return (
    <h1 className="wrap" id="my-heading">
      <canvas></canvas>
      <span className="text">Golden</span>
    </h1>
  );
}
```

---

## Fill config

Each entry in `FILLS` is keyed by the element's `id` and contains a `stops` array. They become a radial gradient from inside out. One stop = solid fill.

CSS custom properties are resolved automatically at paint time — design tokens work directly:

```js
CounterFill.init({
  // Solid fill
  'my-word':   { stops: ['#f5c842'] },
  // Two-stop gradient
  'my-word-2': { stops: ['#f5c842', '#7a3a08'] },
  // Three-stop gradient
  'my-word-3': { stops: ['#ff6060', '#c01020', '#600010'] },
  // CSS variables / design tokens
  'my-word-4': { stops: ['var(--color-accent)'] },
  'my-word-5': { stops: ['var(--color-primary)', 'var(--color-secondary)'] },
});
```

---

## API

```js
// Paint all .wrap and .wrap-multi elements, start resize observer
const ro = CounterFill.init(FILLS);

// Paint one element manually (e.g. after dynamic content added)
CounterFill.paint(document.getElementById('my-word'), FILLS);

// Register a font for SVG rendering (call before init)
// Use for fonts loaded via JS, cross-origin, or CDN-hosted
await CounterFill.registerFont('My Font', '/fonts/my-font.woff2');
await CounterFill.registerFont('My Font', '/fonts/my-font-italic.woff2', { style: 'italic', weight: '700' });
```

---

## Full example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
  <style>
    /* YOUR styles — nothing here is required by counter-fill */
    body { background: #0e0e0e; display: flex; flex-direction: column; align-items: center; gap: 64px; padding: 80px 32px; }
    .heading { font-family: 'Playfair Display', serif; font-size: clamp(64px, 15vw, 140px); font-weight: 900; color: #f0ece4; }
  </style>
</head>
<body>

  <!-- REQUIRED: class="wrap" + unique id + <canvas> + <span class="text"> -->
  <h1 class="wrap heading" id="w1">
    <canvas></canvas>
    <span class="text">Golden</span>
  </h1>

  <!-- Repeat the same structure for each word -->
  <h1 class="wrap heading" id="w2">
    <canvas></canvas>
    <span class="text">Aperture</span>
  </h1>

  <!-- MULTI-LINE: class="wrap-multi" + unique id — just write the text, no inner markup needed -->
  <h2 class="wrap-multi heading" id="wm">Golden Baroque Obsidian</h2>

  <!-- REQUIRED: load the library -->
  <script src="counter-fill.js"></script>
  <script>
    // REQUIRED: wait for fonts, then init with your colours keyed by element id
    document.fonts.ready.then(() => CounterFill.init({
      w1: { stops: ['#f5c842', '#d4820a', '#7a3a08'] }, // YOUR colours
      w2: { stops: ['#e05c5c', '#a01830', '#4a0010'] }, // YOUR colours
      wm: { stops: ['#f5c842', '#d4820a'] },            // multi-line — same config, JS handles the rest
    }));
  </script>
</body>
</html>
```

---

## How it works

1. Text is drawn onto an offscreen canvas at its exact DOM position (measured via a CSS `vertical-align:baseline` probe)
2. BFS flood-fill from every canvas edge marks all *outside* transparent pixels
3. Any unmarked transparent pixel is enclosed — a counter hole
4. Counter pixels are dilated 2px to close antialiasing gaps
5. Fill canvas sits behind the real text via `z-index` — text renders on top covering any bleed

---

## Notes

- `letter-spacing` is supported — canvas picks it up from computed style
- DPR-aware — renders at full resolution on retina screens
- Real text node untouched — accessible, selectable, screen-readable
- Multi-line mode gives each word its own canvas — counters follow their word when text wraps
- CSS variables in `stops` are resolved at paint time — design tokens work directly
- Resize is debounced via double `requestAnimationFrame` with a size cache to skip unchanged repaints
- Font must be loaded before init — wrap in `document.fonts.ready.then(...)`

---

## Font sources

Fonts are auto-detected from two sources:

| Source | Auto-detected? | Notes |
|---|---|---|
| Google Fonts `<link>` | Yes | CSS is fetched, font URLs extracted and cached |
| Same-origin `@font-face` | Yes | Read from CSSOM at init time |
| Cross-origin `@font-face` | No | CORS blocks reading stylesheet rules — use `registerFont()` |
| System / local fonts | No | Not fetchable — uses canvas fallback (static fonts work well) |
| Fonts loaded via JS (`new FontFace()`) | No | Not in any stylesheet — use `registerFont()` |

For fonts that can't be auto-detected, register them before calling `init()`:

```js
// Register a CDN-hosted variable font
await CounterFill.registerFont('Inter', 'https://cdn.example.com/inter-variable.woff2');

// Register specific style/weight variants of a static font
await CounterFill.registerFont('Merriweather', '/fonts/merriweather-bold.woff2', { weight: '700' });
await CounterFill.registerFont('Merriweather', '/fonts/merriweather-bold-italic.woff2', { style: 'italic', weight: '700' });

// Then init as usual
document.fonts.ready.then(() => CounterFill.init({ ... }));
```

---

## Variable font support

Three rendering paths, selected automatically via feature detection:

1. **SVG embedded-font** (best) — font is base64-encoded into an SVG `<text>` element drawn to canvas. Supports all axes (`wght`, `wdth`, `opsz`, `SOFT`, custom axes). Used when the font is in the cache (auto-detected or registered).

2. **`ctx.fontVariationSettings`** (Chrome 134+) — native canvas support for all axes. Feature-detected automatically.

3. **Canvas fallback** — `wght` via font-weight, `wdth` via font-stretch keywords with width-scaling correction, probe-canvas drift correction for static fonts. Used when SVG and FVS are unavailable.

### Safari notes

Safari's SVG engine partially applies `font-variation-settings` — standard axes (`wght`, `wdth`) work via their CSS property equivalents, but custom axes (`SOFT`, `GRAD`, etc.) may not be fully applied. Counter fills on Safari use `textLength` for alignment and increased dilation to compensate for glyph shape differences. Results are good but not pixel-identical to Chrome.

---

## Known gaps

> Update later: these are tracked for future improvement.

- **Safari custom axes** — Custom font-variation-settings axes (e.g. `SOFT`, `GRAD`) may not render pixel-perfect in Safari's SVG engine. Fills use increased dilation to compensate but may appear slightly smaller than on Chrome.
- **Cross-origin fonts without registration** — Fonts loaded from cross-origin stylesheets (e.g. CDN `<link>` without CORS headers on the stylesheet) can't be auto-detected. Use `registerFont()` as a workaround.
- **System fonts with variable axes** — Local/system variable fonts can't be fetched for SVG embedding. They fall back to the canvas path, which doesn't support custom axes.
- **Google Fonts subset selection** — Auto-detection picks the last `@font-face` block per family/style/weight (typically latin). Fonts using non-latin characters may load the wrong subset.

---

## Browser support

| | |
|---|---|
| Canvas 2D | All modern browsers |
| SVG embedded-font path | All modern browsers (best variable font support) |
| `ctx.fontVariationSettings` | Chrome 134+ (March 2025) |
| `ctx.letterSpacing` | Chrome 99+, Firefox 116+, Safari 17.2+ |
| `ResizeObserver` | Chrome 64+, Firefox 69+, Safari 13.1+ |
