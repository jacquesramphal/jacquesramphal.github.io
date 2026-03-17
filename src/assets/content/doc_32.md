![Genie n8n Workflow](../images/genie.png)

# Designing Genie
An agentic orchestration layer for design delivery — built to automate routine work so the team could focus on the kind that actually requires a person.

| | |
|---|---|
| **Role** | Lead Designer · Product |
| **Client** | Internal / Orium |
| **Status** | In Progress · 2024 |
| **Tags** | ai · agentic-ai · product |

## Overview

Routine delivery work — user stories, audits, component mapping, requirements — was consuming the time and energy that should have gone toward design problems worth solving.

Every project at Orium moved through the same sequence of mechanical tasks: gather context from scattered sources, shape it into user stories, run audits in the same form as every previous project, assemble backlogs that would shift once the work got moving anyway. None of it was wasted, but all of it consumed hours that could have gone elsewhere. The question I started with was small — could the predictable parts be automated? The answer turned out to be large.

## A Personal Experiment

I started in small pockets of time. Thirty minutes between design reviews, an hour on a Friday evening, playing with automations, custom GPTs, and scripts that could run audits and generate user stories.

I was learning tools I'd never touched before — n8n, workflow orchestration, agentic AI patterns — to solve problems I'd never encountered before. It became an education I hadn't planned on. When I showed some of the experiments to the team, the questions came quickly: Could Genie run this audit for us? Could it generate user stories for our scope? It turned out my problems weren't unique. Every designer was spending creative energy on routine tasks. What started as personal reclamation could become organizational reclamation.

## My Role

I designed Genie from the ground up and built the first version — which meant becoming an AI developer, a workflow orchestration practitioner, and a product thinker in real time, while staying a designer.

Building for other designers, not just myself, required learning product thinking by doing it: leading without formal authority, championing a vision while remaining an individual contributor, making decisions that affected people with very different workflows. I had to learn when to admit I didn't know enough and ask for help, and when to accept that some problems were bigger than my current expertise.

## The Constraint

Designing for an AI agent means designing for a system that can't guarantee the same result twice — and getting users to trust something that can't promise the same output is a different problem than any conventional UX I'd worked on.

The design challenge was making Genie's reasoning legible — showing enough of how it arrived at an output that a designer could validate, override, or redirect it without needing to understand the underlying model. Adoption was a second constraint: teams were already stretched, and asking them to change deeply ingrained delivery habits required evidence, not argument.

## Approach

Three problems worth naming — trust, transparency, and task ownership — each requiring a different design response.

The trust problem required outputs that showed their work. The transparency problem required the right level of context: enough to understand, not so much that it buried what mattered. The task ownership problem was the most subtle: making sure Genie handled the routine work without users feeling like the design judgment had been taken from them. Genie connects to Jira, Slack, Mavenlink, and internal project databases, synthesizing context and acting on it: generating requirements, running audits, mapping components, flagging risks.

![Genie n8n Workflow](../images/genie.png)
*The n8n workflow behind Genie — context synthesis, requirements generation, audit automation, risk surfacing.*

## Outcome

Genie moved from a personal experiment to an organizational platform used across delivery projects at Orium — covered in an official post on the company blog and adopted by designers across the team.

The hours it saves are real, but the more significant shift is what those hours get redirected toward: the judgment calls, the design decisions, the problems that actually require a person in the room.

## What I Learned

When you're deep in the work, questions about vision documents and roadmaps and success metrics can feel jarring. The perspective shift that helped: you don't get asked those questions unless what you've built matters. They're not criticism — they're signals that you crossed a threshold.

Building for others meant slowing down and accepting that usefulness isn't universal by default. Some days are hard — adoption is slow, nobody seems to get it. Other days a team tells you Genie saved them hours, helped them catch something they would have missed, or gave them space to focus on what they care about. Both kinds of days are the reality of building something real. Real impact isn't about being right. It's about understanding why people resist, what they're afraid of, and creating something that actually addresses those fears.

---

*The full story — from personal experiment to rebuilding my own skillset — [Building Genie Changed Me →](/doc/building-genie-changed-me)*
