# Orium Design Docs

Template repository for the Orium Storybook design environment. Designers spin up a per-client component library using Claude — no Figma, no dev monorepo access needed.

| Variant | Stack | Deploy |
|---|---|---|
| `storybook/` | Chakra UI + `@oriuminc/ui` + design tokens | [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foriuminc%2Forium_design_docs&root-directory=storybook%2Fapps%2Fstorybook&project-name=orium-storybook&team=oriuminc) |
| `storybook-blank/` | Tailwind + shadcn/ui (full component set) | [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foriuminc%2Forium_design_docs&root-directory=storybook-blank&project-name=orium-storybook-blank&team=oriuminc) |
| `storybook-tailwind/` | Tailwind + shadcn/ui (clean starter) | [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foriuminc%2Forium_design_docs&root-directory=storybook-tailwind&project-name=orium-storybook-tailwind&team=oriuminc) |

> **Don't clone this repo directly.** Use the Claude command below to scaffold a fresh environment.

---

## Quick start

```bash
/design setup acme-retail
```

Opens at `http://localhost:6006` — full Storybook with all `@oriuminc/ui` components, Chakra theme, and design tokens.

**Prerequisites:**
- [Orium Claude Setup](https://github.com/oriuminc/orium_claude_setup) installed
- A Claude team seat

---

## What you get

```
storybook/    ← Storybook 8 workspace (pnpm workspace, Chakra UI, @oriuminc/ui)
```

Components are organised into three categories:
- **1. Frontend UI** — atoms (Button, Input, Tag, etc.)
- **2. CMS-driven** — content components (Banners, Footer, Cards)
- **3. Data-driven** — commerce components (ProductCard, Gallery, Slider)

---

## Adding stories

```bash
/design add ProductSlider 1-frontend-ui
```

---

## Syncing fresh components

```bash
/design sync
```

Pulls latest `packages/ui`, `packages/chakra`, and `packages/base` from composable-pro.

---

## Pushing tokens to GitHub

Push your `tokens.json` (or token folder) to a target GitHub repo — the same destination configured in Token Studio.

```bash
/tokens push
```

**First run:** Claude will prompt for the values below. After that they're saved to `.env.tokens` in your workspace.

| `.env.tokens` var | Token Studio field | Example |
|---|---|---|
| `GITHUB_TOKEN` | Personal Access Token | `ghp_...` |
| `TOKENS_TARGET_REPO` | Repository | `oriuminc/composable-pro` |
| `TOKENS_TARGET_BRANCH` | Branch | `canary` |
| `TOKENS_TARGET_PATH` | Token storage location | `packages/chakra/src/figma-tokens/tokens.json` |

`.env.tokens` is gitignored — it never leaves your machine.

To push a multi-file token folder instead of a single file, set `TOKENS_SOURCE` to a folder path (e.g. `packages/chakra/src/figma-tokens`) and `TOKENS_TARGET_PATH` to the matching target folder.

---

## Deploying to Vercel

All three variants are pre-configured for Vercel. Each has its own `vercel.json` with the correct build command and output directory.

### Path A — GitHub integration (recommended for teams)

Ask an admin to enable the [Vercel GitHub app](https://vercel.com/integrations/github) on the `oriuminc` org. Once enabled, every push to `main` deploys automatically and every PR gets a preview URL — no CLI or local config needed.

Set up one Vercel project per variant, each pointing to its folder as the root directory.

### Path B — One-click deploy (click a button above)

Each variant has its own Deploy button in the table at the top. When prompted by Vercel, build settings are auto-read from the `vercel.json` in each folder — no manual configuration needed.

| Variant | Root Directory (set in Vercel UI) |
|---|---|
| `storybook/` | `storybook/apps/storybook` |
| `storybook-blank/` | `storybook-blank` |
| `storybook-tailwind/` | `storybook-tailwind` |

### Path C — CLI deploy

```bash
npm install -g vercel
vercel login

# Deploy a specific variant:
bash scripts/vercel-deploy.sh storybook
bash scripts/vercel-deploy.sh storybook-blank
bash scripts/vercel-deploy.sh storybook-tailwind
```

### Vercel configuration reference

| Variant | `vercel.json` location | Build command | Output |
|---|---|---|---|
| `storybook/` | `storybook/apps/storybook/vercel.json` | `pnpm build` (with token transform prebuild) | `storybook-static/` |
| `storybook-blank/` | `storybook-blank/vercel.json` | `pnpm build:storybook` | `storybook-static/` |
| `storybook-tailwind/` | `storybook-tailwind/vercel.json` | `npm run build:storybook` | `storybook-static/` |

---

## Contributing

Client work stays in `~/design-workspaces/` and never leaves.

To improve the template for all future projects, submit a PR to this repo targeting `main`.
- Changes to `storybook/` affect the Storybook environment
