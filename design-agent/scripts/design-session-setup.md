---
description: Bootstrap design workspace — verify Storybook readiness and token setup
---

# /design — Session Setup

Run at the start of any session involving Storybook, component work, or token changes.

## Steps

### Step 1 — Confirm token source exists

```bash
ls [path/to/tokens.json]
```

If using Figma Variables, confirm the last export date and whether it matches the current Storybook token CSS.

### Step 2 — Confirm Storybook token CSS

For Tailwind/shadcn Storybooks (`storybook-blank`), tokens are annotated in `src/app/globals.css` — no generation needed:

```bash
ls storybook-blank/src/app/globals.css
```

For token-pipeline Storybooks (Chakra, Style Dictionary), regenerate the CSS:

```bash
node scripts/emit-token-css.js
```

### Step 3 — Confirm COMPONENT_MANIFEST.json is current

```bash
ls [storybook-root]/COMPONENT_MANIFEST.json
```

If the manifest is more than 2 weeks old, prompt the user to update it before running any validation.

### Step 4 — Report

| Item | Status |
|---|---|
| Token source | ✓ / ✗ |
| Token CSS | ✓ / ✗ |
| COMPONENT_MANIFEST.json | ✓ current / ⚠ stale |
| Storybook URL | [url] |

Run Storybook:
```bash
cd storybook-blank && pnpm storybook
# → http://localhost:6006
```

## Notes

- The `COMPONENT_MANIFEST.json` is the validation agent's source of truth — keep it in sync with the client's Storybook.
- The Design Tokens panel appears in the Storybook addons bar (same row as Controls/A11y).
- Run `capture-screenshots.js` after any significant component change to update the visual regression baseline.
