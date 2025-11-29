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

## The Origin: Multiply Impact With Less

Now, why did I build this?

Our team had shrunk. The industry was in transition. We needed to deliver more with fewer resources. And I felt the pressure personally: I was wearing multiple hats, and I wasn't going to be able to give more of myself just by working longer hours.

**The challenge wasn't to do more by exhausting myself. The challenge was to reclaim the creative parts of my work.**

That's the constraint that drove Genie. I was spending energy on routine design tasks—audits, requirements generation, component mapping, routine user story creation—when I should have been spending that energy on novel design problems. On UX challenges that actually needed a designer's judgment.

I started thinking: What if there was a system that could handle the routine work? The design audits, the requirement generation from scope documents, the pattern-based work? What if I could compress three days of manual audit work into verification?

Not to cut costs. To reclaim creativity. To do work that only a designer can do. To give more of myself to the novel problems that actually needed me.

That's Genie. It's a reclamation of creative focus. It's leverage that lets me be a designer, not a design machine.

I had always loved solving for users, loved the craft of front-end quality, loved the connection with clients and understanding their needs. But I was losing that to routine. Genie was my way to get back to what I love about design.

### The Personal Problem

I was wearing multiple hats at Orium, but they were all design-related hats:

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

When I was brought in to lead the UX design for Genie, I faced a fundamental question: **How do you design for an intelligence that's partly autonomous, partly responsive, and operates across systems that users might not even see?**

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
- User asks: "What should our backlog be?" → Genie drafts it
- Project hits a risk indicator → Genie automatically alerts the team
- Genie sees a pattern → It recommends a decision (but doesn't execute)
- Friday 5 PM → Genie automatically generates weekly status deck and posts it to Slack

Without clear design signals, users could be confused: Did I make this decision or did the agent? Did I approve this action or did it happen automatically?

In enterprise contexts, confusion + autonomous systems = serious problems. We had to be obsessively clear about **who is in control at every moment**.

---

## My Design Approach: The Agentic UX Framework

As the architect of Genie's vision and the person responsible for its user experience, I approached this like any complex design system problem: **define the primitives, establish the patterns, create the governance**.

But I also drew from my own experience. I knew how I wanted to use Genie. I knew what information I needed to see. I knew when I wanted the agent to act and when I needed to approve.

The framework I built came from solving my own problems first, then extending those solutions to work for the entire organization.

### Principle 1: Capability Discovery Through Context

Instead of a generic "What can I do?" menu, we embedded capability hints directly into the user's workflow context.

**In Slack:**
- When a meeting ends, Genie offers: "Want me to summarize that and draft Jira tickets?"
- When reviewing a backlog, Genie offers: "I noticed missing requirements based on your scope. Should I flag these?"

**In Jira:**
- When viewing a project, Genie offers: "I can generate an executive summary of this sprint"
- When seeing incomplete tasks, Genie offers: "I can surface dependencies you might have missed"

**The Design Pattern:** *Contextual Capability Hints*
- Appears in the moment when it's most relevant
- Positions Genie as helpful, not intrusive
- Educates users about capabilities through use, not documentation

**Why this works:** Users learn what Genie can do by seeing offers at the moment they're needed. Over time, they develop a mental model of "when to ask Genie for help."

### Principle 2: Transparent Reasoning & Source Citation

Every output from Genie includes three things:

1. **Clear Source Citation**
   - Not just "Based on project data" but "Based on scope doc (v3, updated Oct 15), 14 Jira tickets, and 3 team RAID logs"
   - Users see exactly what Genie was working with

2. **Reasoning Breadcrumbs**
   - For a risk alert: "Flagging due to timeline gap between scope review (Sept 20) and first sprint kickoff (Oct 5)"
   - For a generated backlog: "Prioritized by your stated scope and Orium's historical project patterns"
   - For an automated summary: "Based on 3 design review meetings where [specific decision points] were discussed"

3. **Confidence Indicators**
   - High confidence (95%+): Green indicator, ready to use as-is
   - Medium confidence (75-95%): Yellow indicator, review before using
   - Low confidence (<75%): Red indicator, Genie asks for context before proceeding

**The Design Pattern:** *Transparent Output*
- Sources are always visible (not hidden in a footnote)
- Reasoning is explained in plain language
- Confidence levels help users calibrate trust

**Why this works:** Trust isn't blind—it's informed. When users can see Genie's thinking, they're more likely to act on its recommendations. And when they can see the sources, they know where to look if something seems wrong.

### Principle 3: Explicit Autonomy Modes

We designed Genie to communicate clearly about what mode it's operating in at any given moment.

**Four Modes of Operation:**

1. **Ask Mode** (Purely Responsive)
   - User explicitly requests: "Summarize this meeting"
   - Genie responds with output
   - Signal: "I'm waiting for your input"

2. **Alert Mode** (Proactive Awareness)
   - Genie surfaces something: "I noticed a risk: timeline gap"
   - User can acknowledge, dismiss, or ask for more detail
   - Genie doesn't take action without explicit approval
   - Signal: "I noticed something, here's what it is, what do you want to do?"

3. **Recommend Mode** (Intelligent Suggestion)
   - Genie suggests: "I can generate a backlog from your scope, should I?"
   - User reviews and approves before execution
   - Signal: "I have a solution ready, approve if you want me to proceed"

4. **Execute Mode** (Trusted Automation)
   - Genie performs trusted tasks: updates Jira, posts status, schedules summaries
   - Only for tasks with pre-established approval (e.g., "always draft sprint summaries on Fridays")
   - Signal: "I'm executing an approved workflow"

**Visual Indicators:**
- Mode is always visible (not buried in settings)
- Transitions between modes are explicit
- Users can adjust mode permissions per task/project

**Why this works:** Users always know if they're in control or if Genie is. This eliminates the anxiety of autonomous systems and creates trust through clarity.

---

## The Implementation: Design Patterns in Action

### Pattern 1: Skill Cards (Capability Exposition)

We designed "Skill Cards" to help users understand what Genie can do:

```
┌─────────────────────────────────┐
│ 📋 Auto-Generate Backlogs       │
├─────────────────────────────────┤
│ I can turn your scope documents │
│ into structured Jira tickets    │
│                                 │
│ Quality: 98% accepted on        │
│ first review                    │
│                                 │
│ Time saved: ~4 hours per project│
│                                 │
│ [Learn More] [Try It]           │
└─────────────────────────────────┘
```

Each card shows:
- What the skill does (plain language)
- Proven quality metric
- Time/effort saved
- Call-to-action to try it

**Why this works:** Users see capabilities at a glance and can try them with low friction. The metrics build confidence ("98% accepted on first review" is more compelling than "generates backlogs").

### Pattern 2: Source Chains (Transparency)

For every output, we show a visual source chain:

```
GENERATED FROM:
↓
[Scope Doc v3, Oct 15] 
    (12 requirements, 3 acceptance criteria)
↓
[7 Related Jira Tickets]
    (completed similar work, patterns applied)
↓
[3 RAID Logs] 
    (risks & decisions, factored into prioritization)
↓
= YOUR BACKLOG (ready to review)

Confidence: 98% | Sources: 22 data points | Time saved: ~4 hours
```

This chain shows:
- Exactly what Genie drew from
- How many data points were considered
- Transparency about the thinking

**Why this works:** Users can trace Genie's thinking. If something seems off, they can follow the chain to understand why. And when they see all the data being synthesized, they realize Genie is doing something they literally couldn't do manually (reviewing 22 data points across systems in 2 minutes).

### Pattern 3: Action Confirmations (Autonomy Control)

When Genie is about to take action, we show a confirmation that's specific and reviewable:

```
ABOUT TO EXECUTE:

📌 Create Jira Epic: "Q4 Mobile Experience"
   - Add 7 related tickets
   - Assign to: @Maria (if available)
   - Set sprint: Q4 Planning Sprint

📎 SOURCES:
   - Your scope doc Section 2.1
   - Orium's historical mobile project patterns
   - Your team's current capacity

⚠️  REQUIRES REVIEW:
   - Estimated hours (need to validate with team)

[Review] [Approve] [Cancel]
```

Each confirmation shows:
- Exactly what will happen (not vague)
- Why Genie made these choices (sources)
- What needs human review
- Clear approval path

**Why this works:** Users see exactly what's about to happen before it happens. They maintain control without friction—most times they can confidently hit "Approve," but they have full visibility if they want to tweak something.

---

## The Outcomes: What We Learned About Agentic UX

### Metrics That Matter

Since launching Genie with these design patterns, we've seen quantified business impact:

- **100% Adoption** across all new client-facing projects (not adoption by choice—it's simply how we work now)
- **75% Reduction** in team onboarding time (measured by time-to-first-productive-task for new team members)
- **98% Acceptance Rate** on auto-generated backlogs on first review (high-quality outputs people trust)
- **85% Fewer Risk Escalations** in fixed-cost projects (better early context prevents surprises)
- **60% Fewer Requirement Clarifications** during team handoffs (shared source of truth reduces miscommunication)

But the metric our project leads care most about? **Time freed up for higher-value work.**

### The Real Outcome: Freeing People to Do Human Work

What matters most isn't the efficiency metric. It's what we do with the time we've gained.

Previously, project leads spent 3-4 days per engagement doing setup work:
- Collecting documents and synthesizing information
- Building static spreadsheets and sending Slack messages
- Manually creating Jira tickets and requirements documentation

Now? That work takes a few hours, and most of it is reviewing what Genie generated—not doing it from scratch.

What do project leads do with those recovered hours? **Deeper discovery conversations. Better stakeholder relationships. Understanding client needs at a deeper level.**

As Jennifer (our delivery leader) said: "Instead of filtering beans on spreadsheets, we can actually be developing deeper relationships and better understanding our customers, their brands, their stakeholders' personal and team needs."

**That's the real design outcome.** We didn't just automate work. We freed up cognitive space for the strategic, human-centered work that actually drives project success.

And from a business perspective? That's what enables us to offer fixed-cost, fixed-scope engagements with confidence. Because we're not spending our team's brainpower on setup. We're spending it on strategy and delivery excellence.

### The Unexpected Learning

The biggest insight I had wasn't about agent design—it was behavioral.

We initially shipped Genie with tons of customization options: "Adjust confidence thresholds, modify decision logic, customize output formats..."

**Almost nobody used the customization.**

Not because it was hidden or hard to find. But because the defaults worked. People trusted the system. They just... used it.

This taught me something fundamental about agentic UX design:

**The goal isn't to give users maximum control. The goal is to design the agent so well that users trust it to make good decisions.**

Instead of building customization layers, we should have spent that time improving core decision-making and being radically transparent about it. We're doing that in v2, and adoption has climbed even higher.

---

## The Design Principle I Codified: Trust-First Agentic UX

After shipping Genie and watching thousands of users interact with it, I distilled the experience into a principle I call **"Trust-First Agentic UX Design."**

It became the foundation for how I think about all agentic experiences now:

```
Trust is built through three sequential layers:

LAYER 1: TRANSPARENCY
Can users see what the agent is working with and why?
→ How: Source citations, reasoning breadcrumbs, confidence levels
→ Question: "Can I trace this decision back to real data?"

LAYER 2: CAPABILITY CLARITY  
Do users understand what the agent can and can't do?
→ How: Contextual hints, skill cards, clear mode signals
→ Question: "Do I know when and how to ask for help?"

LAYER 3: CONTROL ASSURANCE
Do users feel in control even when the agent is autonomous?
→ How: Explicit mode indicators, action confirmations, easy overrides
→ Question: "Can I stop this if it goes wrong?"

Only when all three layers are present—in this order—can you create 
genuinely trusting agentic experiences.

Most people design for capability first (features), then add safety 
(controls), then hope transparency follows. That's backwards.

Start with transparency. Everything else builds from there.
```

This principle shifted how I design agents. It's not about building more features. It's about building clarity.

---

## Design Patterns for Agentic Systems (A Framework for Others)

If you're designing agentic experiences, here are the patterns we validated:

### Pattern Library for AI/AX Design

| Challenge | Pattern | How It Works |
|-----------|---------|--------------|
| **Users don't know what agent can do** | Contextual Capability Hints | Offer agent help at the moment it's most relevant |
| **Users don't trust agent outputs** | Transparent Reasoning + Source Citation | Show sources, confidence, reasoning in every output |
| **Users confused about autonomy level** | Explicit Mode Indicators | Always show if user is in control or agent is |
| **User anxiety about autonomous actions** | Pre-Approval Workflows | Get explicit approval before autonomous execution |
| **Complex agent reasoning seems like magic** | Reasoning Breadcrumbs | Explain decisions in plain language |
| **Users over-rely on agent without scrutiny** | Confidence Indicators | Show how confident agent is about each decision |
| **Unclear where agent gets its data** | Source Chains | Visualize all inputs considered |
| **User wants to adjust without reconfiguring** | Progressive Disclosure | Simple defaults, power settings for advanced users |

---

## Looking Forward: What's Next for Agentic UX Design

Genie is just the beginning. After successfully shipping this in 2025, Orium has made a strategic decision: **agents and agent infrastructure are now a line of business for 2026**.

This isn't a side project anymore. This is core to how we deliver.

### The Strategic Shift

What started as an internal tool is evolving into a **core platform capability**. The roadmap for 2026 includes:

**1. Risk Prediction (Not Just Risk Detection)**
- Today: Genie surfaces risks based on what's already happened
- Next: Predictive risk modeling—simulating what *could* happen and recommending preventative actions
- Why it matters: Teams can make better decisions before problems emerge

**2. Pre-Sales Integration**
- Today: Genie helps with delivery
- Next: Genie assists with discovery, estimation, and pre-sales scoping
- Why it matters: Better scope clarity earlier = fewer surprises during delivery

**3. Client-Facing Access**
- Today: Genie is Orium-internal
- Next: Clients can interact with Genie alongside our team
- Why it matters: Clients see real-time insights and reporting, increasing confidence in fixed-cost engagements
- Technical note: We're evaluating platforms (n8n, LangChain, and emerging tools) to ensure we can provide client access while respecting licensing

**4. Smarter Recommendations**
- Today: Genie generates backlogs based on Orium's practices
- Next: Recommendations are customized to each client's data, analytics, personas, product catalog, and competitive set
- Why it matters: Generic best practices → personalized strategy

### The Bigger Picture

When we started Genie, the goal was to reduce manual work. We succeeded—we cut onboarding time by 75%.

But the real insight is bigger: **the reason we can now confidently offer fixed-cost, fixed-scope engagements isn't just because we're experts. It's because we've built tools that increase confidence and reduce risk.**

As Everett said in our planning meeting: "The story isn't 'we have a tool that makes it cheaper.' The story is 'we can now tell you exactly what it will cost and deliver it with confidence.'"

That's the transformation Genie enabled. And that's what we're building toward with the next generation of agentic systems.

### Key Open Questions I'm Exploring

As we move into 2026 with agents as a core line of business, I'm thinking about:

1. **How do we design for agent personality and communication style?**
   - Should agents be robotic or conversational?
   - Should they have personality or stay neutral?
   - My hypothesis: Authenticity matters more than personality. Agents should communicate in a way that matches organizational culture.

2. **What does multi-agent orchestration look like from a UX perspective?**
   - Genie is one agent. We're building a family of orchestrated agents.
   - How do users understand which agent did what?
   - How do we visualize multi-agent workflows without overwhelming users?

3. **When should agents learn from feedback vs. stay consistent?**
   - Should Genie adapt its behavior based on user feedback?
   - Or should it be consistent but configurable?
   - Trade-offs: Learning enables personalization but reduces predictability.

4. **How do we teach users to work effectively with agents?**
   - What mental models do non-technical users need?
   - How do we onboard teams to agentic workflows?
   - Where's the line between intuitive and requiring training?

---

## Key Takeaways: Building a Product, Rebuilding Yourself

Building Genie from scratch—from personal tool to organizational platform—taught me that **the best way to grow as a technologist is to solve real problems at scale.**

You don't become an AI developer by taking courses. You become one by building something that requires you to think deeply about how agents work, how to orchestrate complexity, how to maintain transparency in autonomous systems.

You don't become a product manager by reading frameworks. You become one by making hard tradeoffs, gathering real feedback, iterating with real users, and learning from what works and what doesn't.

Here's what I'd tell anyone thinking about building their own products:

### 1. **Your Best Growth Comes From Real Problems**
Don't wait for permission to learn. If you have a problem, experiment. I learned n8n deeply, workflow orchestration, and AI development because I had to solve my own problem. That's more effective than any course. Real constraints force real learning.

### 2. **Stay Close to the Work While Leading**
You can be a high-performing individual contributor AND a leader. You don't have to choose. I remained hands-on in design and development while learning to manage complexity, gather feedback, and guide the vision. That proximity to the work made me a better leader, and staying hands-on kept me sharp.

### 3. **Know When to Go Deep and When to Step Back**
Building at scale requires knowing the difference. Deep knowledge on design patterns, n8n configuration, workflow orchestration. But also knowing when to say: "This is unfamiliar territory. I need help thinking about this differently." The best builders are comfortable with that tension.

### 4. **Serve Your Team While Serving Your Own Growth**
You don't have to choose between shipping for your team and developing yourself. Look for projects that do both. Genie served Orium's needs AND forced me to become a better technologist, a product thinker, a leader. That's the sweet spot. That's where real transformation happens.

### 5. **Building Products Changes You More Than Courses Ever Will**
Whether you're scaling to 10 teams or 1000, the principles are the same. Real feedback. Iteration. Hard tradeoffs. Navigating ups and downs. Learning from what doesn't work as much as what does. You become a different technologist by doing. By shipping. By iterating.

---

## The Real Challenge: Building For Others

Here's what they don't tell you about building products: **having a good idea is the easy part. Convincing exhausted teams to learn something new is the hard part.**

The metrics look good. 100% adoption on new projects. 75% reduction in setup time. Teams get it when they use it.

But getting them to USE it in the first place? That's where Genie is teaching me things I didn't expect.

### The Real Problem: Adoption and Fatigue

We ask a lot of our teams. Learn this new tool. Change your workflow. Think about delivery differently. Trust an agent to generate your requirements.

Our teams are already stretched. They're managing client relationships, shipping work, maintaining quality. And now we're asking them to learn something new.

**Genie is teaching me patience.**

Not everyone adopts immediately. Some teams are afraid of change. Some are too tired to learn new things. Some worry that automating requirements means losing the human connection to the work. Some don't trust that an agent can understand what they need.

These aren't objections to overcome. These are legitimate concerns from people doing hard work. And I need to listen.

### Building For Others, Not Just For Yourself

When I built Genie for me, I could iterate quickly. If something didn't work, I just changed it. I was the only user.

But now I'm building for our entire team. For people with different workflows. Different concerns. Different fears about AI and automation.

That's a completely different challenge. And it's humbling.

I'm spending time understanding why some teams love Genie and others are skeptical. Listening to overworked managers explain why they're afraid of introducing something new when they barely have bandwidth for what they already have. Understanding why some people see AI as a tool and others see it as a threat.

**I'm learning that building something useful for yourself doesn't mean it's automatically useful for others. That takes patience, listening, and genuine empathy for the people you're building for.**

It's also teaching me something about myself: **I built Genie to prove it to myself first. To prove that it would work. That it was worth the effort. Now I'm building it to prove it to others. To earn their trust through action, not just promises.**

### The Journey, Not The Destination

The real metrics aren't the adoption numbers. The real metrics are the conversations.

Why do some people love Genie? Why do some people hate it? Why does AI inspire both hope and fear in people? Why do teams resist change even when it could help them?

I don't have all the answers. I'm learning them by building, listening, iterating, failing, trying again.

I have sleepless nights wondering if I'm solving the right problem. If Genie actually helps or if it just shifts work around. If I'm adding value or adding complexity.

I have days where it feels like nobody gets it. Days where adoption is slow and feedback is harsh.

And I have other days where a team tells me that Genie saved them hours, freed them up to focus on what they actually care about, or helped them catch something they would have missed.

**That's the messy reality of building something real.**

### What I'm Learning (Beyond Genie)

Through this process, I'm building something more valuable than the tool itself: **resilience.**

I'm learning to take good feedback seriously and bad feedback lightly. To distinguish between "this doesn't work" and "I don't understand how this works." To hear "I'm too tired to learn" and respond with empathy instead of pushing harder.

I'm learning that the most important skill in building might not be technical. It might be listening. Understanding what people actually need (not what they say they need). Respecting when people say no.

I'm building a skillset that's transferable. Not just in AI and workflow systems, but in patience. In resilience to change. In the ability to sit with feedback—good and bad—and stay committed to the work.

I'm learning that real impact isn't about being right. **It's about understanding why people resist, what they're actually afraid of, and building something that addresses their real fears, not just their stated problems.**

That's what Genie is teaching me. And I'm not sure how long that lesson will take.

But I know it's worth it.

Genie isn't just a product. It's a documented journey of transformation.

When I started building it, I was a designer who could code. Useful, but limited. By the time it became an organizational platform, I'd become something different:

- **An AI developer** - not theoretically, but practically. I understand agents, orchestration, workflow design because I've had to build and iterate on them.
- **An n8n expert** - not from tutorials, but from pushing the platform to its limits, understanding its philosophy, knowing when to use it and when its limitations require different approaches.
- **A product thinker** - learning by doing. Making tradeoffs. Gathering real feedback. Understanding that shipping is more important than perfection.
- **A leader who codes** - maintaining the ability to remain hands-on while coordinating complexity across teams and disciplines.
- **Someone comfortable with not knowing** - understanding which problems deserve deep expertise and which require humility and collaboration.

That transformation is the real story. Not just what I built, but what building it made me capable of.

Genie also represents something I'm deeply passionate about: **using design to make complex technology accessible.**

Too often, AI systems feel magical and mysterious. My goal has been to design Genie in a way that demystifies it—showing how it works, why it works, and giving users and other builders the mental models they need to work effectively in this space.

If we get this right, agentic AI becomes less of a "magic black box" and more of a "transparent, trustworthy collaborator."

**That's the future I'm designing and building toward.**

---

## What I'm Sharing

This case study is my contribution to the emerging field of Agentic Experience (AI/AX) design. As more teams begin building agents, I believe the design patterns we've established with Genie will become foundational.

**For product designers:**  
If you're building agentic experiences, I'd love to hear what patterns you're discovering. The field needs more voices.

**For product leaders:**  
If you're considering agentic AI for your product, start with user mental models. Everything else follows from that.

**For my team at Orium:**  
Thank you for trusting me to lead design on something this experimental. The patterns we've established here will inform everything we do next.

---

## Questions I'm Exploring

If you're interested in this space, I'm exploring:
- How do we design for agent confidence and failure modes?
- What does agentic UX look like in high-stakes industries?
- How do we teach users to work effectively with agents?
- What mental models do non-technical users need?

Feel free to reach out if you're thinking about similar challenges.

---

**Jacques Ramphal**  
Staff Product Designer, Design Lead for Genie  
Orium  
[@jacques_ramphal](https://twitter.com/jacques_ramphal)

---

## Appendix: Design System Artifacts

*[If publishing on blog, you might include:]*

- Figma file: Agentic UX Patterns Library
- Pattern: Skill Cards (with variations)
- Pattern: Source Chains (implementation details)
- Pattern: Mode Indicators (all states)
- Pattern: Action Confirmations (templates)

---

## Resources & References

- n8n: [https://n8n.io](https://n8n.io) (The orchestration platform Genie runs on)
- Orium Case Study: [https://orium.com/case-study-genie](https://orium.com/case-study-genie)
- Related Reading: "Designing for AI" by Josh Lovejoy, "AI for Everyone" by Andrew Ng

