# Design Agent

Working folder for the /design agent project — the agentic design layer built to connect token architecture, Storybook, and AI-assisted handoff into a deployable system.

## What this is

An AI-powered design workflow agent that:
- Takes a design brief or component spec as input
- Applies an opinionated set of guardrails (token contracts, accessibility rules, component patterns)
- Produces a Storybook-ready component definition with structured handoff notes
- Flags where human judgment is required before proceeding

The value isn't the AI. It's the opinionated workflow built on top of it — a decade of design system judgment encoded into agent behavior.

## Folder structure

```
design-agent/
  context/          ← session notes, positioning docs, research
  prompts/          ← agent prompt templates, system prompts
  workflows/        ← n8n workflow definitions, agent flow diagrams
```

## Status

Active development. See `context/` for session notes and product strategy.

## Related

- Case study draft: `src/assets/content/doc_64.md` (The /design Agent)
- Strategy doc: `src/assets/content/doc_75.md` (Future Positioning)
- Product page (scaffold): `src/pages/ProductPage.vue` at `/product`
