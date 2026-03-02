/**
 * Patterns / Artboard
 *
 * Components composed together as a full-page system — the real thing in action.
 * No args panel. No controls. Just the components doing their job together.
 *
 * Message: this isn't a component catalogue — it's a working system.
 */

import HeroBanner from '../components/HeroBanner/HeroBanner.vue';
import TextGrid from '../components/card/TextGrid.vue';
import ArticleCard from '../components/card/ArticleCard/ArticleCard.vue';
import AuthorBioBar from '../components/AuthorBioBar.vue';
import SimpleFooter from '../components/SimpleFooter.vue';
import MyButton from '../components/Button/Button.vue';

export default {
  title: 'Patterns/Artboard',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
};

export const Artboard = () => ({
  components: {
    HeroBanner,
    TextGrid,
    ArticleCard,
    AuthorBioBar,
    SimpleFooter,
    MyButton,
  },
  template: `
    <div style="background: var(--background); color: var(--foreground);">

      <!-- ── 1. Hero ── -->
      <HeroBanner
        fullvh
        end
        title="I design systems,<br/>write the code,<br/>and ship the thing."
        subtitle="Full Stack Design Lead at Orium — working where systems, code, and AI meet."
        label="View Work"
        labeltwo="Read Writing"
        route="/"
        routetwo="/"
      />

      <!-- ── 2. Feature grid ── -->
      <TextGrid
        title="What I do"
        as="h2"
        description="Design and engineering, without the gap between them."
        eyebrow1="Design Systems"
        detail1="Token-based systems that bridge design and code. Every value is a variable, every decision is documented, and nothing breaks when you switch themes."
        eyebrow2="Full Stack Design"
        detail2="Figma to Vue. I design the component, write the SCSS, wire the props, and test the states. The handoff is the same conversation."
        eyebrow3="Agentic AI"
        detail3="Designing workflows for AI products — prompt architecture, evaluation loops, and interfaces that make AI legible to real users."
        eyebrow4="Technical Writing"
        detail4="Writing that closes the gap: design rationale, system documentation, and essays on quality, process, and building well."
      />

      <!-- ── 3. Writing cards ── -->
      <div style="
        padding: var(--spacing-lg);
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
        gap: var(--spacing-sm);
      ">
        <ArticleCard
          eyebrow="Design Systems"
          title="Token-based design at scale"
          description="How a well-structured token architecture eliminates the guesswork in design-to-code workflows and keeps your system honest."
          tag="Systems"
          alt="Design Systems"
          route="/"
          label="Read"
        />
        <ArticleCard
          eyebrow="AI / UX"
          title="Designing for AI uncertainty"
          description="AI products fail when they hide their uncertainty. Here's a framework for communicating model confidence without sacrificing usability."
          tag="AI"
          alt="AI Design"
          route="/"
          label="Read"
        />
        <ArticleCard
          eyebrow="Process"
          title="The designer who codes"
          description="Reflections on twelve years at the intersection of design and engineering — and why the gap between them is the most interesting place to work."
          tag="Career"
          alt="Process"
          route="/"
          label="Read"
        />
      </div>

      <!-- ── 4. CTA section ── -->
      <div style="
        padding: var(--spacing-xl) var(--spacing-lg);
        border-top: var(--border);
        border-bottom: var(--border);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        max-width: 72rem;
      ">
        <p style="
          font-size: var(--font-400);
          font-weight: var(--fontWeight-bold);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--foreground-muted);
          margin: 0;
        ">Get in touch</p>
        <h2 style="
          font-size: clamp(var(--size-9), 4vw, var(--size-14));
          font-weight: var(--fontWeight-heavy);
          letter-spacing: var(--letterSpacing-tight);
          line-height: var(--lineHeight-shorter);
          margin: 0;
        ">Have a project in mind?<br/>Let's talk.</h2>
        <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
          <MyButton label="Get in touch" type="solid" size="large" link="mailto:hello@jacquesramphal.com" />
          <MyButton label="View Resume" type="outline" size="large" route="/" />
        </div>
      </div>

      <!-- ── 5. Author bio ── -->
      <AuthorBioBar
        name="Jacques Ramphal"
        title="Full Stack Design Lead · Orium · Toronto"
        description="12+ years building design systems and products at Orium. I architect token-based systems, design agentic AI workflows, and still write the code for my own designs."
      />

      <!-- ── 6. Footer ── -->
      <SimpleFooter />

    </div>
  `,
});
Artboard.storyName = 'Artboard';
