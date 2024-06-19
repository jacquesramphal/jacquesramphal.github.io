<template>
  <PageWrapper id="work" class="">
    <HeroBanner
      style="scroll-snap-align: start"
      :key="entry.id"
      :title="`${entry.title}`"
      :subtitle="`${entry.description}`"
      :filename="`${entry.images.filename1}`"
    />
    <!-- <TestimonialCarousel /> -->

    <GridContainer style="padding-block-start: var(--spacing-sm) !important">
      <TextStats
        label1="Role"
        :value1="`${entry.role}`"
        label2="Type"
        :value2="`${entry.tag}`"
        label3="Status"
        :value3="`${entry.status}`"
    /></GridContainer>

    <GridContainer
      style="scroll-snap-align: start"
      tight
      class="animate glow delay-1"
    >
      <ImageCard
        size="large"
        title=""
        :filename3="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
        :style="`${entry.bgcolor}`"
    /></GridContainer>

    <div class="section">
      <!-- <MarkdownRenderer :markdown="pageContent" /> -->
      <TextGrid2 />

      <TextGrid
        title="The Solution"
        subtitle="To achieve these goals, Kum & Go partnered with Orium to implement a flexible and scalable platform focusing on four key objectives:"
        eyebrow1="Control Over Digital Experience"
        detail1="Empowering Kum & Go to manage their search, merchandising, promotions, loyalty, and content independently."
        eyebrow2="Increased Customer Engagement"
        detail2="Launching a robust loyalty program to engage a larger segment of the consumer base."
        eyebrow3="More In-Store Purchases"
        detail3="Enhancing the omnichannel experience to drive more in-store purchases."
        eyebrow4="Extensible and Maintainable Platform"
        detail4="Moving off a costly legacy platform to a more efficient and innovative system."
      />
      <TextImage class="fadeInUp" />
      <TextImage class="fadeInUp" flipped     style="
              background: var(--background-darker)
            "/>
      <TextImage class="fadeInUp" />

      <GridContainer>
        <GridParent rows >
          <GridParent
            style="
              margin-block-end: var(--spacing-md) !important;
            "
            v-for="(section, j) in entry.entries"
            :key="j"
          >
            <TextBlock
              class="offset fadeInUp"
              left
              eyebrow=""
              :title="section.title"
              :description="section.body"
              :blockquote="section.blockquote"
            />
            <GridWrapper
              tight
              class="offset fadeInUp"
              v-if="section.images.filename1"
              id=""
            >
              <ImageCard
                size="large"
                class=""
                title=""
                :filename1="section.images.filename1"
                :alt="section.images.alt"
                :caption="section.images.caption"
              />
            </GridWrapper> </GridParent
        ></GridParent>
      </GridContainer>
    </div>

    <!-- class="fullvh fadeInUp" -->

    <!-- <TextImage
        v-for="(section, j) in entry.entries"
        :key="j"
        @click="openImage(section.images.filename1)"
        :flipped="j % 2 !== 0"
        class="fadeInUp"
        :eyebrow="section.eyebrow"
        :title="section.title"
        :description="section.body"
        :filename="section.images.filename1"
        :alt="section.images.alt"
      /> -->
    <FullscreenImage
      :isOpen="isImageOpen"
      :imageSrc="selectedImage"
      @close="closeImage"
    />
  </PageWrapper>
</template>

<script>
// External js for gsap not working
// import "@/assets/js/gsap.js";
import FullscreenImage from "../components/FullscreenImage.vue";

import workData from "@/assets/data/work.json";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageCard from "@/components/card/ImageCard/ImageCard.vue";
import GridContainer from "@/components/grid/GridContainer.vue";
import TextImage from "@/components/card/TextImage.vue";

gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  // Get all focusable divs
  const divs = document.querySelectorAll('div[tabindex="0"]');

  // Function to change focus
  function changeFocus(currentIndex, direction) {
    let nextIndex = currentIndex + direction;

    // Ensure nextIndex wraps around properly
    if (nextIndex >= divs.length) {
      nextIndex = 0; // Loop back to the first
    } else if (nextIndex < 0) {
      nextIndex = divs.length - 1; // Loop back to the last
    }

    // Check if the element exists before focusing
    if (divs[nextIndex]) {
      divs[nextIndex].focus();
    } else {
      console.error("Element not found for index:", nextIndex);
    }
  }

  // Keydown event listener
  document.addEventListener("keydown", (e) => {
    // Ensure there are divs to focus
    if (divs.length > 0) {
      const currentIndex = Array.from(divs).indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        changeFocus(currentIndex, 1); // Move down
        e.preventDefault(); // Prevent scrolling
      } else if (e.key === "ArrowUp") {
        changeFocus(currentIndex, -1); // Move up
        e.preventDefault(); // Prevent scrolling
      }
    }
  });
});

export default {
  name: "ProjectPage",
  components: {
    ImageCard,
    GridContainer,
    // CardRow2,
    TextImage,
    FullscreenImage,
    // BreadCrumb,
    // HeaderNav,
  },

  data() {
    return {
      isImageOpen: false,
      selectedImage: null,
    };
  },
  methods: {
    openImage(image) {
      this.selectedImage = image;
      this.isImageOpen = true;
    },
    closeImage() {
      this.isImageOpen = false;
    },
  },
  // data() {
  //   return {
  //     htmlContent: "",
  //   };
  // },

  computed: {
    workId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return workData.entries.find((entry) => entry.id == this.workId);
    },
  },
  mounted() {
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
};
</script>

<style scoped>
html,
body {
  overflow: hidden;
}
</style>
