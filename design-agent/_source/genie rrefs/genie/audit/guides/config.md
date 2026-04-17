# Genie Audit — Config & Constants

> **Source of truth for output paths, inventory source, and column schemas.**
> Current execution mode is **local-only, zero-install** — writes two CSVs
> + a Markdown summary + screenshots to a local run folder using `python3`
> (pre-installed on macOS) and shell heredocs. No npm, no pip, no network I/O.
>
> Future migration target: `scripts/genie-audit/apps-script/` (deferred Drive
> backend that writes XLSX directly via Sheets API). Column names stay stable
> across both modes.

## Output — local files (current mode)

| Constant | Value | Notes |
|---|---|---|
| `RUN_FOLDER_DEFAULT_FMT` | `{GENIE_AUDIT_OUTPUT_BASE or ~/Desktop}/genie-audit-{safeHost}-{ts}` | Built in Step 2 when user skips the folder prompt |
| `AUDIT_CSV_FILENAME` | `component-audit.csv` | Always present |
| `CONSOLIDATION_CSV_FILENAME` | `page-consolidation.csv` | Deep mode only; file is skipped entirely if no rows |
| `SUMMARY_FILENAME` | `audit-summary.md` | Human-readable recap |
| `SCREENSHOTS_SUBFOLDER` | `screenshots` | Relative to the run folder |
| `SAFE_HOST` | `new URL(baseUrl).host.replace(/[^a-z0-9.-]/gi, "_")` | Filesystem-safe hostname |
| `SAFE_URL_FMT` | `url.replace(/^https?:\/\//, "").replace(/[^a-z0-9.-]/gi, "_").slice(0, 80)` | Used for per-URL screenshot filenames |

## Inventory — live read via Drive MCP

Accelerator comparison reads rows directly from the Google Sheet at runtime using the Drive MCP. No CSV export, no env var, no file on disk. Always current.

| Constant | Value | Notes |
|---|---|---|
| `INVENTORY_SHEET_ID` | `1Nii5Ul5DEbFjD_Ep0CdwUfI00czFGskLfd6hkyHqawk` | "ORCA Data and Prompt" sheet |
| `INVENTORY_DRIVE_MCP_TOOL` | `mcp__7496cfda-8e12-455f-aa22-fc425f6f7db9__read_file_content` | Called with `fileId: INVENTORY_SHEET_ID` |
| `INVENTORY_TAB_NAME` | `Components V2` | The tab the MCP reads (returns as markdown table) |

Step 4 calls the Drive MCP once per run and caches on `inputs.inventoryRows`. If the Drive MCP is disconnected or the call errors, Step 4 auto-downgrades to generic mode (writes `n/a` in the inventory columns) and continues.

**V2 opportunity:** The inventory rows contain Figma node IDs in every `Image/Figma Link` cell. A future enhancement could call `mcp__figma__get_screenshot` per inventory component and do **visual-to-visual matching** — comparing rendered Figma designs against the client site screenshots. This catches components that look similar but have different names. Documented here, not built yet.

## Hyperbrowser

| Constant | Value | Notes |
|---|---|---|
| `HYPERBROWSER_CRAWL_MAX` | `100` | `crawlOptions.maxPages` |
| `HYPERBROWSER_STEALTH_DEFAULT` | `true` | Always on |
| `HYPERBROWSER_PROXY_DEFAULT` | `true` | Always on |
| `HYPERBROWSER_CAPTCHA_DEFAULT` | `true` | Always on |

## Column schemas — do NOT rename

These are the canonical column headers for all audit output files.

### `Component Audit` (XLSX sheet 1)

1. `URL`
2. `Component Name`
3. `Exists in Inventory?`
4. `Closest Match`
5. `Suggested Modifications`
6. `Fields`
7. `Desktop Screenshot`
8. `Mobile Screenshot`

### `Page Consolidation` (XLSX sheet 2, deep mode only)

1. `Page Template`
2. `Page Type`
3. `Components`
4. `Customization Status`
5. `Required Changes`

The `Page Consolidation` sheet is **omitted entirely** from the XLSX when there are no rows (i.e., lite mode, or deep with empty consolidation).

## Value conventions

### `Exists in Inventory?`

| Mode | Value |
|---|---|
| Accelerator compare ON, exact match | `True` |
| Accelerator compare ON, with mods | `True with Modifications` |
| Accelerator compare ON, no match | `False` |
| Accelerator compare OFF or auto-downgraded | `n/a` |

### `Closest Match` / `Suggested Modifications`

Empty strings when `compareAccelerator` is off or downgraded.

### Screenshot columns

Hold **relative paths** into the run folder, e.g. `screenshots/orium.com-desktop.png`. When opened in Numbers/Excel the cell shows the path as text. When the user uploads the whole run folder to Drive and opens the `.xlsx` as a Google Sheet, the paths stay valid references to the adjacent folder.

### `Customization Status`

| State | Value |
|---|---|
| All OOTB | `OOTB` |
| Needs tweaks | `Requires Update` |
| Needs new component | `New Component Required` |

## Environment variables (in `~/.env.mcp`)

```bash
# Required
HYPERBROWSER_API_KEY="..."

# Optional
GENIE_AUDIT_OUTPUT_BASE="$HOME/Desktop"                       # default: ~/Desktop
GENIE_AUDIT_INVENTORY_CSV="$HOME/.orium/genie-audit/inventory.csv"   # default path looked at by Step 4
```

> **Not required in local-XLSX mode:** `GENIE_AUDIT_WEBHOOK_URL`, `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON`. Those come back when the Apps Script or API-based backend is re-enabled.

## Screenshot tool — always chrome-devtools

All screenshots use the chrome-devtools MCP (user's local Chrome). The capture pipeline is:

```
navigate → scroll (triggers lazy-loaded images) → dismiss overlays → wait 500ms → screenshot
```

| Phase | What it does | Why |
|---|---|---|
| **Scroll** | 400px increments with 150ms gaps, then scroll to top, wait 1.5s | Fires IntersectionObservers, loads `loading="lazy"` images |
| **Dismiss overlays** | 3-pass: click dismiss buttons → remove fixed/sticky elements (z > 100) → remove backdrop divs | Clears cookie banners, modals, chat widgets, promo popups |
| **Screenshot** | `take_screenshot({ fullPage: true })` | Captures the clean page |

Hyperbrowser is used **only** in Step 5 (deep-mode URL crawl) — not for screenshots. This keeps all captures free, consistent, and modal-free.

## Prerequisites checklist

Before running `/genie audit`:
1. Chrome open with chrome-devtools MCP connected (screenshots — both modes)
2. `python3` on PATH (pre-installed on macOS 12+; Step 7 CSV writer)
3. Google Drive MCP connected (inventory read — auto-downgrades to generic mode if unavailable)
4. **(Deep mode only)** `HYPERBROWSER_API_KEY` in `~/.env.mcp` (Step 5 crawl)

That's it. No `npm install`. No `pip install`. No CSV exports. No webhook deploys.
Lite mode needs zero env vars — just Chrome and the MCP.
