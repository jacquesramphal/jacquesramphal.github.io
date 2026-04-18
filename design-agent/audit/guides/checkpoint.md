# Checkpoint Pattern — Context Compaction Resilience

Context compaction can happen mid-run on long batch audits (~60+ min wall clock). This guide defines the **checkpoint pattern** — write progress to disk at every phase boundary so a compacted session can resume without re-doing work.

## When to write a checkpoint

Write or update `PROGRESS.md` at the run folder root **after each phase**:

| Event | Checkpoint action |
|-------|-------------------|
| Run folder created (Step 2) | Create `PROGRESS.md` with **full run config** + domain list + status = Pending |
| Phase 0 crawl complete | Update domain rows: pages discovered, status = Crawled |
| Phase A screenshot complete | Update domain rows: PNG count, status = Screenshotted |
| Phase B agent launched | Update agent rows: output file paths, status = Analyzing |
| Phase B agent complete | Update agent rows: row count, status = Analyzed |
| Phase C consolidation complete | Update domain rows: status = Consolidated |
| Phase D inventory match launched | Add match agent table, status = Matching |
| Phase D inventory match complete | Update match file paths + row counts, status = Matched |
| Step 7 CSV written | Update domain rows: status = Done |

## PROGRESS.md format

The PROGRESS.md **MUST** begin with the original invocation and full run configuration.
This is the single most important section — without it, a resumed session cannot know
what was requested, what `compareInventory` was set to, or which URLs were in scope.

```markdown
# Batch Audit Progress — {client} ({date})

## Original Request

```
/audit batch
https://www.domain1.com
https://www.domain2.com
...
```

## Run Configuration

| Parameter | Value |
|-----------|-------|
| Mode | `batch` |
| compareInventory | `true` or `false` |
| Inventory Sheet ID | `{sheet_id}` (if compareInventory=true) |
| Desktop viewport | 1440×900 |
| Mobile viewport | 375×812 (2x DPR, touch, mobile UA) |
| Screenshot tool | chrome-devtools |
| Crawl tool | Hyperbrowser |

**Run started:** {date}
**Run folder:** `/path/to/run-folder/`
**Status:** {current phase}

---

## Domains

| Domain | Pages | Screenshots | Analysis File | Rows | Status |
|--------|-------|-------------|---------------|------|--------|
| example.com | 12 | ✓ 24 PNGs | analysis-agent1.json | 87 | Analyzed |
| other.com | — | BLOCKED | — | — | Skipped |

---

## Phase B Agents

| Agent | Domains | URLs | Output File | Status |
|-------|---------|------|-------------|--------|
| Agent 1 | example.com | 12 | analysis-agent1.json | ✓ Complete (87 rows) |

---

## Phase D — Inventory Matching (if compareInventory=true)

| Agent | Components | Output File | Status |
|-------|-----------|-------------|--------|
| Matcher 1 | 1–126 | inventory-match-1.json | ✓ Complete |
| Matcher 2 | 127–249 | inventory-match-2.json | ✓ Complete |

---

## Resume Instructions

If context is compacted before this run completes:

1. Read the "Run Configuration" section above — this tells you exactly what was requested
2. Check which files exist on disk (see commands below)
3. Re-launch only the missing steps; do NOT redo completed ones
4. Run the apply script for any step whose output files exist but weren't yet applied

### File check commands
```bash
ls {runFolder}/analysis-*.json        # Phase B output
ls {runFolder}/inventory-match-*.json # Phase D output
ls {runFolder}/*/component-audit.csv  # Step 7 output
```

### Scripts available in run folder
| Script | Purpose |
|--------|---------|
| `merge_and_write_csvs.py` | Merge analysis JSONs → per-domain component-audit.csv |
| `consolidate_and_summarise.py` | Phase C consolidation + summaries |
| `apply_inventory_match.py` | Back-fill inventory match columns into CSVs |
```

## Resume algorithm

When resuming a compacted session:

```js
// 1. Read PROGRESS.md — get original config (URLs, compareInventory, run folder)
const progress = Read(`${runFolder}/PROGRESS.md`);
const compareInventory = /* read from Run Configuration table */;

// 2. Check which output files exist on disk
const analysisFiles = Glob(`${runFolder}/analysis-*.json`);
const matchFiles    = Glob(`${runFolder}/inventory-match-*.json`);
const csvFiles      = Glob(`${runFolder}/*/component-audit.csv`);

// 3. Re-launch missing Phase B agents
const missingAnalysis = expectedAgentFiles.filter(f => !analysisFiles.includes(f));
// re-launch only missing agents with their screenshot paths

// 4. Once all analysis files exist, merge → CSVs
if (analysisFiles.length === expectedAgentFiles.length) {
  Bash('python3 merge_and_write_csvs.py');
}

// 5. If compareInventory=true and match files are missing: re-run inventory match
if (compareInventory && matchFiles.length < 2) {
  // read inventory from Drive MCP, extract unique names, launch match agents
}

// 6. Apply match results if match files exist but CSVs still have "n/a"
if (matchFiles.length === 2) {
  Bash('python3 apply_inventory_match.py');
}
```

## Key principles

**1. Always persist the original request.**
The first thing written to PROGRESS.md must be the original `/audit` invocation
and all run parameters. Without this, a resumed session cannot determine what was asked for.

**2. Never rely solely on in-context agent responses.**
Always have agents write output to disk, then read from disk during merge.
This decouples analysis from the orchestrator's context window.

**3. Scripts are checkpoints too.**
Write `merge_and_write_csvs.py`, `consolidate_and_summarise.py`, and `apply_inventory_match.py`
to the run folder during Step 2. A resumed session can run them directly without
needing to reconstruct the logic from scratch.

**4. compareInventory is stateful.**
If the user requests inventory comparison (`compareInventory=true`), record it in PROGRESS.md
at run start. If compaction happens before Phase D completes, the resumed session must know
to run the inventory match — it cannot infer this from the CSV alone (n/a values look
identical whether the feature was off or simply not yet run).

## Output file naming conventions

```
{runFolder}/analysis-agent{N}-{domains}.json   # Phase B: one per agent group
{runFolder}/inventory-match-{N}.json           # Phase D: one per matcher agent
{runFolder}/{domain}/component-audit.csv        # Step 7: one per domain
{runFolder}/{domain}/page-consolidation.csv     # Phase C: one per domain
{runFolder}/{domain}/audit-summary.md           # Step 7: one per domain
{runFolder}/batch-summary.md                    # Step 7: roll-up
{runFolder}/PROGRESS.md                         # Checkpoint: always present
```
