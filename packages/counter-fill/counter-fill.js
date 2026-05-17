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
 *   CounterFill.registerFont(family, url, opts) — register a font for SVG rendering
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
      '.wrap-multi .cf-word{position:relative;z-index:1;display:inline-block;}',
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

  // ── Map wdth axis to CSS font-stretch keyword ─────────────────────────────
  // ctx.fontVariationSettings is not supported in all browsers.
  // font-stretch % values are also rejected by canvas ctx.font parsing.
  // CSS keyword values (ultra-condensed … ultra-expanded) ARE accepted and
  // map to the wdth axis on variable fonts — closest approximation available.
  function _wdthToKeyword(fvs) {
    if (!fvs || fvs === 'normal') return '';
    const m = fvs.match(/"wdth"\s+([\d.]+)/);
    if (!m) return '';
    const v = parseFloat(m[1]);
    if (v < 56.25)  return 'ultra-condensed';
    if (v < 68.75)  return 'extra-condensed';
    if (v < 81.25)  return 'condensed';
    if (v < 93.75)  return 'semi-condensed';
    if (v < 106.25) return '';
    if (v < 118.75) return 'semi-expanded';
    if (v < 137.5)  return 'expanded';
    if (v < 175)    return 'extra-expanded';
    return 'ultra-expanded';
  }

  // ── Feature-test ctx.fontVariationSettings (property may exist but be a no-op)
  let _fvsWorks = null;
  function _canUseFVS() {
    if (_fvsWorks !== null) return _fvsWorks;
    try {
      const tc = document.createElement('canvas').getContext('2d');
      if (!('fontVariationSettings' in tc)) { _fvsWorks = false; return false; }
      tc.font = '400 72px "Roboto Flex", "Arial", sans-serif';
      const w1 = tc.measureText('W').width;
      tc.fontVariationSettings = '"wdth" 25';
      const w2 = tc.measureText('W').width;
      _fvsWorks = w1 !== w2;
    } catch(e) { _fvsWorks = false; }
    return _fvsWorks;
  }

  // ── SVG font cache for pixel-accurate variable font rendering ────────────
  // Stores family|style|weight → { dataUrl, mime } for embedding in SVG <text>.
  // SVG <text> supports font-variation-settings natively, and drawing SVG to
  // canvas does NOT taint it (unlike foreignObject), so getImageData works.
  const _fontCache = new Map(); // "family|style|weight" → { dataUrl, mime }

  // Look up the best cached font for a given family/style/weight.
  // Exact match first, then family-only fallback (variable fonts share one file).
  function _getCachedFont(family, style, weight) {
    return _fontCache.get(family + '|' + style + '|' + weight)
        || _fontCache.get(family + '|normal|*')   // variable font wildcard
        || _fontCache.get(family + '|*|*')         // any match for this family
        || null;
  }

  // Helper: fetch a font URL and store as base64 in cache under the given key
  async function _fetchAndCache(key, url) {
    if (_fontCache.has(key)) return;
    try {
      const resp = await fetch(url);
      const buf = await resp.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let bin = '';
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      const ct = resp.headers.get('content-type') || '';
      const mime = ct.includes('woff2') ? 'font/woff2'
                 : ct.includes('woff')  ? 'font/woff'
                 : ct.includes('ttf') || ct.includes('truetype') ? 'font/ttf'
                 : 'application/octet-stream';
      _fontCache.set(key, { dataUrl: 'data:' + mime + ';base64,' + btoa(bin), mime });
    } catch(e) { /* fetch failed — this font uses fallback path */ }
  }

  // Auto-detect font URLs from same-origin @font-face rules + Google Fonts <link> tags
  async function _autoDetectFonts() {
    const toFetch = []; // [{ key, url }]

    // 1. Same-origin stylesheets — read @font-face src URLs
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            const family = rule.style.getPropertyValue('font-family').replace(/['"]/g, '').trim();
            const style  = rule.style.getPropertyValue('font-style') || 'normal';
            const weight = rule.style.getPropertyValue('font-weight') || '400';
            const src = rule.style.getPropertyValue('src');
            const urlMatch = src && src.match(/url\(["']?([^"')]+)["']?\)/);
            if (urlMatch) {
              // Variable fonts use weight ranges like "100 900"
              const isVariable = weight.includes(' ');
              const key = isVariable
                ? family + '|normal|*'
                : family + '|' + style + '|' + weight;
              toFetch.push({ key, url: urlMatch[1] });
            }
          }
        }
      } catch(e) { /* cross-origin sheet — skip */ }
    }

    // 2. Google Fonts <link> tags — fetch CSS, extract font URLs with style/weight
    for (const link of document.querySelectorAll('link[href*="fonts.googleapis.com/css"]')) {
      try {
        const resp = await fetch(link.href);
        const css = await resp.text();
        // Parse each @font-face block individually for family, style, weight, src
        const blocks = css.split('@font-face');
        for (const block of blocks) {
          const famMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?\s*;/);
          const srcMatch = block.match(/src:\s*url\(([^)]+)\)/);
          if (!famMatch || !srcMatch) continue;
          const family = famMatch[1].trim();
          const styleMatch = block.match(/font-style:\s*(\w+)/);
          const weightMatch = block.match(/font-weight:\s*([\d\s]+)/);
          const style = styleMatch ? styleMatch[1] : 'normal';
          const weight = weightMatch ? weightMatch[1].trim() : '400';
          const isVariable = weight.includes(' ');
          // Google Fonts CSS lists subsets in order: cyrillic-ext … latin.
          // Later entries (latin) overwrite earlier ones for the same key.
          const key = isVariable
            ? family + '|normal|*'
            : family + '|' + style + '|' + weight;
          // Keep last match per key (latin subset)
          const idx = toFetch.findIndex(f => f.key === key);
          if (idx >= 0) toFetch[idx].url = srcMatch[1];
          else toFetch.push({ key, url: srcMatch[1] });
        }
      } catch(e) { /* fetch failed — skip */ }
    }

    // 3. Fetch each font and base64-encode
    await Promise.all(toFetch.map(({ key, url }) => _fetchAndCache(key, url)));
  }

  /**
   * Register a font manually for SVG rendering.
   * Use when fonts are loaded via JS (new FontFace()), cross-origin, or CDN.
   * @param {string} family  - Font family name (must match CSS font-family)
   * @param {string} url     - URL to the font file (woff2/woff/ttf)
   * @param {Object} [opts]  - { style: 'normal', weight: '400' }
   */
  async function registerFont(family, url, opts) {
    const style  = (opts && opts.style)  || 'normal';
    const weight = (opts && opts.weight) || '*';
    const key = family + '|' + style + '|' + weight;
    await _fetchAndCache(key, url);
  }

  // Render text via SVG with embedded font — supports all font-variation-settings axes
  // and vertical writing modes (canvas fillText can't render vertically).
  // Returns a Promise that resolves to true (success) or false (fallback needed).
  async function _renderTextSVG(ctx, word, cs, baselineX, baselineY, pw, ph, dpr, domTextWidth, writingMode) {
    const family = cs.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
    const cached = _getCachedFont(family, cs.fontStyle || 'normal', cs.fontWeight || '400');
    if (!cached) return false;

    // getComputedStyle returns axis names in double quotes: "wdth" 100, "opsz" 8
    // Replace with single quotes for valid CSS inside the SVG stylesheet.
    const fvs = (cs.fontVariationSettings || 'normal').replace(/"/g, "'");
    const fontSize = parseFloat(cs.fontSize) * dpr;
    const bx = Math.round(baselineX * dpr);
    const by = Math.round(baselineY * dpr);
    const ls = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    const lsVal = parseFloat(ls) * dpr;
    const stretch = cs.fontStretch || 'normal';
    const kerning = cs.fontKerning || 'auto';
    const ffs = (cs.fontFeatureSettings || 'normal').replace(/"/g, "'");

    // Escape text for XML
    const esc = word.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    // ── Vertical writing mode support ───────────────────────────────────────
    const isVert = writingMode && writingMode.startsWith('vertical');
    const wmCss = isVert ? 'writing-mode:' + writingMode + ';text-orientation:mixed;' : '';
    let tx, ty, extraAttrs;
    if (isVert) {
      tx = Math.round(pw / 2);
      ty = 0;
      extraAttrs = ' dominant-baseline="central"';
    } else {
      tx = bx;
      ty = by;
      extraAttrs = domTextWidth > 0 ? ' textLength="'+Math.round(domTextWidth * dpr)+'" lengthAdjust="spacingAndGlyphs"' : '';
    }

    // All font properties go in <style> block — Safari ignores some font
    // properties in SVG inline styles. Include every property that affects
    // glyph metrics to prevent cumulative horizontal drift across letters.
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+pw+'" height="'+ph+'">' +
      '<defs><style>' +
      '@font-face{font-family:CF;src:url("'+cached.dataUrl+'");}' +
      'text{font-family:CF;font-size:'+fontSize+'px;font-weight:'+cs.fontWeight+';' +
      'font-style:'+cs.fontStyle+';font-stretch:'+stretch+';' +
      'font-variation-settings:'+fvs+';' +
      'font-optical-sizing:'+(cs.fontOpticalSizing||'none')+';' +
      'font-kerning:'+kerning+';font-feature-settings:'+ffs+';' +
      'letter-spacing:'+lsVal+'px;' + wmCss + 'fill:white;}' +
      '</style></defs>' +
      '<text x="'+tx+'" y="'+ty+'"' + extraAttrs +
      '>'+esc+'</text></svg>';

    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);

    try {
      const img = new Image();
      img.src = url;
      // decode() waits for full render including embedded font loading —
      // fixes Safari where onload fires before the font is ready.
      await img.decode();
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      URL.revokeObjectURL(url);
      return true;
    } catch(e) {
      URL.revokeObjectURL(url);
      return false;
    }
  }

  // ── BFS flood-fill + dilate + paint ──────────────────────────────────────
  function bfsAndPaint(cv, ctx, pw, ph, stops, dilate) {
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

    const DILATE = dilate || 2;
    const dilated = new Uint8Array(N);
    for (let y = 0; y < ph; y++)
      for (let x = 0; x < pw; x++) {
        if (!counter[y*pw+x]) continue;
        for (let dy = -DILATE; dy <= DILATE; dy++)
          for (let dx = -DILATE; dx <= DILATE; dx++) {
            const nx = x+dx, ny = y+dy;
            // Never dilate into outside/background — only into letter strokes
            // (hidden behind DOM text) or other counter pixels. Allows aggressive
            // dilation without visible bleed.
            if (nx>=0 && nx<pw && ny>=0 && ny<ph && !outside[ny*pw+nx]) dilated[ny*pw+nx] = 1;
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
  async function paintWrap(wrap, FILLS) {
    const cv     = wrap.querySelector('canvas');
    const textEl = wrap.querySelector('.text');
    const fill   = FILLS[wrap.id];
    if (!cv || !textEl || !fill) return;

    const dpr = window.devicePixelRatio || 1;
    const cs  = getComputedStyle(textEl);
    const fvs = cs.fontVariationSettings || 'normal';
    const word = textEl.textContent.trim();

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

    // ── Vertical writing mode — canvas fillText can't render vertically ────
    const wm = getComputedStyle(wrap).writingMode || 'horizontal-tb';
    const isVertical = wm.startsWith('vertical');
    if (isVertical && _fontCache.size > 0) {
      const ok = await _renderTextSVG(ctx, word, cs, baselineX, baselineY, cv.width, cv.height, dpr, textEl.offsetWidth, wm);
      if (ok) { bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops); return; }
      ctx.clearRect(0, 0, cv.width, cv.height);
    }

    // ── SVG for variable fonts ──────────────────────────────────────────────
    // Use SVG when the element has properties canvas can't honor:
    //   - explicit font-variation-settings (custom axes)
    //   - font-optical-sizing: none (canvas always auto-applies opsz)
    const opsNone = cs.fontOpticalSizing === 'none';
    if ((fvs !== 'normal' || opsNone) && _fontCache.size > 0) {
      const ok = await _renderTextSVG(ctx, word, cs, baselineX, baselineY, cv.width, cv.height, dpr, textEl.offsetWidth);
      if (ok) {
        const svgData = ctx.getImageData(0, 0, cv.width, cv.height).data;
        let hasInk = false;
        for (let i = 3; i < svgData.length; i += 4) {
          if (svgData[i] > 32) { hasInk = true; break; }
        }
        // Browsers without native ctx.fontVariationSettings (Safari) may render
        // SVG glyphs with smaller counters (custom axes like SOFT not applied).
        // Scale dilation with font size — large text needs more expansion.
        // Canvas sits behind DOM text (z-index), so over-dilation into strokes is hidden.
        const svgDilate = _canUseFVS() ? 2 : Math.max(4, Math.round(parseFloat(cs.fontSize) * dpr * 0.03));
        if (hasInk) { bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops, svgDilate); return; }
        ctx.clearRect(0, 0, cv.width, cv.height);
      }
    }

    // ── Canvas fallback: split by font type ──────────────────────────────────

    if (fvs !== 'normal' || opsNone) {
      // Variable font (explicit axes or opsz-sensitive)

      // Path A: ctx.fontVariationSettings (Chrome 134+, verified working)
      const _stretch = (cs.fontStretch && cs.fontStretch !== 'normal' && cs.fontStretch !== '100%')
        ? cs.fontStretch
        : _wdthToKeyword(fvs);
      const fontStr = [
        cs.fontStyle !== 'normal' ? cs.fontStyle : '',
        _stretch,
        cs.fontWeight, cs.fontSize, cs.fontFamily,
      ].filter(Boolean).join(' ');

      ctx.font = fontStr; ctx.letterSpacing = cs.letterSpacing || '0px';
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';

      if (_canUseFVS()) {
        ctx.fontVariationSettings = fvs;
        ctx.fillText(word, baselineX, baselineY);
      } else {
        // Path B: Width/height scaling approximation
        const m = ctx.measureText(word);
        const domW = textEl.offsetWidth;
        const scaleX = (m.width > 0 && domW > 0) ? domW / m.width : 1;
        const canvasH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        const domH = wrap.offsetHeight;
        const scaleY = (canvasH > 0 && domH > 0) ? domH / canvasH : 1;
        const needsScale = Math.abs(scaleX - 1) > 0.02 || Math.abs(scaleY - 1) > 0.05;
        if (needsScale) {
          ctx.save();
          ctx.translate(baselineX, baselineY);
          ctx.scale(scaleX, scaleY);
          ctx.fillText(word, 0, 0);
          ctx.restore();
        } else {
          ctx.fillText(word, baselineX, baselineY);
        }
      }
    } else {
      // Static font (or variable font at default axes) — probe-canvas drift correction
      const fontStr = [
        cs.fontStyle !== 'normal' ? cs.fontStyle : '',
        cs.fontWeight, cs.fontSize, cs.fontFamily,
      ].filter(Boolean).join(' ');

      const mc = document.createElement('canvas');
      const mx = mc.getContext('2d');
      mx.font = fontStr;
      const ascent = mx.measureText(word).actualBoundingBoxAscent;

      const probe = document.createElement('canvas');
      probe.width = cv.width; probe.height = cv.height;
      const pCtx = probe.getContext('2d', { willReadFrequently: true });
      pCtx.scale(dpr, dpr);
      pCtx.font = fontStr; pCtx.letterSpacing = cs.letterSpacing || '0px';
      pCtx.textBaseline = 'alphabetic'; pCtx.fillStyle = '#fff';
      pCtx.fillText(word, baselineX, baselineY);

      const td = pCtx.getImageData(0, 0, probe.width, probe.height).data;
      let inkTop = probe.height;
      outer: for (let r = 0; r < probe.height; r++)
        for (let c = 0; c < probe.width; c++)
          if (td[(r * probe.width + c) * 4 + 3] > 32) { inkTop = r; break outer; }
      const drift = inkTop - Math.round((baselineY - ascent) * dpr);
      const finalY = Math.abs(drift) > 1 ? baselineY - drift / dpr : baselineY;

      ctx.font = fontStr; ctx.letterSpacing = cs.letterSpacing || '0px';
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';
      ctx.fillText(word, baselineX, finalY);
    }

    bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops);
  }

  // ── Per-word canvas paint (counter stays inside the span it belongs to) ──
  async function paintWordSpan(span, fill, fontStr, letterSpacing, fontVariationSettings, dpr) {
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

    // Priority 1: SVG embedded-font rendering — pixel-perfect for ALL axes
    if (fontVariationSettings !== 'normal' && _fontCache.size > 0) {
      const cs = getComputedStyle(span.closest('.wrap-multi') || span);
      const ok = await _renderTextSVG(ctx, word, cs, bx, by, cv.width, cv.height, dpr, span.offsetWidth);
      const mDilate = _canUseFVS() ? 2 : Math.max(4, Math.round(parseFloat(cs.fontSize) * dpr * 0.03));
      if (ok) { bfsAndPaint(cv, ctx, cv.width, cv.height, fill.stops, mDilate); return; }
    }

    ctx.font = fontStr; ctx.letterSpacing = letterSpacing;
    ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';

    // Priority 2: ctx.fontVariationSettings if verified working
    if (_canUseFVS() && fontVariationSettings !== 'normal') {
      ctx.fontVariationSettings = fontVariationSettings;
      ctx.fillText(word, bx, by);
    } else {
      // Priority 3: width-scaling approximation
      const domW = span.offsetWidth;
      const canvasW = ctx.measureText(word).width;
      const scaleX = (canvasW > 0 && domW > 0) ? domW / canvasW : 1;
      if (Math.abs(scaleX - 1) > 0.02) {
        ctx.save();
        ctx.translate(bx, 0);
        ctx.scale(scaleX, 1);
        ctx.fillText(word, 0, by);
        ctx.restore();
      } else {
        ctx.fillText(word, bx, by);
      }
    }

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
  async function paintMulti(wrap, FILLS) {
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
    const _stretch = (cs.fontStretch && cs.fontStretch !== 'normal' && cs.fontStretch !== '100%')
      ? cs.fontStretch
      : _wdthToKeyword(cs.fontVariationSettings || 'normal');
    const fontStr = [
      cs.fontStyle !== 'normal' ? cs.fontStyle : '',
      _stretch,
      cs.fontWeight, cs.fontSize, cs.fontFamily,
    ].filter(Boolean).join(' ');
    const letterSpacing = cs.letterSpacing || '0px';
    const fontVariationSettings = cs.fontVariationSettings || 'normal';

    // Each word paints its own canvas — no shared coordinate math
    await Promise.all([...wordSpans].map(span => paintWordSpan(span, fill, fontStr, letterSpacing, fontVariationSettings, dpr)));
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
    async init(fills) {
      _injectStyles();
      await _autoDetectFonts();
      await document.fonts.ready;
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

    /**
     * Register a font for SVG rendering. Use for fonts loaded via JS,
     * cross-origin stylesheets, or CDN-hosted fonts that can't be auto-detected.
     * Call before init().
     * @param {string} family  - Font family name (must match CSS font-family)
     * @param {string} url     - URL to the font file (woff2/woff/ttf)
     * @param {Object} [opts]  - { style: 'normal', weight: '400' }
     */
    registerFont: registerFont,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = CounterFill;
  else global.CounterFill = CounterFill;

}(typeof window !== 'undefined' ? window : this));
