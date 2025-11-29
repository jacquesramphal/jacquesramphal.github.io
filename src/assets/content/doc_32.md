# Designing Genie: Pioneering UX Patterns for Agentic AI

**By Jacques Ramphal**  
*Design Lead & Product Owner, Orium*  
*November 2025*

---

## What is Genie?

Before I tell you the story of building it, you need to understand what Genie actually is.

**Genie is an agentic orchestration layer for delivery operations.** It's a system that connects to your live project ecosystem—Jira, Slack, Mavenlink, your project databases—and continuously synthesizes context, surfaces insights, and automates workflows without requiring manual intervention.

Think of it this way: **Genie is what happens when you give an agent access to all your operational data and the ability to take action.**

At its core, Genie does four things:

1. **Consolidates Context** — It pulls information from 10+ systems and maintains persistent awareness of project state. Instead of fragmented data across tools, there's one unified understanding of where things stand.

2. **Generates Requirements** — It draws from your historical project data and patterns to auto-generate backlogs, requirements, and scope documents. Instead of building from scratch every time, it learns from what you've done before.

3. **Surfaces Risks** — It identifies emerging problems before they become catastrophic. It generates daily alerts and weekly executive summaries, surfacing the signal among the noise.

4. **Automates Workflows** — It takes action: creates tickets, sends reminders, generates presentation decks, publishes updates. It handles the busywork so humans can focus on decisions.

Most importantly: **Genie maintains transparency about what it's doing and why.** Every output shows sources, reasoning, and confidence levels. It's not a black box. It's a trustworthy collaborator.

---

## The Origin: Reclaim Creative Focus

Our team had shrunk. The industry was in transition. I was wearing multiple design hats and spending creative energy on routine work.

**The challenge wasn't to do more by exhausting myself. The challenge was to reclaim the creative parts of my work.**

### The Personal Problem

I was wearing multiple hats at Orium, but they were all design-related:

- **Leading design systems** — Maintaining consistency across projects, managing component libraries, documenting patterns
- **Design audits and quality** — Running site audits, analyzing UX flows, identifying quality gaps
- **User stories and requirements** — Generating requirements from scope documents, mapping user needs to features
- **Component mapping** — Organizing and cataloging components in our starter kit, documenting API surfaces
- **Front-end quality** — Ensuring design fidelity in development, maintaining visual and interaction consistency

This was all **necessary work**. But it was repetitive work. Work where the patterns were predictable. Work that consumed my creative energy on routine tasks instead of the novel challenges.

At the start of every project, the same routine played out:
- Synthesizing information from 10 different sources (sales notes, scope docs, design files, Slack conversations, interview transcripts) to build a coherent user story
- Generating requirements from scratch, even though we'd done similar projects hundreds of times with similar user patterns
- Running audits and manually flagging risks I'd seen before in other engagements
- Building design backlogs that took days to compile and often missed context or context shifts mid-project

**The real problem:** I was spending creativity on routine. Every hour I spent on repetitive design work was an hour I wasn't spending on novel problems. Novel thinking. The kind of work that actually needed a designer's judgment.

I love design. I love solving user problems. I love the craft of front-end quality. But I was spending too much time on the mechanical parts of design work when I could be spending that time on the creative parts.

**The insight:** What if I could automate the repetitive design work so I could reclaim that creative energy?

Not to do more work. To do better work. To redirect my effort from routine to novel.

That's when I started experimenting.

### The Spark: A Personal Experiment

I wasn't thinking about building a company product. I was thinking about automating the routine design work so I could reclaim the creative parts.

I started experimenting on late afternoons—30 minutes between design reviews here, an hour on Friday evening there. Nothing fancy. Small automations. Custom GPTs. Scripts that could run site audits, generate user stories from scope documents, map components in our starter kit.

But here's what's important: **I wasn't just automating for automation's sake. I was learning tools I'd never used before—n8n, workflow orchestration, agentic AI patterns—to solve problems I'd never encountered. Problems for others that started with my own problems.**

That forced me to learn AI development in earnest. Not theoretically. Practically. I had to **understand** how agents work because I was building one to solve specific design challenges.

That forced me to learn n8n deeply. To understand workflow orchestration. To think about agents not as a cool tech concept but as a system that had to handle real design data, real design decisions, real design consequences.

It was a passion project. It was also an education in technologies I'd never needed before, learning them to solve problems I'd never encountered.

### From Personal Reclamation to Organizational Capability

Then something unexpected happened: **everyone wanted it.**

I showed my quick experiments to the team, and people started asking: "Can Genie do this audit for us? Can it generate user stories for our scope? Can it help with component mapping?"

I realized my problem wasn't unique. Every designer on our team was drowning in routine work. Every member was spending creative energy on mechanical tasks when they could be spending it on novel challenges. On understanding users. On solving the real design problems.

**My personal reclamation could become an organizational reclamation.**

That's when it got interesting. Building Genie for just me was one challenge. Scaling it so the whole design team could reclaim creativity? That required me to become something new.

I had to become a product manager. Not in the traditional sense—I was still a designer. I was in the trenches, shipping features, gathering feedback from the team, making tradeoffs about what to automate and what to keep manual. Learning product thinking through building for other designers.

I had to learn how to lead without full authority. How to champion a vision for reclaiming creative work while remaining a high-performing individual contributor. How to serve my team's needs to do better design work. How to work with key collaborators (Everett, Jennifer) and distribute the load of building something this complex.

When I brought the experiments to leadership, Everett saw what I was figuring out: this could transform not just how we work, but what kind of work we focus on. Instead of routine and mechanical, more novel and strategic. More connected to users and their real problems.

I pitched the vision: **a supervisor agent with access to design and project data, capable of orchestrating design audits, requirements generation, and design pattern recognition—surfacing insights in real-time and freeing designers to focus on novel user problems.**

But building that vision meant I had to go deep on things I didn't fully understand. Unfamiliar territory for a designer. Complex integration challenges. Technical decisions about what should be automated and what should remain human-centered.

I learned to ask: When do I dig deep? When do I step back? When do I admit I don't know and seek help?

Building Genie at scale—often as a one-person show supported by collaborators—taught me that **the best builders are comfortable with not knowing everything.**

They know when to get deep on hard problems. And they know when to step back and say: "This is bigger than my current expertise. Let's think about this differently."

That's what happened. From personal reclamation of creativity to organizational platform, I wasn't just building a product. **I was rebuilding my own skillset.**

I became an AI developer. A workflow orchestration expert. A product thinker. A designer who codes and builds agent systems. Someone who understands the intersection of design, development, and AI in a way I couldn't have if I'd stayed in my lane.

But most importantly: I stayed a designer. I stayed connected to what I love about design—solving for users, understanding their needs, crafting experiences that matter. Genie just gave me back the time and creative energy to focus on that.

**That's the real story of Genie.**

It's not just what I built. It's what building it made me capable of. And more importantly, it's what it enabled us to do as a team—to reclaim our creativity and focus on the design work that actually matters.

---

## The Problem: Designing an Interface That Doesn't Feel Like an Interface

When I faced the design challenge for Genie, I had a fundamental question: **How do you design for an intelligence that's partly autonomous, partly responsive, and operates across systems that users might not even see?**

This wasn't like designing a typical app interface. This was about designing **mental models for collaboration with AI**.

The design patterns for chatbots, assistants, and conversational interfaces were well-established. But **agentic AI is different**. 

An agent isn't just responsive to user input—it's proactive. It reasons about problems, orchestrates workflows across systems, and takes autonomous action. The mental model users need to develop for this is fundamentally different from anything we'd designed before.

This meant we couldn't just apply existing design patterns. We had to pioneer new ones.

### The Core Challenge

Here's what we were grappling with:

**How do you design for an intelligence that:**
- Works across live systems (Jira, Slack, Mavenlink, internal databases)?
- Makes decisions with real consequences (creating tickets, assigning work, generating reports)?
- Operates partly autonomously and partly on user request?
- Must maintain transparency about what it's doing and why?

**Traditional design thinking wasn't enough.** We needed a framework for **agentic experience design**—and we had to invent it as we went.

---

## The Design Challenge: My Three Mental Model Problems

Once the team was aligned on the vision, I owned the design challenge. And it was immediately clear: this wasn't a typical design problem.

Genie isn't a feature to bolt onto an app. It's a fundamental rethinking of how humans and AI collaborate. As the person who envisioned this, I had to define what the user experience should even look like.

I discovered three core problems I had to solve—problems that became the pillars of my agentic UX framework:

### 1. **Capability Exposition: "What Can Genie Actually Do?"**

When I shared my initial experiments with the team, I quickly realized: **people didn't know what to ask for.**

I had built tools to solve MY specific problems. But other team members had slightly different workflows. They weren't sure if Genie could help them, or what to ask for.

**The Real Problem:**
- Project leads asking: "Can it draft requirements differently than I would?"
- Delivery managers: "Does it understand our estimation patterns?"
- Designers: "Can it surface what's missing from scope?"
- But nobody was actively thinking to ask Genie. They didn't have a mental model of its capabilities in their workflow.

I was building an agent, but if people didn't understand what it could do or when to ask for help, all that capability would be invisible. They'd keep doing manual work out of habit.

**As Everett put it:** "People need to know Genie exists as a solution before they can think to use it."

The design challenge: How do I surface capabilities in the moment people need them, not buried in documentation?

### 2. **Trust & Transparency: "Should I Actually Believe This?"**

This was the hardest problem to solve because it goes to the heart of working with autonomous systems.

Agentic systems make decisions with consequences. When Genie generates a backlog, identifies a project risk, or creates a Jira ticket, **someone has to decide whether to trust that output and act on it.**

**The Real Problem We Saw:**
- A project manager receives a risk alert from Genie. Do they act on it? Escalate? Dismiss it?
- An agent drafts a 20-ticket Jira backlog. Do they approve it as-is or rework it?
- A scope summary is auto-generated. What if it misses critical details? What if it hallucinates?

Early in the process, we had to make a hard choice: **Do we want to be correct 90% of the time and let users figure out the failures? Or do we design for transparency so users can verify?**

We chose the latter. This meant designing outputs that showed **where Genie got its information, how it reasoned, and what it was confident about**. We needed **justified trust**, not blind faith.

### 3. **Autonomy vs. Control: "Who's Actually in Charge?"**

This is the one that kept me up at night.

Genie operates across multiple modes: sometimes it answers questions, sometimes it surfaces insights without being asked, sometimes it executes workflows, sometimes it generates artifacts. **The danger is when users don't know which mode they're in.**

**The Real Scenarios We Had to Design For:**
- User requests an output → Agent generates it on demand
- System detects a threshold condition → Agent proactively surfaces an alert
- Agent identifies an opportunity → It suggests an action (but requires approval)
- Scheduled trigger occurs → Agent autonomously executes a routine workflow

Without clear design signals, users could be confused: Did I make this decision or did the agent? Did I approve this action or did it happen automatically?

In enterprise contexts, confusion + autonomous systems = serious problems. We had to be obsessively clear about **who is in control at every moment**.

---

## The Outcomes: What We Learned About Agentic UX

### The Real Outcome: Freeing People to Do Human Work

What matters most isn't efficiency metrics. It's what we do with the time we've gained.

Previously, project leads spent days per engagement doing setup work:
- Collecting documents and synthesizing information
- Building static spreadsheets and sending Slack messages
- Manually creating Jira tickets and requirements documentation

Now? That work takes significantly less time, and most of it is reviewing what Genie generated—not doing it from scratch.

What do project leads do with those recovered hours? **Deeper discovery conversations. Better stakeholder relationships. Understanding client needs at a deeper level.**

As Jennifer (our delivery leader) said: "Instead of filtering beans on spreadsheets, we can actually be developing deeper relationships and better understanding our customers, their brands, their stakeholders' personal and team needs."

**That's the real design outcome.** We didn't just automate work. We freed up cognitive space for the strategic, human-centered work that actually drives project success.

And from a business perspective? That's what enables us to offer fixed-cost, fixed-scope engagements with confidence. Because we're not spending our team's brainpower on setup. We're spending it on strategy and delivery excellence.

### What We're Seeing

Since launching Genie, we're seeing teams adopt it across new projects. The outputs are high-quality—people trust what Genie generates. We're seeing fewer risk escalations because better early context prevents surprises. And we're seeing fewer requirement clarifications because there's a shared source of truth.

But the real measure of success? **Teams are using the time Genie saves to do work that actually needs human judgment and creativity.**

---

## Key Takeaways: Building a Product, Rebuilding Yourself

Building Genie from scratch—from personal tool to organizational platform—taught me that **the best way to grow as a technologist is to solve real problems at scale.**

You don't become an AI developer by taking courses. You become one by building something that requires you to think deeply about how agents work.

You don't become a product manager by reading frameworks. You become one by making hard tradeoffs and gathering real feedback.

#### 1. **Your Best Growth Comes From Real Problems**
Don't wait for permission to learn. If you have a problem, experiment. Real constraints force real learning.

#### 2. **Stay Close to the Work While Leading**
You can be a high-performing individual contributor AND a leader. That proximity to the work makes you a better leader.

#### 3. **Know When to Go Deep and When to Step Back**
Building at scale requires knowing the difference. The best builders are comfortable with that tension.

#### 4. **Serve Your Team While Serving Your Own Growth**
Look for projects that do both. That's the sweet spot. That's where real transformation happens.

You become a different technologist by doing. By shipping. By iterating.

---

## The Real Challenge: Building For Others

Here's what they don't tell you about building products: **having a good idea is the easy part. Convincing exhausted teams to learn something new is the hard part.**

### The Real Problem: Adoption and Fatigue

We ask a lot of our teams. Learn this new tool. Change your workflow. Trust an agent to generate your requirements.

Our teams are already stretched. And now we're asking them to learn something new.

**Genie is teaching me patience.**

Not everyone adopts immediately. Some teams are afraid of change. Some are too tired to learn new things. Some worry that automating requirements means losing the human connection to the work. Some don't trust that an agent can understand what they need.

These aren't objections to overcome. **These are legitimate concerns from people doing hard work.**

### Building For Others, Not Just For Yourself

When I built Genie for me, I could iterate quickly. But now I'm building for people with different workflows. Different concerns. Different fears about AI.

That's a completely different challenge. And it's humbling.

**I'm learning that building something useful for yourself doesn't mean it's automatically useful for others. That takes patience, listening, and genuine empathy for the people you're building for.**

I built Genie to prove it to myself first. Now I'm building it to prove it to others. To earn their trust through action, not just promises.

### The Journey, Not The Destination

The real metrics aren't adoption numbers. The real metrics are the conversations.

I don't have all the answers. I'm learning them by building, listening, failing, trying again.

I have sleepless nights wondering if I'm solving the right problem. Days where adoption is slow. Days where it feels like nobody gets it.

And other days where a team tells me Genie saved them hours, freed them to focus on what they care about, helped them catch something they would have missed.

**That's the messy reality of building something real.**

### What I'm Learning

Through this process, I'm building **resilience.**

I'm learning to take good feedback seriously and bad feedback lightly. To hear "I'm too tired to learn" and respond with empathy.

I'm building a skillset that's transferable. Not just in AI and workflow systems, but in patience. In resilience to change. In the ability to listen and understand why people resist.

**Real impact isn't about being right. It's about understanding why people resist, what they're actually afraid of, and building something that addresses their real fears.**

That's what Genie is teaching me.

---

**Jacques Ramphal**  
*Senior Product Designer & Design Lead for Genie | Orium*

*This is the full case study. For the summary version, [click here](/doc/31).*

