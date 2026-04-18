# UX Heuristics Reference

This file encodes research-backed UX principles the audit and validation agents apply when evaluating pages and components. These are internalized principles, not scraped content — the agent applies them as design judgment, not as citations.

The two primary research bodies informing this layer:
- **Baymard Institute** — e-commerce UX research (checkout, forms, navigation, search, mobile commerce, product pages)
- **Nielsen Norman Group** — usability heuristics, information architecture, cognitive load, accessibility, interaction design

Agents should apply these when flagging UX issues in audit output and when evaluating component patterns in validation. They supplement client rules — they don't override them.

---

## Navigation and wayfinding

**What research shows:**
- Users rely on persistent, visible navigation — hiding it behind hamburger menus on desktop increases task abandonment
- Breadcrumbs reduce disorientation on sites with more than two hierarchy levels
- Mega menus outperform flyouts for large category sets — they let users see options without hover precision
- Active/current state must be visually distinct — users who can't tell where they are abandon navigation tasks
- Top-level navigation labels should use familiar, category-accurate language — clever labels increase error rate

**What to flag:**
- Navigation with no visible active state
- Desktop hamburger menus on content-dense sites
- Navigation labels that require domain knowledge to interpret
- No breadcrumbs on pages three or more levels deep
- Navigation that collapses too early (breakpoints set too low for actual content width)

---

## Forms and input

**What research shows:**
- Single-column form layouts outperform multi-column — users read top-to-bottom, not across rows
- Inline validation (on blur, not on submit) reduces error rates significantly
- Placeholder text as the only label disappears when the user starts typing — always use a persistent label above the field
- Optional fields should be marked optional, not required fields marked required — users default-assume all fields are required
- Checkout forms with 12+ fields see measurable abandonment increases — every unnecessary field has a cost
- Field width should signal expected input length (postcode field should be narrow; name field should be wide)
- Password fields need a show/hide toggle — masking creates transcription errors

**What to flag:**
- Multi-column form layouts
- Placeholder-only labels (no visible label above the input)
- Forms with more than 8 fields that haven't been audited for necessity
- No inline validation on form inputs
- Password fields without a visibility toggle
- Required/optional field marking absent or inconsistent

---

## Search

**What research shows:**
- Search should be visible immediately — not behind an icon on sites where search is a primary navigation path
- Query suggestions (autocomplete) reduce search reformulations — they surface vocabulary the site uses
- Zero-results pages that offer alternatives convert better than dead ends
- Faceted filtering outperforms keyword refinement for product-heavy catalogues
- Search results need to show why a result matched — bolding the matched term helps users verify relevance
- On mobile, the search input should be full-width and auto-focused when activated

**What to flag:**
- Search hidden behind an icon on catalogues or large content sites
- Zero-results pages with no alternative paths
- No autocomplete on sites with large product or content sets
- Search results with no relevance signals (matched term not highlighted)
- Filters that require a page reload to apply (vs. instant refinement)

---

## Product and content pages

**What research shows:**
- Product images are the highest-engagement element on product pages — low quality or insufficient angles are a primary abandonment cause
- Price, availability, and the primary CTA must be visible above the fold without scrolling
- Scarcity indicators (low stock, limited time) increase conversion when accurate — when inaccurate, they permanently damage trust
- Reviews and social proof placed near the CTA outperform placement at the bottom of the page
- Tabbed content hides information — users who don't click tabs miss it. Prefer progressive disclosure with visible section headers
- Related products perform better when they're genuinely related (same category, complementary use) vs. generic recommendations

**What to flag:**
- Primary CTA below the fold on product/landing pages
- No image alt text or image zoom on product images
- Scarcity/urgency copy with no evident basis (always in stock but says "only 3 left")
- Reviews buried below the fold or after extensive description content
- Tab components used for primary product information (specs, sizing)

---

## Checkout and conversion flows

**What research shows:**
- Guest checkout is the highest-leverage checkout improvement for first-time buyers — forcing account creation is a primary abandonment trigger
- Progress indicators reduce abandonment on multi-step flows — users who can see where they are in a process are more likely to complete it
- Order summary must stay visible throughout checkout — users lose confidence when they can't see what they're buying
- Inline address validation (real-time postal lookup) reduces form errors and abandonment
- The default shipping option should be the most common one, not the cheapest — surprising users at the last step with a slow delivery date causes abandonment
- Error messages must name the specific field and explain how to fix it — "invalid input" is not actionable

**What to flag:**
- No guest checkout option
- Multi-step checkout with no progress indicator
- Order summary hidden or collapsed by default during checkout
- Error messages that don't identify the specific field
- CTA buttons that don't reflect the current action ("Next" vs "Continue to Shipping")

---

## Mobile experience

**What research shows:**
- Touch targets below 44×44px (Apple) / 48×48dp (Google) cause significant tap error rates
- Bottom navigation outperforms top navigation on mobile for primary destinations — thumb reach zone
- Horizontal scrolling is acceptable for carousels but not for primary navigation or content
- Mobile forms benefit from appropriate keyboard types (`inputmode="numeric"` for phone/postcode, `type="email"` for email)
- Pop-ups and interstitials that appear immediately on page load — before users have engaged — have the highest dismissal rates and the most negative impact on perception
- Text below 16px on body copy causes legibility issues at typical mobile viewing distances

**What to flag:**
- Interactive elements smaller than 44px in either dimension
- Body text below 16px
- `type="text"` on numeric fields (phone, postcode, card number)
- Pop-ups triggered on page load with no delay or scroll-depth condition
- Horizontal scroll on non-carousel content

---

## Cognitive load and visual hierarchy

**What research shows:**
- Users scan in F-pattern (horizontal first, then vertical on the left) — the most important content should occupy the left-top zone
- Contrast ratio below 4.5:1 for body text and 3:1 for large text fails WCAG AA — and reduces comprehension for all users, not just those with visual impairments
- Reducing visual noise around CTAs (whitespace, contrast) increases click-through — the CTA competes with everything else on the page
- Consistent component placement (nav always at top, breadcrumbs always below nav) reduces reorientation cost per page
- Pages with more than three competing visual hierarchies — multiple elements claiming "primary attention" — show increased task completion time

**What to flag:**
- More than one primary CTA style on a single page
- Text/background contrast below 4.5:1 (body) or 3:1 (large text / UI components)
- Key information placed right-aligned or center-aligned on text-heavy pages (disrupts F-scan)
- Pages where CTA button styling is used for non-CTA actions (dilutes the pattern)

---

## Error prevention and recovery

**What research shows:**
- The best error message is the one that never appears — constraints and defaults prevent more errors than recovery flows
- Destructive actions (delete, cancel order) should require confirmation — but confirmation dialogs should describe the consequence, not just say "Are you sure?"
- Undo is more forgiving than confirmation — where possible, prefer reversible actions over confirmation gates
- 404 pages that explain what happened and offer a path forward recover a portion of would-be abandonments
- Session timeouts should warn users before expiring, not expire silently and lose form data

**What to flag:**
- Destructive actions with no confirmation step
- Confirmation dialogs that say "Are you sure?" without stating what will happen
- No 404 recovery path (just a generic error with no navigation)
- Forms that don't preserve input across navigation or session expiry
- No empty/zero state defined for dynamic content areas (search results, cart, favourites)

---

## How agents use this file

**Audit agent (Step 4 — auditor prompt):** After identifying components, run a second pass evaluating the page against relevant sections above. Add a `uxFlags` array to the JSON output. Each flag: `{ "heuristic": "[section name]", "finding": "[specific observation]", "severity": "high|medium|low" }`.

**Simulate agent:** When predicting persona behaviour, ground friction points in these principles. A simulated user hitting a 12-field checkout form should flag form length as a friction point with reference to the checkout section above.

**Validation agent:** Component-level checks (touch target size, contrast, CTA hierarchy) from the cognitive load and mobile sections apply during story validation. These are lower priority than the structural checks but worth surfacing as `needs-review` items.

**Severity guidance:**
- `high` — directly blocks task completion or fails accessibility baseline
- `medium` — increases abandonment risk or cognitive load measurably
- `low` — degrades experience quality; fixable without structural change
