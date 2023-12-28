<template>
  <GridWrapper class="reversed testimonial-carousel">
    <div class="controls justify-end" style="align-self: flex-end">
      <MyButton type="outline" label="←" @click="prevQuote" route=""></MyButton>
      <MyButton type="outline" label="→" @click="nextQuote" route=""></MyButton>
      <!-- <button @click="nextQuote">Next</button> -->
      <!-- <div class="arrow left" @click="prevQuote">←</div>
          <div class="arrow right" @click="nextQuote">→</div> -->
    </div>
    <GridContainer class="quote-container">
      <!-- HEADER COMPONENT START -->

      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <!-- <TextBlock
          eyebrow="Eyebrow"
          style="grid-column: 1 / 3"
          header="Testimonials"
          details=""
        /> -->
        <!-- <p class="external justify-end" style="align-self: flex-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p> -->
      </div>
      <!-- HEADER COMPONENT END -->

      <!-- <transition class="" name="" mode="out-in"> -->
      <div :key="currentQuoteIndex" class="quote">
        <div class="quote-text">
          <h2>{{ quotes[currentQuoteIndex].quote }}</h2>
        </div>
        <!-- <MyIcon
              :url="quotes[currentQuoteIndex].image"
              is-svg="true"
              size="sm"
              /> -->
        <div class="author-info">
          <a
            :href="quotes[currentQuoteIndex].url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <!-- <img
                v-if="quotes[currentQuoteIndex].image"
                :src="quotes[currentQuoteIndex].image"
                alt="Author"
              />
              <img
                v-else
                src="@/assets/images/work/placeholder.png"
                alt="Author"
              /> -->
          </a>
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
import quotesData from "@/assets/data/quotes.json";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      this.currentQuoteIndex =
        (this.currentQuoteIndex + 1) % this.quotes.length;
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
    const fadeInUp = gsap.utils.toArray(".fadeInUp");
    const fadeInDown = gsap.utils.toArray(".fadeInDown");
    const fadeInRight = gsap.utils.toArray(".fadeInRight");
    const fadeInLeft = gsap.utils.toArray(".fadeInLeft");
    const parallaxBack = gsap.utils.toArray(".parallaxBack");
    const parallaxFront = gsap.utils.toArray(".parallaxFront");

    fadeInUp.forEach((fadeInUp) => {
      gsap.from(fadeInUp, {
        scrollTrigger: {
          trigger: fadeInUp,
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        y: 100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInDown.forEach((fadeInDown) => {
      gsap.from(fadeInDown, {
        scrollTrigger: {
          trigger: fadeInDown,
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        y: -100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInRight.forEach((fadeInRight) => {
      gsap.from(fadeInRight, {
        scrollTrigger: {
          trigger: fadeInRight,
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        x: 100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInLeft.forEach((fadeInLeft) => {
      gsap.from(fadeInLeft, {
        scrollTrigger: {
          trigger: fadeInLeft,
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        x: -100,
        duration: 3,
        ease: "none",
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
        ease: "none",
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
        ease: "none",
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
  /* padding: 20px; */
  // background-color: var(--background-darker);
  // height: 100vh;
  padding-top: var(--spacing-lg);
  justify-content: center;
  // background: yellow;
}

.quote-container {
  // background: red;
  align-items: center;
  // height: 100%;
  /* width: 80%;
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
    max-width: 75vw;
  }
}
.quote-text {
  h2 {
    // font-family: var(--font-secondary) !important;
    font-weight: var(--font-reversed-normal) !important;
    // font-size: var(--font-lg) !important;
    // letter-spacing: var(--spacing-reversed-tight);
    // line-height: 1.4;
    z-index: 1;
  }
  &::before {
    content: "“";
    font-family: var(--font-secondary);
    font-weight: bold;
    font-size: 96rem;
    position: absolute;
    color: var(--background);
    opacity: 0.05;
    z-index: 0;
    left: -100px;
    top: -150px;
    @media only screen and (min-width: 740px) {
      font-size: 120rem;
      top: -150px;
    }
  }
}

.author-info {
  display: flex;
  margin-top: var(--spacing-md);
  @media only screen and (max-width: 740px) {
    flex-direction: column;
  }
}

.author-info img {
  width: 64px;
  height: 64px;
  border-radius: var(--spacing-lg) !important;
  margin-bottom: var(--spacing-xs);

  @media only screen and (min-width: 740px) {
    margin-bottom: none;
    margin-right: var(--spacing-sm);
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
  position: absolute;
  top: var(--spacing-sm);

  right: var(--spacing-sm);
  height: 6rem;
  @media only screen and (min-width: 740px) {
    top: var(--spacing-md);

    right: var(--spacing-md);
  }
  // background-color: blue;
}
.arrow {
  width: 6rem;
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
