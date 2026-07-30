// Gradient placeholder generator (standalone lab copy).
//
// This mirrors src/utils/gradientPlaceholder.ts so the lab can run without a
// build step. Keep the two in sync when the algorithm changes — the Vue app
// imports the TypeScript version; this plain-JS module powers the lab demo.
//
// All colors are CSS design tokens (var(--color-*), defined in lab.css, which is
// generated from _config.scss). Nothing here hardcodes a hex value.

const t = (name) => `var(--color-${name})`;

export const PALETTES = [
  [t('lightyellow'), t('yellow'), t('brown'), t('red')], // Sunrise
  [t('lightyellow'), t('yellow'), t('green'), t('blue')], // Citrus
  [t('pink'), t('lightpurple'), t('purple'), t('purple')], // Berry
  [t('pink'), t('dodgerblue'), t('blue'), t('purple')], // Ocean
  [t('lightyellow'), t('brown'), t('red'), t('darkbrown')], // Ember
  [t('lightyellow'), t('green'), t('blue'), t('purple')], // Grove
];

export const PALETTE_NAMES = ['Sunrise', 'Citrus', 'Berry', 'Ocean', 'Ember', 'Grove'];

export const VARIANTS = ['rays', 'hills', 'arcs', 'mesh', 'bloom'];

// Only these are produced by default; the rest are kept for later.
export const ACTIVE_VARIANTS = ['mesh'];

// Mesh mixes multiple hues at once, so it draws from multi-color schemes.
export const SCHEMES = [
  ['yellow', 'lightyellow', 'brown', 'red', 'pink'].map(t), // Warm
  ['pink', 'lightpurple', 'purple', 'dodgerblue', 'blue'].map(t), // Cool
  ['yellow', 'pink', 'purple', 'blue', 'green'].map(t), // Spectrum
  ['purple', 'blue', 'green', 'dodgerblue'].map(t), // Jewel
  ['lightyellow', 'yellow', 'red', 'pink', 'purple'].map(t), // Sunset
];

export const SCHEME_NAMES = ['Warm', 'Cool', 'Spectrum', 'Jewel', 'Sunset'];

export const MESH_PATTERNS = ['scatter', 'grid', 'corners', 'flow', 'bigsoft', 'bloom'];

// ── Seeded randomness ───────────────────────────────────────

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function makeRng(seed) {
  const next = mulberry32(seed);
  const range = (min, max) => min + next() * (max - min);
  return {
    next,
    range,
    int: (min, max) => Math.floor(range(min, max + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
  };
}

function rampToken(ramp, pos) {
  const clamped = Math.max(0, Math.min(0.999, pos));
  return ramp[Math.floor(clamped * ramp.length)];
}

// ── Shape generators ────────────────────────────────────────

function washGradient(rng, ramp, id) {
  const angle = rng.range(-12, 12);
  const rad = (angle * Math.PI) / 180;
  const x2 = 50 + Math.sin(rad) * 50;
  const y2 = 50 + Math.cos(rad) * 50;
  return `<linearGradient id="${id}" x1="50%" y1="0%" x2="${x2.toFixed(1)}%" y2="${y2.toFixed(
    1
  )}%">
      <stop offset="0%" stop-color="${ramp[1]}" stop-opacity="0"/>
      <stop offset="45%" stop-color="${ramp[2]}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${ramp[ramp.length - 1]}" stop-opacity="0.95"/>
    </linearGradient>`;
}

function drawRays(rng, w, h, ramp, id) {
  const fx = w * rng.range(0.35, 0.65);
  const fy = h * rng.range(1.05, 1.35);
  const count = rng.int(48, 90);
  const spread = rng.range(70, 130);
  const reach = Math.hypot(w, h) * 1.4;
  const grad = `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${fx.toFixed(
    1
  )}" cy="${fy.toFixed(1)}" r="${reach.toFixed(1)}">
      <stop offset="0%" stop-color="${ramp[ramp.length - 1]}"/>
      <stop offset="55%" stop-color="${ramp[2]}"/>
      <stop offset="100%" stop-color="${ramp[1]}" stop-opacity="0.15"/>
    </radialGradient>`;
  let lines = '';
  for (let i = 0; i < count; i++) {
    const frac = i / (count - 1);
    const deg = -spread / 2 + spread * frac + rng.range(-1.5, 1.5);
    const a = ((deg - 90) * Math.PI) / 180;
    const x2 = fx + Math.cos(a) * reach;
    const y2 = fy + Math.sin(a) * reach;
    const width = rng.range(0.6, 1.8);
    const opacity = rng.range(0.2, 0.55);
    lines += `<line x1="${fx.toFixed(1)}" y1="${fy.toFixed(1)}" x2="${x2.toFixed(
      1
    )}" y2="${y2.toFixed(1)}" stroke-width="${width.toFixed(2)}" stroke-opacity="${opacity.toFixed(
      2
    )}"/>`;
  }
  return `${grad}<g stroke="url(#${id})" stroke-linecap="round">${lines}</g>`;
}

function drawHills(rng, w, h, ramp) {
  const layers = rng.int(4, 6);
  let paths = '';
  for (let l = 0; l < layers; l++) {
    const frac = l / (layers - 1);
    const baseY = h * (0.4 + frac * 0.55);
    const amp = h * rng.range(0.05, 0.14) * (1 - frac * 0.4);
    const phase = rng.range(0, Math.PI * 2);
    const freq = rng.range(1.2, 2.6);
    const steps = 16;
    let d = `M0 ${h} L0 ${baseY.toFixed(1)}`;
    for (let s = 0; s <= steps; s++) {
      const x = (w * s) / steps;
      const y = baseY - Math.sin(phase + (s / steps) * Math.PI * freq) * amp;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    d += ` L${w} ${h} Z`;
    const color = rampToken(ramp, 0.25 + frac * 0.7);
    const opacity = (0.45 + frac * 0.5).toFixed(2);
    paths += `<path d="${d}" fill="${color}" fill-opacity="${opacity}"/>`;
  }
  return `<g>${paths}</g>`;
}

function drawArcs(rng, w, h, ramp, id) {
  const cx = w * rng.range(0.3, 0.7);
  const cy = h * rng.range(1.1, 1.5);
  const count = rng.int(10, 18);
  const maxR = Math.hypot(w, h) * 1.2;
  const minR = maxR * 0.15;
  const grad = `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${cx.toFixed(
    1
  )}" cy="${cy.toFixed(1)}" r="${maxR.toFixed(1)}">
      <stop offset="0%" stop-color="${ramp[ramp.length - 1]}"/>
      <stop offset="100%" stop-color="${ramp[1]}"/>
    </radialGradient>`;
  let arcs = '';
  for (let i = 0; i < count; i++) {
    const frac = i / (count - 1);
    const r = minR + (maxR - minR) * frac;
    const width = rng.range(1.5, 5);
    const opacity = rng.range(0.18, 0.5);
    arcs += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(
      1
    )}" fill="none" stroke-width="${width.toFixed(2)}" stroke-opacity="${opacity.toFixed(2)}"/>`;
  }
  return `${grad}<g stroke="url(#${id})">${arcs}</g>`;
}

// Blob positions (fractions of w/h) and radii (fraction of the min dimension).
function meshLayout(pattern, rng, n) {
  const pts = [];
  if (pattern === 'scatter') {
    for (let i = 0; i < n; i++)
      pts.push({ x: rng.range(0, 1), y: rng.range(0, 1), r: rng.range(0.45, 0.8) });
  } else if (pattern === 'grid') {
    const cols = 3;
    const rows = 2;
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < rows; r++)
        pts.push({
          x: (c + 0.5) / cols + rng.range(-0.12, 0.12),
          y: (r + 0.5) / rows + rng.range(-0.12, 0.12),
          r: rng.range(0.45, 0.7),
        });
  } else if (pattern === 'corners') {
    for (const [x, y] of [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0.5, 0.5],
    ])
      pts.push({
        x: x + rng.range(-0.15, 0.15),
        y: y + rng.range(-0.15, 0.15),
        r: rng.range(0.5, 0.85),
      });
  } else if (pattern === 'flow') {
    for (let i = 0; i < n; i++) {
      const f = i / (n - 1);
      pts.push({
        x: f + rng.range(-0.1, 0.1),
        y: 0.5 + Math.sin(f * Math.PI * 1.4) * 0.32 + rng.range(-0.08, 0.08),
        r: rng.range(0.4, 0.65),
      });
    }
  } else if (pattern === 'bigsoft') {
    for (let i = 0; i < 3; i++)
      pts.push({ x: rng.range(0.2, 0.8), y: rng.range(0.2, 0.8), r: rng.range(0.85, 1.15) });
  } else if (pattern === 'bloom') {
    for (let i = 0; i < n; i++)
      pts.push({ x: rng.range(0.1, 0.9), y: rng.range(0.5, 1.05), r: rng.range(0.4, 0.75) });
  }
  return pts;
}

function drawMesh(rng, w, h, id, colors, pattern) {
  const n = rng.int(4, 6);
  const pts = meshLayout(pattern, rng, n);
  const blur = (Math.min(w, h) * 0.09).toFixed(1);

  // Organic warp: displace by low-frequency noise, then blur smooth.
  const tSeed = Math.floor(rng.next() * 1000);
  const freqX = rng.range(0.006, 0.013).toFixed(4);
  const freqY = rng.range(0.006, 0.013).toFixed(4);
  const scale = rng.range(55, 100).toFixed(0);
  let defs = `<filter id="${id}-warp" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${freqX} ${freqY}" numOctaves="2" seed="${tSeed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur in="d" stdDeviation="${blur}"/>
    </filter>`;

  // Full-color base so the mesh reads as saturated color edge to edge.
  const b1 = colors[rng.int(0, colors.length - 1)];
  const b2 = colors[rng.int(0, colors.length - 1)];
  defs += `<linearGradient id="${id}-base" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${b1}"/><stop offset="100%" stop-color="${b2}"/></linearGradient>`;

  let blobs = '';
  pts.forEach((p, i) => {
    const color = colors[i % colors.length];
    const gid = `${id}-g${i}`;
    defs += `<radialGradient id="${gid}"><stop offset="0%" stop-color="${color}" stop-opacity="${rng
      .range(0.88, 1)
      .toFixed(2)}"/><stop offset="55%" stop-color="${color}" stop-opacity="${rng
      .range(0.4, 0.6)
      .toFixed(2)}"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
    blobs += `<circle cx="${(p.x * w).toFixed(1)}" cy="${(p.y * h).toFixed(1)}" r="${(
      p.r * Math.min(w, h)
    ).toFixed(1)}" fill="url(#${gid})"/>`;
  });

  // Randomized negative-space spots for washed-out areas and whitespace. They
  // use var(--background), so the spots match the card in each theme instead of
  // forcing white in both.
  const whiteCount = rng.int(1, 3);
  let whites = '';
  for (let i = 0; i < whiteCount; i++) {
    const wr = Math.min(w, h) * rng.range(0.4, 0.85);
    const gid = `${id}-w${i}`;
    defs += `<radialGradient id="${gid}"><stop offset="0%" stop-color="var(--background)" stop-opacity="${rng
      .range(0.55, 0.9)
      .toFixed(2)}"/><stop offset="50%" stop-color="var(--background)" stop-opacity="${rng
      .range(0.12, 0.3)
      .toFixed(2)}"/><stop offset="100%" stop-color="var(--background)" stop-opacity="0"/></radialGradient>`;
    whites += `<circle cx="${(rng.range(0, 1) * w).toFixed(1)}" cy="${(
      rng.range(0, 1) * h
    ).toFixed(1)}" r="${wr.toFixed(1)}" fill="url(#${gid})"/>`;
  }

  return `<defs>${defs}</defs><g filter="url(#${id}-warp)"><rect x="-12%" y="-12%" width="124%" height="124%" fill="url(#${id}-base)"/>${blobs}${whites}</g>`;
}

function drawBloom(rng, w, h, ramp) {
  const cx = w * rng.range(0.4, 0.6);
  const cy = h * rng.range(0.95, 1.15);
  const count = rng.int(9, 16);
  const petalLen = Math.hypot(w, h) * rng.range(0.55, 0.85);
  const petalW = petalLen * rng.range(0.16, 0.28);
  const spread = rng.range(120, 200);
  let petals = '';
  for (let i = 0; i < count; i++) {
    const frac = i / (count - 1);
    const deg = -spread / 2 + spread * frac;
    const color = rampToken(ramp, 0.3 + frac * 0.65);
    const opacity = rng.range(0.18, 0.4);
    const d = `M0 0 C ${petalW} ${-petalLen * 0.35}, ${petalW} ${-petalLen * 0.75}, 0 ${-petalLen} C ${-petalW} ${-petalLen * 0.75}, ${-petalW} ${-petalLen * 0.35}, 0 0 Z`;
    petals += `<path d="${d}" fill="${color}" fill-opacity="${opacity.toFixed(
      2
    )}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${deg.toFixed(1)})"/>`;
  }
  return `<g>${petals}</g>`;
}

// ── Public API ──────────────────────────────────────────────

export function generatePlaceholder(seed, opts = {}) {
  const width = opts.width ?? 500;
  const height = opts.height ?? 400;
  const rng = makeRng(hashString(seed || 'placeholder'));

  const variant = opts.variant ?? rng.pick(ACTIVE_VARIANTS);
  const uid = `gp${hashString(seed + variant).toString(36)}`;
  const open = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">`;

  if (variant === 'mesh') {
    const schemeIndex =
      opts.schemeIndex != null
        ? ((opts.schemeIndex % SCHEMES.length) + SCHEMES.length) % SCHEMES.length
        : rng.int(0, SCHEMES.length - 1);
    const scheme = SCHEMES[schemeIndex];
    const pattern = opts.pattern ?? rng.pick(MESH_PATTERNS);
    const svg = `${open}${drawMesh(rng, width, height, uid, scheme, pattern)}</svg>`;
    return { svg, palette: scheme, paletteIndex: schemeIndex, variant, pattern };
  }

  const paletteIndex =
    opts.paletteIndex != null
      ? ((opts.paletteIndex % PALETTES.length) + PALETTES.length) % PALETTES.length
      : rng.int(0, PALETTES.length - 1);
  const palette = PALETTES[paletteIndex];

  let shapes = '';
  switch (variant) {
    case 'rays':
      shapes = drawRays(rng, width, height, palette, `${uid}-r`);
      break;
    case 'hills':
      shapes = drawHills(rng, width, height, palette);
      break;
    case 'arcs':
      shapes = drawArcs(rng, width, height, palette, `${uid}-a`);
      break;
    case 'bloom':
      shapes = drawBloom(rng, width, height, palette);
      break;
  }

  const svg = `${open}<defs>${washGradient(
    rng,
    palette,
    `${uid}-wash`
  )}</defs><rect width="${width}" height="${height}" fill="url(#${uid}-wash)"/>${shapes}</svg>`;

  return { svg, palette, paletteIndex, variant };
}

/**
 * Replace every var(--color-*) reference with its computed value, so an exported
 * standalone SVG carries real colors instead of unresolved custom properties.
 */
export function resolveTokens(svg, el = document.documentElement) {
  const styles = getComputedStyle(el);
  return svg.replace(/var\(--([a-z0-9-]+)\)/gi, (_, name) => {
    const value = styles.getPropertyValue(`--${name}`).trim();
    return value || `var(--${name})`;
  });
}
