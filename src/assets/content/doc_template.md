![The /design command suite running in terminal](../images/placeholders/placeholder-30.svg)

# The /design Agent
An isolated Storybook environment powered by AI — one command to start.

| | |
|---|---|
| **Role** | Design Lead · Design Engineer |
| **Client** | Internal / Orium |
| **Status** | In Progress · 2024 |
| **Tags** | design-engineering · storybook · ai |

## Overview

> In client work, the goal is reducing interpretation between design intent and production reality — but in a service company, you can't eliminate handoff. You have to operationalize a better version of it.

Storybook was tried as a shared environment between design and development — same repository, both teams contributing. The idea was right. The process around it wasn't: merge conflicts, blocked PRs, unclear ownership. This project builds a different structure: an isolated design environment connected to the same source of truth, but independent from the dev workflow.

## My Role

> I designed and built the full command suite, the AI-powered design agent, and the isolated environment architecture — from `/design setup` through `/design diff` and token sync.

Design Lead and Design Engineer. I made the architectural decisions (isolated repo vs. shared), built the tooling, and wrote the AI agent instructions. The system runs today with real components, real token sync, and structured handoff.

## The Constraint

> Design and development can't share a codebase in client delivery work — but they need to share a source of truth. The constraint is organizational as much as technical.

Designers joining the dev codebase creates friction: merge conflicts, review bottlenecks, unclear ownership. A fully separate environment risks drift. The challenge was building isolation without disconnection — same components, same tokens, different working repos.

## Approach

> Isolation is the point. A separate repo per client, connected to the same production components and tokens, with structured diff-based handoff instead of annotated specs.

Each workspace is scaffolded by one command: `/design setup acme-retail`. Real production UI components, live token pages, full-width templates. When ready to hand off, `/design diff` outputs a structured change list that developers action as a PR. Nothing auto-applies.

![/design help output in Claude Code terminal](../images/article/design-help.png)
*The `/design` command suite — setup, sync, diff, push, and screenshot capture in one place.*

## Outcome

> A working design environment any designer can spin up in minutes, connected to production components and tokens, with no risk of blocking dev.

The full command suite runs today: `setup`, `add`, `sync`, `diff`, `push`, `screenshots`, `watch`. Token Studio compatibility is built in — `.env.tokens` matches Figma's Token Studio GitHub sync exactly. Handoffs are concrete change lists, not PDFs of annotations.

![The /design Agent workspace overview](../images/placeholders/placeholder-30.svg)
*Isolated Storybook workspace with live token pages and component stories per client.*

## What I Learned

> Building infrastructure before the team adopts it is intentional. Someone has to build the bridge before the team decides to cross it.

In a product company, merging design and dev workflows is achievable. In a service company delivering for clients with existing teams and tools, the goal isn't workflow merger — it's making handoff more precise. Getting a team with established habits to change how they work is what remains unresolved.
