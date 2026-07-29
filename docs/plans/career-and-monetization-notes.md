# Career & Monetization — Planning Notes

> **Status: WORK IN PROGRESS. Draft, not finished. Personal planning — not site content, not registered in `library.json`, not rendered.**
>
> Note: this file lives in the repo. If the repo is public, the file is visible in source even though it never appears on the site. Keep that in mind before adding anything you wouldn't want read.

The question driving this: how to make meaningful money from work beyond the Orium salary — weighed honestly against safety, security, tenure, and equity. Below is the current thinking. Verdicts are provisional.

---

## Paths evaluated

### 1. Solo offering / productized audit (the Studio), off-hours
- Low risk *because* it's additive to the salary; downside is mostly time.
- Real ceiling problem: distribution. No funnel, no external presence, network concentrated inside one company. Off-hours capacity is small.
- Realistic outcome: supplemental income (low tens of thousands in a good year, optimistic), not life-changing. Viable as a side experiment, weak as a wealth path.

### 2. Higher-comp role (interview / move)
- Biggest and most reliable financial delta (a permanent baseline reset, especially US-remote), and it plays to the strength (the work + the proof) rather than the weakness (sales/distribution).
- Qualifies for a band of roles; a stretch for the top tier. Liabilities on paper: one-company tenure, agency (not product) background, no external presence. (See the tenure reconsideration below — this framing needs nuance.)
- Correction to earlier: comp target was overstated. Toronto full-time ≈ CAD 170–250k for the profile; US-remote ≈ USD 200–320k; 400k+ is top-of-band/manager, not median.

### 3. Low-maintenance product / tool
- "Doesn't need my time post-build" is mostly a myth: time moves from delivery to distribution, and without distribution revenue trends to zero.
- Only viable shape for someone without an audience: a product that rides a marketplace supplying its own traffic. Best fit = a Figma Community plugin/kit in tokens/design systems.
- Honest ceiling: hundreds to low-thousands/month if it hits; most make ~zero. Treat as brand-builder + small income + interview proof, not the money plan. Rule out SaaS (highest ongoing time, opposite of the goal).

### 4. AI-driven, more-automated studio (less hands-on)
- Automation optimizes delivery — the part that was never the bottleneck. Leaves distribution (the real constraint) untouched.
- The part it can't automate (the human judgment gates) is both the value and the time floor. Remove it and you're reselling raw AI output; keep it and time-per-engagement has a floor.
- In practice the pipeline becomes the maintenance (brittle, per-client, non-deterministic). Not "passive."
- **Where it actually pays: as an internal margin lever on a small offering, and — more importantly — as Genie-part-two, a proof artifact for the high-comp role.** Aim it at proof, not at being the business.

---

## Studio audit (this portfolio repo)

- **The Studio page (`src/pages/StudioPage.vue`) is not routed.** No `/studio` route, not linked or imported anywhere → currently unreachable. Decide: publish or delete; don't leave a half-built competing-business page sitting around.
- **Broken CTAs:** "See/Read the process →" point to `/doc/process`, which has no doc and no `library.json` entry → NotFound.
- **Automation claims vs. this repo:** the page asserts an "agent team / agent infrastructure." **Correction: the agents live in a separate repo** — so the capability may exist; it just isn't substantiated *here*. For a proof artifact, the evidence needs surfacing/linking; for a sales page, claims without visible proof read as bluster.
- **Testimonials:** the page reuses the site-wide `quotes.json` carousel. Those are real recommendations but mostly **Orium colleagues** praising demeanor/presentations, not the studio or client outcomes. On a page for an independent, Orium-adjacent studio, that is off-target and a conflict landmine. Must come off any live version.
- **Pricing** quotes fixed fees to deploy/operate a "validation system" — make sure that maps to something real before it's public.

### Reframe: Studio as proof artifact, not business
Flip it from *offer* to *evidence*. Show the pipeline architecture, where the human gate sits, one real input→output example. Cut pricing/engagement-model/sales framing. Make the automation claim demonstrably true (link the other repo, show a worked example). The value is the artifact that helps land the role, not the storefront.

---

## Tenure / "lifer" reconsideration  *(open — the earlier "liability" framing was too glib)*

Points raised that deserve weight:
- **Tenure has kept me relatively safe.** Observed: at some orgs (e.g. Shopify recession cuts) it was closer to last-in-first-out; job-hoppers went first. Long tenure + institutional knowledge + relationships = more embedded, more trusted, harder to cut.
- **Pay is lower, but safer.** Explicit tradeoff. Safety and security genuinely matter and were under-weighted in the "bunch of money" framing.
- **I'm a shareholder now.** Real upside optionality that leaving could forfeit or under-realize. Changes the math.
- **Job-hopping looks bad too.** Serial short stints read as flight risk and get cut first in downturns.

Honest synthesis (to pressure-test, not conclude):
- Being long-tenured is **broadly an asset**, not a liability. The "liability" only bites in one narrow scenario: elite *product-company* hiring committees screening a specific profile. For most of the market — and for trusted-advisor / leadership roles — long tenure reads as loyalty, depth, reliability.
- The real risk isn't tenure. It's **concentration**: strong *internal* safety, near-zero *external* optionality. Income, equity, reputation, and network all in one basket. That feels stable right up until it's binary.
- The Shopify lesson is not "tenure is safe." It's "**don't rely solely on one company.**" The people who recovered fastest from those cuts had portable safety — external reputation and network. Tenure doesn't prevent a layoff; external optionality makes recovery fast. I have the first kind of safety and not the second.
- So the sharpest move may not be leaving at all. It may be **leverage-in-place + optionality:** get external market validation (interview even without intending to jump) to (a) know my real price and (b) use it to reprice/expand scope internally, while keeping tenure, equity, and safety — and separately build a little external presence so I'm not fragile.

### Open questions that actually decide this
- **Equity:** realistic value, vesting schedule/cliff, and plausible exit (services companies get lower multiples than SaaS — don't overweight as guaranteed money). What do I forfeit by leaving, and when?
- **Am I capped at Orium?** Two caps to separate: *comp* cap (likely yes) and *role/scope* cap (is there a path to Head of Design Eng / a bigger internal mandate, and is it actually available?).
- **Can tenure + Genie + the agent work be leveraged *internally*** into more money/scope/equity, using external offers as leverage — instead of leaving?
- **Conflict/IP:** what the employment agreement actually allows re: the offering and the tooling.
- **Definitions:** what is "enough money" and "enough safety" to me, concretely? And do I even *want* founder/sales work, or was that never the point?

---

## Not-yet-decided next steps (candidates, not commitments)
- Apply to ~5 stretch roles and take ~2 interviews — as **price discovery + leverage**, not necessarily to jump.
- Get clarity on equity value/vesting and the internal growth/comp ceiling at Orium.
- Decide the Studio's fate: kill the page, or rebuild it as a proof case study (architecture + gate + one worked example, other repo linked).
- Fix immediate hygiene if keeping it: routing, `/doc/process` links, remove Orium-colleague testimonials from any live version.
- Consider one low-maintenance, marketplace-distributed product (Figma plugin) as brand-builder + proof — not as the money plan.

---

## Industry context & timing

The design market has been contracting since the 2022 peak and hasn't recovered. Three forces:
- **Employer's market.** Design gets cut first (read as a cost center). Fewer openings, more applicants, longer searches, comp compressed off the 2021 highs.
- **AI is compressing the execution layer** — mockups, variations, front-end scaffolding. The pure-Figma-execution role is devaluing; the mid-level IC tier is hollowing out fastest.
- **Bifurcation.** Commodity execution (automated/offshored) vs. high-judgment systems/strategy/design-engineering (AI makes it *more* valuable). Teams flatten; companies want fewer, more capable people with AI leverage.

Implications for me:
- **My combo (design + production code + agents) is on the resilient side** — but only cashes in for design-engineering / systems / AI roles. Presenting as a generic senior product designer = the glutted pool.
- **The big external jump is harder now**, not easier (buyer's market). → reinforces leverage-in-place over leaping.
- **Safety instinct is validated by the climate** — but **Orium's safety has an asterisk**: services/consultancies are squeezed by client budget cuts + AI eating billable hours. Tenure protects my seat relative to peers, not against a team/company-level contraction. "Safe, lower pay" may be optimistic.
- **My edge is scarce *now* and may erode** as tooling matures and more people cross-skill (my own "Taste is Triage" thesis). Leverage is near its peak — sitting on it has a cost.

Net: the climate **strengthens** leverage-in-place + build-optionality and **weakens** both quit-and-chase-a-jump and the solo offering (which sells into a contracting, AI-compressed design-services market). But it adds urgency: don't idle the scarce positioning.

Hard reframe: "long-tenured designer at a consultancy, validated only internally, no external presence" is a *comfortable* position in an AI-compressed services market, not a *safe* one. The gap between comfortable and safe is exactly the optionality not yet built.

---

## Recommended path (sequenced)

**Thesis:** monetize the scarce positioning while it's scarce — primarily by repricing/expanding scope inside Orium — while building external optionality as insurance. Don't gamble the secure base on a leap into a soft market; don't idle a time-sensitive edge either.

1. **Price discovery (weeks).** Apply to ~5 *narrowly-targeted* roles (design engineering / systems / AI-native — never generic product design) and take ~2 interviews. Goal: learn the real market number. Not a commitment to leave.
2. **Understand the base.** Get clarity on equity (value, vesting, cliff, plausible exit) and the internal comp/scope ceiling. Separate the comp cap (likely real) from the role/scope cap (maybe not).
3. **Leverage in place.** Use the external number + the Genie/agent case to reprice or expand the role at Orium (e.g., a Head of Design Engineering / IP-ownership mandate). Keep tenure, equity, safety.
4. **Build portable optionality (ongoing).** A little external presence so safety isn't single-sourced: publish the AI/design-engineering writing where it's seen, be findable, keep a live network. This is the insurance the services squeeze demands.
5. **Fallback, not goal:** if Orium won't move on comp/scope when shown real leverage, the cap is proven — and a targeted external move becomes the plan, now backed by evidence.

Positioning that supports all of the above: everywhere, signal **AI-native design engineer who owns the judgment layer** (the resilient tier), and demote the generic-senior-product-designer signal. See the site positioning audit.

*(End of current notes — WIP.)*
