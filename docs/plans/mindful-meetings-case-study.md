# Mindful Meetings — case study (draft)

> **Status: WORK IN PROGRESS — draft.** The "showable" product leg of the mindfulness track. Grounded in the rebuilt repo (`github.com/jacquesramphal/mindful-meetings`, app name "MindSet"). Employer-agnostic. Follows the site case-study structure.

| | |
|---|---|
| **Role** | Designer & Developer |
| **Type** | Personal product · prototype |
| **Stack** | React, TypeScript, Vite, Chakra UI, Framer Motion |
| **Status** | Rebuilt · functional prototype |
| **Repo** | github.com/jacquesramphal/mindful-meetings |

## Key Learning

The smallest thing that changes a meeting isn't a tool people have to adopt. It's a few seconds of structure at the start and the end. The design problem was subtraction: how little you can do and still change how a meeting feels.

## Overview

Meetings start cold and end abruptly. People arrive carrying the last thing, half-present, and leave without closing anything. Mindful Meetings gives a meeting a beginning and an end — a short opening pause to actually arrive, and a brief reflective close — without asking anyone to install a meditation habit.

I first designed it in 2019 to accompany a workshop on mindfulness in the workplace. I rebuilt it recently, from scratch, in a modern front-end stack.

## The Constraint

The intervention has to be nearly invisible. Anything that announces "now we're doing mindfulness" gets quiet resistance in a work meeting. So it had to read as part of the meeting's structure, not a wellness add-on: configurable, skippable, and short by default.

## Approach

### One screen to set the shape of the meeting
Setup is a single screen: name the meeting, set its length, set the opening pause (five minutes by default), and toggle audio guidance and a wrap-up reminder. The defaults are sensible enough that it runs with almost no decisions.

### Bookend the time, don't fill it
The flow is three deliberate beats: an opening pause to arrive, the meeting running quietly with an optional wrap-up nudge, and a short survey to close. The app does less on purpose. It holds the structure so the people in the room don't have to.

### Calm by construction
The interface is quiet by design — restrained color, soft motion, nothing competing for attention during a pause. For a product about creating space, the medium had to match the message, so the build leans on a controlled theme and gentle transitions rather than anything that pulls focus.

## Outcome

A functional prototype: a configurable meeting, an opening pause, a timed session with guidance and a wrap-up reminder, and a closing check-in. It never shipped as a product, and for a portfolio piece that's fine — it's a specific idea executed cleanly, and the rebuild shows current front-end craft.

## What I Learned

The hard part of "mindfulness at work" was never the technology. It was making the intervention small enough that people would let it happen at all. The interesting design work was in what I left out.

---

*Draft notes: employer-agnostic on purpose (personal rebuild) — mention the 2019 talk origin in passing, don't lead with the employer. Add 2–3 screenshots for the site version. Polish to "showable," not "shippable" (see course/mindfulness plans).*
