# Course 2 (draft) — "Direct the Machine: The Design Engineer Path"

> **Status: WORK IN PROGRESS — draft outline.** Planning doc, not site content. The second self-led course after "Still Yourself." Strategy and build spec live in `course-plan.md`; this is the course structure.

Working title: **Direct the Machine** · slug `design-engineer-path`. Self-led, gated (`/secured/`), 8 chapters, mirroring the "Still Yourself" format (manifest + chapter markdown + progress tracking).

---

## Positioning

**For:** mid-to-senior product/UX designers with a technical streak who want to move toward design engineering and stay on the resilient side of the split. **Not for:** people who won't open a code editor, or who want AI to make prettier pictures faster.

**Promise (honest):** you won't become a senior engineer in eight chapters. You'll learn to work in real code enough to steer it, own a token system, direct agents instead of fighting them, and keep taste as the thing you're paid for — and you'll ship a small project that proves it.

**Spine:** *Taste is Triage* — when making is cheap, judgment is the job.

**Format per chapter:** a short video walkthrough (the paid, off-bundle value), a written lesson, and one hands-on exercise. A capstone ties it together. Estimated 8–10 min video + 1 exercise per chapter.

---

## Draft outline

### 00 · Before you start
*What this is and isn't, and the one rule: you build, you don't just watch.*
- Outcome: an honest self-filter (is this you?), tools installed (editor + an AI coding tool + a GitHub account), and the promise set straight.
- Exercise: set up your environment and commit a "hello world" component so the tooling is proven before Chapter 2.

### 01 · The new shape of the job
*The bifurcation, taste-as-triage, and what a "design engineer" actually is.*
- Outcome: you can name where design value is moving and locate yourself on the map honestly.
- Exercise: audit your last month of work — what percentage is execution an AI can now do? Write the number down. That gap is the course.

### 02 · Work in code without becoming an engineer
*The front-of-the-front-end: reading and steering AI-generated code instead of writing it all by hand.*
- Outcome: you can take a component from an agent, read what it wrote, and correct it with intent — and you understand why code friction is the discipline, not the obstacle.
- Exercise: ship one real, working component with an agent; fix three things it got wrong and say why each was wrong.

### 03 · Tokens as the contract
*Design tokens as an enforceable source of truth across Figma and code.*
- Outcome: you can build a small layered token system and understand how it keeps design and code in sync (and why that's the job that doesn't get automated away).
- Exercise: build a small token system from the open-source starter; theme it light/dark by changing values, not components.

### 04 · Direct the agents
*Guardrails, `.cursorrules`, and diff-based handoff — the /design pattern.*
- Outcome: you can set up an agent workflow with stop-conditions so the machine produces token-compliant work you can trust, and hand off a diff instead of an annotated spec.
- Exercise: write a rules file that stops the agent from hardcoding values; prove it by catching a violation.

### 05 · Taste as the deliverable
*Judgment frameworks: catching drift, being the human gate, saying why.*
- Outcome: you can run a "taste pass" on generated output — spot the off-grid frame, the third gray, the one thing too many — and defend the call.
- Exercise: take a pile of AI-generated UI and do a drift audit; cut what doesn't belong and write the because for each cut (the Chanel rule).

### 06 · Reposition yourself
*Portfolio-as-evidence, record-not-portfolio, being findable, interviewing for the resilient tier.*
- Outcome: you can present yourself as a design engineer, not a designer-who-fears-AI.
- Exercise: rewrite your headline and one case study as evidence of judgment and shipping, not a list of deliverables.

### 07 · Capstone — ship a design system with agents
*Put it together: a small, real, shown project.*
- Outcome: a working mini design-system-with-agents you can point to — the thing that makes the whole course provable to an employer or client.
- Exercise: ship it, write the one-paragraph "why the decisions mattered," and (optional paid add-on) submit for a feedback review.

---

## Manifest (ready to drop into `src/assets/data/design-engineer-path.json` when built)

```json
{
  "slug": "design-engineer-path",
  "title": "Direct the Machine",
  "subtitle": "The design engineer path: work in real code, direct agents, and keep judgment as the job — for designers who want to be the one steering, not the one automated.",
  "locked": true,
  "entries": [
    { "id": 1, "docId": 9201, "tag": "00", "title": "Before you start", "description": "What this is and isn't, and the one rule: you build, you don't just watch.", "slug": "design-engineer-path-before-you-start", "route": "/secured/doc/design-engineer-path-before-you-start", "contentFile": "design_engineer_0.md", "published": true },
    { "id": 2, "docId": 9202, "tag": "01", "title": "The new shape of the job", "description": "The bifurcation, taste-as-triage, and what a design engineer actually is.", "slug": "design-engineer-path-new-shape", "route": "/secured/doc/design-engineer-path-new-shape", "contentFile": "design_engineer_1.md", "published": true },
    { "id": 3, "docId": 9203, "tag": "02", "title": "Work in code without becoming an engineer", "description": "The front-of-the-front-end: reading and steering AI-generated code.", "slug": "design-engineer-path-work-in-code", "route": "/secured/doc/design-engineer-path-work-in-code", "contentFile": "design_engineer_2.md", "published": true },
    { "id": 4, "docId": 9204, "tag": "03", "title": "Tokens as the contract", "description": "Design tokens as an enforceable source of truth across Figma and code.", "slug": "design-engineer-path-tokens", "route": "/secured/doc/design-engineer-path-tokens", "contentFile": "design_engineer_3.md", "published": true },
    { "id": 5, "docId": 9205, "tag": "04", "title": "Direct the agents", "description": "Guardrails, rules files, and diff-based handoff.", "slug": "design-engineer-path-direct-agents", "route": "/secured/doc/design-engineer-path-direct-agents", "contentFile": "design_engineer_4.md", "published": true },
    { "id": 6, "docId": 9206, "tag": "05", "title": "Taste as the deliverable", "description": "Judgment frameworks: catching drift, being the human gate, saying why.", "slug": "design-engineer-path-taste", "route": "/secured/doc/design-engineer-path-taste", "contentFile": "design_engineer_5.md", "published": true },
    { "id": 7, "docId": 9207, "tag": "06", "title": "Reposition yourself", "description": "Portfolio-as-evidence, being findable, interviewing for the resilient tier.", "slug": "design-engineer-path-reposition", "route": "/secured/doc/design-engineer-path-reposition", "contentFile": "design_engineer_6.md", "published": true },
    { "id": 8, "docId": 9208, "tag": "07", "title": "Capstone: ship a design system with agents", "description": "Put it together: a small, real, shown project.", "slug": "design-engineer-path-capstone", "route": "/secured/doc/design-engineer-path-capstone", "contentFile": "design_engineer_7.md", "published": true }
  ]
}
```

## Build checklist (when validated — don't build ahead of the warm pilot)
- [ ] Write the 8 chapter files (`design_engineer_0.md` … `_7.md`) in `src/assets/content/`.
- [ ] Record the 8 short video walkthroughs; host off-bundle (unlisted Vimeo/Cloudflare Stream); embed per chapter.
- [ ] Add the manifest to `src/assets/data/` and import it into `courseRegistry.ts` (`COURSES`).
- [ ] Keep `locked: true`; add the Lemon Squeezy/Gumroad license-key gate (Option B in `course-plan.md`) in place of the shared `?unlock` secret.
- [ ] Wire the capstone submission + optional paid feedback add-on.
- [ ] Pilot warm (MACH/network) first → testimonials → then open self-serve.

*(End — draft, WIP.)*
