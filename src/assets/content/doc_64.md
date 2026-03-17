![The /design command suite running in terminal](../images/placeholders/placeholder-30.svg)

# The /design Agent
An isolated Storybook environment powered by AI — one command to start.

| | |
|---|---|
| **Role** | Design Lead · Design Engineer |
| **Client** | Internal / Orium |
| **Status** | In Progress · 2024 |
| **Tags** | design-engineering · storybook · ai |

## Key Learning

In a service company, the goal isn't to eliminate handoff — it's to make it more precise. Clients have existing teams, existing tools, and reasonable skepticism about adding complexity to a delivery workflow. Someone has to build the infrastructure before the team decides to adopt it.

## Overview

In client work, the gap between design intent and production reality lives in interpretation — and the only way to close it is to give designers access to the real environment, not a simulation of it.

Storybook got tried as a shared environment early on. The idea was right; the structure wasn't. Merge conflicts, blocked PRs, unclear ownership — neither side had a clean working context. This project is the rethink: an isolated environment per client, one command to spin up, connected to the same components and tokens as production but completely independent from the dev repo.

## My Role

I designed and built the full command suite, the AI agent behind it, and made the core architectural decision: isolated repo, not shared branch.

Design Lead and Design Engineer. I owned the decisions — diff-based handoff versus annotated specs, Token Studio sync versus manual export — built the tooling, and wrote the agent instructions. The system runs on real client projects today.

## The Constraint

The design environment and the dev environment need to share a source of truth, but in client delivery work, they can't share a codebase.

When designers join the dev repo, they create friction at the point where development velocity matters most. A fully separate environment risks drift — if the two codebases diverge, design intent no longer maps to production reality. The constraint was building isolation without disconnection.

## Approach

A separate repo per client, scaffolded in minutes, connected to the same tokens and components as production through a structured sync rather than a shared branch.

`/design setup acme-retail` scaffolds a complete workspace: real production UI components, live token pages that hot-reload from JSON, full-width page templates. When it's time to hand off, `/design diff` outputs a change list that developers action as a PR — nothing auto-applies, developers control what merges. Token Studio compatibility is built in, so there's no manual wiring between Figma and the Storybook environment.

![/design help output in Claude Code terminal](../images/article/design-help.png)
*The /design command suite — seven commands covering setup, sync, diff, push, and screenshot capture.*

## Outcome

The full command suite runs on real client projects today: setup, add, sync, diff, push, screenshots, watch.

Designers work in real components against real tokens, with no risk of blocking the dev team. Client feedback happens in Miro from full-page screenshots rather than Figma approximations. The handoff artifact is a structured diff — specific files, specific changes — not a document of annotations someone has to interpret.

![The /design Agent workspace overview](../images/placeholders/placeholder-30.svg)
*Isolated Storybook workspace with live token pages and component stories per client.*

## What I Learned

Building the infrastructure before the team adopts it is a deliberate choice — someone has to lay the track before anyone can board the train.

The technical side is solved. Getting a team with established delivery habits to change how they work is slower and not something you can engineer around. Adoption follows evidence, not argument. The designers who've worked inside the environment understand it immediately. The challenge is creating enough of those moments that it stops being something one person uses.
