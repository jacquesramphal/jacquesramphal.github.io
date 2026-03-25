<template>
  <PageWrapper>
    <!-- <HeroBanner
      fullvh
      end
      id="hero"
      title="Head of Design at Orium. This is my index—work, writing, and thinking on design systems, AI, and the future of agentic experiences."
    /> -->
    <HeroBanner fullvh end id="hero" isHtml class="display" :title="title" />
    <!-- <HeroAnimated2 /> -->
    <!-- <GridWrapper motif1> -->
    <!-- ^ motif not working -->
    <!-- style="background: var(--color-yellow)" -->

    <!-- <HeroBanner
      fullvh
      end
      id="hero"
      class="display"
      title="I design systems, <br> write the code, and ship the thing."
    />
    <HeroBanner
      fullvh
      end
      id="hero"
      class="display"
      title="I’m <em data-text=’Jacques’>Jacques</em>—I design systems, write the code, and ship it."
    /> -->

    <!-- title="Head of Design. I build AI agents, turn designers into unicorns, and ship the thing. Call me <em>Jake</em>." -->

    <!-- <HeroBanner fullvh end id="hero" class="display">
      <template #title>
        I'm
        <CounterText
          text="Jacques"
          :fontSize="heroFontSize"
          :counterColor="resolvedCounterColor"
          :foregroundColor="resolvedForegroundColor"
        />—Full Stack Design Lead at Orium turning systems, code, and AI into real products.
      </template>
    </HeroBanner> -->
    <!-- :title="title" -->
    <!-- FEATURED WORK SECTION - SPLIT FROM PLAY -->
    <!-- <GridContainer style="padding-block-end: var(--spacing-md) !important">
      <div class="grid-parent" style="align-items: center; grid-template-columns: repeat(3, 1fr)">
        <TextBlock style="grid-column: 1 / 3" flex="1" title="Featured" as="h2" description="" />

      </div>
    </GridContainer>

    <GridContainer style="padding-block-start: 0 !important">
      <GridParent tight id="recentwork">
        <ImageCard
          class="post"
          :eyebrow="work.featEyebrow"
          :title="work.featTitle"
          :description="work.featDescription"
          :cta="work.label"
          :route="work.route"
          :btnroute="work.btnroute"
          :filename3="work.featImage"
          size="large"
          :style="work.bgcolor"
        />
      </GridParent>
    </GridContainer> -->
    <!-- WORK SECTION -->
    <CardRow2
      title="Select Work"
      kind="work"
      filterByType="case-study"
      :viewAllTo="{ name: 'Library' }"
    />

    <!-- ABOUT SECTION -->
    <AnimatedComponent>
      <TextGrid3
        title="About"
        as="h2"
        description=""
        eyebrow1=""
        :detail1="`Head of Design at Orium, Toronto. For ${careerYears} years I’ve been closing the gap between design and engineering—building token-based design systems, shipping production code, and designing AI-native products from scratch.<br/><br/>I build AI agents and partner with clients to explore and realize agentic experience (AX) possibilities—helping teams move past AI hype into real, user-centred AI products. I coach designers into unicorns—people who think in systems, write production code, and own the full delivery stack.`"
        route="/doc/ask-me-anything"
        label="Learn More"
      />
    </AnimatedComponent>
    <!-- WRITING SECTION -->
    <CardRow2 title="Writing" kind="writing" :viewAllTo="{ name: 'Library' }" />
    <TestimonialCarousel />

    <!-- Decorative Cards -->
    <!-- <ImageCard alt="J Monogram" filename1="work/j.svg" id="top" />
        <ImageCard2
          alt="Avatar"
          class="hidemobile"
          filename1="avatar/avatar.svg"
          title="Avatar"
        />
        <ImageCard
          alt="Avatar"
          class="showmobile"
          filename1="avatar/avatar.svg"
          title="Avatar"
        /> -->
    <!-- <MyForm/> -->

    <!-- 
    Get in touch banner -->
    <!-- <HeroBanner
        
        
        eyebrow=""
        route="/"
        title="Have a question? Get in touch."
        label="Get in touch"
        labeltwo="Get in touch"
    /> -->
    <!-- </GridWrapper> -->
    <!-- CONTENTFUL HEADER EXAMPLE -->
    <!-- <HeroBanner
      id="hero"
      class="display"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    /> -->

    <!-- <GridContainer id="work" class="">
      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Library</h4>
        <MyButton
          type="outline"
          style="margin-block-start: var(--spacing-sm)"
          class="justify-end"
          label="View More"
          route="work2"
        />
      </div>
    </GridContainer> -->
    <!-- <ProductCarousel 
      title="Featured Products" 
      :products="featuredProducts"
    /> -->
    <div class="vertical-wordmark" aria-hidden="true">Jacques Ramphal</div>
  </PageWrapper>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHead } from '@vueuse/head';
import work from '@/assets/data/library.json';
import CounterFill from '@/utils/counter-fill.js';
// import ProductCarousel from '../components/ProductCarousel.vue';
import TestimonialCarousel from '@/components/TestimonialCarousel.vue';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'HomePage',
  props: {
    // work: {
    //   type: Object,
    //   required: true,
    // },
  },
  setup() {
    useHead({
      title: 'Jacques Ramphal - Head of Design & AX Lead | Orium',
      meta: [
        {
          name: 'description',
          content: `Head of Design at Orium with ${new Date().getFullYear() - 2013} years experience leading agentic systems (AX) design, design systems, and AI-driven delivery workflows.`,
        },
        {
          property: 'og:title',
          content: 'Jacques Ramphal - Head of Design & AX Lead | Orium',
        },
        {
          property: 'og:description',
          content: `Head of Design at Orium, leading agentic systems (AX) design, design systems, and AI-driven delivery workflows. ${new Date().getFullYear() - 2013} years bridging UX, AI, and development.`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://jacquesramphal.github.io/',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:title',
          content: 'Jacques Ramphal - Head of Design & AX Lead | Orium',
        },
        {
          property: 'twitter:description',
          content:
            'Head of Design at Orium, leading agentic systems (AX) design, design systems, and AI-driven delivery workflows.',
        },
      ],
    });
  },
  data() {
    return {
      work,
      // contentful: [],
      titles: [
        'Head of Design. I design, code, and ship before the meeting ends.',
        'Full-stack Designer. Recovering Generalist. Still relapses into CSS at 11pm.',
        'I turned the design-dev gap into a job description. Then I hired myself.',
        'I speak Designer and Developer. Fluently. Simultaneously.',
        'Exploring the intersection of design and dev. I live there now.',
        'I build AI agents so I have someone to delegate to.',
        'Companies say \u201cAI-first.\u201d I ask \u201cAI for what?\u201d Then we build the actual thing.',
        'I turn designers into developers. They\u2019re still mad about it.',
        'My keyboard lagged. I had a moment. We\u2019re both fine.',
        'Designer? Developer? My business card just says \u201cyes.\u201d',
        'HR doesn\u2019t know what to call me. I\u2019ve stopped explaining.',
        'I filed a bug against my own design. Fixed it before standup.',
        'My Figma file has a \u201cfor devs\u201d section. I wrote both sides.',
        'I have 47 browser tabs open. Two of them are me.',
        'Part designer. Part developer. Part therapist for both teams.',
        'I shipped the thing and then redesigned it. Twice.',
        'I Figma by day. I git push by night. My sleep schedule is a design decision.',
        'I once argued with a developer about spacing. I was both of us.',
        'I write the ticket, design the solution, and close the PR.',
        'I built AI tools to handle the boring parts of design. It\u2019s better at them than I was.',
        'I have strong opinions about design tokens. You\u2019ve been warned.',
        'I attend the design sync and the sprint planning. I bring snacks to both.',
        'My standup answer depends on which hat I\u2019m wearing.',
        'I review my own PRs. It\u2019s a whole thing.',
        'I ship the design and the code in the same PR. The commit message is always too honest.',
        'I once redesigned something mid-sprint. No regrets.',
        'I made a design system. Then I made it again, better.',
        'I asked \u201cbut does it scale?\u201d in the design review. The developers stared. I stared back.',
        'I wrote the component. Then critiqued my own spacing.',
        'I closed the gap between design and dev. Now I am the gap.',
      ],
      title: '',
      featuredProducts: [
        {
          name: 'Modern Desk Lamp',
          description: 'Sleek LED desk lamp with adjustable brightness',
          image: 'https://source.unsplash.com/400x300/?lamp',
          category: 'Lighting',
          price: '$89.99',
        },
        {
          name: 'Ergonomic Chair',
          description: 'Premium office chair with lumbar support',
          image: 'https://source.unsplash.com/400x300/?chair',
          category: 'Furniture',
          price: '$299.99',
        },
        {
          name: 'Wireless Keyboard',
          description: 'Mechanical keyboard with customizable RGB',
          image: 'https://source.unsplash.com/400x300/?keyboard',
          category: 'Electronics',
          price: '$129.99',
        },
        {
          name: 'Smart Monitor',
          description: '27" 4K display with built-in speakers',
          image: 'https://source.unsplash.com/400x300/?monitor',
          category: 'Electronics',
          price: '$449.99',
        },
      ],
    };
  },
  computed: {
    careerYears() {
      return new Date().getFullYear() - 2013;
    },
    // Filter work entries to show only Work category (exclude Play)
    filteredWorkEntries() {
      return this.work.entries.filter((entry) => entry.category === 'Work');
    },
  },
  created() {
    this.title = this.getNextTitle();
  },
  methods: {
    getNextTitle() {
      const lastIndex = parseInt(localStorage.getItem('lastTitleIndex') ?? '-1');
      const nextIndex = (lastIndex + 1) % this.titles.length;
      localStorage.setItem('lastTitleIndex', nextIndex);
      return this.preventOrphans(this.titles[nextIndex]);
    },
    preventOrphans(text) {
      // Bind single-char words (I, A) to the next word so they never strand alone at line end
      return text.replace(/\b([IA])\s(?=[A-Za-z])/g, '$1\u00A0');
    },
  },
  components: {
    TestimonialCarousel,
  },
  mounted() {
    this.$nextTick(() => {
      const h1 = this.$el.querySelector('h1.title');
      if (h1) {
        h1.id = 'hero-title';
        h1.classList.add('wrap-multi');
        document.fonts.ready.then(() => {
          CounterFill.init({
            'hero-title': { stops: ['#c084fc', '#7c3aed', '#3b0764'] },
          });
        });
      }
    });

    // this.htmlContent = marked(content);
    const fadeInUp = gsap.utils.toArray('.fadeInUp');
    const fadeInDown = gsap.utils.toArray('.fadeInDown');
    const fadeInRight = gsap.utils.toArray('.fadeInRight');
    const fadeInLeft = gsap.utils.toArray('.fadeInLeft');
    const parallaxBack = gsap.utils.toArray('.parallaxBack');
    const parallaxFront = gsap.utils.toArray('.parallaxFront');

    fadeInUp.forEach((fadeInUp) => {
      gsap.from(fadeInUp, {
        scrollTrigger: {
          trigger: fadeInUp,
          start: 'top bottom',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'restart pause reverse pause',
        },
        autoAlpha: 0,
        y: 100,
        duration: 3,
        ease: 'none',
      });
    });
    fadeInDown.forEach((fadeInDown) => {
      gsap.from(fadeInDown, {
        scrollTrigger: {
          trigger: fadeInDown,
          start: 'top bottom',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'restart pause reverse pause',
        },
        autoAlpha: 0,
        y: -100,
        duration: 3,
        ease: 'none',
      });
    });
    fadeInRight.forEach((fadeInRight) => {
      gsap.from(fadeInRight, {
        scrollTrigger: {
          trigger: fadeInRight,
          start: 'top bottom',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'restart pause reverse pause',
        },
        autoAlpha: 0,
        x: 100,
        duration: 3,
        ease: 'none',
      });
    });
    fadeInLeft.forEach((fadeInLeft) => {
      gsap.from(fadeInLeft, {
        scrollTrigger: {
          trigger: fadeInLeft,
          start: 'top bottom',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'restart pause reverse pause',
        },
        autoAlpha: 0,
        x: -100,
        duration: 3,
        ease: 'none',
      });
    });
    parallaxBack.forEach((parallaxBack) => {
      gsap.to(parallaxBack, {
        scrollTrigger: {
          trigger: parallaxBack,
          scrub: true,
        },
        yPercent: 10,
        duration: 3,
        ease: 'none',
      });
    });
    parallaxFront.forEach((parallaxFront) => {
      gsap.to(parallaxFront, {
        scrollTrigger: {
          trigger: parallaxFront,
          scrub: true,
        },
        yPercent: -10,
        duration: 3,
        ease: 'none',
      });
    });
  },
};
</script>

<style lang="scss">
@media only screen and (min-width: 1201px) {
}

/* counter-fill: required CSS for multi-line mode */
h1.wrap-multi {
  position: relative;
  display: block;
  line-height: inherit;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .cf-word {
    position: relative;
    z-index: 1;
    display: inline;
  }
}

.vertical-wordmark {
  position: fixed;
  display: none;
  inset-inline-start: var(--spacing-xs);
  inset-block-start: var(--spacing-sm);
  writing-mode: vertical-rl;
  transform: rotate(270deg);
  font-size: 2em;
  font-weight: var(--fontWeight-normal, 400);
  color: var(--foreground);
  letter-spacing: 0.05em;
  z-index: 10;
  pointer-events: none;
  user-select: none;

  @media only screen and (max-width: 767px) {
    display: none;
  }
}
</style>
