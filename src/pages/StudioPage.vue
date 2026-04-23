<template>
  <PageWrapper>
    <!-- HERO -->
    <HeroBanner
      eyebrow="Design studio · One principal, agent team"
      title="Design that holds."
      subtitle="Most product teams need more design than they can staff. This practice closes that gap — end-to-end, from first audit through dev handoff, with a human judgment layer at every gate."
      label="Start with an audit"
      link="mailto:jacques@ramphal.design"
      labeltwo="See the process →"
      routetwo="/doc/process"
      as="h1"
    />

    <!-- PROBLEM -->
    <div class="section--dark reversed">
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="The problem"
            as="h2"
            title="The design gap is real. AI is making it faster to create and harder to catch."
          />
          <GridParent>
            <TextBlock
              as="h4"
              title="Not enough design to go around."
              description="One designer covering work that used to take two or three. The backlog is real. The hire is slow, expensive, or both."
            />
            <TextBlock
              as="h4"
              title="AI generates faster than anyone can review."
              description="Figma AI, Claude Design, and v0 are making it worse — components generated faster than anyone can evaluate them against a real standard."
            />
            <TextBlock
              as="h4"
              title="Output that looks right but isn't."
              description="Spacing values close but not a token. Colors close but not in the palette. Design debt at AI speed, with nobody to catch it."
            />
          </GridParent>
          <TextBlock
            description="The bottleneck isn't the AI. It's the missing layer between generation and what ships — the judgment, the validation, the human who knows which decisions require a call."
          />
        </GridParent>
      </GridContainer>
    </div>

    <!-- HOW IT WORKS -->
    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="How it works"
            as="h2"
            title="End-to-end. Not point-to-point."
            description="Every other AI design tool picks a point in the process and stops. This practice runs the full engagement — audit, discovery, definition, handoff — as a coordinated sequence with your approval at every gate."
          />
          <GridParent tight>
            <div class="phase-card">
              <span class="phase-tag phase-tag--entry">Entry point</span>
              <TextBlock
                eyebrow="01"
                as="h3"
                title="Audit"
                description="Component inventory, UX findings, design system gaps, AI output drift. Written report you own — regardless of what comes next."
              />
            </div>
            <div class="phase-card">
              <span class="phase-tag phase-tag--gate">Human gate</span>
              <TextBlock
                eyebrow="02"
                as="h3"
                title="Discovery"
                description="Structured intake → information architecture → user flows → stakeholder materials. The artifacts that gate everything downstream."
              />
            </div>
            <div class="phase-card">
              <span class="phase-tag phase-tag--gate">Human gate</span>
              <TextBlock
                eyebrow="03"
                as="h3"
                title="Definition"
                description="User stories, sprint plan, component scope. Feasibility-reviewed. Structured so engineering can act without a meeting."
              />
            </div>
            <div class="phase-card">
              <span class="phase-tag phase-tag--gate">Human gate</span>
              <TextBlock
                eyebrow="04"
                as="h3"
                title="Handoff"
                description="Component specs with token annotations, Storybook stubs, a11y notes, QA checklist. Engineering-ready, human-reviewed."
              />
            </div>
            <div class="phase-card">
              <span class="phase-tag">Optional</span>
              <TextBlock
                eyebrow="05"
                as="h3"
                title="Deploy"
                description="The validation system running in your stack — connected to your Storybook, your GitHub CI, your token pipeline."
              />
            </div>
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- HUMAN GATES -->
    <div class="section--dark reversed">
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="Human oversight"
            as="h2"
            title="Four gates. Nothing ships without your approval."
            description="Every phase ends with a human decision point. You approve before work moves forward. This is structural — not an afterthought."
          />
          <GridParent :cols="4" tight>
            <TextBlock
              as="h4"
              eyebrow="Gate 01"
              title="Brief approval"
              description="Scope, goals, and constraints confirmed before the audit begins. What's in scope, what isn't, what success looks like."
            />
            <TextBlock
              as="h4"
              eyebrow="Gate 02"
              title="IA approval"
              description="Information architecture and user flows reviewed and signed off. The structure doesn't change after this gate."
            />
            <TextBlock
              as="h4"
              eyebrow="Gate 03"
              title="Component scope"
              description="Component list and token contract confirmed before specs are written. What gets built, what gets deferred, what's out of scope."
            />
            <TextBlock
              as="h4"
              eyebrow="Gate 04"
              title="Handoff sign-off"
              description="Final review of all deliverables before the package is transferred. What engineering receives has been reviewed by a human."
            />
          </GridParent>
        </GridParent>
      </GridContainer>
    </div>

    <!-- TWO MODELS -->
    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="Engagement models"
            as="h2"
            title="Two ways to work together."
            description="Depending on what your team needs — deliverables now, or a running system for the long term."
          />
          <GridParent :cols="2" tight>
            <div class="model-card model-card--dark reversed">
              <p class="model-eyebrow">Most common</p>
              <TextBlock
                as="h3"
                title="I run it for you."
                description="Fixed-fee engagement per phase. Audit → discovery → definition → handoff. Deliverables you own at each step. Nothing moves forward without your approval."
                label="Start with an audit"
                link="mailto:jacques@ramphal.design"
                btntype="outline"
              />
              <ul class="model-list">
                <li>Structured audit report</li>
                <li>IA, user stories, user flows</li>
                <li>Component specs + Storybook stubs</li>
                <li>Four human approval gates</li>
                <li>All deliverables are yours</li>
              </ul>
            </div>
            <div class="model-card">
              <p class="model-eyebrow">For teams with a system</p>
              <TextBlock
                as="h3"
                title="It runs in your environment."
                description="The validation system deployed in your stack — connected to your Storybook, your GitHub CI, your design workflow. Built for your token system, operated on retainer."
                label="Talk about deployment"
                link="mailto:jacques@ramphal.design"
                btntype="outline"
              />
              <ul class="model-list">
                <li>Token contract integration</li>
                <li>Storybook MCP connection</li>
                <li>Guardrail definitions</li>
                <li>Team walkthrough + docs</li>
                <li>Operator retainer available</li>
              </ul>
            </div>
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- PRICING -->
    <GridWrapper style="background: var(--background-darker)">
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="Pricing"
            as="h2"
            title="Fixed fees. No surprises."
            description="Every phase is scoped and priced before work begins. Most engagements start with an audit — everything else follows from what it finds."
          />
          <GridParent :cols="4" tight>
            <div class="price-card price-card--dark reversed">
              <p class="price-eyebrow">Phase 1</p>
              <h3 class="price-name">Audit</h3>
              <p class="price-amount">$3–8k</p>
              <p class="price-unit">1–2 weeks · Fixed fee</p>
              <ul class="price-list">
                <li>Component inventory</li>
                <li>UX findings report</li>
                <li>Design system gap analysis</li>
                <li>AI output drift findings</li>
                <li>Prioritised recommendations</li>
              </ul>
            </div>
            <div class="price-card">
              <p class="price-eyebrow">Phases 2–3</p>
              <h3 class="price-name">Discovery + Definition</h3>
              <p class="price-amount">Scoped</p>
              <p class="price-unit">Per engagement</p>
              <ul class="price-list">
                <li>Information architecture</li>
                <li>User stories + flows</li>
                <li>Sprint plan</li>
                <li>Component specs</li>
                <li>Storybook stubs</li>
              </ul>
            </div>
            <div class="price-card">
              <p class="price-eyebrow">Phase 4</p>
              <h3 class="price-name">Build + Deploy</h3>
              <p class="price-amount">$15–30k</p>
              <p class="price-unit">6–8 weeks · Fixed fee</p>
              <ul class="price-list">
                <li>Token contract integration</li>
                <li>Storybook connection</li>
                <li>Guardrail definitions</li>
                <li>Team walkthrough</li>
                <li>Full documentation</li>
              </ul>
            </div>
            <div class="price-card">
              <p class="price-eyebrow">Ongoing</p>
              <h3 class="price-name">Operator Retainer</h3>
              <p class="price-amount">$2–4k</p>
              <p class="price-unit">Per month · 3-month minimum</p>
              <ul class="price-list">
                <li>Prompt tuning</li>
                <li>New guardrail definitions</li>
                <li>Escalation handling</li>
                <li>Monthly check-ins</li>
                <li>Senior design engineer on call</li>
              </ul>
            </div>
          </GridParent>
          <p class="pricing-note">
            Audit fee credited toward the next phase. You're not paying to be sold something.
          </p>
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- WHO THIS IS FOR -->
    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock eyebrow="Fit" as="h2" title="You're a fit if." />
          <GridParent>
            <TextBlock
              as="h4"
              title="You need more design than you can staff."
              description="One designer stretched across too much, or a company that's been running on founder decisions and needs real design process."
            />
            <TextBlock
              as="h4"
              title="Your design system is drifting."
              description="You have tokens and Storybook but AI tools keep generating output that bypasses both. The gap between what was designed and what shipped is growing."
            />
            <TextBlock
              as="h4"
              title="You need deliverables, not advice."
              description="Actual IA, user stories, component specs, a handoff package engineering can act on. Not a workshop. Not a style guide."
            />
          </GridParent>
          <TextBlock
            eyebrow="Not a fit"
            description="If you have no component library and no appetite to build one. If you're pre-product-market-fit and still figuring out what to build. If you already have a full design engineering function — they should build this. The audit will tell us either way."
          />
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- ABOUT -->
    <div class="section--dark reversed">
      <TextGrid3
        title="Jacques Ramphal"
        as="h2"
        description="Design engineer · Studio lead"
        eyebrow1=""
        :detail1="`13 years at the seam between design and engineering. I design systems and write the production code that ships them.<br/><br/>I built an agentic AI platform for a design team before most design leaders knew what an agent was. I maintain open-source design tooling, write production front-end code, and have published on design systems and agentic AI.<br/><br/>The practice exists because a specific combination of things is rare: design systems depth, engineering ability, agent infrastructure, and the willingness to operate it as an independent practice. Most designers with this background are employed at large companies. Almost none are selling it.<br/><br/>The agent team handles the execution layer. I handle the judgment layer. The gap between those two things is where every engagement lives.`"
        label="ramphal.design"
        route="/about"
      />
    </div>

    <!-- TESTIMONIALS -->
    <TestimonialCarousel />

    <!-- FAQ -->
    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock eyebrow="FAQ" as="h2" title="Common questions." />
          <div class="markdown faq-block">
            <details>
              <summary>Is this a tool I subscribe to, or a service?</summary>
              <p>
                A service. I run the workflow for you, or I deploy it in your environment and
                operate it. There's no self-serve product — the judgment layer is the point.
              </p>
            </details>
            <details>
              <summary>How is this different from hiring a freelancer?</summary>
              <p>
                A freelancer gives you their hours. This practice gives you defined deliverables at
                each phase gate — owned by you, regardless of what comes next. The agent
                infrastructure means the output potential scales independently of one person's
                hours. The engagement model means you're not paying for availability, you're paying
                for outcomes.
              </p>
            </details>
            <details>
              <summary>What if we just need the audit?</summary>
              <p>
                That's a valid outcome. You get a written report you own. It tells you what you
                have, what's missing, and what it would take to fix it. Useful regardless of next
                steps. The audit fee is credited toward Phase 2 if you continue.
              </p>
            </details>
            <details>
              <summary>What if we don't have Storybook?</summary>
              <p>
                The audit will tell us. Token contract enforcement and handoff specs don't require
                Storybook specifically — they need a source of truth for your components. If you
                don't have one, we scope around what you do have, or include standing one up in the
                engagement.
              </p>
            </details>
            <details>
              <summary>What AI tools does this work with?</summary>
              <p>
                Any. Figma AI, Claude Design, v0, Bolt, Builder.io, or whatever your team is using.
                The validation layer sits after generation, not inside a specific tool. The token
                contract is the standard — the source of the output doesn't matter.
              </p>
            </details>
            <details>
              <summary>How is my data handled?</summary>
              <p>
                The audit capture — screenshots, component inventory — stays on my machine. The
                synthesis work runs through Anthropic's Claude API. Anthropic does not use API
                inputs for model training. Inputs are retained for up to 30 days for safety
                monitoring, then deleted. Deletion on request. If you have strict compliance
                requirements (GDPR, HIPAA, SOC 2), let me know before we start — I can scope API
                calls to exclude sensitive material or run local models for confidential steps.
              </p>
            </details>
            <details>
              <summary>What if our design system is a mess?</summary>
              <p>
                The audit is specifically for this. If the system is too fragmented to enforce, the
                report will say so — along with what it would take to get it to a state where the
                agent is useful. There is always a finding. A company with no drift still gets an
                inventory, a gap list, and a prioritised set of next steps.
              </p>
            </details>
            <details>
              <summary>What happens when the engagement ends?</summary>
              <p>
                You own everything produced. The rules files are plain markdown in a git repo. The
                agent architecture is documented. If you eventually bring this in-house, the handoff
                is clean.
              </p>
            </details>
            <details>
              <summary>Do I need a developer to set this up?</summary>
              <p>
                For Phase 4 (deploy in your environment): a front-end engineer needs to be available
                for the kickoff and team walkthrough — roughly 3 hours. I handle the build. The
                system runs without ongoing engineering support.
              </p>
            </details>
          </div>
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- CTA -->
    <HeroBanner
      as="h2"
      title="Engagements start with an audit."
      subtitle="Most scope conversations take one email. If the fit isn't right, you'll know quickly — and leave with something useful."
      label="Request an audit"
      link="mailto:jacques@ramphal.design"
    />
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/grid/PageWrapper.vue';
import HeroBanner from '@/components/HeroBanner/HeroBanner.vue';
import GridWrapper from '@/components/grid/GridWrapper.vue';
import GridContainer from '@/components/grid/GridContainer.vue';
import GridParent from '@/components/grid/GridParent.vue';
import TextBlock from '@/components/text/TextBlock/TextBlock.vue';
import TestimonialCarousel from '@/components/TestimonialCarousel.vue';
import TextGrid3 from '@/components/card/TextGrid3.vue';

export default {
  name: 'StudioPage',
  components: {
    PageWrapper,
    HeroBanner,
    GridWrapper,
    GridContainer,
    GridParent,
    TextBlock,
    TestimonialCarousel,
    TextGrid3,
  },
};
</script>

<style scoped lang="scss">
/* ── DARK SECTIONS ──────────────────────────────── */
.section--dark {
  background: var(--foreground);
}

/* ── PHASE CARDS ────────────────────────────────── */
.phase-card {
  border: var(--border);
  border-radius: var(--spacing-xxs);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  transition: border-color 0.15s;

  &:hover {
    border-color: var(--foreground);
  }
}

.phase-tag {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  font-size: var(--font-2xs);
  font-weight: var(--fontWeight-semibold);
  background: var(--background-darker);
  color: var(--foreground-muted);
  align-self: flex-start;
}

.phase-tag--gate {
  background: var(--color-yellow, #ffdd9e);
  color: var(--foreground);
}

.phase-tag--entry {
  background: var(--foreground);
  color: var(--background);
}

/* ── MODEL CARDS ────────────────────────────────── */
.model-card {
  border: var(--border);
  border-radius: var(--spacing-xs);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.model-card--dark {
  background: var(--foreground);
  border-color: var(--foreground);
}

.model-eyebrow {
  font-size: var(--font-2xs);
  font-weight: var(--fontWeight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.model-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  margin-top: auto;

  li {
    display: flex;
    gap: var(--spacing-xs);
    font-size: var(--font-xs);
    opacity: 0.75;
    line-height: 1.4;

    &::before {
      content: '✓';
      font-weight: var(--fontWeight-bold);
      opacity: 1;
      flex-shrink: 0;
    }
  }
}

/* ── PRICING ────────────────────────────────────── */
.price-card {
  border: var(--border);
  border-radius: var(--spacing-xxs);
  padding: var(--spacing-md) var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  background: var(--background);
}

.price-card--dark {
  background: var(--foreground);
  border-color: var(--foreground);
}

.price-eyebrow {
  font-size: var(--font-2xs);
  font-weight: var(--fontWeight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.price-name {
  font-size: var(--font-sm);
  font-weight: var(--fontWeight-bold);
  letter-spacing: -0.02em;
}

.price-amount {
  font-size: var(--font-lg);
  font-weight: var(--fontWeight-extrabold);
  letter-spacing: -0.05em;
  line-height: 1;
}

.price-unit {
  font-size: var(--font-2xs);
  opacity: 0.5;
}

.price-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  border-top: var(--border);
  padding-top: var(--spacing-xs);

  li {
    font-size: var(--font-xs);
    opacity: 0.7;
    display: flex;
    gap: var(--spacing-xs);
    line-height: 1.4;

    &::before {
      content: '—';
      opacity: 0.4;
      flex-shrink: 0;
    }
  }
}

.pricing-note {
  font-size: var(--font-xs);
  opacity: 0.6;
  text-align: center;
}

/* ── FAQ ────────────────────────────────────────── */
.faq-block {
  grid-column: 1 / -1;
}
</style>
