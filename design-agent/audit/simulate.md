---
description: "(beta) Simulate user personas against a site — predicts conversion and surfaces UX friction"
argument-hint: "[url] [--personas <path>] [--context <text>]"
---

You are running Orium's Predictive Persona Simulation — an AI-driven tool that simulates how different shopper personas would experience a client site, predicts conversion likelihood, and identifies friction and feature gaps. No analytics access needed.

## Inputs

Parse these from the user's command:
- **URL** (required) — the client site homepage or base URL to analyze
- **--personas <path>** (optional) — path to a custom persona document (PDF, MD, or text). If not provided, use built-in configurable persona archetypes personas from `guides/personas-rmi.md`
- **--context <text>** (optional) — client business context (goals, constraints, priorities). Can also be provided as a file path.
- **--pages <urls>** (optional) — specific page URLs to analyze (comma-separated). If not provided, auto-discover from homepage.

## Phase 1: Configuration

1. **Validate URL** — ensure it's a valid, accessible URL
2. **Load personas** — read from `--personas` path or load built-in defaults from `guides/personas-rmi.md`
3. **Load scoring model** — read `guides/scoring-model.md` for the 0-10 persona fit scoring rubric
4. **Determine pages to analyze** — if `--pages` not provided, plan to discover key pages:
   - Homepage
   - PLP (product listing / category page)
   - PDP (product detail page)
   - Cart page
   - Checkout page

## Phase 2: Site Ingestion

Use Hyperbrowser MCP tools to ingest the site. If Hyperbrowser is unavailable, fall back to Claude in Chrome MCP.

### With Hyperbrowser MCP (preferred):

1. **Crawl site structure**
   - Use `scrape_webpage` on the homepage URL to get page content
   - Use `crawl_webpages` starting from the homepage to discover linked pages (PLP, PDP, cart, checkout)
   - Identify page types by URL patterns and content

2. **Extract structured data per page**
   - Use `extract_structured_data` on each key page to get:
     - Navigation elements (menu, search, breadcrumbs)
     - Product display features (images, reviews, comparison, wishlist)
     - Commerce features (add to cart, checkout, payment options)
     - Trust signals (badges, reviews, return policy, security)
     - Personalization elements (recommendations, recently viewed)
     - Content features (video, size guides, descriptions)
     - Promotion elements (sales, coupons, loyalty)

3. **Simulate key flows** (interactive)
   - Use `claude_computer_use_agent` to walk through critical paths:
     - Homepage → find a product category → navigate to PLP
     - PLP → click a product → arrive at PDP
     - PDP → add to cart (attempt)
     - Cart → proceed to checkout (attempt)
   - Note any failures, errors, pop-ups, or friction at each step
   - Capture observations about page load, responsiveness, and interactivity

### With Claude in Chrome MCP (fallback):

1. `tabs_context_mcp` → `tabs_create_mcp` to set up browser
2. For each page: `navigate` → `read_page` → `computer(screenshot)` → `get_page_text`
3. Use `javascript_tool` to extract dataLayer events and structured metadata
4. Use `find` + `computer(left_click)` to attempt key flows (add to cart, checkout)

### Build Site Matrix

From the extracted data, construct a structured Site Matrix:

```
Site Matrix:
├── Homepage
│   ├── Features: [search, mega-menu, promotions, recommendations, ...]
│   ├── Trust signals: [badges, reviews, ...]
│   └── Navigation paths: [to PLP via menu, to PLP via search, ...]
├── PLP
│   ├── Features: [filters, sorting, quick-view, grid/list toggle, ...]
│   ├── Product display: [images, prices, ratings, ...]
│   └── Navigation paths: [to PDP via click, ...]
├── PDP
│   ├── Features: [images, reviews, size-guide, add-to-cart, wishlist, ...]
│   ├── Product info: [description, specs, price, availability, ...]
│   └── Navigation paths: [to cart, to checkout, ...]
├── Cart
│   ├── Features: [quantity edit, remove, promo code, shipping estimate, ...]
│   └── Navigation paths: [to checkout, continue shopping, ...]
└── Checkout
    ├── Features: [guest checkout, express checkout, payment methods, ...]
    └── Trust signals: [security badges, return policy, ...]
```

## Phase 3: Build Persona Matrix

For each persona (from loaded persona definitions), extract:
- Name and archetype
- Key motivations and goals
- Preferred features and decision tools
- Price sensitivity and typical spending range
- Device preferences
- Decision triggers (what makes them buy)
- Friction points (what makes them leave)

## Phase 4: Run Predictive Simulation

Load the simulation prompt from `guides/simulation-prompt.md` and execute it with:
- The Persona Matrix from Phase 3
- The Site Matrix from Phase 2
- Client context (if provided)

Generate all 7 output sections as defined in the simulation prompt:
1. Persona-by-Persona Navigation Simulation
2. Purchase Probability (0-10 scoring per persona)
3. Simulated Conversion Estimate (per 100 visitors)
4. Feature Usage Predictions
5. Feature / Product / Design Gaps
6. Persona Attraction Ranking
7. Recommendations (5-10 prioritized)

## Phase 5: Synthesis & Report

Load the synthesis prompt from `guides/synthesis-prompt.md` and run it against the simulation output to produce:
1. Executive Summary
2. Cross-Persona Themes
3. Prioritized Opportunity Themes
4. Predicted Uplift Narrative
5. Strategic Backlog Starter

### Write Report

Write the complete report to the output file. If running within a `/prepare` workflow, write to:
`tickets/{folderName}/simulation-report.md`

Otherwise, write to a timestamped file:
`audit-simulate_{timestamp}/simulation-report.md`

### Report Format

```markdown
# Predictive Simulation Report
**Client:** {site domain}
**Date:** {timestamp}
**Personas:** {list of personas used}
**Pages analyzed:** {count}

---

## Executive Summary
{synthesis output}

---

## Persona Fit Scorecard

| Persona | Category | Price | Features | Flow | Trust | **Total** | Conv/100 |
|---------|----------|-------|----------|------|-------|-----------|----------|
| {name}  | {0-2}    | {0-2} | {0-3}    | {0-2}| {0-1} | **{sum}** | {est}    |

---

## Persona-by-Persona Analysis

### {Persona Name}
**Entry point:** {device, channel}
**Navigation path:** {step-by-step}
**Engagement highlights:** {what they'd interact with}
**Friction points:** {where they'd struggle}
**Feature gaps:** {what's missing for this persona}
**Purchase likelihood:** {score}/10

---

## Cross-Persona Themes
{shared friction, universal gaps, common opportunities}

## Prioritized Recommendations

| # | Recommendation | Impact | Effort | Personas Affected |
|---|---------------|--------|--------|-------------------|
| 1 | {action}      | High   | Medium | {personas}        |

## Predicted Uplift
{narrative connecting recommendations to conversion improvements}

## Strategic Backlog Starter
{epics and user stories}

---
*This is a simulated, directional analysis.*
*This is a simulated, directional analysis — not real analytics.*
```

## Display Results

After writing the report:
1. Show the Persona Fit Scorecard table in the chat
2. Summarize the top 3 recommendations
3. Note the full report file path
4. Ask if the user wants to:
   - Dive deeper into a specific persona
   - Re-run with different personas
   - Explore specific recommendations

## Example Usage

```
/audit simulate https://nike.com
/audit simulate https://client.com --personas ~/docs/client-personas.pdf
/audit simulate https://store.example.com --context "Replatforming to composable commerce, focus on mobile checkout"
/audit simulate https://shop.com --pages https://shop.com/products,https://shop.com/cart
```
