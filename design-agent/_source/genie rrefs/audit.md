---
description: "Component audit against accelerator inventory — lite (1 URL), deep (crawl + consolidate), or batch (multi-URL parallel)"
argument-hint: "lite|deep|batch [url ...] or [file]"
---

# `/genie audit`

Recreates the n8n Genie component audit flow locally. Screenshots a site with Hyperbrowser, uses Claude's native vision to identify reusable components, optionally matches each against the composable-pro accelerator inventory, and writes results to a copied Google Sheet template.

Three modes:

| Mode | Command | Scope |
|------|---------|-------|
| **Lite** | `/genie audit lite <url>` | One URL. Screenshots + audits + (optional) inventory match. |
| **Deep** | `/genie audit deep <url>` | Full-site crawl → prune to representative URLs → loop per URL → consolidate into Page Templates. |
| **Batch** | `/genie audit batch <url1> <url2> ...` or `/genie audit batch <file>` | Multiple base domain URLs. Crawls each domain with Hyperbrowser → Claude-prunes to representative URL set → saves pruned list to `urls-crawled.txt` per domain folder → screenshots all pruned URLs sequentially → analyzes in parallel via agents. |

## Arguments

- **Mode (required)** — `lite`, `deep`, or `batch`.
- **URLs** — one URL for lite/deep, multiple for batch. If omitted, Step 1 prompts.
- **File path** — batch mode also accepts a path to a `.txt` file (one URL per line).

If a URL appears without an explicit mode, dispatch as `lite` (most common case).

```
/genie audit lite https://client.com
/genie audit deep https://client.com
/genie audit https://client.com                                    # → defaults to lite
/genie audit batch https://a.com https://b.com https://c.com      # inline URLs
/genie audit batch ~/urls.txt                                      # file with one URL per line
```

## Dispatch

Parse `$ARGUMENTS`:

1. Split on whitespace.
2. If the first token is `lite`, `deep`, or `batch` → set `mode` to that, remaining tokens become the inputs.
3. Else if the first token parses as a URL → set `mode = "lite"`, the URL is the first input.
4. Else → set `mode` to `null` (Step 1 will ask).

For `batch` mode, collect all remaining tokens as URLs. If exactly one token remains and it looks like a file path (not a URL), read URLs from that file (one per line, blank lines and `#` comments ignored).

Hand off to the step sequence:

- **Lite:** `step1` → `step2` → `step3` → `step4` → `step7` → `cleanup`
- **Deep:** `step1` → `step2` → `step5` → Phase A (`step3` loop) → Phase B (`step4` loop or `step-batch-analyze` if >3 URLs) → `step6` → `step7` → `cleanup`
- **Batch:** `step1` → `step2` → `step5` (per domain, crawl + prune → save to `urls-crawled.txt`) → Phase A (`step3` loop across all pruned URLs) → Phase B (`step-batch-analyze`, parallel agents) → `step6` (per domain consolidation) → `step7` → `cleanup`

## Sub-skill files

Step definitions live under `claude/commands/genie/audit/step*-*.md`. Prompts, IDs, and column schemas live under `claude/skills/genie/audit/guides/`.

| File | Purpose |
|---|---|
| `claude/skills/genie/audit/guides/config.md` | Sheet IDs, tab gids, column schemas (source of truth) |
| `claude/skills/genie/audit/guides/auditor-prompt.md` | Vision auditor system prompt (ported from lite flow) |
| `claude/skills/genie/audit/guides/inventory-match-prompt.md` | Inventory matcher system prompt (ported from lite flow) |
| `claude/skills/genie/audit/guides/prune-urls-prompt.md` | Deep-mode URL pruner system prompt (ported from HyperBrowser POC) |
| `claude/skills/genie/audit/guides/consolidate-prompt.md` | Deep-mode page-template consolidator (ported from deep flow's `AI Agent1`) |
| `claude/skills/genie/audit/guides/checkpoint.md` | Context compaction resilience — checkpoint pattern, PROGRESS.md format, resume algorithm |

## Prerequisites

- **Both modes:** Chrome open with chrome-devtools MCP connected — all screenshots use the local browser (real scroll + dismiss-overlays pipeline for clean, complete captures).
- **Deep mode only:** `HYPERBROWSER_API_KEY` in `~/.env.mcp` — Step 5 uses hyperbrowser for URL crawling (bot evasion + parallel page discovery). Not needed for lite.
- `python3` available (pre-installed on macOS 12+; Step 7 writes CSVs via stdlib `csv` module).
- **Inventory:** read live from Google Drive MCP at runtime. If Drive MCP is disconnected, auto-downgrades to generic mode. No CSV export, no env var.
- **Lite mode needs zero env vars.** Just Chrome + the MCP.
- **Not required:** `GENIE_AUDIT_WEBHOOK_URL`, `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON`, `GENIE_AUDIT_INVENTORY_CSV`. Apps Script backend is deferred.

## Checkpoint pattern (compaction resilience)

For batch and deep runs (>5 min wall clock), write a `PROGRESS.md` to the run folder at every phase boundary. This ensures a compacted session can resume without re-doing work.

**When to write:**
1. **Step 2** (run folder created) → create `PROGRESS.md` with **original invocation + full run config** (URLs, `compareAccelerator`, inventory sheet ID, viewports) + domain list, status = Pending. **This is the most critical write** — without the original config, a resumed session cannot know what was requested.
2. **After Phase A** (all screenshots captured) → update PNG counts, status = Screenshotted
3. **When launching Phase B agents** → record output file paths, status = Analyzing
4. **After Phase B** (analysis files written) → record row counts, status = Analyzed
5. **If compareAccelerator=true: when launching Phase D match agents** → record match file paths, status = Matching
6. **After Phase D** (match files written + applied) → status = Matched
7. **After Step 7** → mark each domain Done
8. **After cleanup** → update status = Complete

**Analysis agents must write to disk:** always use `Write` to save JSON to `{runFolder}/analysis-agent{N}-{domains}.json`. Never rely solely on in-context agent responses — if context compacts, in-context results are lost but disk files survive.

**Scripts must be written to the run folder at Step 2** (`merge_and_write_csvs.py`, `consolidate_and_summarise.py`, `apply_inventory_match.py`) so a resumed session can run them directly.

See `claude/skills/genie/audit/guides/checkpoint.md` for the full PROGRESS.md format and resume algorithm.

## Runtime buffers (allocated in the dispatcher)

Before any capture/analysis runs, initialize:

```js
rowBuffer = {
  audit:         [],   // Component Audit — one row per detected component per URL
  consolidation: [],   // Page Consolidation — deep mode only
};
screenshotResults = []; // { url, desktopPath, mobilePath, desktopUrl, mobileUrl }
```

## Upfront inventory read

If `inputs.compareAccelerator === true`, read the inventory from Drive MCP **before** the capture loop (not lazily in Step 4). This avoids the 171K-char MCP call happening mid-loop on the first URL:

```js
if (inputs.compareAccelerator) {
  inputs.inventoryRows = await readInventoryFromDriveMCP();
  // If this fails, auto-downgrade to generic mode and continue
}
```

Step 4 then finds `inputs.inventoryRows` already populated — no conditional read, no first-URL slowdown.

## Phased execution (both modes)

Screenshots and analysis are **separated into two phases**. The browser stays warm during the screenshot phase; analysis reads saved PNGs from disk and doesn't need the browser.

### Lite mode

```
Step 1: collect inputs
Step 2: create run folder
Inventory: read from Drive MCP (if compareAccelerator)

Phase A — screenshot:
  Step 3 for inputs.baseUrl → save PNGs to screenshots/

Phase B — analyze:
  Step 4 for inputs.baseUrl → vision + inventory match → buffer rows

Step 7: write CSVs + report
```

### Deep mode

```
Step 1: collect inputs
Step 2: create run folder
Inventory: read from Drive MCP (if compareAccelerator)
Step 5: hyperbrowser crawl + prune → confirm URL list

Phase A — screenshot ALL URLs:
  for url of deepUrls.pruned:
    Step 3 (screenshot only) → save PNGs to screenshots/
    1.5s delay between URLs
    if failed: push to failedUrls, continue
  Report: "Screenshotted 12/15 URLs"

Phase B — analyze ALL URLs:
  for url of screenshotResults:
    Step 4 (read saved PNGs, vision + match → buffer rows)
    if failed: push to failedUrls, continue
  Report: "Analyzed 12/15 URLs"

Step 6: consolidate page templates
Step 7: write CSVs + report
```

### Batch mode (concurrent deep — chrome-devtools)

Batch runs a **full deep audit per domain** using chrome-devtools for all screenshots (sequential — one browser, pushed to max throughput) and parallel agents for analysis (each agent handles multiple domains). Hyperbrowser is used only for the crawl phase.

```
Step 1: collect inputs (parse URL list or file)
Step 2: create run folder + per-domain screenshot subfolders
Inventory: read from Drive MCP (if compareAccelerator)

Phase 0 — crawl ALL domains (sequential, hyperbrowser):
  for baseUrl of batchUrls:
    Step 5 (hyperbrowser crawl + Claude prune — NO per-domain confirmation)
    → domainPages[domain] = pruned URLs
  Report: "Crawled 11 domains → 94 total pages"

  *** SINGLE APPROVAL POINT ***
  Show the full pruned list grouped by domain:
    claro.com.gt (8 pages): home, products, product/xyz, cart, ...
    claro.com.hn (9 pages): home, plans, ...
    ...
  "Proceed with 94 pages across 11 domains?"
    → Yes: run Phases A-B-C-Step7 unattended
    → Remove some: edit the list, re-confirm once
    → Cancel

  After approval, NO further prompts. Everything runs to completion.

Phase A — screenshot ALL pages (sequential, chrome-devtools):
  flatPages = flatten domainPages across all domains
  for page of flatPages:
    Step 3 (navigate → dismiss → scroll → strip → screenshot, desktop + mobile)
    no inter-URL delay (different domains each time)
  Report: "Screenshotted 94/94 pages"

Phase B — analyze in parallel (3 agents, ~3-4 domains each):
  step-batch-analyze:
    split flatPages into 3 chunks (~30 pages each)
    launch 3 agents simultaneously
    each agent runs Step 4 for all pages in its chunk
    merge row buffers
  Report: "Analyzed 94 pages (3 agents, ~8 min)"

Phase C — consolidate per domain (sequential):
  for domain of batchUrls:
    filter rowBuffer.audit to rows where URL matches domain
    Step 6 (consolidate → page templates for this domain)
    prepend "Domain" column
  Report: "Consolidated 11 domains → 47 page templates"

Step 7: write CSVs + report

Cleanup — remove intermediate files:
  rm {runFolder}/analysis-agent*.json          # Phase B raw vision output (merged into CSVs)
  rm {runFolder}/inventory-match-*.json        # Phase D match output (applied to CSVs)
  rm {runFolder}/domain-summaries.json         # Phase C intermediate (if present)
  rm {runFolder}/*/consolidation-input.json    # per-domain Phase C intermediate
  rm {runFolder}/*.py                          # build scripts (data already applied)
  Update PROGRESS.md status = Complete
  Report: "Run complete. Deliverables in {runFolder}."
```

**Why 3 agents, not 11.** Each agent handles 3-4 domains' worth of analysis (~30 pages, ~30 vision calls). Fewer agents = less coordination overhead, less context pressure per agent, and the Agent tool's practical limit is ~5 concurrent anyway. 3 agents × 30 pages each ≈ 3 agents × 8 min each ≈ 8 min wall clock for analysis.

**Why chrome-devtools, not hyperbrowser for screenshots.** Chrome-devtools handles dismiss-overlays + real scroll reliably (the bugs you caught). Sequential is fine — Phase A for 94 pages ≈ 94 × 27s ≈ 42 min. That's the bottleneck, but it's clean and free.

**Output structure:**

Each domain gets its own complete folder inside the batch folder — same structure as a standalone deep audit. Plus a batch-level summary at the root.

```
~/Desktop/genie-audit-batch-{client}-{date}/
├── PROGRESS.md                         # run record + original config (always kept)
├── batch-summary.md                    # roll-up across all domains (always kept)
│
├── claro.com.gt/
│   ├── audit-summary.md                # pages, templates, inventory breakdown, net-new list, unique component list
│   ├── component-audit.csv             # one row per component per URL, inventory columns filled
│   ├── page-consolidation.csv          # page templates with component composition
│   ├── urls-crawled.txt                # all URLs discovered by crawler
│   ├── urls-pruned.txt                 # representative subset selected for audit
│   └── screenshots/
│       ├── www.claro.com.gt-desktop.png
│       ├── www.claro.com.gt-mobile.png
│       └── ...
│
├── claro.com.hn/
│   └── ... (same structure)
│
└── clarochile.cl/                      # blocked domains get a stub folder with crawl txts only
    ├── urls-crawled.txt
    └── urls-pruned.txt
```

**Intermediate files removed at cleanup** (data already applied to CSVs):
- `analysis-agent*.json` — Phase B raw vision output
- `inventory-match-*.json` — Phase D match output
- `domain-summaries.json` — Phase C intermediate
- `*/consolidation-input.json` — per-domain Phase C intermediate
- `*.py` — build scripts

Each domain folder is self-contained — drag one into Drive, share it with a stakeholder, open the CSV in Numbers. No "Domain" column needed; the folder IS the domain.

The batch-level `batch-summary.md` at the root rolls up counts across all domains: total components, per-domain OOTB/mods/net-new breakdown, and a comparison table so you can see which country sites have the most gaps at a glance.

### Why phased is faster

- **Browser stays warm** during Phase A — no 30-60s idle gaps between page loads.
- **Screenshots are preserved** — if Phase B crashes at URL 8/15, re-run only analysis.
- **Inventory is pre-loaded** — no first-URL penalty in Phase B.
- **Parallel analysis** (batch + deep >3 URLs) — 4 agents × 5 URLs each completes in ~4 min vs. ~15 min sequential.
- **Progress is clearer** — "Screenshotting 8/15..." then "Analyzing 3/15..." vs. blended "Audited 3/15...".

### Estimated timelines

| Mode | Domains | Pages | Crawl | Screenshots | Analysis | Consolidation | **Total** |
|---|---|---|---|---|---|---|---|
| **Lite** | 1 | 1 | — | ~25s | ~45s | — | **~1 min** |
| **Deep** | 1 | ~12 | ~30s | ~5 min | ~4 min (3 agents) | ~1 min | **~10 min** |
| **Batch** | 11 | ~100 | ~5 min | ~42 min | ~8 min (3 agents) | ~3 min | **~58 min** |

Batch is the heaviest workload. The screenshot phase (~42 min) is the bottleneck — chrome-devtools is sequential. The parallel analysis with 3 agents keeps that phase to ~8 min instead of ~45 min. Single approval point after the crawl phase; everything else runs unattended.

**User interaction:** `/genie audit batch` prompts ONCE (after crawl, before screenshots) to confirm the pruned URL list. After that, Phases A → B → C → Step 7 run to completion with zero prompts. Walk away, come back to the finished report.

### Future: Tier 3 — parallel screenshots via Hyperbrowser (not built)

For batch mode specifically, the screenshot phase could use Hyperbrowser's cloud browsers instead of chrome-devtools. Each `scrape_webpage` call targets a different domain — no rate-limiting concern, no bot-detection issue. 5 concurrent Hyperbrowser sessions could capture 20 URLs in ~2 min instead of ~8 min.

This would reduce batch-mode total from ~13 min to ~7 min. Requires:
- `HYPERBROWSER_API_KEY` (currently only needed for deep-mode crawl)
- Testing the `scrollPage` + `waitFor` options for screenshot quality vs. chrome-devtools
- Managing concurrent session limits (free tier: 5, paid: higher)

Deferred — chrome-devtools is free and working now. Revisit when batch-mode usage demonstrates the 8-min screenshot phase is the bottleneck.
