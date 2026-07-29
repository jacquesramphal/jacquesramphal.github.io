<template>
  <PageWrapper>

    <!-- HERO -->
    <HeroBanner
      eyebrow="Design Engineer · Toronto"
      title="I design systems and write the production code that ships them."
      subtitle="I work at the seam between design and engineering: token-based design systems in Figma, the front-end that renders them in React and Vue, and the AI tooling that keeps the two in sync. I build so design decisions survive handoff instead of dying in it."
      label="Download résumé"
      link="/resume.html"
      labeltwo="More about me →"
      routetwo="/about"
      as="h1"
    />

    <!-- SELECTED PROOF -->
    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="Selected proof"
            as="h2"
            title="What I've built."
            description="Each of these shipped and stayed in use. The case studies show the thinking behind the decisions."
          />
          <GridParent>
            <router-link to="/doc/designing-genie" class="proof-card">
              <span class="proof-tag proof-tag--lead">Owned end to end</span>
              <TextBlock
                as="h3"
                title="Genie — agentic delivery platform"
                description="Built from architecture to front-end, including the n8n automation and the UX patterns for how people and agents share the work. It gave the delivery team hours back on routine work, and the patterns it set are used across teams now."
              />
              <span class="proof-link">Read the case study →</span>
            </router-link>
            <router-link to="/doc/the-design-command-suite" class="proof-card">
              <span class="proof-tag">Design engineering</span>
              <TextBlock
                as="h3"
                title="The /design environment"
                description="An isolated, AI-driven Storybook a designer spins up with one command, wired to the same tokens and components as production. It turned handoff from a document someone interprets into a diff a developer merges."
              />
              <span class="proof-link">Read the case study →</span>
            </router-link>
            <router-link to="/doc/hmi-design-token-pipeline" class="proof-card">
              <span class="proof-tag">Design systems</span>
              <TextBlock
                as="h3"
                title="Multi-brand token pipeline"
                description="A single token architecture and a CI lint that held Figma, code, and AI output in line across four brands, two themes, and two modalities."
              />
              <span class="proof-link">Read the case study →</span>
            </router-link>
            <router-link to="/work" class="proof-card">
              <span class="proof-tag">Shipped at scale</span>
              <TextBlock
                as="h3"
                title="Customer-facing products"
                description="Commerce, loyalty, and healthcare platforms used by hundreds of thousands to millions of people, across enterprise and consumer teams."
              />
              <span class="proof-link">See the work →</span>
            </router-link>
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- WHAT I DO -->
    <div class="section--dark reversed">
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="What I do"
            as="h2"
            title="Design and code, held together."
            description="The rare part isn't any one of these. It's holding the full span, from the token to the production component to the workflow that keeps them aligned."
          />
          <GridParent :cols="4">
            <TextBlock
              as="h4"
              title="Design systems & tokens"
              description="Token architectures that stay in sync across Figma, code, and AI tooling, governed so they don't decay under pressure."
            />
            <TextBlock
              as="h4"
              title="Production front-end"
              description="React, Vue, and TypeScript. I write the code that ships the design, so intent maps to what renders."
            />
            <TextBlock
              as="h4"
              title="Agentic tooling"
              description="Agent workflows and internal tools that automate the mechanical parts of delivery and keep people in control of the judgment calls."
            />
            <TextBlock
              as="h4"
              title="Design quality"
              description="Accessible, high-fidelity UI and the QA systems that hold the line as teams and tools scale."
            />
          </GridParent>
        </GridParent>
      </GridContainer>
    </div>

    <!-- EVIDENCE -->
    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock
            eyebrow="The evidence"
            as="h2"
            title="The site is the argument."
            description="I built it, the source is public, and the case studies explain the decisions. A designer who writes production code is easy to claim. This is the proof."
          />
          <GridParent>
            <TextBlock
              as="h4"
              title="Built and maintained by me"
              description="Vue 3, TypeScript, token-based theming, no CMS. The front-end you're reading is the front-end I write."
            />
            <TextBlock
              as="h4"
              title="Open source"
              description="Design tooling published to npm and GitHub, documented and in use beyond this site."
            />
            <TextBlock
              as="h4"
              title="Written down"
              description="Case studies and essays on design systems, agentic craft, and design-to-development, because if I can't explain it I don't understand it yet."
            />
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper>

    <!-- CTA -->
    <HeroBanner
      center
      background
      as="h2"
      title="Let's talk."
      subtitle="Open to design engineering and design systems roles. The fastest way to reach me is email."
      label="Email"
      link="mailto:jacques@ramphal.design"
      labeltwo="View résumé →"
      routetwo="/resume"
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
import { useHead } from '@vueuse/head';
import { yearsOfExperience } from '@/utils/experience';

export default {
  name: 'HirePage',
  components: {
    PageWrapper,
    HeroBanner,
    GridWrapper,
    GridContainer,
    GridParent,
    TextBlock,
  },
  setup() {
    const years = yearsOfExperience();
    const description = `Design engineer in Toronto with ${years}+ years at the seam between design and engineering. Token-based design systems, production front-end in React and Vue, and agentic tooling.`;
    useHead({
      title: 'Jacques Ramphal — Design Engineer',
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: 'Jacques Ramphal — Design Engineer' },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'profile' },
        { property: 'og:url', content: 'https://ramphal.design/hire' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: 'Jacques Ramphal — Design Engineer' },
        { property: 'twitter:description', content: description },
      ],
    });
  },
  computed: {
    careerYears() {
      return yearsOfExperience();
    },
  },
};
</script>

<style scoped lang="scss">
/* ── DARK SECTIONS ──────────────────────────────── */
.section--dark {
  background: var(--foreground);

  :deep(.subtle) {
    color: rgba(var(--color-offwhite-rgb), 0.5);
  }
}

/* ── PROOF CARDS ────────────────────────────────── */
.proof-card {
  border: var(--border);
  border-radius: var(--spacing-xxs);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;

  &:hover {
    border-color: var(--foreground);

    .proof-link {
      color: var(--foreground);
    }
  }
}

.proof-tag {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  font-size: var(--font-2xs);
  font-weight: var(--fontWeight-semibold);
  background: var(--background-darker);
  color: var(--foreground-muted);
  align-self: flex-start;
}

.proof-tag--lead {
  background: var(--foreground);
  color: var(--background);
}

.proof-link {
  margin-top: auto;
  font-size: var(--font-xs);
  font-weight: var(--fontWeight-semibold);
  color: var(--foreground-muted);
  transition: color 0.15s;
}
</style>
