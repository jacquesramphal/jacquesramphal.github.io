# The Everything Button

> An unassuming button that does stuff. Looks like the most boring button on
> the page. Is secretly a fidget toy, a control surface, and a cheat-code
> console. Not best practice. Not an anti-pattern. Just delight.

**Working names:** The Everything Button · Swiss · Boop · `<button infinite>`

**Where this lives:** Labs experiment — self-contained HTML/CSS/JS in
`public/lab/everything-button/`, no build step. When it's ready to show, add a
`type: "lab"` entry to `src/assets/data/library.json` pointing at
`/lab/everything-button/`. If it earns a write-up, promote it to a `/doc/` and
it graduates from Labs to `/play` (the same path Counter Fill took).

---

## The premise: the gap is the joke

The whole thing rests on one tension — **how mundane it looks vs. what it
does.** A plain grey button. Default padding. A label like "OK" or "Submit."
Nothing about it invites a second look. Then you click it a beat too long, or
twice, or drag it, and it *unfolds* into something else.

The delight is proportional to how boring the disguise is. A flashy button that
does tricks is expected. A dead-plain button that turns out to be a Swiss army
knife is a secret.

**Design north star: breadcrumbs, not walls.** Every hidden behaviour leaves a
tiny tell — a click that sounds *slightly* different, a one-frame flicker, a
"?" that fades in after a few interactions. People should *sense* there's more
without being told. That tension is the entire fun loop.

---

## The disguise (stay unassuming)

- Ships looking like a stock button. No glow, no badge, no "try me."
- First interaction is 100% normal — it submits, it links, it does the boring
  thing it claims to do. The magic only starts on the *second* look.
- Reveals scale with curiosity: the more you poke, the more it admits it can do.
- It can even gaslight a little — snap back to fully boring when a "serious"
  cursor approaches fast, as if it were never playing.

---

## Input vocabulary — everything one button can "feel"

The trick is that a single element listens for far more than `click`:

- Click, double, triple, and **click streaks** (combos, like a fighting game)
- **Long press** → charges up (a radial progress ring fills)
- **Drag** — direction + distance + velocity (swipe up / down / left / right
  each mean something different)
- **Hover dwell** — it notices when you linger; **cursor approach speed**
- **Idle** — left alone it gets bored: yawns, falls asleep, snores little z's
- Right-click, scroll-while-hovering, force / pressure touch, two-finger
- Device **shake** and **tilt** (mobile motion sensors)
- **Keyboard while focused** → the cheat-code layer (below)
- **Context** — time of day, day of week, your birthday, holidays

---

## Transformer modes — the button *becomes* the tool

Long-press or a specific gesture morphs it. Icons interpolate via SVG path
morphing so the change feels physical, not like a swap.

| Mode | Gesture | What it becomes |
|---|---|---|
| Knob | drag in a circle | set a value — volume, hue |
| Slider | drag horizontally | the button *is* the thumb |
| Color picker | long press | a radial palette blooms out |
| Dice / coin | flick | roll a die, flip a coin |
| Magic 8-ball | shake | an answer surfaces |
| Stopwatch / metronome | double-tap | start timing, or a beat |
| Synth pad | tap corners | four notes, combo into a riff |
| Spirit level | tilt device | a bubble level |
| The endless loader | (joke) | a spinner that never, ever resolves |

---

## Easter eggs & cheat codes (the console layer)

Focus the button and start typing → a tiny terminal slides up from it. This is
the heart of the "cheat codes on a game console" feel.

| Code | Nod to | Effect |
|---|---|---|
| `↑ ↑ ↓ ↓ ← → ← → B A` | Konami | **God mode** — glow, extra powers, secret menu unlocks |
| `motherlode` / `rosebud` | The Sims | confetti money rain |
| `IDDQD` / `IDKFA` | Doom | button goes invincible — refuses to be dismissed |
| `hesoyam` | GTA | full "health" — heals the button's wear/patina |
| `xyzzy` | Colossal Cave | teleports the button somewhere else on the page |
| `/matrix` · `/gravity` · `/spin` · `/confetti` | old Google gags | page-wide chaos, then it snaps back |

**Gesture-triggered eggs:**

- **Triple-click** → a dev overlay peeks out with the button's own stats
- **Hold 3s** → "charging…" → a tiny rocket launches off the button
- **Rapid 10 clicks** → *level up!* XP bar + achievement toast
- **Right-click** → a fake context menu ("Delete the internet", "Summon cat")
- **Drag off-screen** → it *escapes*, then peeks back from the edge
- **100 lifetime clicks** (persisted) → unlock a cosmetic skin
- **Birthday / late night** → party hat / "you should go to bed" mode

---

## Micro-detail polish (the craft that sells it)

- Spring squash-&-stretch on press; a ripple from the *exact* click point
- **Magnetic hover** — it leans toward the cursor, snaps back on exit
- Sound design: a mechanical "thock" that **rises in pitch with your combo**;
  haptics on mobile
- Label does a character scramble-and-settle on state change
- Drop shadow tracks a virtual light source based on cursor position
- **Wear over time** — a subtle patina grows with use (persisted click count),
  so it slowly becomes *your* button
- A hidden achievements shelf + levels / XP, all in `localStorage`

---

## Build notes

- Plain HTML / CSS / JS. No JSX, no imports from `src/`. One self-contained
  folder, per the Labs conventions in `public/lab/README.md`.
- State (click count, level, unlocked skins, achievements) persists in
  `localStorage` so the button has memory across visits.
- Respect `prefers-reduced-motion` — spring physics and confetti should degrade
  gracefully. The unassuming baseline is the accessible one.
- Keep the *default* interaction genuinely functional and boring; the tricks are
  strictly additive so the button is never worse than a normal button.

---

## Open questions / next

- Pick the flagship reveal — the one egg that defines the button's personality
  (leaning toward: **long-press → transformer unfold**, with the typed
  cheat-code terminal as the deep layer).
- Decide how loud the breadcrumbs are — how quickly does it hint there's more?
- Ship a minimal `index.html` with 2–3 behaviours first, then keep adding eggs
  like patch notes.
