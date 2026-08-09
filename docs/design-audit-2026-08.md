# Design Audit — ramphal.design vs. adhamdannaway.com

_Date: 2026-08-09 · Internal reference (not a public site page)_

## Method & caveat

Built from: the ramphal.design **source code** (authoritative for structure,
copy, and content architecture) plus established knowledge + web search on Adham
Dannaway's portfolio. The live sites could **not** be loaded during this audit
(blocked by the network egress proxy), so this does not include a rendered
pixel-level visual diff. Add screenshots to extend it with a visual layer.

## The two sites in one line each

- **Adham Dannaway:** a *product* — a tightly-focused personal brand engineered
  to sell one identity ("UI designer + front-end developer") and one thing (the
  *Practical UI* book). Ruthless minimalism, one idea per screen.
- **ramphal.design:** a *platform* — a deep, multi-surface site (work, writing,
  resume, component library, labs/experiments) that shows range but diffuses
  focus. More ambitious in scope, less resolved in message.

---

## 1. Hero & positioning (his biggest advantage)

- Adham uses the split-face avatar (designer half / dev half) — a visual claim,
  zero reading required, plus an explicit CTA (portfolio / book).
- ramphal uses a text headline (*"I design systems and write the code that ships
  them."*) with a canvas counter-fill animation, and **no hero CTA**
  (`HeroBanner` supports `label`/`route`/`labeltwo` — unused on the homepage).
- The ramphal headline is arguably a *sharper* position than his, but it's a
  visual claim delivered through text only, and it dead-ends into scroll.

**Actions**
- Add hero CTAs (primary "See selected work" → /library; secondary "Read the
  writing" or "About").
- Give the "design + code" claim a visual anchor (token→component demo, code
  split, or a more central counter-fill moment). Show the duality, don't state it.

## 2. Information architecture & focus

- Adham: ~5 top-level destinations, everything funnels to book + portfolio.
- ramphal: 17+ page types in source, but nav exposes only **Work** and **Info**.
  Huge surface area, thin wayfinding. Source shows in-progress signals:
  `HeroAnimated copy.vue`, `SidebarNav copy.vue`, `UnderConstructionBar`,
  commented-out blocks.

**Actions**
- Prune the top level to 3–4 real destinations: **Work · Writing · About · Contact.**
  Demote Labs/Explorations/Library to secondary.
- Remove construction signals (`UnderConstructionBar`, `*copy.vue`, dead
  commented code) before they reach production.
- Homepage order (Thesis → Select Work → About → Writing) is good; add an
  explicit **Contact** close.

## 3. Copy & tone

- ramphal's writing is a strength and more distinctive ("the seam between design
  and engineering", "how decisions survive handoff"). Adham's is cleaner but
  blander.

**Actions**
- Keep the voice — don't flatten it to his generic register.
- Lead About with the one-liner, then the detail (currently two dense blocks).
- Add social proof: the `TestimonialCarousel.vue` component exists but is unused
  on the homepage. Add 1–2 real quotes.

## 4. Visual system & craft

- ramphal runs a *more* sophisticated system than his: Style Dictionary tokens,
  Epilogue + Roboto Flex variable fonts, fluid `clamp()` type, Storybook, GSAP
  scroll choreography, dark/light theming.
- Risk is the inverse of his: he under-designs and it reads intentional; ramphal
  over-builds and some reads unfinished.

**Actions**
- Audit `!important` out of `typography.scss` — the token cascade is fighting
  itself, and that's the worst place to leak for a systems-credibility pitch.
- Rein in scroll-animation count (fadeIn Up/Down/Left/Right + parallax). One or
  two motion moments beat six; watch for CLS.

---

## Prioritized punch-list

**High impact / low effort**
1. Add hero CTAs (props already exist).
2. Add a Contact section/CTA to the homepage close.
3. Surface `TestimonialCarousel` with 1–2 real quotes.
4. Remove `UnderConstructionBar` + `*copy.vue` files + dead commented blocks.

**Medium**
5. Give the hero a visual "design + code" proof, not just text.
6. Prune top-level nav/IA to 3–4 destinations; demote Labs/Library.
7. Lead About with the one-liner; tighten the two blocks.

**Ongoing**
8. Audit `!important` out of the type system.
9. Rein in scroll animation count.

---

## Net takeaway

Positioning and underlying craft are **stronger** than his — a rarer specialty,
a real design system, better prose. His site **out-converts** through four
things: **focus, a visual hook, explicit CTAs, and social proof.** Borrow those;
keep everything else.

## Sources

- https://www.adhamdannaway.com/
- https://www.adhamdannaway.com/about
- https://www.awwwards.com/sites/adham-dannaway-1
