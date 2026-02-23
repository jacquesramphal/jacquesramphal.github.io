<template>
  <GridWrapper class="testimonial-carousel">
    <GridContainer class="quote-container">
      <div class="controls">
        <MyButton type="outline" size="small" label="←" @click="prevQuote" route=""></MyButton>
        <MyButton type="outline" size="small" label="→" @click="nextQuote" route=""></MyButton>
        <!-- <button @click="nextQuote">Next</button> -->
        <!-- <div class="arrow left" @click="prevQuote">←</div>
            <div class="arrow right" @click="nextQuote">→</div> -->
      </div>
      <!-- HEADER COMPONENT START -->

      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <!-- <TextBlock
          eyebrow="Eyebrow"
          style="grid-column: 1 / 3"
          header="Testimonials"
          description=""
        /> -->
        <!-- <p class="external justify-end" style="align-self: flex-end">
          <router-link :to="{ name: 'Library' }">View All</router-link>
        </p> -->
      </div>
      <!-- HEADER COMPONENT END -->

      <!-- <transition class="" name="" mode="out-in"> -->
      <div :key="currentQuoteIndex" class="quote">
        <div class="quote-text">
          <h1>{{ quotes[currentQuoteIndex].quote }}</h1>
        </div>
        <!-- <MyIcon :url="quotes[currentQuoteIndex].image" is-svg="true" size="sm" /> -->
        <div class="author-info">
          <!-- <a :href="quotes[currentQuoteIndex].url" target="_blank" rel="noopener noreferrer">
            <img
              v-if="quotes[currentQuoteIndex].image"
              :src="quotes[currentQuoteIndex].image"
              alt="Author"
            />
            <img v-else src="@/assets/images/work/placeholder.png" alt="Author" />
          </a> -->
          <div class="author-details">
            <div class="author-name">
              <h5>{{ quotes[currentQuoteIndex].author }}</h5>
            </div>
            <div class="author-title-company">
              <p class="subtle">
                {{ quotes[currentQuoteIndex].title }},
                {{ quotes[currentQuoteIndex].company }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- </transition> -->
    </GridContainer>
  </GridWrapper>
</template>

<script>
import quotesData from '@/assets/data/quotes.json';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  data() {
    return {
      quotes: quotesData,
      currentQuoteIndex: 0,
      autoTransitionInterval: null,
    };
  },
  methods: {
    prevQuote() {
      this.stopAutoTransition();
      this.currentQuoteIndex =
        (this.currentQuoteIndex - 1 + this.quotes.length) % this.quotes.length;
    },
    nextQuote() {
      this.stopAutoTransition();
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
    },
    startAutoTransition() {
      this.autoTransitionInterval = setInterval(this.nextQuote, 5000); // Transition every 5 seconds
    },
    stopAutoTransition() {
      clearInterval(this.autoTransitionInterval);
    },
  },

  mounted() {
    this.startAutoTransition();

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
  beforeDestroy() {
    this.stopAutoTransition();
  },
};
</script>

<style lang="scss" scoped>
.testimonial-carousel {
  display: flex;
  flex-direction: column;
  align-items: left;
  // min-height: 60vh;
  /* padding: 20px; */
  // background-color: var(--background-darker);
  // block-size: 100vh;
  padding-block: var(--spacing-lg);
  justify-content: start;
  // background: yellow;
  // border-block-start: var(--border);
}

.quote-container {
  // background: red;
  align-items: center;
  // block-size: 100%;
  /* inline-size: 80%;
  max-width: 400px; */
  align-self: center;
  overflow: visible;
}

.quote {
  // background: blue;

  /* border: 1px solid #ccc;
  padding: 20px; */
  text-align: left;
  @media only screen and (min-width: 1201px) {
    // max-width: 75vw;
  }
}
.quote-text {
  h2 {
    // font-family: var(--fontFamily-tertiary) !important;
    // font-weight: var(--font-normal) !important;
    // font-weight: var(--font-reversed-normal) !important;
    // font-size: var(--font-lg) !important;
    // letter-spacing: var(--letterSpacing-reversed-tight);
    // line-height: var(--lineHeight-base);
    z-index: 1;
  }
  // &::before {
  //   content: "“";
  //   font-family: var(--fontFamily-secondary);
  //   font-weight: bold;
  //   font-size: 96rem;
  //   position: absolute;
  //   color: var(--background-reversed-darker);
  //   opacity: 0.05;
  //   z-index: 0;
  //   inset-inline-start:  -100px;
  //   inset-block-start:  -150px;
  //   @media only screen and (min-width: 768px) {
  //     font-size: 120rem;
  //     inset-block-start:  -150px;
  //   }
  // }
}

.author-info {
  display: flex;
  margin-block-start: var(--spacing-md);
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.author-info img {
  display: block;
  width: 64px;
  height: 64px;
  inline-size: 64px;
  block-size: 64px;
  border-radius: var(--spacing-lg) !important;
  margin-block-end: var(--spacing-xs);
  object-fit: cover;
  flex-shrink: 0;

  @media only screen and (min-width: 768px) {
    margin-block-end: 0;
    margin-inline-end: var(--spacing-sm);
  }
}

.author-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/*.author-name {
 font-weight: bold; 
}*/

/*.author-title-company {
  font-size: 12px; 
}*/

.controls {
  z-index: 1;
  cursor: pointer;
  font-size: var(--font-sm);
  display: flex;
  gap: 10px;
  position: relative;
  // inset-block-start:  var(--spacing-sm);

  // inset-inline-end:  var(--spacing-sm);
  block-size: 6rem;
  @media only screen and (min-width: 768px) {
    // inset-block-start:  var(--spacing-md);

    // inset-inline-end:  var(--spacing-md);
  }
  // background-color: blue;
}
.arrow {
  inline-size: 6rem;
  // background-color: red;
  text-align: center;
  align-self: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
