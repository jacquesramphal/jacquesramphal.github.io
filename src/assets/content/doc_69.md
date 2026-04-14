# Counter Fill: Colouring the Holes in Your Type

Fills the enclosed spaces inside letterforms — the holes in **o, e, a, g, d, b, p** — with colour or gradient. Live HTML text, any font, any size.

![Counter Fill Example](../images/casestudy/counter-fill/counter-fill-2.png)



## The counter as a design detail

The counter is the enclosed space inside a letterform: the bowl of an **o**, the eye of an **e**, the aperture of a **p**. Type designers have shaped and tuned these spaces for centuries. In display type, they carry as much visual weight as the strokes themselves.

In print and in design tools, filling a counter with a contrasting colour is a standard technique. Editorial mastheads, logotypes, concert posters — designers reach for it whenever type is being treated as image rather than content.

<!-- PLACEHOLDER: Add 3–4 real-world examples of counter-filled type from editorial, poster, and branding history. Good sources: fontsinuse.com/tags/4154/filled-in-counters, Vogue mastheads, Herb Lubalin lettering, etc. -->

In the browser, on live text, nobody had solved it. Not with something that works on any font, at any size, without exporting the type as an image first.

I noticed the gap because I work on both sides of the design-development divide. Designers don't think about what it takes to replicate a print technique in code. Developers don't think about letterform counters. The absence was obvious from where I was standing.



## Why the workarounds fall short

The existing options are all compromises. SVG paths drawn by hand require redrawing for every font change and fall apart the moment you scale or reflow. CSS blend mode tricks depend on the background being a specific colour and break on anything textured or dark. Image exports throw away accessibility entirely — the text becomes unpickable, unsearchable, invisible to screen readers.

The constraint I set: real DOM text, any font, any size, accessible. No pre-baked paths. No images. Nothing hardcoded to a specific letterform.



## How it works

Counter Fill uses Canvas 2D as a rendering surface. It draws the text onto an offscreen canvas, then runs a BFS flood-fill from every edge pixel. Any transparent pixel the flood can reach from the edge is outside the letterforms. Any transparent pixel it can't reach is enclosed — a counter.

The canvas doesn't need bezier paths or letterform outlines. It just needs to know which pixels are ink and which are air, which the browser's Canvas 2D context already knows.

Three details make it work reliably rather than just in a demo:

**Baseline alignment.** The Canvas `textBaseline` and DOM layout don't agree precisely. A probe canvas measures where the ink actually lands, compares it against the expected position, and corrects the offset before drawing. Without this, fills drift at specific screen densities and across browsers.

**Dilation.** Counter pixels are expanded 2px outward before painting to close antialiasing gaps at stroke edges. The text span sits above the canvas via `z-index`, so any bleed is covered by the strokes themselves.

**Multi-line.** In multi-line mode, each word gets its own canvas, measured by a zero-width baseline probe span. The gradient stays coherent across line breaks because all word canvases share the same gradient origin.



## Demo

### Display type

<iframe height="700" style="width:100%;border:0;border-radius:8px;" scrolling="no" src="https://codepen.io/jacquesramphal/embed/019d6a8b-f8b2-7211-a1f0-6497fa65c2d4?default-tab=result" loading="lazy" allowfullscreen="true"></iframe>

### Multi-line

<iframe height="700" style="width:100%;border:0;border-radius:8px;" scrolling="no" src="https://codepen.io/jacquesramphal/embed/019d6a98-6565-7819-a86b-c9157ef62c55?default-tab=result" loading="lazy" allowfullscreen="true"></iframe>



## Variable fonts

Variable fonts add a layer of complexity because the canvas has to match a glyph that may be at a custom `wght`, `wdth`, or any proprietary axis — and Canvas 2D historically didn't support those axes natively.

Counter Fill selects from three rendering paths automatically:

1. **SVG embedded-font** — the font file is fetched, base64-encoded, and embedded in an SVG `<text>` element drawn to canvas. This supports all axes including custom ones like `SOFT` or `GRAD`. It's the most accurate path and works in all modern browsers.
2. **`ctx.fontVariationSettings`** — Chrome 134+ added native canvas support for variation settings. When available, this path is used directly.
3. **Canvas fallback** — `wght` maps to font-weight, `wdth` maps to font-stretch keywords with a width-scaling correction pass. Works everywhere; doesn't support custom axes.

Safari's SVG engine partially applies `font-variation-settings`. Standard axes (`wght`, `wdth`) work via their CSS property equivalents, but custom axes like `SOFT` may not render pixel-identically to Chrome. Fills on Safari use increased dilation and `textLength` for alignment. The result is visually close, not pixel-perfect.

Fonts are auto-detected from Google Fonts `<link>` tags and same-origin `@font-face` rules. Cross-origin fonts and fonts loaded via JavaScript need to be registered manually:

```js
// Register before calling init()
await CounterFill.registerFont('My Font', '/fonts/my-font.woff2');
await CounterFill.registerFont('My Font', '/fonts/my-font-italic.woff2', { style: 'italic', weight: '700' });
```

<!-- PLACEHOLDER: Add variable font CodePen embed (wght × wdth axes, Roboto Flex) once created from CODEPENS.md snippet #3 -->



## Usage

Required CSS is injected automatically — no stylesheet needed.

### Single-line

```html
<h1 class="wrap" id="w1">
  <canvas></canvas>
  <span class="text">Golden</span>
</h1>

<script src="counter-fill.js"></script>
<script>
  document.fonts.ready.then(() => {
    CounterFill.init({
      w1: { stops: ['#f5c842', '#d4820a', '#7a3a08'] },
    });
  });
</script>
```

### Multi-line

Just write the text. The library splits words automatically.

```html
<h2 class="wrap-multi" id="wm">Golden Baroque Obsidian</h2>

<script>
  document.fonts.ready.then(() => {
    CounterFill.init({
      wm: { stops: ['#f5c842', '#d4820a'] },
    });
  });
</script>
```

### Fill config

Two or more stops become a radial gradient from the centre out. One stop is a solid fill. CSS custom properties resolve at paint time — design tokens work directly.

```js
CounterFill.init({
  w1: { stops: ['#f5c842', '#d4820a', '#7a3a08'] }, // 3-stop gradient
  w2: { stops: ['#60c8f0', '#002060'] },             // 2-stop
  w3: { stops: ['#e05c5c'] },                        // solid
  w4: { stops: ['var(--color-accent)'] },            // design token
});
```

For Vue, React, and module setups, see the [full README on GitHub](https://github.com/jacquesramphal/jacquesramphal.github.io/tree/main/packages/counter-fill).



## A few things worth knowing

### Letter-spacing

`ctx.letterSpacing` is supported in Chrome 99+, Firefox 116+, and Safari 17.2+. On older browsers, counter fills still render — the BFS detection still works — but fills may drift slightly on text with non-zero `letter-spacing`. The effect degrades gracefully; it doesn't break.

<!-- PLACEHOLDER: Add letter-spacing CodePen embed once created from CODEPENS.md snippet #5 -->

### Text-shadow

CSS `text-shadow` doesn't carry into the canvas context, so the fill mask is always clean regardless of what shadows are set on the DOM text. The shadow renders on top of the canvas exactly as it would without the fill. No conflict.

### Line-height

Multi-line mode splits words into per-word canvases. Line-height affects the spacing between those canvases, not the fill detection. The BFS region filter also rejects wide flat strips — the gaps between a canvas bottom edge and the next word — as false positives, so tight or loose leading doesn't produce spurious fills.

<!-- PLACEHOLDER: Add text-shadow + line-height CodePen embed once created from CODEPENS.md snippet #6 -->

### Print

Canvas content doesn't print by default, but Chrome renders it correctly. For other browsers, a `@media print` CSS fallback keeps the text legible:

```css
@media print {
  .wrap canvas { display: none; }
}
```

More elaborate print fallbacks — restoring a CSS background or outline effect — are possible but aren't built into the library.

<!-- TODO: Test print behaviour in Firefox and Safari, confirm fallback needed and update this section accordingly -->

### Vertical writing modes

`writing-mode: vertical-rl` and `vertical-lr` have not been tested. Baseline measurement assumes horizontal text — vertical modes may affect alignment.

<!-- PLACEHOLDER: Add vertical writing modes CodePen embed once tested -->
<!-- TODO: Test vertical writing modes and update this section with findings -->



## Performance

The expensive operation is `getImageData` — reading pixel data back from the GPU. For a 140px heading at 2× DPR, that's about 156,000 pixels and runs in under 1ms on modern hardware. BFS is O(pixels) with comparable cost.

Resize handling stays cheap through three things:

- A `WeakMap` size cache skips elements whose pixel dimensions haven't changed
- Repaints are debounced via double `requestAnimationFrame`, batching all resize events into a single pass
- Font files are fetched once at init and reused for every subsequent paint

Paint only happens on init and on resize. There's no continuous loop.

<!-- PLACEHOLDER: Add performance stress-test CodePen embed once created from CODEPENS.md snippet #8 -->



## In the wild

<!-- PLACEHOLDER: Add 3–4 real-world examples of counter-filled type in editorial, branding, and poster design. Cite sources. Show that this is an established design technique being brought to the browser for the first time. -->



## What I learned

The gap between "this seems like a small detail" and "this took significant effort to get right" is almost entirely about making two rendering systems agree on where text actually sits. Canvas and the DOM have independent layout engines, and they disagree in ways that only show up at specific screen densities, specific fonts, and specific letter-spacing values. The drift correction pass wasn't an optimization — it was necessary.

The other thing worth noting: the BFS approach generalises completely. It doesn't know what a counter is. It finds enclosed transparent regions and fills them. That means it works on any font, any weight, any character — including unusual counter shapes that a path-based approach would have to handle explicitly.
