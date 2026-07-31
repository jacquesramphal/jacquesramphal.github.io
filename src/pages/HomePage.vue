<template>
  <!-- <PageWrapper style="background-color: var(--color-highlight) !important"> -->
  <PageWrapper>
    <!-- <HeroBanner
      fullvh
      end
      id="hero"
      title="This is my index: work, writing, and thinking on design systems, agentic craft, and the future of design."
    /> -->
    <HeroBanner
      id="hero"
      isHtml
      start
      class="display"
      title="I design systems and write the code that ships them."
      :nobottompadding="true"
    />

    <!-- WORK SECTION — proof of craft, directly under the thesis -->
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
        :detail1="`${careerYears}+ years at the seam between design and engineering, designing systems, writing production code, and building with AI.<br/><br/>I care most about the gap between design intent and what actually ships: how decisions survive handoff, how systems scale, and how people stay in control when the tools get smarter. I also coach designers moving closer to systems and code, not because everyone needs to write code, but because fluency changes the kinds of conversations you can have.`"
        label="More about me"
        route="/about"
      />
    </AnimatedComponent>

    <!-- WRITING SECTION -->
    <CardRow2 title="Writing" kind="writing" :viewAllTo="{ name: 'Library' }" />

    <div class="vertical-wordmark" aria-hidden="true">Jacques Ramphal</div>
  </PageWrapper>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHead } from '@vueuse/head';
import work from '@/assets/data/library.json';
import CounterFill from '../../public/lab/counter-fill/counter-fill.js';
import { yearsOfExperience } from '@/utils/experience';
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
    const years = yearsOfExperience();
    useHead({
      title: 'Jacques Ramphal — Design, Systems, Code',
      meta: [
        {
          name: 'description',
          content: `${years}+ years at the seam between design and engineering — designing systems, writing production code, and building with AI.`,
        },
        {
          property: 'og:title',
          content: 'Jacques Ramphal — Design, Systems, Code',
        },
        {
          property: 'og:description',
          content: `${years}+ years at the seam between design and engineering — designing systems, writing production code, and building with AI.`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://ramphal.design/',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:title',
          content: 'Jacques Ramphal — Design, Systems, Code',
        },
        {
          property: 'twitter:description',
          content: `${years}+ years at the seam between design and engineering — designing systems, writing production code, and building with AI.`,
        },
      ],
    });
  },
  data() {
    return {
      work,
    };
  },
  computed: {
    careerYears() {
      return yearsOfExperience();
    },
    // Filter work entries to show only Work category (exclude Play)
    filteredWorkEntries() {
      return this.work.entries.filter((entry) => entry.category === 'Work');
    },
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      const h1 = document.querySelector('h1.title');
      if (h1) {
        // h1.id = 'hero-title';
        h1.classList.add('wrap-multi');
        document.fonts.ready.then(() => {
          CounterFill.init({
            'hero-title': { stops: ['var(--foreground)'] },
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
    display: inline-block;
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
