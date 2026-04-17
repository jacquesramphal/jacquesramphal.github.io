# Orium Design Docs — Claude Code Guidelines

This repo is an Orium Storybook design environment. It contains component stories, design token documentation, and QA guides for the Orium Accelerator. Contributors (including Claude) use Storybook as a scratchpad to verify components are production-viable before sharing.

## Repo Structure

```
storybook/
  apps/storybook/stories/
    foundations/    Token docs — do not hardcode values, always import from transformedTokens.json
    guides/         Process docs (QA & Testing, Contributing)
    ui/
      1-base-components/   Primitive UI components
      2-cms-driven/        CMS content-type components — STRICT rules apply here
      3-data-driven/       Commerce/API-connected components
      4-templates/         Full page compositions
  packages/
    ui/             @oriuminc/ui — component source and prop types
    chakra/         @oriuminc/chakra — theme and design tokens
```

---

## Adding New Features, Components, or Props

Experimentation is encouraged — but new work must be visible and reviewable before it becomes permanent.

**The default rule for anything new:**
> If a prop, component, or feature is not already confirmed in the CMS schema, it starts in `⚠ Proposed — Needs CMS Review`. Always. No exceptions.

This applies to Claude, designers, and developers alike. The goal is not to block exploration — it is to make it legible. A `⚠ Proposed` entry in a diff is a conversation starter, not a blocker.

**Before promoting anything out of `⚠ Proposed`:**
- Confirm the CMS field exists (or will be added) in composable-pro's cms-generic schema
- Align with a developer — new CMS props have downstream implications for content modelling, schema versioning, and editor configuration
- Update the prop's category to `CMS Editable` or `Dev Only` once confirmed

**Adding a new component entirely?** Discuss with the team first. Storybook must remain a consumer of `@oriuminc/ui`, not an independent implementation. A new component in Storybook that doesn't exist in `packages/ui` is a red flag.

---

## ENFORCED RULES — Claude must apply these on every story change

> **Why these rules exist:** The production team identified that Storybook was exposing more configuration options than the CMS actually supports. This caused client confusion, QA misalignment, and implementation drift (e.g., a Table component in Storybook showed cell-merge options that were never deliverable in the actual RichText-based implementation). These rules keep Storybook honest — it must reflect what the CMS can actually do, not what the component theoretically supports.

---

### 1. NEVER redefine props that exist in `@oriuminc/ui`

**Why:** Creating new prop types in story files causes the story and the real component to drift silently. The Trojan team found components where Storybook exposed function props (`onOptionsClick`, `onCompare`) that were never CMS-configurable — they existed only in the story layer. Once that drift exists, QA and clients test against a fiction.

**What to do instead:** Check `packages/ui/src/components/` first. If the prop exists, import it. If it doesn't exist but should, add it to the package — then import it in the story. Never work around a missing prop by defining it in the story file.

```tsx
// ✓ Always do this
import { BannerFull, BannerFullProps } from '@oriuminc/ui'
const baseProps: BannerFullProps = { ... }

// ❌ Never do this — creates drift
interface MyBannerProps { theme: 'dark' | 'light' }
```

**If Claude writes a story and creates a new prop type, that is a bug. Fix it.**

---

### 2. Every `2-cms-driven/` story MUST categorise argTypes

**Why:** Uncategorised controls in Storybook make it impossible to tell what a content editor can actually change versus what is a developer concern. This was a direct source of confusion in the Trojan POC — clients and QA could not distinguish CMS-configurable fields from internal props.

**What to do instead:** Every argType in `ui/2-cms-driven/` must have a `table.category`. There are **three valid categories**:

```tsx
argTypes: {
  // CMS Editable — confirmed fields exposed in Contentstack & Contentful editors
  theme: {
    control: 'select',
    options: ['dark', 'light'],
    table: { category: 'CMS Editable' },
  },
  // Dev Only — not exposed in CMS; for development and testing use only
  priority: {
    table: { category: 'Dev Only' },
  },
  // ⚠ Proposed — a new prop that needs dev + CMS schema confirmation before shipping
  // Use this as a staging area. It appears visibly different in Storybook Controls
  // and is easy to spot in diffs. Discuss with dev before promoting to 'CMS Editable'.
  newAnimationStyle: {
    control: 'select',
    options: ['fade', 'slide'],
    table: { category: '⚠ Proposed — Needs CMS Review' },
    description: 'PROPOSED: Would require new CMS field. Discuss with dev before enabling.',
  },
}
```

**When to use `⚠ Proposed — Needs CMS Review`:**
- A designer or AI wants to explore a new prop that doesn't exist in the CMS schema yet
- A prop requires a `useEffect`, async call, or logic that suggests it needs architectural discussion
- You're unsure whether a prop belongs in CMS or is Dev Only

This category acts as a **visible flag in both Storybook and git diffs** — reviewers can immediately see what needs a decision. Once confirmed with dev, promote to `CMS Editable` or `Dev Only`.

**CMS Editable** (sourced from cms-generic schemas in composable-pro):
`theme` · `textPosition` · `textAlign` · `containerSize` · `containerMarginTop` · `containerMarginBottom` · `image` · `text` · CTA fields · `href` · `inverted` · `centered`

**Dev Only** (Chakra/Next.js internals, not CMS-exposed):
`root` · `imageBox` · `priority` · `isMobile` · `overlayBackground` · `prefetch`

Reference: `stories/ui/2-cms-driven/Banners/BannerFull/BannerFull.stories.tsx`

---

### 3. Every image-using story MUST include an image spec

**Why:** QA requested clear baseline specifications (dimensions, crop ratios, objectFit) because Storybook did not provide them — unlike Figma. Without specs, QA cannot verify whether an image implementation is correct.

**What to do instead:** Add `parameters.docs.description.component` with dimensions and objectFit. If Claude adds or modifies a story with an image prop and this is missing, add it.

```tsx
parameters: {
  docs: {
    description: {
      component: '**Image spec:** 400×300px min, `objectFit: cover`, ratio 4:3. See [Foundations › Images](?path=/docs/foundations-images--docs).',
    },
  },
},
```

Per-component specs: `Foundations/Images` in Storybook.

---

### 4. No logic in stories

**Why:** Stories are fixture data, not components. If logic (side effects, data fetching, timers) lives in a story, that logic is invisible to QA, untestable in isolation, and masks what the real component actually does. The Trojan team found this created a gap between Storybook behavior and CMS behavior.

**What to do instead:** Use `play` + `@storybook/addon-interactions` to test interactions declaratively. If a prop requires an async call to be meaningful, that's a signal the prop needs architectural discussion — use `⚠ Proposed — Needs CMS Review` as the staging category and flag it for dev.

```tsx
// ✓ Correct — interactions via play, not useEffect
export const AutoPlaying: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
  },
}
```

---

### 5. Variant naming must be descriptive and production-ready

**Why:** QA could not validate components when variants were named `small`, `medium`, `large` without a definition of what those meant. Variant names appear in CMS field values, QA reports, and component APIs — vague names create ambiguity across all three.

**What to do instead:** Names must describe what a variant *does*, use established token scales (`sm/md/lg`), and be precise enough that a developer reading the API would understand them without context. Visual shorthand (`big`, `blue`, `fancy`) is not acceptable.

---

### 6. Foundations pages — import tokens, never hardcode

**Why:** Hardcoded values in MDX pages drift from the actual token system. When a token changes, hardcoded values don't update — QA and developers then reference stale specs.

**What to do instead:** All `foundations/` MDX pages must import values from `packages/chakra/src/figma-tokens/transformedTokens.json`. If a foundations page needs a new value, it must come from the token file — never hardcode pixel values, hex colours, or rem values directly.

---

## Package Imports

| Need | Import from |
|------|------------|
| Component + prop types | `@oriuminc/ui` |
| Theme tokens | `@oriuminc/chakra` |
| Chakra primitives | `@chakra-ui/react` |

## Agent-Readable Metadata (Storybook as Visual Source of Truth)

This repo is instrumented to serve as a machine-readable visual source of truth for code agents — as an alternative or complement to Figma MCP. The goal: an agent can understand component identity, CMS field mapping, and image constraints by reading story files, without regex-parsing prose or calling Figma.

### Entry point: `storybook/COMPONENT_MANIFEST.json`

A manually-maintained index of all production-ready components. **Agents should read this first.** It lists every CMS-driven component with:
- `storyFile` — relative path to the story file
- `cmsEditable[]` — props a content editor can configure
- `imageSlots[]` — structured image specs (minWidth, minHeight, objectFit, ratio)
- `variants[]` — named story exports
- `figmaLinks[]` — Figma node URLs for the component (if available)

**Keeping it in sync:** When a new `2-cms-driven/` story is added, add a corresponding entry to `COMPONENT_MANIFEST.json`. When a `storyMeta` block changes (new imageSlot, new cmsEditable field), update the manifest entry to match.

### `parameters.storyMeta` — per-story structured metadata

Every `2-cms-driven/` story default export includes a `storyMeta` block alongside `docs`:

```tsx
parameters: {
  storyMeta: {
    component: 'BannerFull',
    package: '@oriuminc/ui',
    cmsEditable: ['theme', 'textPosition', 'image', 'text'],
    imageSlots: [
      { name: 'imageDesktop', minWidth: 1440, minHeight: 640, objectFit: 'cover', ratio: '2.2:1' },
      { name: 'imageMobile', minWidth: 750, minHeight: 940, objectFit: 'cover', ratio: '0.8:1' },
    ],
    status: 'production-ready', // | 'in-review' | 'proposed'
  },
  docs: { ... }, // human-readable description preserved alongside
}
```

`storyMeta` is **additive** — it never replaces the human-readable `docs.description.component`. Both coexist.

### `docs.description.story` — variant-level traceability

Every named story export has a one-line description of its use case:

```tsx
DarkLeft.parameters = {
  design: [...],
  docs: { description: { story: 'Dark theme, left-aligned text. Use for hero banners with dark image backgrounds.' } },
}
```

This is the traceability hook: when requirements reference a variant by name, this description is the link between story intent and implementation context.

### Rule: maintain these blocks when editing stories

When Claude modifies a `2-cms-driven/` story:
1. If `storyMeta` is missing — add it following the pattern above
2. If a new imageSlot is added to the component — add it to `storyMeta.imageSlots` and `COMPONENT_MANIFEST.json`
3. If a new CMS field is confirmed — add it to `storyMeta.cmsEditable` and the manifest
4. If a new named export is added — add `docs.description.story` to it

---

## Design Workspace Setup

This repo contains four Storybook apps serving different purposes:

| App | Framework | Purpose | Component source |
|---|---|---|---|
| `storybook/apps/storybook` | Chakra UI | Orium Accelerator (composable-pro) | `@oriuminc/ui` |
| `storybook-tailwind` | Tailwind v4 + Shad CN | Accelerator Tailwind reference | Local + `@oriuminc/ui` stubs |
| `storybook-special` | Tailwind v4 + Shad CN | **SpecIAL system visual reference** | `special-storefront-mtp/src/components/` |
| `storybook-blank` | Tailwind v3 | Zero-dependency sandbox | Local only |

### SpecIAL design workflow (`storybook-special`)

`storybook-special` is the visual reference environment for the SpecIAL spec-first platform. Zero dependency on `@oriuminc/ui` or composable-pro. Components are imported directly from `special-storefront-mtp` via relative path. Shadcn primitives are available under `Foundations/` as a styling baseline.

To start the SpecIAL design environment:

```bash
/design spinup
```

This walks through: do you have design refs? (Figma URL / token file / notes / none), applies them, and opens Storybook pointing at SpecIAL components.

**Design role for SpecIAL:** Designers own token values, Storybook stories, image specs, and experience pattern compliance. They do NOT edit `COMP-*.yaml` specs, capability definitions, CMS schema, or backend bindings. See `special-compiler/DESIGN.md` for the full workflow.

**Story rules for `storybook-special` SpecIAL stories:**
1. Import components from `special-storefront-mtp/src/components/` — never redefine props locally
2. Cover all `states` and `variants` defined in the matching `COMP-*.yaml`
3. Include `storyMeta` with `specFile` pointer and image specs if applicable
4. Mark status as `in-review` until confirmed production-ready
5. Use `⚠ Proposed` category for any prop not in the spec — never silently add

### Accelerator workflow (`storybook/apps/storybook`)

The Chakra app follows the existing ENFORCED RULES above. It requires a generated token CSS file:

```bash
/design setup   # generates .storybook/generated-tokens.css from transformedTokens.json
```

**Running the apps manually:**
- Chakra storybook: `cd storybook/apps/storybook && pnpm storybook`
- Tailwind storybook: `cd storybook-tailwind && pnpm storybook`
- Special storybook: `cd storybook-special && pnpm storybook`
- Blank storybook: `cd storybook-blank && pnpm storybook`

The Design Tokens panel appears in the addons bar (same row as Controls/A11y). It is separate from the Designs panel (Figma links).

---

## Key Storybook Pages

- `Guides/Contributing` — contributor rules (human-readable version of this file)
- `Guides/QA & Testing` — QA workflow and toolbar usage
- `Foundations/Container` — UiContainer props, margin presets, CMS field mapping
- `Foundations/Images` — image dimensions, cover vs contain, per-component spec
- `Foundations/Spacing` — spacing token reference
