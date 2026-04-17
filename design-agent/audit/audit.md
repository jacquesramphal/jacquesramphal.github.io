---
description: "Component audit against client component inventory — lite (1 URL), deep (crawl + consolidate), or batch (multi-URL parallel)"
argument-hint: "lite|deep|batch [url ...] or [file]"
---

# `/audit`

Screenshots a site, uses Claude's native vision to identify reusable components, optionally matches each against the client's component inventory, and writes structured results to CSV and markdown.

Three modes:

| Mode | Command | Scope |
|------|---------|-------|
| **Lite** | `/audit lite <url>` | One URL. Screenshots + audits + (optional) inventory match. |
| **Deep** | `/audit deep <url>` | Full-site crawl → prune to representative URLs → loop per URL → consolidate into Page Templates. |
| **Batch** | `/audit batch <url1> <url2> ...` or `/audit batch <file>` | Multiple base domain URLs. Crawls each domain → Claude-prunes to representative URL set → screenshots all pruned URLs → analyzes in parallel via agents. |

## Arguments

- **Mode (required)** — `lite`, `deep`, or `batch`.
- **URLs** — one URL for lite/deep, multiple for batch. If omitted, Step 1 prompts.
- **File path** — batch mode also accepts a path to a `.txt` file (one URL per line).

If a URL appears without an explicit mode, dispatch as `lite`.

```
/audit lite https://client.com
/audit deep https://client.com
/audit https://client.com                                    # → defaults to lite
/audit batch https://a.com https://b.com https://c.com      # inline URLs
/audit batch ~/urls.txt                                      # file with one URL per line
```

## Configuration

Required before running. Set in `.env` or pass as environment variables:

```
AUDIT_INVENTORY_SHEET_ID=    # Google Sheet ID for client component inventory (optional)
AUDIT_SHEET_TEMPLATE_ID=     # Google Sheet template to copy for results (optional)
AUDIT_DRIVE_FOLDER_ID=       # Google Drive folder for output (optional — defaults to Desktop)
AUDIT_CLIENT_NAME=           # Client name for output file naming
```

If `AUDIT_INVENTORY_SHEET_ID` is not set, the audit runs in generic mode — components are identified and described but not matched against an existing inventory.

## Dispatch

Parse `$ARGUMENTS`:

1. Split on whitespace.
2. If the first token is `lite`, `deep`, or `batch` → set `mode` to that, remaining tokens become the inputs.
3. Else if the first token parses as a URL → set `mode = "lite"`, the URL is the first input.
4. Else → set `mode` to `null` (Step 1 will ask).

For `batch` mode, collect all remaining tokens as URLs. If exactly one token remains and it looks like a file path (not a URL), read URLs from that file (one per line, blank lines and `#` comments ignored).

Step sequence:

- **Lite:** `step1` → `step2` → `step3` → `step4` → `step7` → `cleanup`
- **Deep:** `step1` → `step2` → `step5` → Phase A (`step3` loop) → Phase B (`step4` loop or `step-batch-analyze` if >3 URLs) → `step6` → `step7` → `cleanup`
- **Batch:** `step1` → `step2` → `step5` (per domain) → Phase A (`step3` loop) → Phase B (`step-batch-analyze`, parallel agents) → `step6` (per domain) → `step7` → `cleanup`

## Step files

| File | Purpose |
|---|---|
| `step1-collect-inputs.md` | Collect URL, drive folder, email, inventory toggle |
| `step2-setup-output.md` | Create output folder, copy sheet template if configured |
| `step3-capture-screenshots.md` | Chrome screenshot pipeline — desktop + mobile |
| `step4-audit-url.md` | Vision audit + inventory match + buffer rows |
| `step5-crawl-and-prune.md` | Deep/batch: Hyperbrowser crawl + Claude prune |
| `step6-consolidate-pages.md` | Deep/batch: consolidate URLs into page templates |
| `step7-report.md` | Write CSVs + audit summary |

## Guide files

| File | Purpose |
|---|---|
| `guides/auditor-prompt.md` | Vision auditor system prompt |
| `guides/inventory-match-prompt.md` | Inventory matcher system prompt |
| `guides/prune-urls-prompt.md` | Representative-URL selection prompt |
| `guides/consolidate-prompt.md` | Page-template consolidation prompt |
| `guides/checkpoint.md` | Checkpoint/resume pattern for long runs |
| `guides/config.md` | Output schema and column definitions |

## Prerequisites

- **Both modes:** Chrome open with chrome-devtools MCP connected.
- **Deep mode only:** `HYPERBROWSER_API_KEY` in env — used for URL crawling. Not needed for lite.
- `python3` available (pre-installed on macOS 12+).
- **Inventory match:** `AUDIT_INVENTORY_SHEET_ID` set in env. Auto-downgrades to generic mode if missing.
- **Lite mode needs zero env vars.** Just Chrome + the MCP.

## Checkpoint pattern

For batch and deep runs (>5 min), write a `PROGRESS.md` to the run folder at every phase boundary so a compacted session can resume without re-doing work.

**Write at:**
1. **Step 2** (run folder created) → original invocation + full run config + domain list, status = Pending
2. **After Phase A** (screenshots captured) → PNG counts, status = Screenshotted
3. **When launching Phase B agents** → output file paths, status = Analyzing
4. **After Phase B** (analysis files written) → row counts, status = Analyzed
5. **After Step 7** → mark each domain Done
6. **After cleanup** → status = Complete

**Analysis agents must write to disk:** always use `Write` to save JSON to `{runFolder}/analysis-agent{N}.json`. Never rely solely on in-context agent responses.

## Runtime buffers

Before any capture/analysis runs, initialize:

```js
rowBuffer = {
  audit:         [],   // Component Audit — one row per detected component per URL
  consolidation: [],   // Page Consolidation — deep mode only
};
screenshotResults = []; // { url, desktopPath, mobilePath }
```

## Upfront inventory read

If inventory is configured, read it **before** the capture loop (not lazily on the first URL):

```js
if (inputs.compareInventory) {
  inputs.inventoryRows = await readInventoryFromSheet();
  // If this fails, auto-downgrade to generic mode and continue
}
```

## Phased execution

Screenshots and analysis are separated into two phases. The browser stays warm during Phase A; analysis reads saved PNGs from disk.

### Lite mode

```
Step 1: collect inputs
Step 2: create output folder
Inventory: read from sheet (if configured)

Phase A — screenshot:
  Step 3 → save PNGs to screenshots/

Phase B — analyze:
  Step 4 → vision + inventory match → buffer rows

Step 7: write CSVs + report
```

### Deep mode

```
Step 1: collect inputs
Step 2: create output folder
Inventory: read from sheet (if configured)
Step 5: Hyperbrowser crawl + Claude prune → confirm URL list

Phase A — screenshot ALL URLs:
  for url of pruned:
    Step 3 → save PNGs to screenshots/
    1.5s delay between URLs

Phase B — analyze ALL URLs:
  for url of screenshotResults:
    Step 4 → vision + match → buffer rows

Step 6: consolidate page templates
Step 7: write CSVs + report
```

### Batch mode

```
Step 1: collect inputs
Step 2: create output folder + per-domain subfolders
Inventory: read from sheet (if configured)

Phase 0 — crawl ALL domains (sequential, Hyperbrowser):
  for each domain:
    Step 5 (crawl + prune)
  *** SINGLE APPROVAL POINT — confirm pruned URL list ***
  → Yes: run Phases A-B-C-Step7 unattended

Phase A — screenshot ALL pages (sequential, chrome-devtools)
Phase B — analyze in parallel (3 agents, ~30 pages each)
Phase C — consolidate per domain (sequential, Step 6)

Step 7: write CSVs + report
Cleanup: remove intermediate files
```

## Output structure

```
~/Desktop/audit-{client}-{date}/
├── PROGRESS.md
├── audit-summary.md
├── component-audit.csv
├── page-consolidation.csv         # deep/batch only
├── urls-crawled.txt               # deep/batch only
├── urls-pruned.txt                # deep/batch only
└── screenshots/
    ├── {domain}-desktop.png
    └── {domain}-mobile.png
```

Batch mode adds a `batch-summary.md` at the root and a per-domain folder for each domain (same structure as above).

## Estimated timelines

| Mode | Domains | Pages | Total |
|---|---|---|---|
| Lite | 1 | 1 | ~1 min |
| Deep | 1 | ~12 | ~10 min |
| Batch | 11 | ~100 | ~58 min |
