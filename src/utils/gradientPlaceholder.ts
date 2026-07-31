// Gradient placeholder generator.
//
// Produces a deterministic, randomized SVG gradient for cards that have no
// image. The same seed always yields the same artwork, so a card's placeholder
// stays stable across renders and page loads instead of flickering to something
// new each time.
//
// Colors are CSS design tokens, not literals: every fill and stroke references a
// `var(--color-*)` custom property (see _config.scss), and smooth blends are
// done with native SVG gradients whose stops are those same tokens. Nothing here
// hardcodes a hex value, so the palette follows the tokens as their single
// source of truth. Randomness lives entirely in the geometry — angles, counts,
// positions, widths, opacities — which is what "randomized shapes" means.
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
  /** Mesh only: force a color scheme index instead of deriving from the seed. */
  schemeIndex?: number;
  /** Mesh only: force a blob-layout pattern instead of deriving from the seed. */
  pattern?: MeshPattern;
}

export interface PlaceholderResult {
  /** Raw SVG markup, safe to inline via v-html. */
  svg: string;
  /** The chosen palette (non-mesh) or scheme (mesh), as token references. */
  palette: string[];
  /** The chosen shape variant. */
  variant: PlaceholderVariant;
  /** Index of the chosen palette (non-mesh) or scheme (mesh). */
  paletteIndex: number;
  /** Mesh only: the blob-layout pattern used. */
  pattern?: MeshPattern;
}

// ── Brand palettes ──────────────────────────────────────────
// Each ramp runs light → saturated using the site's color tokens. The lightest
// stop is the wash that fades out at the top; the last stop is the deepest color
// that anchors the bottom. These resolve against _config.scss at render time, so
// the placeholder always reflects the current tokens (and any theme override).
const t = (name: string) => `var(--color-${name})`;

const PALETTES: string[][] = [
  [t('lightyellow'), t('yellow'), t('brown'), t('red')], // Sunrise: warm amber into red
  [t('lightyellow'), t('yellow'), t('green'), t('blue')], // Citrus: yellow into green/blue
  [t('pink'), t('lightpurple'), t('purple'), t('purple')], // Berry: pink into deep violet
  [t('pink'), t('dodgerblue'), t('blue'), t('purple')], // Ocean: blush into blue/violet
  [t('lightyellow'), t('brown'), t('red'), t('darkbrown')], // Ember: warm into deep red-brown
  [t('lightyellow'), t('green'), t('blue'), t('purple')], // Grove: yellow-green into blue/violet
];

export const PALETTE_NAMES = [
  'Sunrise',
  'Citrus',
  'Berry',
  'Ocean',
  'Ember',
  'Grove',
];

// Every shape variant is implemented, but only these are produced right now.
// Add others back here to re-enable them; the draw code for all five is kept.
const ACTIVE_VARIANTS: PlaceholderVariant[] = ['mesh'];

// ── Mesh schemes and patterns ───────────────────────────────
// The mesh variant mixes several hues at once, so it draws from multi-color
// schemes (not the light→deep ramps the other variants use). All tokens exist
// in _config.scss.
const SCHEMES: string[][] = [
  ['yellow', 'lightyellow', 'brown', 'red', 'pink'].map(t), // Warm
  ['pink', 'lightpurple', 'purple', 'dodgerblue', 'blue'].map(t), // Cool
  ['yellow', 'pink', 'purple', 'blue', 'green'].map(t), // Spectrum
  ['purple', 'blue', 'green', 'dodgerblue'].map(t), // Jewel
  ['lightyellow', 'yellow', 'red', 'pink', 'purple'].map(t), // Sunset
];

export const SCHEME_NAMES = ['Warm', 'Cool', 'Spectrum', 'Jewel', 'Sunset'];

export type MeshPattern = 'scatter' | 'grid' | 'corners' | 'flow' | 'bigsoft' | 'bloom';

export const MESH_PATTERNS: MeshPattern[] = [
  'scatter',
  'grid',
  'corners',
  'flow',
  'bigsoft',
  'bloom',
];

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
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
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

/** Pick a token from a ramp by a normalized position (0 = lightest). */
function rampToken(ramp: string[], pos: number): string {
  const clamped = Math.max(0, Math.min(0.999, pos));
  return ramp[Math.floor(clamped * ramp.length)];
}

// ── Shape generators ────────────────────────────────────────
// Each returns SVG fragment markup drawn over a shared color wash. The wash is
// drawn first (transparent top → saturated bottom); shapes add texture on top.
// All color comes from the `ramp` tokens or gradients built from them.

/** The base color-wash gradient definition (transparent top → deep bottom). */
function washGradient(rng: Rng, ramp: string[], id: string): string {
  // Slightly off-vertical so the bloom feels organic, not machined.
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

function drawRays(rng: Rng, w: number, h: number, ramp: string[], id: string): string {
  // A fan of fine lines emanating from a focal point below the frame — the
  // signature look from the inspiration image. A single radial gradient anchored
  // at the focal point colors every line, so the fan is deep at its origin and
  // fades outward, all from tokens.
  const fx = w * rng.range(0.35, 0.65);
  const fy = h * rng.range(1.05, 1.35);
  const count = rng.int(48, 90);
  const spread = rng.range(70, 130); // total angular spread in degrees
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

function drawHills(rng: Rng, w: number, h: number, ramp: string[]): string {
  // Layered smooth ridges rising from the bottom, like a topographic sunset.
  // Each layer takes the next token up the ramp.
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

function drawArcs(rng: Rng, w: number, h: number, ramp: string[], id: string): string {
  // Concentric arcs radiating from a focal point below the frame, colored by a
  // shared radial gradient so the rings blend across the token ramp.
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

interface Blob {
  x: number;
  y: number;
  r: number;
}

/** Blob positions (fractions of w/h) and radii (fraction of the min dimension). */
function meshLayout(pattern: MeshPattern, rng: Rng, n: number): Blob[] {
  const pts: Blob[] = [];
  switch (pattern) {
    case 'scatter':
      for (let i = 0; i < n; i++)
        pts.push({ x: rng.range(0, 1), y: rng.range(0, 1), r: rng.range(0.45, 0.8) });
      break;
    case 'grid': {
      const cols = 3;
      const rows = 2;
      for (let c = 0; c < cols; c++)
        for (let r = 0; r < rows; r++)
          pts.push({
            x: (c + 0.5) / cols + rng.range(-0.12, 0.12),
            y: (r + 0.5) / rows + rng.range(-0.12, 0.12),
            r: rng.range(0.45, 0.7),
          });
      break;
    }
    case 'corners':
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
      break;
    case 'flow':
      for (let i = 0; i < n; i++) {
        const f = i / (n - 1);
        pts.push({
          x: f + rng.range(-0.1, 0.1),
          y: 0.5 + Math.sin(f * Math.PI * 1.4) * 0.32 + rng.range(-0.08, 0.08),
          r: rng.range(0.4, 0.65),
        });
      }
      break;
    case 'bigsoft':
      for (let i = 0; i < 3; i++)
        pts.push({ x: rng.range(0.2, 0.8), y: rng.range(0.2, 0.8), r: rng.range(0.85, 1.15) });
      break;
    case 'bloom':
      for (let i = 0; i < n; i++)
        pts.push({ x: rng.range(0.1, 0.9), y: rng.range(0.5, 1.05), r: rng.range(0.4, 0.75) });
      break;
  }
  return pts;
}

/**
 * Mesh: a full-color base plus several solid hue blobs, warped by turbulence so
 * the color zones flow organically (like a real mesh-gradient image) and then
 * blurred smooth. The top eases into the card's own background so the placeholder
 * still settles into the card. Self-contained SVG content (its own defs).
 */
function drawMesh(
  rng: Rng,
  w: number,
  h: number,
  id: string,
  colors: string[],
  pattern: MeshPattern
): string {
  const n = rng.int(4, 6);
  const pts = meshLayout(pattern, rng, n);
  const blur = (Math.min(w, h) * 0.09).toFixed(1);

  // Organic warp: displace the whole mesh by low-frequency noise for flowing,
  // defined color zones instead of round halos, then blur to keep it smooth.
  const tSeed = Math.floor(rng.next() * 1000);
  const freqX = rng.range(0.006, 0.013).toFixed(4);
  const freqY = rng.range(0.006, 0.013).toFixed(4);
  const scale = rng.range(55, 100).toFixed(0);
  let defs = `<filter id="${id}-warp" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${freqX} ${freqY}" numOctaves="2" seed="${tSeed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur in="d" stdDeviation="${blur}"/>
    </filter>`;

  // Full-color base so the mesh reads as saturated color edge to edge (no pale
  // gaps), which is most of the "definition".
  const b1 = colors[rng.int(0, colors.length - 1)];
  const b2 = colors[rng.int(0, colors.length - 1)];
  defs += `<linearGradient id="${id}-base" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${b1}"/><stop offset="100%" stop-color="${b2}"/></linearGradient>`;

  let blobs = '';
  pts.forEach((p, i) => {
    const color = colors[i % colors.length];
    const gid = `${id}-g${i}`;
    // A mid stop keeps a solid colored body before fading — more defined than a
    // soft halo.
    defs += `<radialGradient id="${gid}"><stop offset="0%" stop-color="${color}" stop-opacity="${rng
      .range(0.88, 1)
      .toFixed(2)}"/><stop offset="55%" stop-color="${color}" stop-opacity="${rng
      .range(0.4, 0.6)
      .toFixed(2)}"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
    blobs += `<circle cx="${(p.x * w).toFixed(1)}" cy="${(p.y * h).toFixed(1)}" r="${(
      p.r * Math.min(w, h)
    ).toFixed(1)}" fill="url(#${gid})"/>`;
  });

  // Randomized negative-space spots: soft blooms of the card background that
  // wash areas out and open up whitespace, placed independently of the color
  // blobs. Count, position, size and strength all vary, so some meshes stay
  // saturated and others go airy. They use var(--background), so the spots match
  // the card in each theme (light in light, dark in dark) rather than forcing
  // white in both.
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

  // A small amount of film grain over everything for texture. Monochrome
  // turbulence, overlaid faintly so it reads as grain, not static.
  const noise = `<filter id="${id}-noise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n"/><feColorMatrix in="n" type="saturate" values="0"/></filter>`;

  // The base is oversized and inside the warp group so displacement never
  // reveals a transparent edge. White spots warp with everything else; the grain
  // sits flat on top.
  return `<defs>${defs}${noise}</defs><g filter="url(#${id}-warp)"><rect x="-12%" y="-12%" width="124%" height="124%" fill="url(#${id}-base)"/>${blobs}${whites}</g><rect width="${w}" height="${h}" filter="url(#${id}-noise)" opacity="0.14" style="mix-blend-mode:overlay"/>`;
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
    const frac = i / (count - 1);
    const deg = -spread / 2 + spread * frac;
    const color = rampToken(ramp, 0.3 + frac * 0.65);
    const opacity = rng.range(0.18, 0.4);
    // A leaf/petal path pointing up, then rotated into place about (cx,cy).
    const d = `M0 0 C ${petalW} ${-petalLen * 0.35}, ${petalW} ${-petalLen * 0.75}, 0 ${-petalLen} C ${-petalW} ${-petalLen * 0.75}, ${-petalW} ${-petalLen * 0.35}, 0 0 Z`;
    petals += `<path d="${d}" fill="${color}" fill-opacity="${opacity.toFixed(
      2
    )}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${deg.toFixed(1)})"/>`;
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

  const variant = opts.variant ?? rng.pick(ACTIVE_VARIANTS);

  // Unique id prefix keeps multiple inlined SVGs from colliding on gradient ids.
  const uid = `gp${hashString(seed + variant).toString(36)}`;

  const open = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">`;

  if (variant === 'mesh') {
    // Mesh mixes multiple hues from a scheme and draws a card-context fade; it
    // is self-contained and does not use the shared wash.
    const schemeIndex =
      opts.schemeIndex != null
        ? ((opts.schemeIndex % SCHEMES.length) + SCHEMES.length) % SCHEMES.length
        : rng.int(0, SCHEMES.length - 1);
    const scheme = SCHEMES[schemeIndex];
    const pattern = opts.pattern ?? rng.pick(MESH_PATTERNS);
    const svg = `${open}${drawMesh(rng, width, height, uid, scheme, pattern)}</svg>`;
    return { svg, palette: scheme, variant, paletteIndex: schemeIndex, pattern };
  }

  // Other variants share a light→deep ramp and the top-fading wash.
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

  return { svg, palette, variant, paletteIndex };
}
