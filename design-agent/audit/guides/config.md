# Audit — Config & Constants

> Source of truth for output paths, inventory source, and column schemas.
> Current execution mode: local-only, zero-install — writes CSVs + a Markdown summary
> + screenshots to a local run folder using `python3` (pre-installed on macOS).

## Environment variables

```bash
# Required for deep/batch modes
HYPERBROWSER_API_KEY="..."

# Optional — inventory comparison
AUDIT_INVENTORY_SHEET_ID=""      # Google Sheet ID for client component inventory
                                  # If not set, audit runs in generic mode (no inventory match)

# Optional — output location
AUDIT_OUTPUT_BASE="$HOME/Desktop"   # default: ~/Desktop
AUDIT_CLIENT_NAME="client"          # used in run folder naming
```

Lite mode needs zero env vars — just Chrome + chrome-devtools MCP.

## Output paths

| Constant | Value | Notes |
|---|---|---|
| `RUN_FOLDER_FMT` | `{AUDIT_OUTPUT_BASE}/audit-{safeClientName}-{date}` | Built in Step 2 |
| `AUDIT_CSV` | `component-audit.csv` | Always present |
| `CONSOLIDATION_CSV` | `page-consolidation.csv` | Deep/batch only |
| `SUMMARY_FILE` | `audit-summary.md` | Human-readable summary |
| `SCREENSHOTS_FOLDER` | `screenshots/` | Relative to run folder |
| `SAFE_HOST` | `new URL(url).host.replace(/[^a-z0-9.-]/gi, "_")` | Filesystem-safe hostname |
| `SAFE_URL` | `url.replace(/^https?:\/\//, "").replace(/[^a-z0-9.-]/gi, "_").slice(0, 80)` | Screenshot filename |

## Inventory — live read via Sheet MCP

If `AUDIT_INVENTORY_SHEET_ID` is set, the audit reads inventory rows at run start and caches on `inputs.inventoryRows`. If the read fails, auto-downgrades to generic mode (writes `n/a` in inventory columns) and continues.

**Future enhancement:** Inventory rows may contain Figma node IDs. A future version could call `mcp__figma__get_screenshot` per inventory component and do visual-to-visual matching — comparing rendered Figma designs against client screenshots. Not built yet.

## Hyperbrowser settings (deep/batch modes)

| Setting | Value |
|---|---|
| `maxPages` | 100 |
| `stealth` | true |
| `proxy` | true |
| `captchaSolver` | true |

## Column schemas

These column headers are canonical across all output files. Do not rename.

### `component-audit.csv`

1. `URL`
2. `Component Name`
3. `Exists in Inventory?`
4. `Closest Match`
5. `Suggested Modifications`
6. `Fields`
7. `Desktop Screenshot`
8. `Mobile Screenshot`

### `page-consolidation.csv` (deep/batch only)

1. `Page Template`
2. `Page Type`
3. `Components`
4. `Customization Status`
5. `Required Changes`

The consolidation file is omitted entirely when there are no rows (lite mode, or deep with empty consolidation).

## Value conventions

### `Exists in Inventory?`

| Condition | Value |
|---|---|
| Inventory compare ON, exact match | `True` |
| Inventory compare ON, with modifications needed | `True with Modifications` |
| Inventory compare ON, no match | `False` |
| Inventory compare OFF or auto-downgraded | `n/a` |

### `Customization Status` (consolidation)

| State | Value |
|---|---|
| All standard components | `OOTB` |
| Needs minor changes | `Requires Update` |
| Needs new component | `New Component Required` |

## Screenshot pipeline (chrome-devtools, always)

```
navigate → scroll (lazy-load trigger) → dismiss overlays → wait 500ms → screenshot
```

| Phase | Detail |
|---|---|
| **Scroll** | 400px increments with 150ms gaps, then scroll to top, wait 1.5s |
| **Dismiss overlays** | 3-pass: click dismiss buttons → remove fixed/sticky elements (z > 100) → remove backdrop divs |
| **Screenshot** | `take_screenshot({ fullPage: true })` |

Hyperbrowser is used only in Step 5 (URL crawl) — not for screenshots.

## Prerequisites checklist

Before running `/audit`:

1. Chrome open with chrome-devtools MCP connected (both modes)
2. `python3` on PATH
3. *(Deep mode only)* `HYPERBROWSER_API_KEY` in env
4. *(Inventory match)* `AUDIT_INVENTORY_SHEET_ID` in env (optional — auto-downgrades)
