# Plan: Address CSS-Tricks Editor Feedback + Demo CodePens

## Context

Submitting counter-fill as a CSS-Tricks article. Editor gave six feedback items. User also wants demos added to demo.html and a doc with all CodePen snippets for each feedback topic.

## Editor Feedback → Actions

### 1. Legacy browser support for letterSpacing
**What to address:** `ctx.letterSpacing` isn't available in older browsers (pre-Chrome 99, pre-Safari 17.2). Article should acknowledge this and explain graceful degradation.

**Action in article (doc_69.md):** Add a "Browser support" or "Compatibility" section noting that without `ctx.letterSpacing`, counter fills still render but may drift on text with non-zero letter-spacing. The effect degrades gracefully — it doesn't break, it just shifts slightly.

**Demo:** Add a letter-spacing example to demo.html showing the effect with and without letter-spacing.

**CodePen snippet:** Standalone letter-spacing demo.

---

### 2. Performance notes
**What to address:** Canvas rendering + ResizeObserver + rAF debouncing — what's the actual cost?

**Action in article (doc_69.md):** Add a "Performance" section covering:
- Size cache (`WeakMap`) skips unchanged elements entirely
- Double-rAF debouncing batches all resize events into one paint
- BFS flood-fill is O(pixels) per element — for a 140px heading at 2x DPR, that's ~156K pixels, under 1ms on modern hardware
- SVG font caching: fonts fetched once at init, base64-encoded, reused for all paints
- No continuous animation — paint happens only on init and resize

**Demo:** Add a performance stress-test section with many elements + resize instructions.

**CodePen snippet:** Multiple counter-fill elements to demonstrate smooth resize behavior.

---

### 3. Text shadows and line spacing
**What to address:** Does text-shadow interfere? Does line-height affect detection?

**Action in article (doc_69.md):** Add a note in a "Gotchas" or "Edge cases" section:
- `text-shadow`: Canvas doesn't inherit CSS text-shadow, so the fill mask is clean. The DOM text-shadow renders on top, unaffected. No conflict.
- `line-height`: Multi-line mode splits words into per-word canvases, so line-height doesn't affect counter detection. The BFS region filter already rejects wide flat strips (inter-line gaps) as false positives.

**Demo:** Add examples with text-shadow and tight/loose line-height.

**CodePen snippet:** text-shadow + line-height examples.

---

### 4. Variable font support
**What to address:** Already extensively covered in code, but article currently only has one CodePen embed for variable fonts. Editor wants more depth.

**Action in article (doc_69.md):** Expand the variable font section with:
- Three-tier rendering explanation (SVG → FVS → canvas fallback)
- Which axes work where (wght everywhere, wdth via stretch keywords, custom axes via SVG)
- Safari notes

**Demo:** Already has 15+ variable font examples in demo.html. Ensure they're well-labeled.

**CodePen snippet:** Variable font demo with wght/wdth/opsz/SOFT axis controls.

---

### 5. Print support
**What to address:** Canvas content doesn't print by default. Be honest about this.

**Action in article (doc_69.md):** Add a note: "Counter fills won't appear in print — canvas content is excluded from print rendering by default. For print, the text remains fully readable; only the decorative fill is lost. A `@media print` fallback that sets a background-color on the text element is possible but not built-in."

**Demo:** Add a `@media print` fallback example.

**CodePen snippet:** Print fallback demo with CSS-only alternative.

---

### 6. Writing modes
**What to address:** Vertical writing modes (`writing-mode: vertical-rl`, `vertical-lr`) would affect baseline calculations.

**Action in article (doc_69.md):** Add a note: "Vertical writing modes (`writing-mode: vertical-rl`) are not currently supported. Baseline measurement assumes horizontal text. This is a known gap for future work."

**Demo:** Show horizontal text working, note vertical as unsupported.

**CodePen snippet:** N/A (nothing to demo for unsupported feature).

---

### 7. Real-world examples
**What to address:** Where is this technique used in production/editorial design?

**Action in article (doc_69.md):** Add a section with examples of counter-filled type in the wild:
- Editorial mastheads (Vogue, Harper's Bazaar style treatments)
- Album art and music branding
- Event posters and display typography
- Fashion/luxury brand type treatments
- The user's own site as a live example

---

## Files to modify

| File | Changes |
|---|---|
| `packages/counter-fill/demo.html` | Add sections: letter-spacing, text-shadow, line-height, print fallback, performance stress test |
| `src/assets/content/doc_69.md` | Add sections: browser support, performance, edge cases, print, writing modes, real-world examples |
| NEW: `packages/counter-fill/CODEPENS.md` | All CodePen snippets as self-contained HTML blocks |

## CodePen snippets doc structure (CODEPENS.md)

Each snippet is a complete, self-contained HTML file that works in CodePen:

1. **Basic — Static fonts** (existing, document it)
2. **Variable fonts — axis controls** (existing, document it)
3. **Letter-spacing** — with and without letter-spacing
4. **Text-shadow + line-height** — decorative shadows, tight/loose leading
5. **Print fallback** — @media print CSS-only alternative
6. **Performance** — 10+ elements, resize behavior
7. **Multi-line** — paragraph-length text wrapping

## Verification

- Open demo.html in Chrome and Safari — all new sections render correctly
- Each CodePen snippet is self-contained (paste into CodePen, works immediately)
- Article reads naturally with new sections (follows CLAUDE.md writing rules)
