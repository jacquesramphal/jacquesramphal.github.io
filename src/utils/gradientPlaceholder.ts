// Gradient placeholder generator.
//
// Produces a deterministic, randomized SVG gradient for cards that have no
// image. The same seed always yields the same artwork, so a card's placeholder
// stays stable across renders and page loads instead of flickering to something
// new each time.
//
// Colors come from the site's brand tokens (see _config.scss / tokens.json).
// Shapes are chosen from a small set of variants — radiating rays, layered
// hills, concentric arcs, soft mesh blobs, and blooms — echoing the fanned-line
// gradient in the design inspiration.
//
// The base wash fades to transparent at the top so the card's own (theme-aware)
// background shows through and the title stays readable, while brand color
// blooms up from the bottom. This keeps the output legible in both light and
// dark themes without the generator needing to know which one is active.

export type PlaceholderVariant = 'rays' | 'hills' | 'arcs' | 'mesh' | 'bloom';

export interface PlaceholderOptions {
  /** Output width in SVG user units. Height follows the 5:4 card aspect. */
  width?: number;
  height?: number;
  /** Force a specific shape variant instead of deriving one from the seed. */
  variant?: PlaceholderVariant;
  /** Force a specific palette index instead of deriving one from the seed. */
  paletteIndex?: number;
}

export interface PlaceholderResult {
  /** Raw SVG markup, safe to inline via v-html. */
  svg: string;
  /** The chosen palette, lightest wash first, most saturated last. */
  palette: string[];
  /** The chosen shape variant. */
  variant: PlaceholderVariant;
}

// ── Brand palettes ──────────────────────────────────────────
// Each ramp runs light → saturated. The lightest stop is the wash that fades
// out at the top; the last stop is the deepest color that anchors the bottom.
// Values are the literal token hexes so the generator has no runtime CSS
// dependency (it can run in the Vue app or a standalone lab page alike).
const PALETTES: string[][] = [
  // Sage → gold: the core brand pairing.
  ['#f6f3ec', '#d3e1d6', '#6c7a6a', '#957040'],
  // Clay → gold: warm and earthy.
  ['#f6f3ec', '#e3decb', '#e8a192', '#957040'],
  // Meadow: mint into deep olive.
  ['#f6f3ec', '#d3e1d6', '#6c7a6a', '#333b2c'],
  // Citrus: the green→yellow→warm arc from the inspiration.
  ['#f6f3ec', '#d3e1d6', '#fcb23b', '#e8a192'],
  // Amber: soft yellow into gold.
  ['#f6f3ec', '#ffdd9e', '#fcb23b', '#957040'],
  // Stone: neutral clay into sage.
  ['#f6f3ec', '#e3decb', '#c0bcbb', '#6c7a6a'],
];

const VARIANTS: PlaceholderVariant[] = ['rays', 'hills', 'arcs', 'mesh', 'bloom'];

// ── Seeded randomness ───────────────────────────────────────

/** FNV-1a-ish string hash → unsigned 32-bit int. */
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 PRNG: fast, deterministic, good enough for visuals. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Rng {
  next: () => number;
  range: (min: number, max: number) => number;
  int: (min: number, max: number) => number;
  pick: <T>(arr: T[]) => T;
}

function makeRng(seed: number): Rng {
  const next = mulberry32(seed);
  const range = (min: number, max: number) => min + next() * (max - min);
  return {
    next,
    range,
    int: (min: number, max: number) => Math.floor(range(min, max + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
  };
}

// ── Color helpers ───────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

/** Sample a color from a ramp at position t ∈ [0,1]. */
function rampColor(ramp: string[], t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (ramp.length - 1);
  const i = Math.floor(scaled);
  if (i >= ramp.length - 1) return ramp[ramp.length - 1];
  return lerpColor(ramp[i], ramp[i + 1], scaled - i);
}

// ── Shape generators ────────────────────────────────────────
// Each returns SVG fragment markup drawn over a shared color wash. The wash is
// drawn first (transparent top → saturated bottom); shapes add texture on top.

function washRect(rng: Rng, w: number, h: number, ramp: string[], id: string): string {
  // Slightly off-vertical so the bloom feels organic, not machined.
  const angle = rng.range(-12, 12);
  const rad = (angle * Math.PI) / 180;
  const x2 = 50 + Math.sin(rad) * 50;
  const y2 = 50 + Math.cos(rad) * 50;
  return `
    <defs>
      <linearGradient id="${id}" x1="50%" y1="0%" x2="${x2}%" y2="${y2}%">
        <stop offset="0%" stop-color="${ramp[1]}" stop-opacity="0"/>
        <stop offset="45%" stop-color="${rampColor(ramp, 0.5)}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${ramp[ramp.length - 1]}" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${id})"/>`;
}

function drawRays(rng: Rng, w: number, h: number, ramp: string[]): string {
  // A fan of fine lines emanating from a focal point below the frame — the
  // signature look from the inspiration image.
  const fx = w * rng.range(0.35, 0.65);
  const fy = h * rng.range(1.05, 1.35);
  const count = rng.int(48, 90);
  const spread = rng.range(70, 130); // total angular spread in degrees
  const reach = Math.hypot(w, h) * 1.4;
  let lines = '';
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    // Angle measured from straight up, fanned symmetrically.
    const deg = -spread / 2 + spread * t + rng.range(-1.5, 1.5);
    const a = ((deg - 90) * Math.PI) / 180;
    const x2 = fx + Math.cos(a) * reach;
    const y2 = fy + Math.sin(a) * reach;
    const color = rampColor(ramp, 0.35 + t * 0.65);
    const width = rng.range(0.6, 1.8);
    const opacity = rng.range(0.15, 0.5);
    lines += `<line x1="${fx.toFixed(1)}" y1="${fy.toFixed(1)}" x2="${x2.toFixed(
      1
    )}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${width.toFixed(
      2
    )}" stroke-opacity="${opacity.toFixed(2)}"/>`;
  }
  return `<g stroke-linecap="round">${lines}</g>`;
}

function drawHills(rng: Rng, w: number, h: number, ramp: string[]): string {
  // Layered smooth ridges rising from the bottom, like a topographic sunset.
  const layers = rng.int(4, 6);
  let paths = '';
  for (let l = 0; l < layers; l++) {
    const t = l / (layers - 1);
    const baseY = h * (0.4 + t * 0.55);
    const amp = h * rng.range(0.05, 0.14) * (1 - t * 0.4);
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
    const color = rampColor(ramp, 0.3 + t * 0.7);
    const opacity = (0.4 + t * 0.5).toFixed(2);
    paths += `<path d="${d}" fill="${color}" fill-opacity="${opacity}"/>`;
  }
  return `<g>${paths}</g>`;
}

function drawArcs(rng: Rng, w: number, h: number, ramp: string[]): string {
  // Concentric arcs radiating from a focal point below the frame.
  const cx = w * rng.range(0.3, 0.7);
  const cy = h * rng.range(1.1, 1.5);
  const count = rng.int(10, 18);
  const maxR = Math.hypot(w, h) * 1.2;
  const minR = maxR * 0.15;
  let arcs = '';
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const r = minR + (maxR - minR) * t;
    const color = rampColor(ramp, 1 - t * 0.8);
    const width = rng.range(1.5, 5);
    const opacity = rng.range(0.15, 0.45);
    arcs += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(
      1
    )}" fill="none" stroke="${color}" stroke-width="${width.toFixed(
      2
    )}" stroke-opacity="${opacity.toFixed(2)}"/>`;
  }
  return `<g>${arcs}</g>`;
}

function drawMesh(rng: Rng, w: number, h: number, ramp: string[], id: string): string {
  // Soft blurred blobs of brand color, mesh-gradient style.
  const count = rng.int(3, 5);
  let defs = '';
  let blobs = '';
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(1, count - 1);
    const cx = w * rng.range(0.1, 0.9);
    const cy = h * rng.range(0.45, 1.05);
    const r = Math.min(w, h) * rng.range(0.35, 0.7);
    const color = rampColor(ramp, 0.4 + t * 0.6);
    const gid = `${id}-b${i}`;
    defs += `<radialGradient id="${gid}">
      <stop offset="0%" stop-color="${color}" stop-opacity="${rng
      .range(0.5, 0.85)
      .toFixed(2)}"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`;
    blobs += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(
      1
    )}" fill="url(#${gid})"/>`;
  }
  return `<defs>${defs}</defs><g filter="url(#${id}-blur)">${blobs}</g>`;
}

function drawBloom(rng: Rng, w: number, h: number, ramp: string[]): string {
  // Overlapping rotated petals fanning from a low center — an abstract flower.
  const cx = w * rng.range(0.4, 0.6);
  const cy = h * rng.range(0.95, 1.15);
  const count = rng.int(9, 16);
  const petalLen = Math.hypot(w, h) * rng.range(0.55, 0.85);
  const petalW = petalLen * rng.range(0.16, 0.28);
  const spread = rng.range(120, 200);
  let petals = '';
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const deg = -spread / 2 + spread * t;
    const color = rampColor(ramp, 0.35 + t * 0.6);
    const opacity = rng.range(0.18, 0.4);
    // A leaf/petal path pointing up, then rotated into place about (cx,cy).
    const d = `M0 0 C ${petalW} ${-petalLen * 0.35}, ${petalW} ${-petalLen * 0.75}, 0 ${-petalLen} C ${-petalW} ${-petalLen * 0.75}, ${-petalW} ${-petalLen * 0.35}, 0 0 Z`;
    petals += `<path d="${d}" fill="${color}" fill-opacity="${opacity.toFixed(
      2
    )}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${deg.toFixed(
      1
    )})"/>`;
  }
  return `<g>${petals}</g>`;
}

// ── Public API ──────────────────────────────────────────────

/**
 * Generate a deterministic gradient placeholder for a given seed.
 *
 * @param seed  Any stable string (e.g. a card title). Same seed → same art.
 * @param opts  Optional overrides for size, variant, or palette.
 */
export function generatePlaceholder(
  seed: string,
  opts: PlaceholderOptions = {}
): PlaceholderResult {
  const width = opts.width ?? 500;
  const height = opts.height ?? 400;
  const rng = makeRng(hashString(seed || 'placeholder'));

  const palette =
    PALETTES[
      opts.paletteIndex != null
        ? ((opts.paletteIndex % PALETTES.length) + PALETTES.length) % PALETTES.length
        : rng.int(0, PALETTES.length - 1)
    ];
  const variant = opts.variant ?? rng.pick(VARIANTS);

  // Unique id prefix keeps multiple inlined SVGs from colliding on gradient ids.
  const uid = `gp${hashString(seed + variant).toString(36)}`;

  let shapes = '';
  switch (variant) {
    case 'rays':
      shapes = drawRays(rng, width, height, palette);
      break;
    case 'hills':
      shapes = drawHills(rng, width, height, palette);
      break;
    case 'arcs':
      shapes = drawArcs(rng, width, height, palette);
      break;
    case 'mesh':
      shapes = drawMesh(rng, width, height, palette, uid);
      break;
    case 'bloom':
      shapes = drawBloom(rng, width, height, palette);
      break;
  }

  const blurFilter =
    variant === 'mesh'
      ? `<filter id="${uid}-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${Math.max(
          width,
          height
        ) * 0.06}"/></filter>`
      : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${blurFilter}${washRect(
    rng,
    width,
    height,
    palette,
    `${uid}-wash`
  )}${shapes}</svg>`;

  return { svg, palette, variant };
}

/** Convenience: the same output as a data: URI, e.g. for CSS background-image. */
export function generatePlaceholderDataUri(
  seed: string,
  opts: PlaceholderOptions = {}
): string {
  const { svg } = generatePlaceholder(seed, opts);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
