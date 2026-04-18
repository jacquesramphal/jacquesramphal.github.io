---
name: step7-report
description: Internal step of /audit — not invoked directly
user-invocable: false
---

# Step 7: Write & Report

Two phases:

1. **Write deliverables** — dump `rowBuffer.audit` to `component-audit.csv`, `rowBuffer.consolidation` to `page-consolidation.csv` (deep mode only), and a human-readable `audit-summary.md` alongside.
2. **Report** — print a compact summary in chat with the run folder path + counts. If called from `/prepare`, also drop a handoff file for planner-agent.

**Zero install dependencies.** Uses only `python3` (pre-installed on macOS) + shell heredoc for the Markdown. No npm, no pip, no exceljs.

## Inputs to this step

- `inputs` — from Step 1 (`mode`, `baseUrl`, `compareInventory`, `runId`)
- `outputArtefacts` — from Step 2 (`runFolder`, `screenshotsFolder`)
- `rowBuffer.audit` — populated by Step 4 (always)
- `rowBuffer.consolidation` — populated by Step 6 (deep only)
- `consolidation` — summary stats from Step 6 (deep only)
- `auditedUrls[]`, `failedUrls[]` — tracked through the loop

## Phase 1a — Write `component-audit.csv`

Write the audit buffer to JSON on disk, then let Python's `csv.DictWriter` handle quoting. Keys must match the exact sheet column names (typos preserved).

```bash
cat > /tmp/audit-${inputs.runId}-audit.json <<EOF
${JSON.stringify(rowBuffer.audit)}
EOF

CSV_PATH="${outputArtefacts.runFolder}/component-audit.csv"

python3 <<PY
import csv, json, sys

COLUMNS = [
    "URL",
    "Component Name",
    "Exists in Inventory?",
    "Closest Match",
    "Suggested Modifications",
    "Fields",
    "Desktop Screenshot",
    "Mobile Screenshot",
]

with open("/tmp/audit-${inputs.runId}-audit.json") as f:
    rows = json.load(f)

with open("${CSV_PATH}", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=COLUMNS, extrasaction="ignore")
    w.writeheader()
    for r in rows:
        # Fields might be arrays from upstream; coerce to comma-joined string
        if isinstance(r.get("Fields"), list):
            r["Fields"] = ", ".join(r["Fields"])
        w.writerow({col: r.get(col, "") for col in COLUMNS})

print(f"wrote {len(rows)} audit rows to {'${CSV_PATH}'}")
PY
```

## Phase 1b — Write `page-consolidation.csv` (deep mode only)

Skip entirely if `rowBuffer.consolidation` is empty or `mode === "lite"`.

```bash
cat > /tmp/audit-${inputs.runId}-consolidation.json <<EOF
${JSON.stringify(rowBuffer.consolidation)}
EOF

CSV_PATH="${outputArtefacts.runFolder}/page-consolidation.csv"

python3 <<PY
import csv, json

COLUMNS = [
    "Page Template",
    "Page Type",
    "Components",
    "Customization Status",
    "Required Changes",
]

with open("/tmp/audit-${inputs.runId}-consolidation.json") as f:
    rows = json.load(f)

with open("${CSV_PATH}", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=COLUMNS, extrasaction="ignore")
    w.writeheader()
    for r in rows:
        # Components might be an array
        if isinstance(r.get("Components"), list):
            r["Components"] = ", ".join(r["Components"])
        w.writerow({col: r.get(col, "") for col in COLUMNS})

print(f"wrote {len(rows)} consolidation rows to {'${CSV_PATH}'}")
PY
```

## Phase 1c — Write `audit-summary.md`

Plain `cat > ... <<EOF` heredoc. No quoting concerns because Markdown doesn't care.

```bash
cat > "${outputArtefacts.runFolder}/audit-summary.md" <<EOF
# Audit — ${inputs.baseUrl}

**Mode:** ${inputs.mode}
**Date:** $(date -u +"%Y-%m-%dT%H:%M:%SZ")
**URLs audited:** ${auditedUrls.length}${mode === "deep" ? ` of ${deepUrls.sourceCrawlCount} crawled` : ""}
**Inventory compare:** ${inputs.compareInventory ? "Yes" : "No (generic audit)"}

## Components

Total detected: ${rowBuffer.audit.length}

${inputs.compareInventory ? `- OOTB matches: ${ootbCount}
- With modifications: ${withModsCount}
- Net-new (not in inventory): ${netNewCount}` : `- Inventory comparison skipped — all rows marked \`n/a\`.`}

${mode === "deep" ? `## Page templates (deep mode)

Consolidated: ${consolidation.pageTemplateCount}
- OOTB: ${consolidation.ootbCount}
- Requires update: ${consolidation.requiresUpdateCount}
- New component required: ${consolidation.newComponentCount}

${consolidation.summary}` : ""}

## Net-new components

${netNewComponentNames.map(n => `- ${n}`).join("\n") || "_(none)_"}

## Files in this run folder

- \`audit-summary.md\` — this file
- \`component-audit.csv\` — per-component rows (open in Numbers/Excel, or upload to Drive → becomes a Sheet)
${mode === "deep" && rowBuffer.consolidation.length ? `- \`page-consolidation.csv\` — reusable page templates (deep mode)\n` : ""}- \`screenshots/\` — desktop + mobile PNGs referenced from the CSV rows

${failedUrls.length ? `## Failed URLs\n\n${failedUrls.map(f => `- ${f.url} — ${f.reason}`).join("\n")}\n` : ""}
EOF
```

## Phase 1d — Clean up temp files

```bash
rm -f /tmp/audit-${inputs.runId}-audit.json \
      /tmp/audit-${inputs.runId}-consolidation.json
```

If either CSV write failed, **leave** the temp JSON in place and surface its path so the user can replay the Python block manually.

## Phase 2 — Chat report

```
✅ /audit ${mode} — complete

Site:               ${baseUrl}
URLs audited:       ${auditedUrls.length}${mode === "deep" ? ` / ${deepUrls.sourceCrawlCount} crawled` : ""}
Failed:             ${failedUrls.length}${failedUrls.length ? " (see summary for details)" : ""}

Run folder:   ${outputArtefacts.runFolder}
  📄 audit-summary.md          ${humanReadableRecap}
  📊 component-audit.csv       ${rowBuffer.audit.length} rows
${mode === "deep" && rowBuffer.consolidation.length ? `  📊 page-consolidation.csv   ${rowBuffer.consolidation.length} rows\n` : ""}  📸 screenshots/              ${screenshotCount} PNGs

Components detected: ${rowBuffer.audit.length}
${inputs.compareInventory ? `  • OOTB:              ${ootbCount}
  • With modifications: ${withModsCount}
  • Net-new:           ${netNewCount}` : "  (Inventory comparison skipped)"}

${mode === "deep" ? `Page templates consolidated: ${consolidation.pageTemplateCount}
  • OOTB templates:         ${consolidation.ootbCount}
  • Requires update:        ${consolidation.requiresUpdateCount}
  • New component required: ${consolidation.newComponentCount}

${consolidation.summary}` : ""}

To share:
  • Open any CSV in Numbers — double-click, done
  • Drag the run folder into Google Drive → each CSV becomes a Sheet on upload
  • Open ${outputArtefacts.runFolder} in Finder:
      open "${outputArtefacts.runFolder}"
```

Use absolute paths so the user can `open <path>` to jump to the folder.

## Phase 2b — downstream handoff (if invoked from /prepare)

If `ticketFolder` is in context, also copy `audit-summary.md` into:

```
tickets/<ticketFolder>/audit/component-audit.md
```

(Yes, `component-audit.md` is the file name planner-agent expects — don't change it. The content is the same summary markdown.)

## Failure handling

- **Python 3 missing:** vanishingly rare on modern macOS. If it happens, error:
  ```
  /audit needs python3 to write the report. It's pre-installed on macOS 12+.
  If you're on an older system, install Python 3 from python.org.
  ```
- **CSV write fails (permissions, full disk):** preserve the temp JSON at `/tmp/audit-<runId>-<type>.json` and surface the path.
- **`audit-summary.md` write fails:** warn but don't abort. The CSVs are the primary deliverable; the .md is a nice-to-have.
- **Run folder doesn't exist:** Step 2 creates it. If missing at Step 7, `mkdir -p` defensively and continue.

## References

- Column schemas: `audit/guides/config.md`
- Future migration (Apps Script path produces `.xlsx` directly via Sheets API): `scripts/audit/apps-script/` (deferred)
