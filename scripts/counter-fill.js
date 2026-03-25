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
 *   .wrap { position:relative; display:inline-block; line-height:1; white-space:nowrap; }
 *   .wrap canvas { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; }
 *   .wrap .text { position:relative; z-index:1; }
 *
 *   .wrap-multi { position:relative; display:block; line-height:1.2; text-align:center; }
 *   .wrap-multi canvas { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; }
 *   .wrap-multi .cf-word { position:relative; z-index:1; display:inline; }
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
      const i = q.pop(), x = i%pw, y = (i/pw)|0;
      enq(i-1); enq(i+1); enq(i-pw); enq(i+pw);
    }

    const counter = new Uint8Array(N);
    for (let i = 0; i < N; i++)
      if (d[i*4+3] === 0 && !outside[i]) counter[i] = 1;

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

    const cx = pw*0.5, cy = ph*0.48, r = pw*0.6;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c));
    ctx.fillStyle = g;
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

  // ── Multi-line paint ──────────────────────────────────────────────────────
  function paintMulti(wrap, FILLS) {
    const fill = FILLS[wrap.id];
    if (!fill) return;

    const dpr = window.devicePixelRatio || 1;

    let cv = wrap.querySelector(':scope > canvas');
    if (!cv) {
      const rawText = wrap.textContent.trim();
      wrap.innerHTML = '';
      cv = document.createElement('canvas');
      wrap.appendChild(cv);
      rawText.split(/(\s+)/).forEach(part => {
        if (/^\s+$/.test(part)) {
          wrap.appendChild(document.createTextNode(part));
        } else if (part.length) {
          const s = document.createElement('span');
          s.className = 'cf-word';
          s.textContent = part;
          wrap.appendChild(s);
        }
      });
    }

    const wordSpans = wrap.querySelectorAll(':scope > span.cf-word');
    if (!wordSpans.length) return;

    const W = wrap.offsetWidth, H = wrap.offsetHeight;
    if (!W || !H) return;
    cv.width  = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);

    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    const cs = getComputedStyle(wrap);
    const fontStr = [
      cs.fontStyle !== 'normal' ? cs.fontStyle : '',
      cs.fontWeight, cs.fontSize, cs.fontFamily,
    ].filter(Boolean).join(' ');
    const letterSpacing = cs.letterSpacing || '0px';

    const mc   = document.createElement('canvas');
    const mCtx = mc.getContext('2d');
    mCtx.font  = fontStr;

    const wrapRect = wrap.getBoundingClientRect();

    wordSpans.forEach(span => {
      const word = span.textContent.trim();
      if (!word) return;

      const sizer = document.createElement('span');
      sizer.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;overflow:visible;';
      span.insertBefore(sizer, span.firstChild);
      const sR = sizer.getBoundingClientRect();
      span.removeChild(sizer);

      const bx = sR.left   - wrapRect.left;
      const by = sR.bottom - wrapRect.top;

      ctx.font = fontStr; ctx.letterSpacing = letterSpacing;
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';
      ctx.fillText(word, bx, by);
    });

    bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops);
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
    rafId = requestAnimationFrame(() => {
      rafId = null;
      pending.forEach(({ el: target, FILLS: f }) => {
        const k = `${Math.round(target.offsetWidth*dpr)}x${Math.round(target.offsetHeight*dpr)}`;
        sizeCache.set(target, k);
        target.classList.contains('wrap-multi') ? paintMulti(target, f) : paintWrap(target, f);
      });
      pending.clear();
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
