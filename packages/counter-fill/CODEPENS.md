# Counter Fill — CodePen Snippets

Each snippet below is a self-contained HTML + CSS + JS example.

## How to set up each pen

1. **JS pane:** paste the full contents of [`counter-fill.js`](./counter-fill.js) at the top, then paste the snippet's JS block below it. The library exposes `window.CounterFill` and the snippet's `CounterFill.init({...})` call paints the elements.
2. **HTML pane:** paste the snippet's HTML.
3. **CSS pane:** paste the snippet's CSS (the `@import` line loads the Google Font).

Nothing else is required. No CodePen external resources, no font `<link>` in the HTML — the library auto-detects Google Fonts from same-origin `@font-face` rules and `<link>` tags, and the CSS auto-injects from `CounterFill.init()`.

> If you'd rather link the library as an external resource instead of pasting it, add the raw URL to **Pen Settings → JS → Add External Scripts/Pens**, and keep only the `CounterFill.init({...})` call in the JS pane.

---

## 1. Basic — Static Fonts

### HTML

```html
<div class="wrap w1" id="w1"><canvas></canvas><span class="text">Golden</span></div>
<div class="wrap w2" id="w2"><canvas></canvas><span class="text">Typeface</span></div>
<div class="wrap w3" id="w3"><canvas></canvas><span class="text">Aperture</span></div>
<div class="wrap w4" id="w4"><canvas></canvas><span class="text">Obsidian</span></div>
<div class="wrap w5" id="w5"><canvas></canvas><span class="text">Phantom</span></div>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Bebas+Neue&family=Abril+Fatface&family=Yeseva+One&family=Oswald:wght@700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 64px; }

.w1 .text { font-family: 'Playfair Display', serif; font-size: clamp(64px,16vw,150px); font-weight: 900; color: #f0ece4; }
.w2 .text { font-family: 'Bebas Neue', sans-serif; font-size: clamp(72px,20vw,180px); color: #e8e8e8; letter-spacing: .04em; }
.w3 .text { font-family: 'Abril Fatface', serif; font-size: clamp(60px,15vw,140px); color: #fdf6e3; }
.w4 .text { font-family: 'Playfair Display', serif; font-size: clamp(56px,14vw,130px); font-weight: 900; font-style: italic; color: #e8ddd0; }
.w5 .text { font-family: 'Yeseva One', serif; font-size: clamp(60px,15vw,140px); color: #f5f0eb; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  w1: { stops: ['#f5c842','#d4820a','#7a3a08'] },
  w2: { stops: ['#ff6060','#c01020','#600010'] },
  w3: { stops: ['#e05c5c','#a01830','#4a0010'] },
  w4: { stops: ['#c0a8ff','#6030c0','#200860'] },
  w5: { stops: ['#40ffb0','#10a060','#004030'] },
}));
```

---

## 2. Multi-line

### HTML

```html
<div class="wrap-multi wm" id="wm">Golden Baroque Obsidian Aperture</div>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 64px; }

.wm { font-family: 'Playfair Display', serif; font-size: clamp(48px,11vw,110px); font-weight: 900; color: #f0ece4; max-width: min(680px,88vw); }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  wm: { stops: ['#f5c842','#d4820a','#7a3a08'] },
}));
```

---

## 3. Variable Fonts — wght x wdth

### HTML

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..900&display=swap" rel="stylesheet">

<div class="tag">wght 100 · wdth 75</div>
<div class="wrap vf1" id="vf1"><canvas></canvas><span class="text">Encode</span></div>

<div class="tag">wght 300 · wdth 100</div>
<div class="wrap vf2" id="vf2"><canvas></canvas><span class="text">Oblong</span></div>

<div class="tag">wght 500 · wdth 100</div>
<div class="wrap vf3" id="vf3"><canvas></canvas><span class="text">Overlap</span></div>

<div class="tag">wght 700 · wdth 125</div>
<div class="wrap vf4" id="vf4"><canvas></canvas><span class="text">Polygon</span></div>

<div class="tag">wght 900 · wdth 151</div>
<div class="wrap vf5" id="vf5"><canvas></canvas><span class="text">Boudoir</span></div>
```

### CSS

```css

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
.tag { font-family: ui-monospace, monospace; font-size: 11px; color: #555; }

.vf1 .text, .vf2 .text, .vf3 .text, .vf4 .text, .vf5 .text {
  font-family: 'Roboto Flex', sans-serif;
  font-size: clamp(60px,15vw,140px);
  color: #ddeeff;
  font-optical-sizing: none;
}
.vf1 .text { font-weight: 100; font-variation-settings: 'wdth' 75; }
.vf2 .text { font-weight: 300; font-variation-settings: 'wdth' 100; }
.vf3 .text { font-weight: 500; font-variation-settings: 'wdth' 100; }
.vf4 .text { font-weight: 700; font-variation-settings: 'wdth' 125; }
.vf5 .text { font-weight: 900; font-variation-settings: 'wdth' 151; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  vf1: { stops: ['#80d0ff','#2060e0','#001080'] },
  vf2: { stops: ['#80d0ff','#2060e0','#001080'] },
  vf3: { stops: ['#80d0ff','#2060e0','#001080'] },
  vf4: { stops: ['#80d0ff','#2060e0','#001080'] },
  vf5: { stops: ['#80d0ff','#2060e0','#001080'] },
}));
```

---

## 4. Variable Fonts — Custom Axis (Fraunces SOFT)

### HTML

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,100..900,0..100&display=swap" rel="stylesheet">

<div class="tag">SOFT 0</div>
<div class="wrap vfd1" id="vfd1"><canvas></canvas><span class="text">Baroque</span></div>

<div class="tag">SOFT 50</div>
<div class="wrap vfd2" id="vfd2"><canvas></canvas><span class="text">Baroque</span></div>

<div class="tag">SOFT 100</div>
<div class="wrap vfd3" id="vfd3"><canvas></canvas><span class="text">Baroque</span></div>
```

### CSS

```css

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
.tag { font-family: ui-monospace, monospace; font-size: 11px; color: #555; }

.vfd1 .text, .vfd2 .text, .vfd3 .text {
  font-family: 'Fraunces', serif;
  font-size: clamp(60px,15vw,140px);
  font-weight: 700;
  color: #f0ece4;
  font-optical-sizing: none;
}
.vfd1 .text { font-variation-settings: 'SOFT' 0; }
.vfd2 .text { font-variation-settings: 'SOFT' 50; }
.vfd3 .text { font-variation-settings: 'SOFT' 100; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  vfd1: { stops: ['#c0a8ff','#6030c0','#200860'] },
  vfd2: { stops: ['#c0a8ff','#6030c0','#200860'] },
  vfd3: { stops: ['#c0a8ff','#6030c0','#200860'] },
}));
```

---

## 5. Letter-spacing

### HTML

```html
<div class="label">No letter-spacing</div>
<div class="wrap ls1" id="ls1"><canvas></canvas><span class="text">Aperture</span></div>

<div class="label">letter-spacing: 0.04em</div>
<div class="wrap ls2" id="ls2"><canvas></canvas><span class="text">Aperture</span></div>

<div class="label">letter-spacing: 0.12em</div>
<div class="wrap ls3" id="ls3"><canvas></canvas><span class="text">Aperture</span></div>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
.label { font-family: system-ui, sans-serif; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: #666; }

.ls1 .text, .ls2 .text, .ls3 .text {
  font-family: 'Abril Fatface', serif;
  font-size: clamp(60px,15vw,140px);
  color: #fdf6e3;
}
.ls1 .text { letter-spacing: 0; }
.ls2 .text { letter-spacing: 0.04em; }
.ls3 .text { letter-spacing: 0.12em; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  ls1: { stops: ['#e05c5c','#a01830','#4a0010'] },
  ls2: { stops: ['#e05c5c','#a01830','#4a0010'] },
  ls3: { stops: ['#e05c5c','#a01830','#4a0010'] },
}));
```

---

## 6. Text-shadow + Line-height

### HTML

```html
<div class="label">text-shadow (no conflict — canvas ignores it)</div>
<div class="wrap ts1" id="ts1"><canvas></canvas><span class="text">Shadow</span></div>

<div class="label">line-height: 1 (tight)</div>
<div class="wrap-multi lh1" id="lh1">Golden Baroque Obsidian</div>

<div class="label">line-height: 1.4 (loose)</div>
<div class="wrap-multi lh2" id="lh2">Golden Baroque Obsidian</div>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Oswald:wght@700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
.label { font-family: system-ui, sans-serif; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: #666; }

.ts1 .text {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(64px,17vw,160px);
  font-weight: 700;
  color: #ddeeff;
  text-shadow: 4px 4px 0 rgba(0,0,0,0.3), 0 0 40px rgba(255,224,64,0.2);
}

.lh1, .lh2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px,11vw,110px);
  font-weight: 900;
  color: #f0ece4;
  max-width: min(680px,88vw);
}
.lh1 { line-height: 1; }
.lh2 { line-height: 1.4; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  ts1: { stops: ['#ffe040','#e08000','#804000'] },
  lh1: { stops: ['#60e0a0','#108050','#003020'] },
  lh2: { stops: ['#60e0a0','#108050','#003020'] },
}));
```

---

## 7. Print Fallback

### HTML

```html
<p class="note">Counter fills are canvas-rendered and won't appear in print. Use a <code>@media print</code> fallback to keep the counters visible.</p>

<div class="wrap pf1" id="pf1"><canvas></canvas><span class="text">Print</span></div>
<div class="wrap pf2" id="pf2"><canvas></canvas><span class="text">Ready</span></div>

<button onclick="window.print()">Print this page</button>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
.note { font-family: system-ui, sans-serif; font-size: 14px; color: #888; max-width: 480px; text-align: center; line-height: 1.5; }
.note code { background: #222; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
button { font-family: system-ui, sans-serif; font-size: 14px; padding: 8px 20px; background: #333; color: #eee; border: 1px solid #555; border-radius: 4px; cursor: pointer; }

.pf1 .text, .pf2 .text {
  font-family: 'Playfair Display', serif;
  font-size: clamp(64px,16vw,150px);
  font-weight: 900;
  color: #f0ece4;
}

/* Print fallback — canvas disappears, CSS fills the counters instead */
@media print {
  body { background: white; }
  .wrap canvas { display: none; }
  .pf1 .text { color: #f0ece4; -webkit-text-stroke: 1px #333; }
  .pf2 .text { color: #f0ece4; -webkit-text-stroke: 1px #333; }
  .note, button { color: #333; }
}
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  pf1: { stops: ['#f5c842','#d4820a','#7a3a08'] },
  pf2: { stops: ['#e05c5c','#a01830','#4a0010'] },
}));
```

---

## 8. Performance — Stress Test

### HTML

```html
<p class="note">Resize the browser window — all 12 elements repaint smoothly via debounced ResizeObserver.</p>

<div class="wrap s1" id="s1"><canvas></canvas><span class="text">Alpha</span></div>
<div class="wrap s2" id="s2"><canvas></canvas><span class="text">Bravo</span></div>
<div class="wrap s3" id="s3"><canvas></canvas><span class="text">Charlie</span></div>
<div class="wrap s4" id="s4"><canvas></canvas><span class="text">Delta</span></div>
<div class="wrap s5" id="s5"><canvas></canvas><span class="text">Echo</span></div>
<div class="wrap s6" id="s6"><canvas></canvas><span class="text">Foxtrot</span></div>
<div class="wrap s7" id="s7"><canvas></canvas><span class="text">Golf</span></div>
<div class="wrap s8" id="s8"><canvas></canvas><span class="text">Hotel</span></div>
<div class="wrap s9" id="s9"><canvas></canvas><span class="text">India</span></div>
<div class="wrap s10" id="s10"><canvas></canvas><span class="text">Juliet</span></div>
<div class="wrap s11" id="s11"><canvas></canvas><span class="text">Kilo</span></div>
<div class="wrap s12" id="s12"><canvas></canvas><span class="text">Lima</span></div>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Bebas+Neue&family=Abril+Fatface&family=Oswald:wght@700&family=Yeseva+One&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 40px 24px; display: flex; flex-direction: column; align-items: center; gap: 32px; }
.note { font-family: system-ui, sans-serif; font-size: 14px; color: #888; max-width: 480px; text-align: center; line-height: 1.5; }

.s1 .text, .s4 .text, .s7 .text, .s10 .text { font-family: 'Playfair Display', serif; font-weight: 900; }
.s2 .text, .s5 .text, .s8 .text, .s11 .text { font-family: 'Bebas Neue', sans-serif; letter-spacing: .04em; }
.s3 .text, .s6 .text, .s9 .text, .s12 .text { font-family: 'Abril Fatface', serif; }

[class^="s"] .text { font-size: clamp(48px,12vw,120px); color: #f0ece4; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  s1:  { stops: ['#f5c842','#d4820a','#7a3a08'] },
  s2:  { stops: ['#ff6060','#c01020','#600010'] },
  s3:  { stops: ['#e05c5c','#a01830','#4a0010'] },
  s4:  { stops: ['#c0a8ff','#6030c0','#200860'] },
  s5:  { stops: ['#40ffb0','#10a060','#004030'] },
  s6:  { stops: ['#ffe040','#e08000','#804000'] },
  s7:  { stops: ['#60e0a0','#108050','#003020'] },
  s8:  { stops: ['#80d0ff','#2060e0','#001080'] },
  s9:  { stops: ['#f5c842','#d4820a','#7a3a08'] },
  s10: { stops: ['#ff6060','#c01020','#600010'] },
  s11: { stops: ['#c0a8ff','#6030c0','#200860'] },
  s12: { stops: ['#40ffb0','#10a060','#004030'] },
}));
```

---

## 9. Writing Modes

Tests counter fill behaviour under horizontal (default), `vertical-rl`, and `vertical-lr` writing modes. Baseline measurement assumes horizontal text — vertical modes may affect fill alignment.

### HTML

```html
<p class="label">horizontal (default)</p>
<div class="wrap wm-h" id="wm-h"><canvas></canvas><span class="text">Aperture</span></div>

<p class="label">writing-mode: vertical-rl</p>
<div class="wrap wm-vrl" id="wm-vrl"><canvas></canvas><span class="text">Aperture</span></div>

<p class="label">writing-mode: vertical-lr</p>
<div class="wrap wm-vlr" id="wm-vlr"><canvas></canvas><span class="text">Aperture</span></div>
```

### CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0e0e0e; padding: 60px 32px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
.label { font-family: ui-monospace, monospace; font-size: 11px; color: #555; }

.wm-h .text,
.wm-vrl .text,
.wm-vlr .text {
  font-family: 'Abril Fatface', serif;
  font-size: clamp(60px, 15vw, 140px);
  color: #fdf6e3;
}

.wm-vrl { writing-mode: vertical-rl; }
.wm-vlr { writing-mode: vertical-lr; }
```

### JS (paste below the `counter-fill.js` library)

```js
document.fonts.ready.then(() => CounterFill.init({
  'wm-h':   { stops: ['#f5c842','#d4820a','#7a3a08'] },
  'wm-vrl': { stops: ['#c0a8ff','#6030c0','#200860'] },
  'wm-vlr': { stops: ['#40ffb0','#10a060','#004030'] },
}));
```
