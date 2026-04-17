# Design System Rules — [Client Name]

This file defines the rules the design agent enforces for this client. It is the agent's source of truth. Fill in the bracketed sections before running any validation.

Structured as CLAUDE.md-compatible markdown: it works as system context for the agent AND as documentation for human designers reading it. Same file, two uses.

---

## Core principle

The agent enforces what is documented here. If a rule isn't written, the agent won't catch the violation. Keep this file current — when the design system evolves, update this file first.

---

## Client context

```
Client: [Client Name]
Stack: [React / Vue / Angular / Next.js / etc.]
Component package: [package-name or path to components]
Token source: [path/to/tokens.json or Figma Variables URL]
Storybook URL: [https://storybook.client.com or localhost:6006]
CMS: [Contentstack / Contentful / Sanity / none]
```

---

## ENFORCED RULES

The agent applies these on every component review or generation pass.

---

### 1. Never redefine component props locally

**Why:** Creating local prop types causes the story or implementation to drift silently from the real component. Once that drift exists, QA and stakeholders test against a fiction.

**Rule:** Check the component package first. If the prop exists, import it. If it doesn't exist but should, add it to the package — then import it. Never work around a missing prop by defining it locally.

```tsx
// ✓ Always do this
import { HeroSection, HeroSectionProps } from '[client-package]/ui'
const baseProps: HeroSectionProps = { ... }

// ✗ Never do this — creates drift
interface MyHeroProps { theme: 'dark' | 'light' }
```

**If the agent writes a story and creates a new prop type, that is a bug. Flag it.**

---

### 2. Every content-driven story MUST categorise argTypes

**Why:** Uncategorised controls make it impossible to tell what a content editor can change versus what is a developer concern.

**Three valid categories:**

```tsx
argTypes: {
  // Content Editable — confirmed fields exposed in the CMS editor
  theme: {
    control: 'select',
    options: ['dark', 'light'],
    table: { category: 'Content Editable' },
  },
  // Dev Only — not exposed in CMS; for development and testing use only
  priority: {
    table: { category: 'Dev Only' },
  },
  // ⚠ Proposed — a new prop that needs dev + schema confirmation before shipping
  newAnimationStyle: {
    control: 'select',
    options: ['fade', 'slide'],
    table: { category: '⚠ Proposed — Needs Review' },
    description: 'PROPOSED: Would require new schema field. Discuss with dev before enabling.',
  },
}
```

**When to use `⚠ Proposed — Needs Review`:**
- A designer or AI wants to explore a new prop that doesn't exist in the schema yet
- A prop requires async logic or complex state that suggests architectural discussion
- You're unsure whether a prop belongs in Content Editable or Dev Only

This category acts as a visible flag in both Storybook and git diffs — reviewers can see what needs a decision. Once confirmed, promote to `Content Editable` or `Dev Only`.

**Content Editable fields (update this list for the client):**
`theme` · `textPosition` · `textAlign` · `containerSize` · `image` · `text` · `cta` · `href` · `inverted` · `centered`

**Dev Only fields (update this list for the client):**
`priority` · `isMobile` · `prefetch` · internal style overrides

---

### 3. Every image-using story MUST include an image spec

**Why:** Without specs, QA cannot verify whether an image implementation is correct. Dimensions, crop ratios, and objectFit must be documented per component.

**Required format:**

```tsx
parameters: {
  docs: {
    description: {
      component: '**Image spec:** [width]×[height]px min, `objectFit: [cover|contain]`, ratio [X:Y].',
    },
  },
},
```

**Per-component image specs (fill in for this client):**

| Component | Width | Height | objectFit | Ratio |
|---|---|---|---|---|
| [HeroSection] | [1440px] | [640px] | cover | [2.2:1] |
| [CardImage] | [400px] | [300px] | cover | [4:3] |

---

### 4. No logic in stories

**Why:** Stories are fixture data, not components. Logic in stories is invisible to QA, untestable in isolation, and masks what the real component does.

**Rule:** Use `play` + `@storybook/addon-interactions` for interactions. If a prop requires async logic, flag it with `⚠ Proposed — Needs Review` and escalate to dev.

---

### 5. Variant naming must be descriptive

**Why:** Variant names appear in CMS field values, QA reports, and component APIs. Vague names create ambiguity across all three.

**Rule:** Names must describe what a variant *does*, use established token scales (sm/md/lg), and be precise enough that a developer understands them without context.

```
✗  big, blue, fancy, option1
✓  hero-dark-left, card-compact, nav-collapsed
```

---

### 6. Token contract — never hardcode values

**Why:** Hardcoded values drift from the token system. When a token changes, hardcoded values don't update.

**Rule:** All color, spacing, typography, and radius values must reference a token from `[client-token-path]`. If a value has no token equivalent, flag for human review — don't hardcode.

**Token file location:** `[path/to/tokens.json]`

```tsx
// ✓ Use tokens
color: 'var(--color-primary)'
padding: 'var(--spacing-md)'

// ✗ Never hardcode
color: '#0052CC'
padding: '16px'
```

---

## Machine-readable component metadata

Every content-driven story includes a `storyMeta` block. This is the structured data the validation agent reads to understand component identity and constraints.

```tsx
parameters: {
  storyMeta: {
    component: '[ComponentName]',
    package: '[client-package]/ui',
    contentEditable: ['theme', 'textPosition', 'image', 'text'],
    imageSlots: [
      { name: 'imageDesktop', minWidth: [1440], minHeight: [640], objectFit: 'cover', ratio: '[2.2:1]' },
    ],
    status: 'production-ready', // | 'in-review' | 'proposed'
  },
  docs: { ... },
}
```

---

## Component manifest

`COMPONENT_MANIFEST.json` — a maintained index of all production-ready components. The validation agent reads this first to understand what exists.

Each entry:
```json
{
  "component": "[ComponentName]",
  "storyFile": "src/components/[ComponentName]/[ComponentName].stories.tsx",
  "contentEditable": ["theme", "image", "text"],
  "imageSlots": [{ "name": "image", "minWidth": 400, "minHeight": 300, "objectFit": "cover", "ratio": "4:3" }],
  "variants": ["Default", "Dark", "Compact"],
  "figmaLinks": ["https://figma.com/design/[fileKey]?node-id=[nodeId]"]
}
```

**Keep in sync:** When a new content-driven story is added, add a corresponding entry here.

---

## Human review triggers

The agent pauses and flags for human review when:

- A color value has no token equivalent
- A new prop doesn't exist in the component package
- A prop is categorised `⚠ Proposed — Needs Review`
- An image slot is missing a spec
- A variant name is ambiguous (single word, no context)
- Any content-driven story is missing `storyMeta`

Nothing that triggers a flag goes to the client or into the codebase without human approval.
