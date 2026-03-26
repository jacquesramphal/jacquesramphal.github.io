<template>
  <PageWrapper>
    <!-- <HeroBanner
      fullvh
      end
      id="hero"
      title="Head of Design at Orium. This is my index—work, writing, and thinking on design systems, AI, and the future of agentic experiences."
    /> -->
    <HeroBanner
      fullvh
      end
      id="hero"
      isHtml
      class="display"
      title="I design systems, write the code, and ship it."
    />

    <!-- WRITING SECTION -->
    <CardRow2 title="Writing" kind="writing" :viewAllTo="{ name: 'Library' }" />

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
        :detail1="`Head of Design at Orium, Toronto. I close the gap between design and engineering — building design systems, shipping production code, and designing AI-native products.`"
        route="/doc/ask-me-anything"
        label="Ask me anything"
      />
    </AnimatedComponent>

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
  components: {},
  mounted() {
    this.$nextTick(() => {
      const h1 = this.$el.querySelector('h1.title');
      if (h1) {
        h1.id = 'hero-title';
        h1.classList.add('wrap-multi');
        document.fonts.ready.then(() => {
          CounterFill.init({
            'hero-title': { stops: ['var(--color-pink)', 'var(--color-yellow)'] },
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
