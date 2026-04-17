# Discovery Call Guide

Goal: understand whether this is a real problem for them, whether they have the stack and budget to act on it, and what a good outcome looks like. This is a diagnostic conversation, not a pitch.

Time: 20–30 minutes.

---

## Before the call

- Look at their job listings — are they hiring for design systems or design engineer roles?
- Review their public design work / Storybook if available
- Check what tools they mention using (Figma, Storybook, design tokens, any AI tooling)
- Know who you're talking to and what their actual role is

---

## Opening (2 minutes)

Don't start with your pitch. Start with their situation.

> "Before I tell you anything about what I'm building — I'd rather understand where you're at. Can you tell me how your design-to-dev workflow is set up right now?"

Let them talk. You're listening for: pain, scale, and whether they've already tried to fix it.

---

## Questions to ask

**On the current state:**
- How does a component get from Figma into the codebase today?
- How often does something ship that wasn't in the design — or was in the design but isn't in Storybook?
- Do you have design tokens? Are they the single source of truth, or are there places where hardcoded values creep in?

**On AI tooling:**
- Are you using any AI design tools — Figma AI, Claude Design, anything else?
- What happens when those tools generate something that doesn't match your system?
- Has anyone tried automating any part of the handoff or QA process?

**On the team:**
- How many designers? How many front-end engineers?
- Is there anyone on the team who sits at both sides — design engineer, or a developer who owns the design system?
- Who owns the design system today?

**On priorities:**
- Is this a top-3 problem for your team right now, or is it more of a slow burn?
- Have you budgeted anything for design infrastructure / tooling this quarter?

---

## What you're listening for

**Green flags:**
- "Figma and Storybook are always out of sync"
- "We don't have a design engineer and we need one"
- "AI tools are generating stuff that doesn't match our system"
- "Handoff takes [X days] and still has errors"
- They have tokens but acknowledge they're not enforced

**Yellow flags (worth probing, not dealbreakers):**
- "We're thinking about Storybook" — not set up yet, longer engagement
- "Our design system is pretty new" — might not have the pain yet
- "We're not using any AI tools yet" — this becomes a future conversation, not now

**Red flags:**
- No Figma, no component library, no appetite for either
- "Our designer and developer are the same person" — no handoff problem
- "We tried something like this and it didn't work" — probe the reason, but be honest if the fit isn't there

---

## Closing the call

Don't close with a price. Close with a next step.

> "Based on what you've described, I think there's something worth exploring here. What I'd suggest is starting with an audit — I'd spend a week looking at your current setup and come back with a written assessment of where the gaps are and what an agent architecture would look like for your stack. That's a fixed-fee engagement and you'd own the output either way. Does that seem like a useful first step?"

If they ask about price: "The audit starts at $5,000. If we move into a build engagement, that cost gets applied toward it."

---

## After the call

Send a follow-up email within 24 hours. One paragraph summarizing what you heard, one sentence on the recommended next step, one clear ask.
