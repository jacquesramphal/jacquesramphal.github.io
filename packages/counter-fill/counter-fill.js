/**
 * counter-fill.js
 *
 * Extracted directly from the approved codesandbox.html.
 * Same logic, same class names, same output — guaranteed identical rendering.
 *
 * ─── HTML structure ──────────────────────────────────────────────────
 *
 * Single-line:
 *   <div class="wrap" id="w1"><canvas></canvas><span class="text">Golden</span></div>
 *
 * Multi-line:
 *   <div class="wrap-multi" id="wm">Golden Baroque Obsidian</div>
 *
 * ─── Required CSS ────────────────────────────────────────────────────
 *
 *   Auto-injected by CounterFill.init() — no stylesheet needed.
 *
 * ─── Fill config ─────────────────────────────────────────────────────
 *
 *   Pass a FILLS object keyed by element id:
 *
 *   CounterFill.init({
 *     'my-heading': { stops: ['#f5c842','#d4820a','#7a3a08'] },
 *     'my-multi':   { stops: ['#f5c842','#d4820a','#7a3a08'] },
 *   });
 *
 *   CSS variables are resolved at paint time, so you can use design tokens:
 *
 *   CounterFill.init({
 *     'my-heading': { stops: ['var(--color-accent)'] },
 *     'my-multi':   { stops: ['var(--color-primary)','var(--color-secondary)'] },
 *   });
 *
 * ─── API ─────────────────────────────────────────────────────────────
 *
 *   CounterFill.init(fills)   — paint all .wrap and .wrap-multi elements
 *   CounterFill.paint(el, fills) — paint one element
 */

(function (global) {
  'use strict';

  // ── Auto-inject required CSS (once) ──────────────────────────────────────
  let _stylesInjected = false;
  function _injectStyles() {
    if (_stylesInjected) return;
    _stylesInjected = true;
    const style = document.createElement('style');
    style.dataset.counterFill = '';
    style.textContent = [
      '.wrap{position:relative;display:inline-block;line-height:1;white-space:nowrap;}',
      '.wrap canvas{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;}',
      '.wrap .text{position:relative;z-index:1;}',
      '.wrap-multi{position:relative;display:block;line-height:1.2;}',
      '.wrap-multi .cf-word{position:relative;z-index:1;display:inline;}',
    ].join('');
    document.head.appendChild(style);
  }

  // ── Resolve CSS variables to concrete color values ────────────────────────
  const _colorEl = document.createElement('div');
  _colorEl.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  document.body.appendChild(_colorEl);

  function resolveColor(color) {
    if (!color.includes('var(')) return color;
    _colorEl.style.color = color;
    return getComputedStyle(_colorEl).color;
  }

  // ── BFS flood-fill + dilate + paint ──────────────────────────────────────
  function bfsAndPaint(cv, ctx, pw, ph, stops) {
    const img = ctx.getImageData(0, 0, pw, ph);
    const d   = img.data;
    const N   = pw * ph;

    const outside = new Uint8Array(N);
    const q = [];
    const enq = i => {
      if (i < 0 || i >= N || outside[i] || d[i*4+3] > 32) return;
      outside[i] = 1; q.push(i);
    };
    for (let x = 0; x < pw; x++) { enq(x); enq((ph-1)*pw+x); }
    for (let y = 0; y < ph; y++) { enq(y*pw); enq(y*pw+pw-1); }
    while (q.length) {
      const i = q.pop();
      enq(i-1); enq(i+1); enq(i-pw); enq(i+pw);
    }

    const counter = new Uint8Array(N);
    for (let i = 0; i < N; i++)
      if (d[i*4+3] === 0 && !outside[i]) counter[i] = 1;

    // Filter out false-positive enclosed regions (e.g. space trapped between tight
    // text lines when line-height ≈ 1). Real letter counters are compact; a region
    // spanning >20% of canvas width OR with aspect ratio > 4:1 (wide strip) is not
    // a letter counter — it's an inter-line gap.
    const regionSeen = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      if (!counter[i] || regionSeen[i]) continue;
      const region = [];
      let minX = pw, maxX = 0, minY = ph, maxY = 0;
      const rq = [i];
      regionSeen[i] = 1;
      while (rq.length) {
        const ri = rq.pop();
        region.push(ri);
        const rx = ri % pw;
        const ry = (ri / pw) | 0;
        if (rx < minX) minX = rx;
        if (rx > maxX) maxX = rx;
        if (ry < minY) minY = ry;
        if (ry > maxY) maxY = ry;
        for (const ni of [ri-1, ri+1, ri-pw, ri+pw]) {
          if (ni >= 0 && ni < N && counter[ni] && !regionSeen[ni]) {
            regionSeen[ni] = 1; rq.push(ni);
          }
        }
      }
      const rw = maxX - minX;
      const rh = maxY - minY;
      // Only reject wide flat strips (inter-line gaps). The width threshold
      // was removed: per-word canvases are narrow enough that real counters
      // (inside 'O', 'e', 'g', etc.) could exceed any fixed % of canvas width.
      if (rh > 0 && rw / rh > 4) {
        for (const ri of region) counter[ri] = 0;
      }
    }

    const DILATE = 2;
    const dilated = new Uint8Array(N);
    for (let y = 0; y < ph; y++)
      for (let x = 0; x < pw; x++) {
        if (!counter[y*pw+x]) continue;
        for (let dy = -DILATE; dy <= DILATE; dy++)
          for (let dx = -DILATE; dx <= DILATE; dx++) {
            const nx = x+dx, ny = y+dy;
            if (nx>=0 && nx<pw && ny>=0 && ny<ph) dilated[ny*pw+nx] = 1;
          }
      }

    const mask = new ImageData(pw, ph);
    for (let i = 0; i < N; i++) {
      mask.data[i*4+0] = 255;
      mask.data[i*4+1] = 255;
      mask.data[i*4+2] = 255;
      mask.data[i*4+3] = dilated[i] ? 255 : 0;
    }

    ctx.clearRect(0, 0, pw, ph);
    ctx.putImageData(mask, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';

    const resolved = stops.map(resolveColor);
    let fill;
    if (resolved.length === 1) {
      fill = resolved[0];
    } else {
      const cx = pw*0.5, cy = ph*0.48, r = pw*0.6;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      resolved.forEach((c, i) => g.addColorStop(i / (resolved.length - 1), c));
      fill = g;
    }
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, pw, ph);
    ctx.globalCompositeOperation = 'source-over';
  }

  // ── Single-line paint ─────────────────────────────────────────────────────
  function paintWrap(wrap, FILLS) {
    const cv     = wrap.querySelector('canvas');
    const textEl = wrap.querySelector('.text');
    const fill   = FILLS[wrap.id];
    if (!cv || !textEl || !fill) return;

    const dpr = window.devicePixelRatio || 1;
    const cs  = getComputedStyle(textEl);
    const fontStr = [
      cs.fontStyle !== 'normal' ? cs.fontStyle : '',
      cs.fontWeight, cs.fontSize, cs.fontFamily,
    ].filter(Boolean).join(' ');
    const word = textEl.textContent.trim();

    const mc = document.createElement('canvas');
    const mx = mc.getContext('2d');
    mx.font  = fontStr;
    const ascent = mx.measureText(word).actualBoundingBoxAscent;

    const sizer = document.createElement('span');
    sizer.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;overflow:visible;';
    wrap.insertBefore(sizer, textEl);
    const wR = wrap.getBoundingClientRect();
    const sR = sizer.getBoundingClientRect();
    wrap.removeChild(sizer);
    const baselineY = sR.bottom - wR.top;
    const baselineX = sR.left   - wR.left;

    const W = wrap.offsetWidth, H = wrap.offsetHeight;
    cv.width  = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    // Drift correction on probe canvas — single getImageData on main canvas
    const probe = document.createElement('canvas');
    probe.width  = cv.width;
    probe.height = cv.height;
    const pCtx  = probe.getContext('2d', { willReadFrequently: true });
    pCtx.scale(dpr, dpr);
    pCtx.font = fontStr; pCtx.letterSpacing = cs.letterSpacing || '0px';
    pCtx.textBaseline = 'alphabetic'; pCtx.fillStyle = '#fff';
    pCtx.fillText(word, baselineX, baselineY);

    const td = pCtx.getImageData(0, 0, probe.width, probe.height).data;
    let inkTop = probe.height;
    outer: for (let r = 0; r < probe.height; r++)
      for (let c = 0; c < probe.width; c++)
        if (td[(r*probe.width+c)*4+3] > 32) { inkTop = r; break outer; }
    const drift  = inkTop - Math.round((baselineY - ascent) * dpr);
    const finalY = Math.abs(drift) > 1 ? baselineY - drift/dpr : baselineY;

    ctx.font = fontStr; ctx.letterSpacing = cs.letterSpacing || '0px';
    ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';
    ctx.fillText(word, baselineX, finalY);

    bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops);
  }

  // ── Per-word canvas paint (counter stays inside the span it belongs to) ──
  function paintWordSpan(span, fill, fontStr, letterSpacing, dpr) {
    const word = span.dataset.cfWord;
    if (!word) return;

    let cv = span.querySelector(':scope > canvas.cf-canvas');
    if (!cv) {
      cv = document.createElement('canvas');
      cv.className = 'cf-canvas';
      cv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
      span.insertBefore(cv, span.firstChild);
    }

    const W = span.offsetWidth, H = span.offsetHeight;
    if (!W || !H) return;
    cv.width  = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);

    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    // Measure baseline within the span's own coordinate space
    const sizer = document.createElement('span');
    sizer.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;overflow:visible;';
    span.insertBefore(sizer, span.firstChild);
    const sR  = sizer.getBoundingClientRect();
    const spR = span.getBoundingClientRect();
    span.removeChild(sizer);

    const bx = sR.left   - spR.left;
    const by = sR.bottom - spR.top;

    ctx.font = fontStr; ctx.letterSpacing = letterSpacing;
    ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';
    ctx.fillText(word, bx, by);

    bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops);
  }

  // ── Recursively wrap text-node words in .cf-word spans ───────────────────
  // Preserves inline elements (e.g. <a>) so links inside h1 keep their markup.
  function _wrapWordsInNode(node, container) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/(\s+)/).forEach(part => {
        if (/^\s+$/.test(part)) {
          container.appendChild(document.createTextNode(part));
        } else if (part.length) {
          const s = document.createElement('span');
          s.className = 'cf-word';
          s.dataset.cfWord = part;
          s.textContent = part;
          container.appendChild(s);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      container.appendChild(clone);
      Array.from(node.childNodes).forEach(child => _wrapWordsInNode(child, clone));
    }
  }

  // ── Multi-line paint ──────────────────────────────────────────────────────
  function paintMulti(wrap, FILLS) {
    const fill = FILLS[wrap.id];
    if (!fill) return;

    const dpr = window.devicePixelRatio || 1;

    // First call: split text nodes into per-word spans, preserving inline elements
    if (!wrap.querySelector('span.cf-word')) {
      const children = Array.from(wrap.childNodes);
      wrap.innerHTML = '';
      children.forEach(child => _wrapWordsInNode(child, wrap));
    }

    const wordSpans = wrap.querySelectorAll('span.cf-word');
    if (!wordSpans.length) return;

    const cs = getComputedStyle(wrap);
    const fontStr = [
      cs.fontStyle !== 'normal' ? cs.fontStyle : '',
      cs.fontWeight, cs.fontSize, cs.fontFamily,
    ].filter(Boolean).join(' ');
    const letterSpacing = cs.letterSpacing || '0px';

    // Each word paints its own canvas — no shared coordinate math
    wordSpans.forEach(span => paintWordSpan(span, fill, fontStr, letterSpacing, dpr));
  }

  // ── Performance: size cache + rAF batching ────────────────────────────────
  const sizeCache = new WeakMap();
  let   rafId     = null;
  const pending   = new Set();

  function scheduleRepaint(el, FILLS) {
    const dpr = window.devicePixelRatio || 1;
    const key = `${Math.round(el.offsetWidth*dpr)}x${Math.round(el.offsetHeight*dpr)}`;
    if (sizeCache.get(el) === key) return;
    pending.add({ el, FILLS });
    if (rafId) return;
    // Double rAF: first frame allows the browser to settle layout after a resize,
    // second frame reads positions and paints — prevents stale getBoundingClientRect
    // reads that cause counters to appear on the wrong line.
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        pending.forEach(({ el: target, FILLS: f }) => {
          const k = `${Math.round(target.offsetWidth*dpr)}x${Math.round(target.offsetHeight*dpr)}`;
          sizeCache.set(target, k);
          target.classList.contains('wrap-multi') ? paintMulti(target, f) : paintWrap(target, f);
        });
        pending.clear();
      });
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────
  const CounterFill = {
    /**
     * Paint all .wrap and .wrap-multi elements.
     * @param {Object} fills - { elementId: { stops: ['#color1', '#color2', ...] } }
     */
    init(fills) {
      _injectStyles();
      document.querySelectorAll('.wrap').forEach(el => paintWrap(el, fills));
      document.querySelectorAll('.wrap-multi').forEach(el => paintMulti(el, fills));

      // ResizeObserver with size cache + rAF debounce
      const ro = new ResizeObserver(entries =>
        entries.forEach(e => scheduleRepaint(e.target, fills))
      );
      document.querySelectorAll('.wrap, .wrap-multi').forEach(el => ro.observe(el));
      return ro;
    },

    /**
     * Paint a single element.
     * @param {Element} el
     * @param {Object} fills
     */
    paint(el, fills) {
      el.classList.contains('wrap-multi') ? paintMulti(el, fills) : paintWrap(el, fills);
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = CounterFill;
  else global.CounterFill = CounterFill;

}(typeof window !== 'undefined' ? window : this));
