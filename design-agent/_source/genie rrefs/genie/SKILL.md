---
name: genie
description: "Genie — delivery-specific specialist skills: audit (lite|deep), simulate, slides, sprint-summary"
argument-hint: "[audit|simulate|slides|sprint-summary] [...mode-args]"
user-invocable: true
context: inline
---

# Genie Skill

Genie provides four delivery-specific specialist modes:

| Mode | Command | Purpose |
|------|---------|---------|
| **Audit** | `/genie audit lite\|deep [url]` | Component inventory against accelerator, with generic (no-accelerator) fallback |
| **Simulate (beta)** | `/genie simulate [url]` | Persona-based UX simulation — predicts conversion, identifies friction, recommends improvements |
| **Slides** | `/genie slides [title]` | Build an Orium-branded deck from context (transcripts, notes, outlines) with speaker notes |
| **Sprint Summary** | `/genie sprint-summary [project-key] [board-id]` | Build a Sprint Review deck from Jira active + next sprint data using the bespoke Sprint Summary template |

> `/genie site-audit` was the prior command name and has been removed. Use `/genie audit` instead.

## Mode: Audit

Local recreation of the n8n `UX Component Audit` flows. Screenshots a site with Hyperbrowser, uses Claude's vision to identify reusable components, optionally matches against the composable-pro accelerator inventory, and writes results to a copied Google Sheet template.

### When to Invoke
- The ticket or requirements reference a client site URL
- The task involves UI modernization, design system adoption, or component migration
- A baseline component inventory would help scope the implementation plan
- A sales/pre-sales needs a shareable component gap analysis

### Two sub-modes
- **Lite** (`/genie audit lite <url>`) — audits a single URL. Fast — useful for sanity-checking a specific page or starting small.
- **Deep** (`/genie audit deep <url>`) — crawls the entire site (up to 100 URLs via Hyperbrowser), prunes to a representative subset, audits each, then consolidates into a Page Templates tab.

### What It Does
1. **Collects inputs** — URL, target Drive folder (defaults to Drive root), email to share with, accelerator comparison on/off (via `AskUserQuestion`)
2. **Copies the template sheet** — `1DgKO7uq7n...` into the target folder, creates a screenshots subfolder, shares with the email
3. **Captures screenshots** — Hyperbrowser MCP (enforced — no silent fallback) at desktop + mobile viewports
4. **Identifies components** — Claude vision using the ported auditor prompt (replaces the n8n OpenAI + OpenAI2 chain)
5. **Matches against inventory** — reads the accelerator inventory from `1Nii5Ul5DEbFjD_Ep0Cdw...` (if comparison is on); emits `n/a` in the inventory columns otherwise
6. **Writes to the sheet** — one row per component per URL in the `Component Audit` tab
7. **(Deep only)** consolidates URLs into page templates in the `Page Consolidation` tab
8. **Reports** — links to the sheet + screenshots folder, summary counts

### Output
- Google Sheet: `Component Audit - <baseUrl>` with one or two tabs filled in
- Drive folder: `Genie Audit Screenshots - <baseUrl>` with desktop + mobile PNGs
- Chat summary with links and counts
- (If called from `/prepare`) also writes `tickets/{folder}/genie/component-audit.md`

### Step Files (`commands/genie/audit/`)
- `step1-collect-inputs.md` — `AskUserQuestion` prompts for missing args + accelerator toggle + folder with Drive-root fallback
- `step2-setup-drive.md` — copies template, creates screenshots folder, shares with email
- `step3-capture-screenshots.md` — Hyperbrowser screenshots (localhost escape hatch only)
- `step4-audit-url.md` — vision audit + inventory match + row append
- `step5-crawl-and-prune.md` — deep only: Hyperbrowser crawl + Claude prune to representative URLs
- `step6-consolidate-pages.md` — deep only: consolidates URLs into page templates
- `step7-report.md` — chat summary + planner-agent handoff file

### Guide Files (`claude/skills/genie/audit/guides/`)
- `config.md` — sheet IDs, tab gids, column schemas (source of truth; typos preserved to match template)
- `auditor-prompt.md` — vision auditor system prompt (ported from lite flow)
- `inventory-match-prompt.md` — inventory matcher system prompt (ported from lite flow)
- `prune-urls-prompt.md` — representative-URL selection (ported from HyperBrowser POC)
- `consolidate-prompt.md` — page-template consolidation (ported from deep flow's `AI Agent1`)

## Mode: Simulate (beta)

Runs persona-based predictive simulation against a client site using Hyperbrowser MCP for site ingestion and AI-powered persona behavior modeling.

### When to Invoke
- Pre-sales: generate evidence-backed design recommendations without analytics access
- Discovery: understand persona-site fit before scoping work
- Design validation: predict which design approach better serves target personas
- Backlog prioritization: rank improvements by predicted conversion impact

### What It Does
1. **Ingests site** via Hyperbrowser MCP (crawl, scrape, extract structure, simulate flows)
2. **Loads personas** from custom doc or built-in RMI Consumer Styles defaults
3. **Builds matrices** — Site Matrix (features per page) + Persona Matrix (behavioral profiles)
4. **Runs simulation** — predicts navigation paths, scores persona-site fit (0-10), estimates conversions
5. **Synthesizes report** — executive summary, cross-persona themes, prioritized recommendations, strategic backlog

### Output
- Persona Fit Scorecard (0-10 per persona across 5 dimensions)
- Simulated conversions per 100 visits per persona
- Friction points and feature gaps per persona
- Prioritized recommendations with impact/effort ranking
- Strategic backlog starter (epics + user stories)
- Writes to `tickets/{folder}/genie/simulation-report.md`

### Guide Files
- `guides/simulation-prompt.md` — master simulation system prompt
- `guides/synthesis-prompt.md` — report synthesis system prompt
- `guides/scoring-model.md` — persona fit 0-10 scoring rubric
- `guides/personas-rmi.md` — built-in RMI Consumer Styles persona defaults

## Mode: Slides (Deck Builder)

Builds an Orium-branded Google Slides presentation from context using the master template, with a layout-aware content pipeline and automated review pass.

### When to Invoke
- Building a presentation for a client meeting, workshop, or internal session
- Turning meeting notes, transcripts, or outlines into a polished deck
- Creating a deck from a content brief with speaker notes

### What It Does
1. **Gathers context** — asks for transcripts, docs, outlines, or bullet points
2. **Builds content brief** — structures slides with titles, bodies, and speaker notes
3. **Invokes slides-agent** — copies Orium template, injects content using layout-aware shape classification
4. **Runs review pass** — clears placeholder text, fixes overlapping shapes, adjusts font sizes in-place
5. **Returns the deck URL** — same Drive file, ready to present

### Output
- Google Slides deck with Orium branding
- Speaker notes on every slide
- Content placed in correct shapes (title in title box, body in body box, no overlap)

## Mode: Sprint Summary (Sprint Review Deck)

Ports the n8n "Sprint Summary Deck" workflow. Pulls active-sprint and next-sprint ticket data from Jira, then hands a placeholder map to `slides-agent` in placeholder-replacement mode to fill a bespoke Sprint Summary template.

### When to Invoke
- End-of-sprint review meetings where the team needs a Jira-synced recap deck
- Pre-sales or status check-ins where sprint scope + resolution counts are the headline
- Weekly/bi-weekly recurring reviews (manual run; scheduled trigger can be layered on later)

### What It Does
1. **Collects inputs** — Jira project key, board ID, Drive target folder, client name (via `AskUserQuestion`)
2. **Fetches sprint data** — `atlassian-mcp` JQL queries: `sprint in openSprints()` and `sprint in futureSprints()`
3. **Builds placeholder map** — summarizes each ticket description to 150–200 chars, assembles the ticket list, counts created vs. resolved
4. **Invokes slides-agent** — placeholder-replacement mode copies the Sprint Summary template, does bulk `replaceAllText`, and duplicates the per-ticket slide
5. **Returns the deck URL** — saved in the user's chosen Drive folder

### Output
- Google Slides deck named `OR - {client} - {date} - Sprint Summary`
- Title slide filled with sprint name, client, date, subtitle
- Summary slide listing active-sprint tickets
- Counts slide with `{{totalCreated}}` / `{{totalResolved}}`
- One duplicated per-ticket card per active-sprint ticket (with 150–200 char summary)
- Next-sprint slide listing future-sprint tickets (or "— No tickets —")

### Substitutions vs. the n8n workflow
- **Pinecone vector DB client lookup** → user supplies the client name via `AskUserQuestion`
- **Slack send-and-wait-for-approval** → inline `AskUserQuestion` before slides-agent is invoked
- **QuickChart.io bar chart** → skipped (matches n8n's current disabled state); counts are text-only

### Step Files (`commands/genie/sprint-summary/`)
- `step1-collect-inputs.md` — `AskUserQuestion` prompts for missing args
- `step2-fetch-sprint-data.md` — `atlassian-mcp` JQL queries for active + future sprints
- `step3-build-placeholder-map.md` — summarization + assembly of `PLACEHOLDERS` and `REPEATING_SLIDES`
- `step4-invoke-slides-agent.md` — hand-off to `slides-agent` in placeholder mode
- `step5-report.md` — deck URL + sanity-check counts

## Invocation from Agents

```javascript
// Audit mode (from planner-agent during /prepare):
Skill({
  skill: "genie",
  args: `audit lite ${clientUrl}`,
  prompt: `Run a component audit on this client site against the composable-pro
  inventory. Write the planner-agent summary to
  tickets/${folderName}/genie/component-audit.md`
})

// Audit deep mode (whole-site):
Skill({
  skill: "genie",
  args: `audit deep ${clientUrl}`,
  prompt: `Crawl, audit, and consolidate page templates for this client site.
  Write findings to tickets/${folderName}/genie/component-audit.md`
})

// Simulate mode (from planner-agent when persona analysis needed):
Skill({
  skill: "genie",
  args: `simulate ${clientUrl}`,
  prompt: `Run a predictive persona simulation on this client site.
  Write findings to tickets/${folderName}/genie/simulation-report.md`
})

// Slides mode:
Skill({
  skill: "genie",
  args: `slides ${deckTitle}`,
  prompt: `Build a deck from this context: ${contextOrBrief}`
})

// Sprint Summary mode:
Skill({
  skill: "genie",
  args: `sprint-summary ${projectKey} ${boardId}`,
  prompt: `Build a Sprint Review deck for ${clientName}.
  Save to Drive folder: ${folderUrl}`
})
```

## Prerequisites

- **Audit mode:**
  - **Both modes:** Chrome open with chrome-devtools MCP connected (screenshots use the local browser — real scroll + dismiss-overlays for clean captures)
  - **Deep mode only:** `HYPERBROWSER_API_KEY` in `~/.env.mcp` (Step 5 URL crawl — bot evasion + parallel discovery). Not needed for lite.
  - `python3` on PATH (pre-installed on macOS 12+)
  - **Inventory:** read live from Google Drive MCP at runtime — no CSV export, no env var, always current. Auto-downgrades to generic mode if Drive MCP is unavailable.
  - **Lite mode needs zero env vars.** Just Chrome + the MCP.
  - Apps Script backend deferred — see `scripts/genie-audit/apps-script/`.
- **Simulate mode (beta):** Requires Hyperbrowser MCP (`HYPERBROWSER_API_KEY` in `~/.env.mcp`). Falls back to Claude in Chrome MCP if unavailable.
- **Slides mode:** Requires Claude in Chrome MCP (primary) or chrome-devtools MCP (fallback) for browser automation. Google account must be signed in.
- **Sprint Summary mode:** Requires `atlassian-mcp` (authenticated) + Claude in Chrome or chrome-devtools MCP + Google account signed in + edit access to the target Drive folder.
