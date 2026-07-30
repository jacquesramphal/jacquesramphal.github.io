# Work in code without becoming an engineer

_About ten minutes to read, then an hour with your hands in it. One component, three corrections, three reasons._

What keeps most designers out of code isn't that it's hard. It's the belief that opening it means signing up to become an engineer, a job they already know they don't want. So they stay on the design side of the wall, passing specs across and hoping they come back as what they meant.

You don't need to become an engineer. You need to reach into the code far enough to steer it. Those are different skills, and the second one is small.

Steering means you can read what an agent produced, tell whether it matches the decision you made, and change it when it doesn't. You're not writing the component from an empty file. You're reading a draft and correcting it with intent. That's the same thing you already do with a junior designer's work; the only new part is that the draft is in a file instead of a frame.

## Reading with intent

Here's the move. An agent hands you a card component. You don't scan it for syntax errors, which is the engineer's reflex and not yours. You read it for decisions.

Say it comes back with `color: #3B3B3B` sitting in the middle of the file. That's a decision the agent made and you didn't, and it should be a token, because a raw hex here means this gray can drift away from every other gray in the system. You change it. Next you find a `margin-top: 37px`. Thirty-seven is nobody's decision; it's the agent splitting a difference. You round it to the spacing step you actually use. Then you notice the clickable card is a `div`. A div can't be reached by a keyboard or announced to a screen reader. You make it a button.

Three corrections, and none of them required you to write the component. They required you to know what good looked like and say so.

## Your turn

Take the starter repo and ask your agent for one real component, something in your capstone rather than a toy. Let it generate the whole thing. Then read it aloud, slowly, the way you'd read a paragraph you were editing.

Find three things to fix. For each one, write a single line: what you changed and why it was wrong. Not "changed color" but "hardcoded gray, replaced with the token so it can't drift." The because is the part that's actually yours.

It will feel slower than letting the output stand. That slowness is the work. You can't accidentally ship a decision you were forced to name.

The friction is the discipline, not the obstacle.

<!-- line: the three corrections I made, and why each was wrong -->
