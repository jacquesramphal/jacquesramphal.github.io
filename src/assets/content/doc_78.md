# This Workman Blames His Tools

There is a proverb built to shame you: *a bad workman blames his tools.* Say your work came out wrong, reach for the tool as the reason, and the room already knows what you are — not good enough, and looking for somewhere to put it. The tool is neutral. You are the variable. Own it.

I believed that for most of my career, and I still do, mostly. But there is a trap folded inside it, and I have watched the trap keep good designers small.

Here is the part the proverb leaves out. Your tools do not only help you do the work. They tell the room what you are allowed to be. They label you. And the label they hand out is not a measure of what you are *capable* of — it is a measure of what the tool will *let you produce*. Those are not the same thing, and the gap between them is where a career quietly stalls.

## What the tool says about you

For years the tool that labeled designers was Figma, and Figma is a beautiful piece of software. That is not the complaint. The complaint is what it makes, and therefore what it makes *of you*.

Figma produces a picture of a website. A very good picture — pixel-exact, annotated, tokenized, close enough to fool anyone in the review. But it is a description of the work, not the work. And the moment your output is a description, your job is defined as *describing*. You become the person who makes the beautiful picture and hands it to someone else to make real. That handoff is not a step in the process. It is the ceiling. Everything downstream — the DQA, the "that's not what the spec said," the slow drift between the mockup and the shipped thing — is the sound of your judgment leaking out through the translation layer.

I used to spend hours making a file perfect. I could not sleep, because I knew it would not look like that in code, and I knew the difference would come back to me as a defect with my name near it. That is not a bad workman blaming his tools. That is a workman noticing that the tool has quietly decided what "done" means, and defined it as *a picture that looks right* — which is not the thing, and never was.

## Every tool unlocks one door and locks another

So you go looking for the tool that closes the gap. I have tried most of them. They all have the same shape.

A live preview lets me see the real build inside my editor — but I can't touch what I see. Codux lets me open the repo and build components against the actual code — but I can't edit external components, and I can't forget Wix made it. Webflow lets me design visually and export — but I can't edit a codebase from inside it. Builder lets me design, use real components, even paste from Figma — but I still can't edit the codebase from Builder. Each one unlocks exactly one door and locks another behind it. Each one trades a limitation you had noticed for a lock-in you hadn't.

That is the tell. Every proprietary visual tool is a bargain: it hands you one new power in exchange for making its format the thing you now depend on. The ideal tool would be agnostic and multimodal — it would meet the work wherever the work actually lives, and it would not hold your decisions hostage in a file only it can read. None of them are that. They can't be, because the lock-in is the business model.

## The fix was never a better tool

Here is the turn it took me too long to make. The answer to "the tool is the ceiling" is not a better tool. It is a different **workflow** — one where the thing I design *is* the thing that ships, and no translation layer sits in between to leak my judgment out. (The same move shows up in agentic work as [designing behavior instead of screens](/doc/when-ux-becomes-ax), where the deliverable stopped being a deck and became a build-ready definition the engineers compile against.)

That is the build workflow we've been putting together at Orium, and the shape of it is simple to say. You discover the problem once — the real audit, the real analysis, the taste and the reasons behind it. You encode those decisions as one shared spec, in the open, in formats anyone on the team can read. And then that spec *compiles* into the running site. You don't hand off a picture and hope. You commit a change and regenerate the thing itself.

I've made the wider case for where this is all heading — convergence, open standards, holding your tools lightly — in [The Future of Design](/doc/the-future-of-design). This piece isn't that. It's the narrower, meaner cut: not where design is going, but the specific lie in the handoff, and the one change that ends it.

Everything about the old model inverts when you work this way:

- Siloed becomes **one shared spec** — design and engineering point at the same source of truth instead of [grinding against each other with nothing steady between them](/doc/friction).
- Static becomes **rebuilds with the project** — the design isn't a snapshot that rots the moment code moves; it moves with it.
- Proprietary becomes **open and collaborative** — decisions live in version control, not inside a file one vendor can hold hostage.
- Manual becomes **evidence-backed**, rigid becomes **commit and regenerate**, and resource-intensive becomes **discover once, rebuild cheap.**
- And lossy becomes **lossless** — nothing lost in translation, because there is no translation. The artifact is the design.

If any of that sounds familiar, it's the same conviction underneath [The Ramstack](/doc/the-ramstack): what you can't own, you can't hold hostage, and a design system that lives only inside a design file isn't a system — it's a file that describes one. This is that principle with the handoff finally removed.

## What it actually unlocks

The reason this matters isn't tidiness. It's that the tool was hiding the best part of the job.

Design's real strength was never making the picture perfect. It was judgment — deciding what is worth building and being able to say why. (I've made that case on its own in [Taste is triage](/doc/taste-is-triage).) When your output is a picture, that judgment has to survive a translation before it reaches anyone, and most of it doesn't. When the spec compiles, the judgment reaches the user intact. The designer stops being the person who describes the work and becomes the person [accountable for the outcome](/doc/manual-vs-automated-wrong-debate) — which is the thing we always said we wanted to be, and the thing the tool kept quietly telling us we weren't.

That's the whole argument. The label was never true. It was just the shape of the tool, mistaken for the shape of the designer.

## The proverb, corrected

A bad workman blames his tools. Fine — keep that. But there is a second half it never got.

A good workman notices when the tool has become the ceiling, and changes the way the work is made so it stops being one. That is not looking for somewhere to put the blame. That is refusing to let a file format decide what you're capable of. The tools will keep labeling us for exactly as long as we let them make the thing on our behalf. The moment the thing we design is the thing that ships, the label falls off.

So no — I'm not blaming my tools. I'm outgrowing them, on purpose, and taking the work back.

*This is the thinking I'm putting out in the open as I work through it. If it's the kind of argument you want to follow, come along.*
