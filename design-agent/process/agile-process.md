# Agile Design Process

This document describes how engagements run. It is a methodology, not a deliverable list. The lifecycle phases (what goes in, what comes out) live in `context/process.md`. This document covers how you move through them: sprint structure, ceremonies, how human-in-the-loop gates work as a working rhythm, and how scope changes are handled.

The process is intentionally flexible. Different clients have different maturity levels, different budgets, and different tolerances for structure. The sprint model below is the default — adapt the ceremony cadence to fit the client, but keep the gate pattern consistent. Gates exist for your protection as much as the client's.

---

## The core model

Every engagement runs on a two-week sprint cycle regardless of tier. The sprint length keeps the human-in-the-loop gates predictable — clients know when they'll be asked to review, approve, or redirect. It also creates a natural billing rhythm.

The agent runs continuously between gates. You are present at gates, and available for escalations between them.

```
Sprint 0 (setup)
  → Sprint 1 (discovery + audit)
  → Sprint 2 (definition + planning)
  → Sprint N (design cycles, each 2 weeks)
  → Final sprint (handoff + UAT)
```

For short engagements (Tier A or Tier B only), Sprint 0 + 1 may be the entire engagement.

---

## Ceremonies

Keep these light. They exist to create shared understanding and surface blockers — not to generate slides.

### Kickoff (Sprint 0, day 1)
**Who:** You + client stakeholders (design lead, product owner, at minimum)
**Duration:** 60–90 min
**Purpose:**
- Review the intake questionnaire together — confirm what the agent synthesized is accurate
- Walk through the process and gate structure — set expectations for what reviews look like
- Confirm access: Storybook URL, Figma file, analytics access, component repo
- Agree on communication channel (Slack preferred) and response SLA for gate approvals

**Output:** Confirmed project brief, access credentials, communication setup

---

### Sprint review (end of every sprint)
**Who:** You + whoever approved the sprint goals
**Duration:** 30–45 min
**Purpose:**
- Show what the agent produced in the sprint
- Walk through any flagged violations or open questions (these are the human-in-the-loop moments from the week)
- Get gate approval or redirection for the next sprint
- Update the backlog

**Output:** Sprint approval (or redirect with notes), updated backlog, next sprint goals

**Gate rule:** Nothing moves to the next phase without explicit approval at the sprint review. "Looks good, keep going" counts. Radio silence does not.

---

### Async check-in (mid-sprint, optional)
**Who:** You + primary client contact
**Format:** Slack thread or short Loom
**When:** If the agent surfaces something significant mid-sprint that needs a decision before the review
**Duration:** 5–10 min

Don't schedule this as a recurring ceremony. Only trigger it when there's a real decision to make. Most mid-sprint agent output can queue for the review.

---

### Retrospective (end of each Tier, or monthly for retainers)
**Who:** You + client lead
**Duration:** 30 min
**Purpose:** What's working in the process, what isn't, what to adjust for the next cycle

Don't skip this. It's where you learn whether the gate structure is working for the client or creating friction. If a client is consistently approving without looking, the gate is too frequent. If they're consistently sending things back, the rules aren't specific enough.

---

## Human-in-the-loop gate pattern

Every gate follows the same structure regardless of which phase triggered it.

### Gate types

**Review gate** (most common)
Agent produces output → you review it first → present to client at sprint review → client approves or redirects.

The agent flags violations or `⚠ Proposed` items for your review before anything goes to the client. You are the first filter.

**Approval gate** (consequential decisions)
Required before moving between major phases: audit → definition, definition → design, design → handoff. Client must explicitly sign off before work continues. Document the approval in the project brief or sprint notes.

**Escalation gate** (unresolvable during the run)
Agent encounters a violation it cannot resolve within the rules — e.g. a new color with no token equivalent. Flags it with the specific issue and possible resolutions. You decide or escalate to the client. Document the decision.

### Gate communication

When presenting a gate to the client:

1. Show what was produced (the agent output, not the process)
2. Name what was flagged and why (the specific violation or question)
3. Propose a resolution (don't make them figure it out)
4. Ask for one of three responses: approve, redirect with notes, or hold for next sprint

Clients who don't know what they're approving will either approve everything (useless) or nothing (expensive). The presentation structure above keeps approvals meaningful.

---

## Sprint structure

### Sprint 0: Setup (days 1–3)
- Intake questionnaire sent and completed
- Kickoff call
- Access confirmed (Storybook, Figma, repo, analytics)
- Project brief synthesized and approved
- Client rules template filled in with initial token contract
- COMPONENT_MANIFEST.json seeded with existing components
- Communication channel set up

**Gate:** Brief approval before Sprint 1 starts.

---

### Sprint 1: Discovery and audit (2 weeks)
- Run audit (lite or deep depending on scope)
- Stakeholder-specific summaries generated
- Risks and assumptions doc drafted
- Client reviews findings

**Gate:** Audit findings review. Client decides which findings are in scope.

---

### Sprint 2: Definition (2 weeks)
- IA, user stories, and user flows generated from approved findings
- Analytics data mapped to user story acceptance criteria (if available)
- Stakeholder alignment materials prepared

**Gate:** IA and user story backlog review. Approval required before design starts. This is the most consequential gate — a wrong decision here costs the most to unwind.

---

### Design sprints (2 weeks each, repeat as needed)
Each design sprint covers one or two user flows through the full design cycle:

**Week 1:**
- Wireframe specs generated from approved user stories
- Component gap list produced (what's in the library, what needs to be added)
- Human review of wireframe specs before hi-fi starts

**Week 2:**
- Hi-fi design generated with token enforcement (Tier A validation runs on all output)
- Violations flagged and queued for review
- Approved components produce structured handoff specs
- Sprint review: show approved output, flag what's open

**Gate:** Hi-fi approval before prototype or handoff.

---

### Final sprint: Handoff and UAT
- Full handoff package assembled (component specs, token annotations, Storybook stories, acceptance criteria)
- QA checklist generated
- UAT run against acceptance criteria
- Refinements from UAT processed and validated

**Gate:** UAT sign-off. Nothing ships without this.

---

## Scope management

### When a client asks to add scope mid-sprint
1. Log the request in the project brief
2. Estimate the impact (does it fit in this sprint, or does it push to the next?)
3. If it fits: add it, flag it in the sprint review as added scope
4. If it doesn't fit: add to backlog, price it, include in next sprint planning

Don't absorb scope silently. Scope additions that aren't named become baseline expectations.

### When the agent produces something outside the defined rules
Flag it as `⚠ Proposed`. Don't hide it, don't silently fix it, don't ship it. Bring it to the next gate with: what it is, why it falls outside the rules, and what the options are. This is how the rules get refined over time — every escalation is feedback on where the rules aren't specific enough.

### When a client wants to skip a gate
Explain what the gate protects against. If they still want to skip it, document the decision and get it in writing (a Slack message counts). The gate exists for their benefit — if they waive it, that's their call, but it should be explicit.

---

## Tier-specific cadence

### Tier A only (validation layer engagement)
- Sprint 0: setup + rules configuration
- Sprint 1: first validation run on AI-generated output, findings review
- Ongoing: retainer model — agent runs continuously, you review flagged violations weekly or on-demand

Ceremonies are minimal: async weekly check-in, monthly retrospective. No sprint reviews unless the client wants them.

### Tier B only (discovery + audit)
- Sprint 0: setup
- Sprint 1: audit + stakeholder summaries
- Sprint 2: definition + backlog

Three sprints total for a clean engagement. Optional: stay on as a Tier A operator once the system is set up.

### Tier C (full lifecycle)
Full sprint structure as described above. Adjust ceremony frequency to client preference — weekly sprint reviews work well for active design phases, bi-weekly for planning and handoff phases.

---

## Working with the agent

The agent produces output continuously between gates. Your job during a sprint:

1. **Check flagged items daily.** The agent escalates `⚠ Proposed` items and violations. Most can queue for the sprint review. Some need a fast decision.
2. **Don't second-guess clean output.** If the agent produced something that passes the rules, trust it. Your review time is for what's flagged, not for re-reviewing everything.
3. **Update the rules when you see a pattern.** If the same type of violation keeps appearing, the rule isn't specific enough. Update `client-rules-template.md` and redeploy. This is how the system gets better over time.
4. **Document decisions.** Every time you resolve an escalation, write it down in the project brief or sprint notes. These decisions become the client's design system history.

---

## Retainer rhythm (ongoing after initial engagement)

For clients on retainer post-engagement:

| Frequency | Activity |
|---|---|
| Daily (async) | Review flagged violations and `⚠ Proposed` items |
| Weekly | 30-min check-in or async Loom: what ran, what was flagged, what was approved |
| Monthly | Retrospective: is the system working, what rules need updating |
| Quarterly | Rules review: are the token contracts still accurate, has the design system evolved |

The retainer is worth the fee because the system needs calibration, not just execution. That calibration is your judgment — it's what the agent can't do without you.
