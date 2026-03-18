![Token Architecture Overview](../images/placeholders/placeholder-25.svg)

# Token Pipeline for a Multi-Brand HMI Platform
A unified token architecture across four brands, two themes, and two modalities, with design-code sync and AI guardrails built in.

| | |
|---|---|
| **Role** | Sole Designer & Developer |
| **Client** | Automotive (NDA) |
| **Status** | Delivered · 2024 |
| **Tags** | design-systems · tokens · ai |

## Key Learning

A token system only works as a shared contract if it's enforced everywhere drift can happen: in Figma, in code, and especially in AI-assisted development. Most teams build the architecture and skip the enforcement. The enforcement is the part that matters.

## Overview

The visual design lived in Figma and the code lived in React, and the two were moving further apart every sprint. Colors existed simultaneously in Figma variables, CSS files, and hardcoded component values, with nothing keeping them in sync. When a designer updated a surface color, nothing downstream knew about it.

The underlying complexity was real: a multi-display vehicle HMI prototype needing to scale across four brands, two themes (day and night), and two interaction modalities. With the right architecture, all those combinations collapse into one system.

## My Role

I was the sole designer and developer on the system layer: token architecture, build pipeline, enforcement tooling, and AI guardrails. Every decision ran through me: inheritance models, semantic naming, linting rules, AI development guidelines, and the code to back all of it up.

## The Constraint

Four brands sharing most of the same values, AI tools actively widening the design-code gap, and no enforcement at any of the points where drift actually happens.

Brand duplication was the most mechanical problem: four JSON files each containing around 1,300 lines, most of it identical. Changing a shared spacing value meant editing five files and hoping nothing was missed. The harder problem was AI-generated code. Fast tools that are perfectly happy to write `color: #ffffff` or `padding: 16px` on every component without being asked.

## Approach

### Treating tokens as a shared contract

The inheritance model was the first structural decision. Instead of one full token file per brand, each brand file contains only what differs from a shared base, shrinking from roughly 1,300 lines per brand to around 200.

```
Design Tokens/
├── Base/           ← single source of truth
├── Brand/          ← per-brand color overrides only
├── Theme/          ← Day.json, Night.json (semantic surfaces)
├── Motion/         ← duration, easing, transition presets
├── Interactions/   ← hover, active, disabled, focus
├── Platform/       ← Tap.json (HMI density), Click.json (desktop)
└── Compositions.json
```

The semantic color layer formalizes three tiers. Raw primitives never touch components directly:

| Layer | Purpose | Used in components |
|---|---|---|
| `color-primitives` | Raw values | No |
| `color` | Brand accents | Yes |
| `surface` / `onsurface` | Semantic theme surfaces | Yes |

This is what makes day/night switching automatic. `--color-surface-secondary-enabled` changes meaning across themes; a raw hex value never does. All themes, brands, and platforms are runtime-switched via data attributes with no rebuild required.

### Enforcing the contract in code and in AI

A perfect token architecture still fails if Cursor writes `padding: 16px` on every component. The enforcement layer is what makes the system real rather than aspirational. It runs at every point where drift can happen.

**Design Guard** scans staged files for hardcoded values: hex colors, raw `px` lengths, `rgb()` functions, inline `var()` fallbacks. In warn mode it surfaces violations during development; in strict mode it blocks merges in CI. It's the same tool used across several projects and is available separately: [Design Guard →](/doc/design-guard)

A **custom ESLint rule** covers inline styles in JSX, the most common pattern AI tools produce. `style={{ padding: '16px' }}` blocks. `style={{ padding: 'var(--spacing-16)' }}` passes. That one rule catches an entire category of AI-generated drift before it reaches review.

**AI development guidelines** in `.cursorrules` give Cursor and Claude explicit stop conditions: never use hex or raw values; if a needed token doesn't exist, stop and request it through the token process rather than inventing a value. Explicit rules written for tools that have no design intuition work better than assuming the model will infer conventions.

Three layers covering CSS, JSX, and the AI tools themselves.

### Token changes reach the app without extra steps

Editing any token JSON file triggers a CSS regeneration and live reload. A single dev command starts the token watcher and the Vite dev server together. The full lint pipeline runs in two modes: warn during development, strict in CI. Same checks, different failure behavior.

This closed the loop that previously required a manual Figma export, a file copy, and a component update before a token change was visible anywhere in the running app.

```
Figma Variables (Token Studio)
         │
         ▼  sync
    tokens/
    ├── Base/            ← shared foundation
    ├── Brand/           ← per-brand overrides
    ├── Theme/           ← Day / Night surfaces
    ├── Motion/          ← durations, easing
    ├── Interactions/    ← hover, focus, disabled
    └── Platform/        ← HMI (tap) / Desktop
         │
         ▼  npm run build
    build/css/
    ├── variables.css    → :root (primary light)
    ├── dark.css         → [data-theme="dark"]
    └── brand-*.css      → [data-brand="..."]
         │
         ▼  Design Guard (on save + CI)
    ✓  Token-compliant components
```

## Outcome

Brand duplication is gone. A single base file serves all four brands, each brand file containing only its overrides. A broken token reference fails the build immediately. The design guard runs on every save and blocks non-compliant merges in CI. Figma variables mirror the token repo through a single sync command.

The client's feedback: *"We need someone who works the way you do, someone who loves designing enterprise interfaces in Cursor or Claude."*

## What I Learned

AI tools are fast and sloppy by default. The enforcement layer doesn't feel optional once you've seen what AI-assisted development looks like without it: every component a slightly different spacing value, hex codes scattered through inline styles. Guardrails don't slow development down. They make AI-generated code trustworthy enough to merge.

Building a token system that works with AI tooling means thinking about the system from the perspective of a tool that has no design intuition. Explicit rules, explicit stop conditions, a linter that makes violations immediately visible. That's what turns a naming convention into a contract.

---

*Client and product names withheld for portfolio use.*
