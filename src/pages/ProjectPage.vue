<template>
  <PageWrapper id="work" class="">

    <HeroBanner
      style="scroll-snap-align: start"
      :key="entry.id"
      :title="`${entry.title}`"
      :subtitle="`${entry.description}`"
    />

    <GridContainer style="padding-block-start: var(--spacing-sm) !important">
      <TextStats
        label1="Role"
        :value1="`${entry.role}`"
        label2="Type"
        :value2="`${entry.tag}`"
        label3="Status"
        :value3="`${entry.status}`"
    /></GridContainer>

    <GridContainer style="scroll-snap-align: start" tight class="animate glow delay-1">
      <ImageCard
        size="large"
        title=""
        :filename1="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
        :style="`${entry.bgcolor}`"
    /></GridContainer>
    <TextImage
      tabindex="0"
      v-for="(section, j) in entry.entries"
      :key="j"
      @click="openImage(section.images.filename1)"
      :flipped="j % 2 !== 0"
      :eyebrow="section.eyebrow"
      :title="section.title"
      :description="section.body"
      :filename="section.images.filename1"
      :alt="section.images.alt"
      style="scroll-snap-align: start"
      class="fadeInUp"
    />
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
