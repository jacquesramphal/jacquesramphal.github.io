<header>

# Designing Genie: Pioneering UX Patterns for Agentic AI

#### This is the story of building Genie—from personal experiment to organizational platform—and the three mental model problems we had to solve to design for agentic AI.


</header>
![Genie Core Functions Diagram](../images/casestudy/genie/genie.png)


## What is Genie?

Before I tell you the story of building it, you need to understand what Genie actually is.

**Genie is an agentic orchestration layer for delivery operations.** It connects to your live project ecosystem—Jira, Slack, Mavenlink, project databases—and continuously synthesizes context, surfaces insights, and automates workflows without manual intervention.

Think of it this way: **Genie is what happens when you give an agent access to all your operational data and the ability to take action.**

At its core, Genie does four things:

1. **Consolidates Context** — Pulls information from 10+ systems and maintains persistent awareness of project state. One unified understanding instead of fragmented data across tools.

2. **Generates Requirements** — Draws from historical project data and patterns to auto-generate backlogs, requirements, and scope documents. Learns from what you've done before.

3. **Surfaces Risks** — Identifies emerging problems before they become catastrophic. Generates daily alerts and weekly executive summaries, surfacing signal among noise.

4. **Automates Workflows** — Takes action: creates tickets, sends reminders, generates presentation decks, publishes updates. Handles busywork so humans can focus on decisions.

Most importantly: **Genie maintains transparency about what it's doing and why.** Every output shows sources and reasoning. **It's a collaborator, not a black box.**

## The Origin: Reclaiming Creative Focus

Our team had shrunk. The industry was in transition. I was wearing multiple design hats and spending creative energy on routine work.

**The challenge wasn't to do more by exhausting myself. The challenge was to reclaim the creative parts of my work.**

### The Personal Problem

I was leading design systems, running audits, generating requirements, mapping components, ensuring front-end quality. All necessary work. But it was repetitive. Predictable patterns consuming my creative energy.

At the start of every project, the same routine:
- Synthesizing information from 10 different sources to build coherent user stories
- Generating requirements from scratch, even though we'd done similar projects hundreds of times
- Running audits and manually flagging risks I'd seen before
- Building design backlogs that took days and often missed context shifts mid-project

**The real problem:** I was spending creativity on routine. Every hour on repetitive design work was an hour not spent on novel problems that actually needed a designer's judgment.

**The insight:** What if I could automate the repetitive work to reclaim that creative energy? Not to do more work. To do better work.

![Routine vs Creative Work](../images/casestudy/genie/genie.png)

### The Spark: A Personal Experiment

I started experimenting on late afternoons—30 minutes between design reviews, an hour on Friday evenings. Small automations. Custom GPTs. Scripts that could run site audits, generate user stories, map components.

But here's what mattered: **I wasn't just automating for automation's sake. I was learning tools I'd never used—n8n, workflow orchestration, agentic AI patterns—to solve problems I'd never encountered.**

That forced me to learn AI development in earnest. Not theoretically. Practically. I had to understand how agents work because I was building one to solve specific design challenges.

It was a passion project. It was also an education in technologies I'd never needed before.

### From Personal Tool to Organizational Platform

Then something unexpected happened: **everyone wanted it.**

I showed my experiments to the team, and people started asking: "Can Genie do this audit for us? Can it generate user stories for our scope? Can it help with component mapping?"

I realized my problem wasn't unique. Every designer was drowning in routine work, spending creative energy on mechanical tasks when they could be solving novel challenges.

**My personal reclamation could become an organizational reclamation.**

Building Genie for just me was one challenge. Scaling it for the whole team? That required me to become something new.

I had to become a product manager. Not in the traditional sense—I was still a designer in the trenches, shipping features, gathering feedback, making tradeoffs. Learning product thinking by building for other designers.

I had to learn how to lead without full authority. How to champion a vision while remaining a high-performing individual contributor. How to work with key collaborators and distribute the load.

When I brought the experiments to leadership, they saw what I was figuring out: this could transform not just how we work, but what kind of work we focus on. Instead of routine and mechanical, more novel and strategic.

I pitched the vision: **a supervisor agent with access to design and project data, capable of orchestrating design audits, requirements generation, and design pattern recognition—surfacing insights in real-time and freeing designers to focus on novel user problems.**

Building that vision meant going deep on things I didn't fully understand. Unfamiliar territory for a designer. Complex integration challenges. Technical decisions about what should be automated and what should remain human-centered.

I learned to ask: When do I dig deep? When do I step back? When do I admit I don't know and seek help?

Building Genie at scale—often as a one-person show supported by collaborators—taught me that **the best builders are comfortable with not knowing everything.** They know when to get deep on hard problems. And they know when to step back and say: "This is bigger than my current expertise. Let's think about this differently."

From personal reclamation to organizational platform, I wasn't just building a product. **I was rebuilding my own skillset.**

I became an AI developer. A workflow orchestration expert. A product thinker. A designer who codes and builds agent systems. Someone who understands the intersection of design, development, and AI in a way I couldn't have if I'd stayed in my lane.

But most importantly: I stayed a designer. I stayed connected to what I love—solving for users, understanding their needs, crafting experiences that matter. Genie just gave me back the time and creative energy to focus on that.

**That's the real story of Genie.** It's not just what I built. It's what building it made me capable of. And what it enabled us to do as a team—to reclaim our creativity and focus on the design work that actually matters.

## The Design Challenge: Three Mental Model Problems

When I faced the design challenge for Genie, I had a fundamental question: **How do you design for an intelligence that's partly autonomous, partly responsive, and operates across systems that users might not even see?**

This wasn't like designing a typical app interface. This was about designing **mental models for collaboration with AI**.

The design patterns for chatbots and assistants were well-established. But **agentic AI is different**. An agent isn't just responsive—it's proactive. It reasons about problems, orchestrates workflows across systems, and takes autonomous action.

We couldn't just apply existing design patterns. We had to pioneer new ones.

![Three Mental Model Problems](../images/casestudy/genie/genie.png)

### 1. Capability Exposition: "What Can Genie Actually Do?"

When I shared my initial experiments with the team, I quickly realized: **people didn't know what to ask for.**

I had built tools to solve my specific problems. But other team members had different workflows. They weren't sure if Genie could help them, or what to ask for.

- Project leads: "Can it draft requirements differently than I would?"
- Delivery managers: "Does it understand our estimation patterns?"
- Designers: "Can it surface what's missing from scope?"

But nobody was actively thinking to ask Genie. They didn't have a mental model of its capabilities in their workflow.

**As one team member put it:** "People need to know Genie exists as a solution before they can think to use it."

The design challenge: How do I surface capabilities in the moment people need them, not buried in documentation?

### 2. Trust & Transparency: "Should I Actually Believe This?"

This was the hardest problem because it goes to the heart of working with autonomous systems.

Agentic systems make decisions with consequences. When Genie generates a backlog, identifies a project risk, or creates a Jira ticket, **someone has to decide whether to trust that output and act on it.**

**The scenarios we had to design for:**
- A project manager receives a risk alert. Do they act on it? Escalate? Dismiss it?
- An agent drafts a 20-ticket Jira backlog. Do they approve it as-is or rework it?
- A scope summary is auto-generated. What if it misses critical details? What if it hallucinates?

Early on, we had to make a hard choice: **Do we want to be correct 90% of the time and let users figure out the failures? Or do we design for transparency so users can verify?**

We chose the latter. This meant designing outputs that showed **where Genie got its information, how it reasoned, and what it was confident about**. We needed **justified trust**, not blind faith.

![Trust and Transparency Design](../images/casestudy/genie/genie.png)

### 3. Autonomy vs. Control: "Who's Actually in Charge?"

This is the one that kept me up at night.

Genie operates across multiple modes: answering questions, surfacing insights without being asked, executing workflows, generating artifacts. **The danger is when users don't know which mode they're in.**

**The scenarios we had to design for:**
- User requests an output → Agent generates it on demand
- System detects a threshold condition → Agent proactively surfaces an alert
- Agent identifies an opportunity → It suggests an action (but requires approval)
- Scheduled trigger occurs → Agent autonomously executes a routine workflow

Without clear design signals, users could be confused: Did I make this decision or did the agent? Did I approve this action or did it happen automatically?

In enterprise contexts, confusion + autonomous systems = serious problems. We had to be obsessively clear about **who is in control at every moment**.

## The Outcomes: Freeing People to Do Human Work

What matters most isn't efficiency metrics. It's what we do with the time we've gained.

Previously, project leads spent days per engagement doing setup work: collecting documents, synthesizing information, building spreadsheets, manually creating Jira tickets and requirements documentation.

Now? That work takes significantly less time, and most of it is reviewing what Genie generated—not doing it from scratch.

What do project leads do with those recovered hours? **Deeper discovery conversations. Better stakeholder relationships. Understanding client needs at a deeper level.**

As our delivery leader put it: "Instead of filtering beans on spreadsheets, we can actually be developing deeper relationships and better understanding our customers, their brands, their stakeholders' personal and team needs."

**That's the real design outcome.** We didn't just automate work. We freed up cognitive space for the strategic, human-centered work that actually drives project success.

And from a business perspective? That's what enables us to offer fixed-cost, fixed-scope engagements with confidence. Because we're not spending our team's brainpower on setup. We're spending it on strategy and delivery excellence.

### What We're Seeing

Since launching Genie, we're seeing teams adopt it across new projects. The outputs are high-quality—people trust what Genie generates. We're seeing fewer risk escalations because better early context prevents surprises. And we're seeing fewer requirement clarifications because there's a shared source of truth.

But the real measure of success? **Teams are using the time Genie saves to do work that actually needs human judgment and creativity.**

Genie doesn't replace expertise. It **amplifies** it.

![Genie Outcomes Dashboard](../images/casestudy/genie/genie.png)

---

## Key Takeaways: Building a Product, Rebuilding Yourself

Building Genie from scratch—from personal tool to organizational platform—taught me that **the best way to grow as a technologist is to solve real problems at scale.**

You don't become an AI developer by taking courses. You become one by building something that requires you to think deeply about how agents work.

You don't become a product manager by reading frameworks. You become one by making hard tradeoffs and gathering real feedback.

1. **Your Best Growth Comes From Real Problems** — Don't wait for permission to learn. If you have a problem, experiment. Real constraints force real learning.

2. **Stay Close to the Work While Leading** — You can be a high-performing individual contributor AND a leader. That proximity to the work makes you a better leader.

3. **Know When to Go Deep and When to Step Back** — Building at scale requires knowing the difference. The best builders are comfortable with that tension.

4. **Serve Your Team While Serving Your Own Growth** — Look for projects that do both. That's the sweet spot. That's where real transformation happens.

You become a different technologist by doing. By shipping. By iterating.

## The Real Challenge: Building For Others

Here's what they don't tell you about building products: **having a good idea is the easy part. Convincing exhausted teams to learn something new is the hard part.**

Adoption isn't about capability—it's about people's energy and fears.

We ask a lot of our teams. Learn this new tool. Change your workflow. Trust an agent to generate your requirements. Our teams are already stretched.

**Genie is teaching me patience.**

Not everyone adopts immediately. Some teams are afraid of change. Some are too tired to learn new things. Some worry that automating requirements means losing the human connection to the work. Some don't trust that an agent can understand what they need.

These aren't objections to overcome. **These are legitimate concerns from people doing hard work.**

When I built Genie for me, I could iterate quickly. But now I'm building for people with different workflows, different concerns, different fears about AI. That's a completely different challenge. And it's humbling.

**I'm learning that building something useful for yourself doesn't mean it's automatically useful for others. That takes patience, listening, and genuine empathy for the people you're building for.**

I built Genie to prove it to myself first. Now I'm building it to prove it to others. To earn their trust through action, not just promises.

The real metrics aren't adoption numbers. The real metrics are the conversations.

I don't have all the answers. I'm learning them by building, listening, failing, trying again.

I have sleepless nights wondering if I'm solving the right problem. Days where adoption is slow. Days where it feels like nobody gets it.

And other days where a team tells me Genie saved them hours, freed them to focus on what they care about, helped them catch something they would have missed.

**That's the messy reality of building something real.**

Through this process, I'm building **resilience.** I'm learning to take good feedback seriously and bad feedback lightly. To hear "I'm too tired to learn" and respond with empathy.

I'm building a skillset that's transferable. Not just in AI and workflow systems, but in patience. In resilience to change. In the ability to listen and understand why people resist.

**Real impact isn't about being right. It's about understanding why people resist, what they're actually afraid of, and building something that addresses their real fears.**

### When Feedback Feels Like Criticism: The Privilege of Serious Questions

I often get feedback on my product management skills. "Do you have this artifact?" "Did you think about the vision?" "What's your roadmap?" "How are you measuring success?"

When you're deep in development tasks—unblocking things, fixing bugs, shipping features—this feedback can feel jarring. You're solving real problems, making real impact. Why are they asking about artifacts and vision documents?

**Here's the perspective shift that changed everything for me:**

You wouldn't be asked for these things if you hadn't brought this to the level it's at. These are questions for serious tools, not passion projects. These questions are a privilege, not something to beat yourself up about.

When someone asks "Do you have a vision document?" they're not saying you're failing. They're saying: "This thing you built is significant enough that we need to think about it strategically. It matters enough that we need to understand where it's going."

**The irony isn't lost on me:** I might be a great designer and developer, but I'm a junior product manager. And that's actually a compliment. Being asked to think like a PM means I've built something that requires product thinking. I've crossed from "personal tool" to "organizational capability"—and that transition comes with new expectations.

As a cross-functional advocate, that's exactly where I want to be. It means I'm not just building in isolation. I'm building something that matters to the organization.

**How to deal with feedback without rejecting it:**

1. **Count your wins.** When someone asks for something you don't have, remember: you built the thing they care enough about to ask questions about. That's a win.

2. **Separate the question from the judgment.** "Do you have a vision document?" is a question, not criticism. It's an opportunity to level up, not evidence you're failing.

3. **Remember where you started.** You built this from scratch. You learned AI development, workflow orchestration, product thinking—all while shipping. The fact that you're now being asked PM-level questions means you've succeeded at the hard part.

4. **Embrace the junior PM role.** You're a great designer. You're a great developer. And you're learning to be a product manager. That's not a weakness—it's growth. It's the natural evolution of building something that matters.

5. **Keep perspective when deep in development.** When you're unblocking things and shipping features, it's easy to lose sight of the bigger picture. But those higher-level questions—vision, strategy, measurement—are exactly what separate passion projects from serious tools. They're reminders to step back and think strategically, even when you're deep in the work.

**Isn't that funny?** The fact that you're being asked questions you're not prepared to answer is actually proof you've built something significant. The fact that you didn't think about certain things because you were focused on building is exactly why you need those questions now.

That's what Genie is teaching me.

**Jacques Ramphal**  
*Senior Product Designer & Design Lead for Genie | Orium*
