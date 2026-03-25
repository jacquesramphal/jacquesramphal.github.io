# counter-fill

Fills the enclosed counter spaces inside letterforms — the holes in **o, e, a, g, d, b, p** etc. — with any colour or gradient.

Fully generative. Works on any word, any font, any size. No hardcoded letterforms. Real DOM text — accessible, selectable, screen-readable.

---

## Files

| File | Purpose |
|---|---|
| `counter-fill.js` | The library |
| `codesandbox.html` | Self-contained working demo — open in any browser or paste into CodeSandbox |

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

Add `class="wrap"` and `id` directly in your template, then call `init()` in `mounted()`:

```vue
<template>
  <h1 class="wrap" id="my-heading">
    <canvas></canvas>
    <span class="text">Golden</span>
  </h1>
</template>

<script>
import CounterFill from '@/utils/counter-fill.js';

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

If the element you want to fill is rendered by a child component (you can't add `class`/`id` to it directly), use `$nextTick` to wait for child components to finish rendering before querying the DOM:

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

CSS custom properties are resolved automatically at paint time — no extra setup required. The library evaluates `var(--token)` through the browser's computed style engine, so it respects cascade, fallbacks, and theme changes:

```js
const FILLS = {
  // Solid fill — one stop
  'my-word': { stops: ['#f5c842'] },

  // Two stops — simple gradient
  'my-word-2': { stops: ['#f5c842', '#7a3a08'] },

  // Three stops — richer gradient
  'my-word-3': { stops: ['#ff6060', '#c01020', '#600010'] },

  // CSS variables / design tokens
  'my-word-4': { stops: ['var(--color-accent)'] },
  'my-word-5': { stops: ['var(--color-primary)', 'var(--color-secondary)'] },
};
```

---

## API

```js
// Paint all .wrap and .wrap-multi elements, start resize observer
const ro = CounterFill.init(FILLS);

// Paint one element manually (e.g. after dynamic content added)
CounterFill.paint(document.getElementById('my-word'), FILLS);
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
    body { background: #0e0e0e; display: flex; flex-direction: column; align-items: center; gap: 64px; padding: 80px 32px; }

    .heading {
      font-family: 'Playfair Display', serif;
      font-size: clamp(64px, 15vw, 140px);
      font-weight: 900;
      color: #f0ece4;
    }
  </style>
</head>
<body>

  <h1 class="wrap heading" id="w1">
    <canvas></canvas>
    <span class="text">Golden</span>
  </h1>

  <h1 class="wrap heading" id="w2">
    <canvas></canvas>
    <span class="text">Aperture</span>
  </h1>

  <script src="counter-fill.js"></script>
  <script>
    const FILLS = {
      w1: { stops: ['#f5c842', '#d4820a', '#7a3a08'] },
      w2: { stops: ['#e05c5c', '#a01830', '#4a0010'] },
    };
    document.fonts.ready.then(() => CounterFill.init(FILLS));
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
