# {{CLIENT_NAME}} Design System

Storybook component library for the **{{CLIENT_NAME}}** project — built on Tailwind CSS and shadcn/ui. Used by designers and developers to verify components before they ship.

> **Setup note:** Replace `{{CLIENT_NAME}}` throughout this file with the actual client or project name when scaffolding this workspace.

---

## Key Links

| | |
|---|---|
| Live Storybook | `TODO: add Vercel URL` |
| Figma file | `TODO: add Figma URL` |
| Jira / Linear board | `TODO: add board URL` |
| Parent repo (composable-pro) | `TODO: add repo URL` |
| Template source | [oriuminc/orium_design_docs](https://github.com/oriuminc/orium_design_docs) |

---

## Stack

| Layer | Technology |
|---|---|
| Component primitives | [shadcn/ui](https://ui.shadcn.com) (full set) |
| Styling | Tailwind CSS v3 |
| Storybook | v8 + Vite (`@storybook/experimental-nextjs-vite`) |
| Language | TypeScript |
| Package manager | pnpm |

---

## Getting started

```bash
pnpm install
pnpm storybook
```

Opens at `http://localhost:6006`.

**Prerequisites:** Node 18+, pnpm 9+

---

## Adding stories

Use the Claude command to scaffold a new story into the correct category:

```bash
/design add ComponentName 1-base-components
```

Valid categories: `1-base-components` · `2-cms-driven` · `3-data-driven` · `4-templates`

---

## Deployment

This workspace deploys to Vercel. The `vercel.json` at the root of this folder contains the build configuration — no manual setup needed.

| | |
|---|---|
| Build command | `pnpm build:storybook` |
| Output directory | `storybook-static/` |
| Node version | 18 |

To deploy manually:

```bash
vercel --prod
```

---

## Contributing

**Client work stays here.** Do not push client-specific stories or assets back to [oriuminc/orium_design_docs](https://github.com/oriuminc/orium_design_docs).

To improve the shared template for future projects, open a PR on the upstream template repo — not here.
