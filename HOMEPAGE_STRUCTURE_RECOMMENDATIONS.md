# Homepage Structure Recommendations

**Date:** December 2025  
**Context:** Writing is driving new content, work needs refinement, unified library is preferred

---

## Current State Analysis

### Homepage Structure (Current)
1. **Hero Banner** - "I'm Jake—a designer at Orium..."
2. **Work & Play** (Mixed) - Shows 1 work entry + decorative cards
3. **About** - Design systems, AI, code narrative
4. **Writing** - Shows 3 latest articles via CardRow2 component

### Library Structure (Current)
- **Work** section (filtered by category)
- **Play** section (filtered by category)  
- **Writing** section (from docs.json)

### Key Issues
- ❌ Work and Play are mixed, diluting focus
- ❌ Writing appears last, despite being primary content driver
- ❌ Genie (most important work) is buried in library
- ❌ No clear hierarchy between content types

---

## Recommended Approach: **Elevate Writing, Separate Work/Play, Keep Unified Library**

### Option A: Writing-First Homepage (RECOMMENDED)

**Rationale:** Since writing is driving new content and you want to establish thought leadership, lead with it.

**New Homepage Structure:**
1. **Hero Banner** - Keep current
2. **Writing** (NEW POSITION - Move up) 
   - Title: "Writing" or "Latest Thoughts"
   - Show 3-4 latest articles
   - Link: "View All Writing" → Library #writing
   - **Why:** Establishes you as a thought leader, showcases fresh content
3. **Featured Work** (Refined)
   - Title: "Featured Work" 
   - Show ONLY 2-3 best pieces (Genie + 1-2 others)
   - Filter to show only `category: "Work"` entries
   - Link: "View All Work" → Library #work
   - **Why:** Quality over quantity, highlights your best work
4. **About** - Keep current
5. **Play** (Optional, or move to Library only)
   - Either remove from homepage OR
   - Show 1-2 items with "More in Library" link
   - **Why:** Play is less critical for positioning, can live in library

**Benefits:**
- ✅ Writing gets prime real estate
- ✅ Work section is refined and focused
- ✅ Clear content hierarchy
- ✅ Library remains unified destination
- ✅ Aligns with audit recommendation to emphasize thought leadership

---

### Option B: Balanced Three-Column Approach

**New Homepage Structure:**
1. **Hero Banner**
2. **Three Equal Sections:**
   - **Writing** (Left/First)
   - **Work** (Center/Second) 
   - **Play** (Right/Third)
3. **About**
4. **Library Link** - "Explore Full Library"

**Benefits:**
- ✅ Equal prominence for all three
- ✅ Clear separation
- ✅ Library remains unified

**Drawbacks:**
- ⚠️ Play gets equal weight to Writing (may not align with goals)
- ⚠️ Less focus on your best work

---

### Option C: Writing + Featured Work Only

**New Homepage Structure:**
1. **Hero Banner**
2. **Writing** - Full section with 4-6 articles
3. **Featured Work** - Only 2-3 best pieces (Genie prominently featured)
4. **About**
5. **Library CTA** - "Browse All Work, Play & Writing"

**Benefits:**
- ✅ Maximum writing prominence
- ✅ Work is highly curated
- ✅ Clean, focused homepage
- ✅ Library handles everything else

**Drawbacks:**
- ⚠️ Play completely removed from homepage (may be fine if it's less important)

---

## Specific Implementation Recommendations

### 1. Split Work & Play on Homepage ✅

**Current:** Mixed "Work & Play" section  
**New:** Separate sections or filter appropriately

**Implementation:**
- Update `HomePage.vue` to filter work entries by category
- Create separate `GridContainer` sections for Work and Play
- OR create a single section that filters to show only Work entries

**Code Change:**
```vue
<!-- Instead of mixed work.entries -->
<!-- Show only Work category -->
<ImageCard
  v-for="entry in work.entries.filter(e => e.category === 'Work').slice(0, 3)"
  ...
/>
```

### 2. Move Writing Above Work ✅

**Current:** Writing appears after About  
**New:** Writing appears immediately after Hero (or after About, before Work)

**Implementation:**
- Move `<CardRow2 />` component higher in template
- Consider renaming to "Latest Writing" or "Thoughts"

### 3. Feature Genie Prominently ✅

**Current:** Genie is in library, not featured on homepage  
**New:** Genie should be the FIRST work item shown

**Implementation:**
- Update `work.json` to ensure Genie entry has proper category/tags
- Filter homepage to show Genie first, or create dedicated featured section
- Consider a hero-style card for Genie (it's your biggest differentiator)

### 4. Keep Unified Library ✅

**Recommendation:** Keep library as-is, but improve navigation

**Enhancements:**
- Add anchor links in library: `/library#work`, `/library#play`, `/library#writing`
- Consider adding a filter/tab system in library for easier navigation
- Add "Back to Homepage" or breadcrumb navigation

---

## Priority Actions (In Order)

### Week 1: Quick Wins
1. **Move Writing section up** - Simple template reordering
2. **Split Work & Play** - Filter entries by category
3. **Feature Genie** - Ensure it appears first in Work section

### Week 2: Refinement
4. **Refine Work entries** - Remove placeholder text, improve descriptions
5. **Add Library navigation** - Anchor links, better filtering
6. **Update Writing section** - Better title, more prominent styling

### Week 3: Polish
7. **Add featured section** - Dedicated Genie showcase (optional)
8. **Optimize Play section** - Decide if it stays on homepage or library-only
9. **Test user flow** - Homepage → Writing → Library → Work

---

## Content Strategy Alignment

### Writing (Primary Driver)
- **Homepage:** Show 3-4 latest articles
- **Library:** Full archive with filtering
- **Goal:** Establish thought leadership, showcase fresh content

### Work (Needs Refinement)
- **Homepage:** 2-3 best pieces (Genie + others)
- **Library:** Full portfolio with categories
- **Goal:** Quality over quantity, highlight expertise

### Play (Secondary)
- **Homepage:** Optional (1-2 items or remove)
- **Library:** Full collection
- **Goal:** Show personality, experimental work

---

## Recommended Final Structure (Option A)

```
Homepage:
├── Hero Banner
├── Writing (3-4 latest)
│   └── "View All Writing" → /library#writing
├── Featured Work (2-3 best, Genie first)
│   └── "View All Work" → /library#work
├── About
└── [Optional] Play (1-2 items)
    └── "More in Library" → /library#play

Library:
├── Work (all entries, filtered)
├── Play (all entries, filtered)
└── Writing (all entries)
```

---

## Questions to Consider

1. **Should Play appear on homepage?**
   - If yes: Show 1-2 items
   - If no: Library-only (cleaner homepage)

2. **How many Work items on homepage?**
   - 2-3: More focused, higher quality perception
   - 4-6: More comprehensive, but may dilute impact

3. **Should Genie have dedicated section?**
   - Option: Hero-style featured card for Genie
   - Option: First item in Work section (simpler)

4. **Writing section title?**
   - "Writing" (current)
   - "Latest Thoughts"
   - "Articles & Essays"
   - "Thought Leadership"

---

## Next Steps

1. **Choose an option** (A, B, or C)
2. **Implement template changes** (reorder sections, filter entries)
3. **Update content** (refine work descriptions, ensure Genie is featured)
4. **Test navigation** (homepage → library flow)
5. **Iterate based on analytics** (which sections get most engagement)

---

## Code Changes Needed

### HomePage.vue
- Reorder sections (Writing before Work)
- Filter work entries by category
- Add separate Work and Play sections (or remove Play from homepage)
- Ensure Genie appears first in Work section

### MyLibrary.vue
- Add anchor navigation (#work, #play, #writing)
- Improve section headers
- Consider adding filter/tab navigation

### work.json
- Ensure Genie entry is properly categorized
- Refine work descriptions (remove placeholders)
- Add proper tags/categories for filtering

---

**Recommendation:** Go with **Option A (Writing-First)** - it aligns with your goals of promoting writing, refining work, and maintaining a unified library while establishing thought leadership.
