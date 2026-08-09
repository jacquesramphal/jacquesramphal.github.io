# The Everything Button

> An unassuming button that does stuff. Looks like the most boring button on
> the page. Is secretly a fidget toy, a control surface, and a cheat-code
> console — and it slowly gets **grubby with use**. Not best practice. Not an
> anti-pattern. Just delight.

**Working names:** The Everything Button · Swiss · Boop · `<button infinite>`

---

## Where this lives (decision)

Everything playful lives under **Labs** — play, experiments, and games all in
one place. Concretely on the site:

- **Library is the single browse surface.** It already has a **Lab** filter
  chip and already hides `published: false` entries, so it's the umbrella.
- **Play is retired** — `/play` redirects to `/library`. It was an unlinked,
  filtered duplicate of Library; nobody used it.
- **Experiments are surfaced** by flipping their `type: "lab"` entries to
  `published: true` so they appear under Library's Lab filter.
- **No new menu links.** Library is already in the menu; nothing else added.
- The live experiments themselves stay as self-contained pages in
  `public/lab/*` (no build step), exactly as they are today.

---

## The premise: the gap is the joke

The whole thing rests on one tension — **how mundane it looks vs. what it
does.** A plain grey button. Default padding. A label like "OK" or "Submit."
Nothing invites a second look. Then you click it a beat too long, or twice, or
drag it, and it *unfolds* into something else.

The delight is proportional to how boring the disguise is. A flashy button that
does tricks is expected. A dead-plain button that turns out to be a Swiss army
knife — and that gets **fingerprinted and worn** the more you touch it — is a
secret.

**North star: breadcrumbs, not walls.** Every hidden behaviour leaves a tiny
tell — a click that sounds *slightly* different, a one-frame flicker, a smudge
that wasn't there before. People should *sense* there's more without being told.

**House reference / the seed:** the portrait in `MainFooter.vue` already does a
tiny version of this. Hover `#avatar`, wait **1 second**, and it runs
`animate-shake` *while swapping the photo to Luna* (`luna1.jpg`). The delay is
what makes it feel intentional; the swap is the punchline. The Everything Button
is that instinct **amped up** — squash physics, sound, longer reveal chains, and
memory that carries across visits.

---

## ⭐ Wear & tear — skeuomorphism, but honest

The centrepiece, and the funny one. Classic skeuomorphism fakes a *material* the
screen isn't made of — leather, felt, brushed aluminium. This is a different
take: it doesn't fake a material, **it fakes use.** The button admits it's being
handled.

- **Fingerprints.** Every press stamps a faint, greasy oval right where you
  clicked — slight random rotation and scale, drawn additively so overlapping
  presses darken. Your click history becomes visible.
- **Grease sheen.** The most-pressed region builds a soft shine (a click
  heatmap rendered as a radial gradient). The hot zone goes glossy from
  handling.
- **Grime at the edges.** Corners and the bevel slowly pick up dirt over many
  visits — the honest patina of a well-used object.
- **Dust when neglected.** Leave it alone long enough and a faint speckle
  settles on top, until you touch it and disturb it.
- **Wipe to clean.** Drag across the face and you smear it — partial cleaning
  that leaves streaks, like wiping a real screen with your sleeve.
- **It's yours.** The smudge map persists in `localStorage`, so the wear is
  cumulative and personal. Come back next week and your button looks *touched*.
- **Reset / heal.** The `hesoyam` cheat "heals" it back to factory clean. Or
  never — let it get filthy. Extreme wear unlocks a **"well-loved"** achievement.

Why it works: nobody announces it. You just notice one day that your button
looks used, and realize the interface has been quietly keeping a record of every
time you touched it.

---

## Input vocabulary — everything one button can "feel"

A single element listens for far more than `click`:

- Click, double, triple, and **click streaks** (combos, like a fighting game)
- **Long press** → charges up (a radial progress ring fills)
- **Drag** — direction + distance + velocity (swipe up / down / left / right
  each mean something different; drag across also *wipes* smudges)
- **Hover dwell** — it notices when you linger; **cursor approach speed**
- **Idle** — left alone it gets bored: yawns, falls asleep, snores little z's,
  and gathers dust
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

Focus the button and start typing → a tiny terminal slides up from it. The heart
of the "cheat codes on a game console" feel.

| Code | Nod to | Effect |
|---|---|---|
| `↑ ↑ ↓ ↓ ← → ← → B A` | Konami | **God mode** — glow, extra powers, secret menu unlocks |
| `motherlode` / `rosebud` | The Sims | confetti money rain |
| `IDDQD` / `IDKFA` | Doom | button goes invincible — refuses to be dismissed |
| `hesoyam` | GTA | full "health" — **wipes the button clean** of all wear |
| `xyzzy` | Colossal Cave | teleports the button somewhere else on the page |
| `/matrix` · `/gravity` · `/spin` · `/confetti` | old Google gags | page-wide chaos, then it snaps back |

**Gesture-triggered eggs:**

- **Triple-click** → a dev overlay peeks out with the button's own stats (clicks,
  level, dirtiness %)
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
- A hidden achievements shelf + levels / XP, all in `localStorage`

---

## Build notes

- Plain HTML / CSS / JS. No JSX, no imports from `src/`. One self-contained
  folder, per the Labs conventions in `public/lab/README.md`.
- State (click count, level, unlocked skins, achievements, **smudge map**)
  persists in `localStorage` so the button has memory across visits.
- Smudges/grease are cheap to render: a `<canvas>` overlay or layered
  `box-shadow` / `mask` — a fingerprint sprite stamped at each pointer position.
- Respect `prefers-reduced-motion` — spring physics and confetti degrade
  gracefully. The unassuming baseline is the accessible one.
- Keep the *default* interaction genuinely functional and boring; every trick is
  strictly additive so the button is never worse than a normal button.

---

## Open questions / next

- **Flagship reveal** — the defining first surprise. Leaning: long-press →
  transformer unfold, with the wear/fingerprints as the always-on ambient layer
  and the typed cheat-code terminal as the deep layer.
- How loud are the breadcrumbs? How fast does it hint there's more?
- Ship a minimal `index.html` with 2–3 behaviours first (press physics + wear +
  one cheat code), then add eggs like patch notes.
