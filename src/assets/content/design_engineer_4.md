# Direct the agents

_About ten minutes, then a working session writing rules. Stop-conditions that fire, and a diff you can trust._

An agent will do what you asked at a speed you can't match, and it will do it slightly wrong in ways you won't see until later. It hardcodes the value you told it to tokenize. It invents a margin. It adds a dependency you didn't want. None of this is the agent being bad. It's the agent optimizing for "produce something that looks done," which is not the same as "produce something right."

The fix isn't to check every line by hand, because that erases the speed you came for. The fix is to make the rules explicit and enforced, so the agent is corrected before you ever read the output. You write the guardrails once, and they hold on every generation after.

## A rule that catches the mistake live

Put a rules file in the repo, the kind your agent reads before it works. In it, one rule: no hardcoded color values; every color references a token.

Now ask the agent for a component and watch what happens when it reaches for a raw hex. With the rule in place, it catches itself: it stops, notices the value should be a token, and reaches for the token instead. The correction you'd have made by hand now happens before the code lands. You moved your judgment upstream, from reviewing output to shaping the conditions the output is made under. A correction you make by hand lasts until the next generation; one you encode holds on every generation after.

## Your turn

Write stop-conditions for your capstone. Start with three: no hardcoded colors, no magic-number spacing, no clickable element that isn't a real button or link. Write them as rules the agent reads, not as hopes in your head.

Then prove they fire. Ask the agent to do the wrong thing on purpose, request a component with a hardcoded color, and confirm the rule catches it. A guardrail you haven't seen fire is a guardrail you don't know you have.

Last, change how you hand off work. Stop writing specs that describe what you want in prose. Let the agent produce the thing, then hand off a diff, the actual change reviewed and corrected, as the unit of work. A spec is a wish. A diff is a decision.

The uncomfortable part under all of this: the agent will happily run without guardrails, the output will look fine, and you'll ship the drift. You need the guardrails more than the AI does.

<!-- line: the three stop-conditions I wrote, and which one I had to watch fire before I believed it -->
