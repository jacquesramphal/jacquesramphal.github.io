![Token Architecture Overview](../images/placeholders/placeholder-25.svg)

# Token Pipeline for a Multi-Brand HMI Platform
A unified design token architecture across four brands, two themes, and two modalities — with AI guardrails built in.

| | |
|---|---|
| **Role** | Sole Designer & Developer |
| **Client** | Automotive (NDA) |
| **Status** | Delivered · 2024 |
| **Tags** | design-systems · tokens · ai |

## Overview

The visual design existed in Figma and the code existed in React, and the two were drifting further apart every sprint — accelerated by AI tools generating whatever values they felt like.

The client had a multi-display vehicle HMI prototype that needed to scale across four brands, two themes, two modalities, and three screens. Colors lived simultaneously in Figma, in CSS files, and in hardcoded component values, with no enforced shared vocabulary. When a designer updated a surface color in Figma, nothing downstream knew about it.

## My Role

I was the sole designer and developer on the system layer — token architecture, pipeline, enforcement tooling, and AI guardrails, all of it.

Every decision ran through me: inheritance models, semantic naming, build tooling, ESLint rules, AI development guidelines, and the actual code to back all of it up.

## The Constraint

Four brands sharing 85% of the same values, AI tools actively widening the design–code gap, and no enforcement at any of the points where drift happens.

Brand duplication was the most mechanical problem: four JSON files each containing ~1,300 lines, most of it identical. Changing a shared spacing value meant editing five files and hoping nothing was missed. The harder problem was AI-generated code — Cursor and Claude are fast, and they're happy to write `color: #ffffff` or `padding: 16px` the moment you give them a component task.

## Approach

Treat tokens as a contract — the single source of truth between Figma, code, and AI tooling — and enforce that contract at every point where drift can happen.

The architecture uses an inheritance model where brand files contain only overrides against a shared base, shrinking from ~1,300 lines to ~200. Three layers of enforcement: a design guard script that scans for hardcoded values on every save, a custom ESLint rule that flags inline styles in JSX, and AI rules in `.cursorrules` giving Cursor explicit stop conditions — if a token doesn't exist, stop and request one rather than invent a value. Runtime switching uses data attributes so all brands, themes, and modalities are available without a rebuild.

![Token Architecture Overview](../images/placeholders/placeholder-25.svg)
*Token inheritance model — base file plus brand overrides, merged at build time.*

## Outcome

One import. All themes and brands runtime-switchable. AI tools generating token-compliant code by default.

Brand duplication is gone. A broken token reference fails the build immediately. The design guard runs on every save and blocks merges in CI. Figma variables mirror the token repo via a single sync command. A quote from the client team: *"We need someone who works the way you do — someone who loves designing enterprise interfaces in Cursor or Claude."*

## What I Learned

AI tools are fast and sloppy by default — the enforcement layer isn't a workaround, it's what makes AI-assisted development compatible with a real design system.

Don't trust that AI tools will learn your conventions. Give them explicit rules, explicit stop conditions, and a linter that makes non-compliant code visible and blockable. When the guardrails are in place, Cursor and Claude generate token-compliant code not because the model understands design systems, but because the system makes anything else immediately obvious.

---

*Client and product names withheld for portfolio use.*
