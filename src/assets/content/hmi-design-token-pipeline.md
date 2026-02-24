<header>

# From Figma to Runtime: Engineering a Design Token Pipeline for a Multi-Brand Human-Machine Interface Platform

**Role:** Sole Designer & Developer
**Scope:** Multi-display Human-Machine Interface (HMI) — Cluster, Central, Passenger
**Focus:** Token architecture · AI-guarded pipeline · Cross-functional tooling

</header>

---

This project wasn't a redesign. It was a systems problem — and it needed a systems solution.

The client had a multi-display vehicle Human-Machine Interface (HMI) prototype that needed to scale across four brands, two themes, two modalities (touch and desktop), and three displays. The visual design existed in Figma. The code existed in React. And the two were drifting further apart every sprint — accelerated by AI tools generating whatever values they felt like.

My job was to build the bridge and enforce it.

---

## The Problems Worth Naming

**Design–code drift.** Colors lived in Figma, in CSS files, and in hardcoded component values. There was no enforced shared vocabulary. When a designer updated a surface color in Figma, nothing in the codebase knew about it.

**Multi-brand duplication.** Four brand files. ~80% of the values identical across all of them. Updating a shared spacing value meant editing five files and hoping nothing was missed.

**AI-generated "vibe code."** Cursor and Claude are fast. They're also happy to write `color: #ffffff` or `transition: all 0.3s ease` the moment you give them a component task. Without guardrails, AI development actively widens the design–code gap.

**No persistent state.** The HMI reset on refresh. Every restart meant manually reconfiguring brand, theme, and display. It felt like a demo, not a platform.

The common thread: **no single source of truth, and no enforcement at the points where drift happens.**

---

## Tokens as a Contract

Design tokens are often treated as a designer's concern — a way to organize colors in Figma. I treated them differently: as the **contract** between Figma, code, and AI tooling.

The architecture:

```
Design Tokens/
├── Brand/          ← Per-brand color overrides only
├── Theme/          ← Day.json, Night.json (semantic surface layers)
├── Motion/         ← Duration, easing, transition presets
├── Interactions/   ← Hover, active, disabled, focus
├── Platform/       ← Tap.json (HMI density), Click.json (desktop density)
└── Compositions.json
```

The output from a single generate command:

```
src/styles/tokens/
├── index.css               ← single import
├── Standard/
│   ├── brand.css
│   ├── theme-day.css
│   └── theme-night.css
└── shared/
    ├── motion.css
    └── interactions.css
```

One import. All themes, all brands, all platforms — runtime-switched via data attributes:

```js
document.documentElement.dataset.brand = 'Standard';
document.documentElement.dataset.theme = 'night';
document.documentElement.dataset.platform = 'tap';
```

The semantic color layer was especially important. We formalized three tiers:

| Layer | Purpose | Direct use in components |
|---|---|---|
| `color-primitives` | Raw values — never used directly | ✗ |
| `color` | Brand accents | ✓ |
| `surface` / `onsurface` | Semantic theme surfaces | ✓ |

This is what made day/night switching automatic:

```css
/* Correct */
background: var(--color-surface-secondary-enabled);
color: var(--color-onsurface-onsurface-primary);

/* Wrong — breaks theming */
background: #1c1c1c;
color: white;
```

---

## Eliminating Brand Duplication

The original approach: one JSON file per brand, each containing ~1,300 lines, ~85% duplicated.

The fix: an inheritance model where brand files contain **only overrides**.

```
Base/Base.json         ← single source of truth
Brand/BrandA.json      ← brand accents only
Brand/BrandB.json      ← brand accents only
Brand/BrandC.json      ← brand accents only
```

The token generator (`transformTokens.js`) merges them at build time using a deep merge that only overwrites token-level values, not entire branches:

```js
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // Token objects ({value, type}) get assigned directly; groups get merged
      if (!('value' in source[key] && 'type' in source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// In processBrand():
const brandContext = deepMerge(baseTokens, brandTokens);
```

After flattening, the script validates that no unresolved `{token.path}` references slipped through — failing the build if they did:

```js
function validateNoUnresolvedRefs(flattenedTokens, context) {
  const unresolved = [];
  for (const [key, token] of Object.entries(flattenedTokens)) {
    if (typeof token.value === 'string' && token.value.includes('{')) {
      const hasTokenRefs = token.value.match(/\{[^}]+\}/);
      const hasCssVars   = token.value.includes('var(--');
      if (hasTokenRefs && !hasCssVars) unresolved.push({ token: key, value: token.value });
    }
  }
  if (unresolved.length > 0) {
    console.error(`❌ ${unresolved.length} unresolved refs in ${context}:`);
    unresolved.forEach(u => console.error(`  - ${u.token}: ${u.value}`));
    throw new Error('Unresolved token references. Check Base/Brand file structure.');
  }
}
```

Brand files went from ~1,300 lines to ~200. A broken reference fails the build immediately rather than shipping a broken CSS variable.

---

## Guardrails for AI Development

This was the piece most teams skip. You can have a perfect token system and still have Cursor write `padding: 16px` on every component.

I built three layers of enforcement.

### Layer 1: Design Guard Script

`designGuard.js` scans `src/` for hardcoded design values — CSS, JS, JSX. It uses heuristics rather than a full parser: fast, zero heavy dependencies, runs on every save.

```js
// Very intentional: heuristics, not a full parser (fast + low deps).
const PATTERNS = {
  hexColor:            /#[0-9a-fA-F]{3,8}\b/g,
  colorFn:             /\b(?:rgb|rgba|hsl|hsla)\s*\(/g,
  px:                  /(-?\d*\.?\d+)px\b/g,
  varFallback:         /\bvar\(\s*--[^,)\s]+\s*,/g,  // var(--token, fallback)
  hardcodedTransition: /\btransition\s*:\s*[^;]*\b(\d*\.?\d+)(ms|s)\b/gi,
  msOrS:               /\b(\d*\.?\d+)(ms|s)\b/g,
};
```

For JSX, it also flags inline `style={{ }}` objects that contain hardcoded values while permitting token-based ones:

```js
const styleAttr = /\bstyle\s*=\s*\{\s*\{[\s\S]*?\}\s*\}/g;
// ...
const hasTokenVar        = /\bvar\(\s*--/g.test(block);
const hasHardcodedColor  = PATTERNS.hexColor.test(block) || PATTERNS.colorFn.test(block);
const hasHardcodedPx     = PATTERNS.px.test(block);
const hasHardcodedTime   = PATTERNS.msOrS.test(block) && !/\bvar\(\s*--motion-/.test(block);

if (hasHardcodedColor || hasHardcodedPx || hasHardcodedTime) {
  issues.push({
    message: hasTokenVar
      ? 'Inline style contains hardcoded values. Only use token-based values.'
      : 'Inline style contains hardcoded values. Prefer CSS classes + tokens.',
  });
}
```

Output is grouped by file with line/column and the offending snippet:

```
src/components/Button.jsx
  L42:C18  [noHardcodedColors] Hardcoded hex color detected. Use tokens instead.
    ↳ #ffffff
    ↳ color: '#ffffff'
```

Run it:

```bash
npm run lint:design         # warn, keep going
npm run lint:design:strict  # fail CI on any finding
```

Configurable via `design-guard.config.json`. Strict mode (`DESIGN_GUARD_STRICT=1`) runs in CI so violations block merge.

### Layer 2: Custom ESLint Rule

The design guard covers CSS. This covers inline styles in JSX — a common AI output:

```js
// designSystem ESLint plugin
for (const prop of expr.properties ?? []) {
  const text = getStringValue(prop.value);
  const tokenBased = /\bvar\(\s*--/.test(text);

  if (tokenBased) {
    reportIfMatches(context, v, text, 'varFallback'); // no fallbacks allowed
    continue;
  }

  reportIfMatches(context, v, text, 'color');
  reportIfMatches(context, v, text, 'px');
  reportIfMatches(context, v, text, 'time');
}
```

**Blocked:**
```jsx
<div style={{ padding: '16px', color: '#fff' }} />
```

**Allowed:**
```jsx
<div style={{ padding: 'var(--spacing-16)', color: 'var(--color-onsurface-onsurface-primary)' }} />
```

### Layer 3: AI Rules

`.cursorrules` and `docs/ai/AI_DEVELOPMENT_RULES.md` give Cursor and Claude explicit stop conditions:

- Never use hex, px, or raw time values
- Never add `var()` fallbacks
- If a token doesn't exist for your use case, **stop** and use `TOKEN_REQUEST_TEMPLATE.md`
- If a component doesn't exist, **stop** and use `COMPONENT_REQUEST_TEMPLATE.md`

The goal: AI generates token-compliant code by default, not by accident.

---

## The Dev Pipeline

Token changes should flow to the running app without friction. I built that loop:

```bash
./scripts/dev-all.sh
```

What it does:

```bash
ensure_deps "$BACKEND_DIR" "backend" "nodemon"
ensure_deps "$FRONTEND_DIR" "frontend" "concurrently"
free_port 3001
free_port 5173
(cd "$BACKEND_DIR" && pnpm dev) &
(cd "$FRONTEND_DIR" && pnpm dev) &
```

Frontend `package.json`:

```json
"dev": "concurrently -k -n tokens,vite \"npm:tokens:watch\" \"npm:dev:vite\"",
"tokens:watch": "nodemon --watch ../Design\\ Tokens -e json --exec npm run tokens:generate"
```

**Edit token JSON → save → CSS regenerates → live reload.** No extra steps.

The full lint pipeline:

```bash
npm run lint          # design guard + stylelint + eslint (warn)
npm run lint:strict   # same, fails on any finding
```

---

## Tap vs Click: Two Modalities, One System

The client had two worlds: **Tap** (automotive touch-first HMI) and **Click** (desktop pointer). Different density, different states, different hit targets — but the same brand and motion vocabulary.

What's shared:

| Shared | Platform-specific |
|---|---|
| Color primitives | Spacing scale |
| Brand accents | Typography ramp |
| Motion vocabulary | Hit target size |
| Radius (mostly) | Hover vs. press states |

Runtime model:

```
:root[data-brand="Standard"][data-platform="tap"]   { ... }
:root[data-brand="Standard"][data-platform="click"] { ... }
```

To align the secondary desktop token system with the HMI taxonomy, I built `auditSecondarySystem.js` — a semantic comparison script that classifies tokens by description (navigation, sidebar, body text, disabled) and maps them to HMI equivalents:

```bash
npm run tokens:audit:secondary -- \
  --df "/path/to/secondary-tokens.json" \
  --out "/path/report.md"
```

Output: a Markdown report showing "Already covered" vs "Missing — candidate to add." This gave us a defensible consolidation plan instead of a gut-feel merge.

---

## Token Audits as System Maintenance

Beyond the Tap/Click comparison, I built a generic token diff tool for any two Token Studio–format files:

```js
// auditTokens.js
function flattenTokens(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}-${k}` : k;
    if (isTokenObject(v)) out[key] = { value: v.value, type: v.type };
    else if (v && typeof v === 'object' && !Array.isArray(v))
      Object.assign(out, flattenTokens(v, key));
  }
  return out;
}
// Reports: onlyA, onlyB, same, conflicts — with metadata and timestamp
```

Usage:

```bash
node scripts/auditTokens.js \
  --a "/path/to/A.json" \
  --b "/path/to/B.json" \
  --out "/path/report.json"
```

Use it before a brand merge, after a token rename, or to verify a Figma-to-repo sync landed cleanly.

---

## Figma Sync

Tokens push to Figma as Extended Variable Collections — one command:

```bash
FIGMA_TOKEN=… FIGMA_FILE_KEY=… npm run figma:import
# Add --dry-run to preview without touching Figma
```

`importExtendedCollections.js` reads `Design Tokens/` and `$collections.json`, then uses the Figma REST API to create or update collections. A type map converts token types to Figma variable types:

```js
function tokenTypeToFigmaType(tokenType) {
  const typeMap = {
    'color':        'COLOR',
    'dimension':    'FLOAT',
    'number':       'FLOAT',
    'spacing':      'FLOAT',
    'borderRadius': 'FLOAT',
    'fontSizes':    'FLOAT',
    'fontFamilies': 'STRING',
    'boolean':      'BOOLEAN',
  };
  return typeMap[tokenType] || 'STRING';
}
```

The API helper supports a `--dry-run` flag so you can preview what would change before touching the Figma file:

```js
async function figmaRequest(endpoint, method = 'GET', body = null) {
  if (dryRun) {
    console.log(`[DRY RUN] ${method} ${FIGMA_API_BASE}${endpoint}`);
    if (body) console.log(JSON.stringify(body, null, 2));
    return { success: true, dryRun: true };
  }
  // ... live fetch
}
```

The script creates a base collection first, then extended brand collections containing only overrides — mirroring the same inheritance model in the token repo. The terminal output on completion:

```
✨ Import Complete!

Created 4 collections:
  - Base (parent)
  - BrandA (extended)
  - BrandB (extended)
  - BrandC (extended)
```

The result: Figma variables mirror the repo. Designers use the same names and values as code. When tokens change, one command keeps Figma in sync.

---

## State Persistence

Before, the HMI reset on every refresh. After:

**On load:**
```js
GET /api/state  // fetch saved state from backend
```

**On update:**
- WebSocket event fires
- Backend saves current state to `app-state.json`

**On restart:**
- Backend loads saved state; frontend receives it via REST

This made the system behave like a platform. State survived restarts. Demos stopped resetting mid-presentation.

---

## What Actually Changed

**For designers:** Figma variables match the token repo. Semantic naming is clear — `--color-surface-secondary-enabled` tells you what the token is for, not just what color it is. Token changes in Figma have a documented path back to code.

**For developers:** Zero duplication across brand files. A linter that catches design drift before review. A dev server that keeps CSS and token JSON in sync automatically. A PR template that makes compliance explicit.

**For AI-assisted development:** Cursor and Claude generate token-compliant code by default — not because the model is smart about it, but because the rules, linting, and enforcement make non-compliant code visible and blockable.

---

> "Your influence on the team has been huge. We want to add someone who loves designing enterprise interfaces in Cursor or Claude — a designer who works the way you do. Is there someone you know?"

The client wasn't looking for another designer. They were looking to replicate a way of working — one where design and development share vocabulary, AI tools stay in their lane, and the pipeline runs itself.

That's the goal of systems work: you build it once, and the team carries it forward.

---

*Client and product names withheld for portfolio use.*
