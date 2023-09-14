<template>
  <GridWrapper class="testimonial-carousel">
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
        <TextBlock
          eyebrow="Eyebrow"
          style="grid-column: 1 / 3"
          header="Testimonials"
          details=""
        />
        <!-- <p class="external justify-end" style="align-self: flex-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p> -->
        <div class="controls justify-end" style="align-self: flex-end">
          <MyButton
            type="secondary"
            label="←"
            @click="prevQuote"
            route=""
          ></MyButton>
          <MyButton
            type="secondary"
            label="→"
            @click="nextQuote"
            route=""
          ></MyButton>
          <!-- <button @click="nextQuote">Next</button> -->
          <!-- <div class="arrow left" @click="prevQuote">←</div>
          <div class="arrow right" @click="nextQuote">→</div> -->
        </div>
      </div>
      <!-- HEADER COMPONENT END -->

      <transition name="fade" mode="out-in">
        <div :key="currentQuoteIndex" class="quote">
          <div class="quote-text">
            <h4>{{ quotes[currentQuoteIndex].quote }}</h4>
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
              <img
                v-if="quotes[currentQuoteIndex].image"
                :src="quotes[currentQuoteIndex].image"
                alt="Author"
              />
              <img
                v-else
                src="@/assets/images/work/placeholder.png"
                alt="Author"
              />
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
      </transition>
    </GridContainer>
  </GridWrapper>
</template>

<script>
import quotesData from "@/assets/data/quotes.json";

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
  },
  beforeDestroy() {
    this.stopAutoTransition();
  },
};
</script>

<style lang="scss" scoped>
* {
  // font-family: inherit;
  // font-weight: inherit !important;

}

.testimonial-carousel {
  display: flex;
  flex-direction: column;
  align-items: left;
  /* padding: 20px; */
  background-color: var(--background-darker);
}

.quote-container {
  /* width: 80%;
  max-width: 400px; */
}

.quote {
  /* border: 1px solid #ccc;
  padding: 20px; */
  text-align: left;
  @media only screen and (min-width: 1201px) {
    max-width: 75vw;
  }
}
.quote-text {
  // font-family: "Times New Roman", Times, serif !important;
  font-weight: 400 !important;
  font-size: var(--font-lg);
  // font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  // letter-spacing: var(--spacing-normal);

  &::before {
    content: "“";
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 120rem;
    position: absolute;
    color: var(--background-darker);
    // opacity: 0.05;
    z-index: 0;
    left: -100px;
    top: -50%;
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

.author-name {
  /* font-weight: bold; */
}

.author-title-company {
  /* font-size: 12px; */
}

.controls {
  cursor: pointer;
  font-size: var(--font-sm);
  display: flex;
  gap: 10px;

  height: 6rem;
  // background-color: blue;
}
.arrow {
  width: 6rem;
  background-color: red;
  text-align: center;
  align-self: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
