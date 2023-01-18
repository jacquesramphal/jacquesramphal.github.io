<template>
  <GridWrapper :class="classes">
    <GridContainer tight style="padding: 0 !important">
      <div id="grid-parent" class="grid-parent">
        <GridContainer class="textcontainer fadeInUp">
          <TextBlock
            :header="`${header}`"
            :cta="`${cta}`"
            :route="`${route}`"
            :details="`${details}`"
          />
        </GridContainer>
        <GridContainer class="imgcontainer fadeInLeft">
          <img
            class="splitimg"
            draggable="false"
            :src="require(`@/assets/images/${filename}`)"
            :alt="`${alt}`"
        /></GridContainer></div></GridContainer
  ></GridWrapper>
</template>
<script>
// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "TextImage",
  components: {},
  props: {
    header: {
      type: String,
      default: "Detail Card",
    },
    details: {
      type: String,
      default:
        "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    filename: {
      type: String,
      default: "jacques.jpeg",
    },
    cta: {
      type: String,
      default: "Read More",
    },
    route: {
      type: String,
      default: "",
      required: false,
    },
    flipped: {
      type: Boolean,
      default: false,
      required: true,
    },
    red: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  // Multiple classes
  computed: {
    classes() {
      return {
        "textimage-align": true,
        "textimage-align--flipped": this.flipped,
        "textimage-align--default": !this.flipped,
        "textimage-color": true,
        "textimage-color--red": this.red,
        "textimage-color--default": !this.red,
      };
    },
  },
  mounted() {
    const fadeInUp = gsap.utils.toArray(".fadeInUp");
    const fadeInDown = gsap.utils.toArray(".fadeInDown");
    const fadeInRight = gsap.utils.toArray(".fadeInRight");
    const fadeInLeft = gsap.utils.toArray(".fadeInLeft");
    const parallaxBack = gsap.utils.toArray(".parallaxBack");
    const parallaxFront = gsap.utils.toArray(".parallaxFront");

    
    // Not working for multiple instances when duplicating textImage on projectPage, lags and hides component

    fadeInUp.forEach((fadeInUp) => {
      gsap.from(fadeInUp, {
        scrollTrigger: {
          trigger: fadeInUp,
          start: "top bottom",
          end: "bottom bottom",
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
          end: "bottom bottom",
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
          end: "bottom bottom",
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
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,

        x: -100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInRight.forEach((fadeInRight) => {
      gsap.from(fadeInRight, {
        scrollTrigger: {
          trigger: fadeInRight,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        x: 100,
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

<style lang="sass" scoped>
*
  color: inherit
.grid-parent
  grid-gap: 0
  @media only screen and (min-width: 1201px)
    grid-template-columns: repeat(2, 1fr) !important
    grid-template-rows: 1fr !important

// COLOR

.textimage-color--red
  background-color: red !important


// ALIGNMENT

.textimage-align
  position: relative
  overflow: hidden
  grid-template-rows: repeat(2, 1fr)
  #textblock
    // align-self: center !important
    padding-top: var(--spacing-xs)
    @media only screen and (min-width: 740px)
      padding-top: 0

  img
    width: 100%
    height: 100%
    object-fit: cover !important
    position: relative
    display: block
    overflow: hidden
    aspect-ratio: 16 / 9 !important
    grid-column: 1
    // Swap img postiton on mobile
    grid-row: 2
    // grid-row: 1 / 1
    @media only screen and (min-width: 1201px)
      // aspect-ratio: 16 / 9 !important
      // @media screen and (-webkit-min-device-pixel-ratio:0)
      //   height: auto
      //   background: yellow
  .imgcontainer
    padding-top: 0 !important
    @media only screen and (min-width: 740px)
      padding-top: var(--spacing-lg) !important

  .textcontainer
    align-self: center
    display: block
    grid-column: auto
    // grid-row: 2 / 2
    grid-template-columns: 1fr !important

.textimage-align--default
  .textcontainer
    @media only screen and (min-width: 740px)
      grid-column: 2
      grid-row: 1
  img
    @media only screen and (min-width: 740px)
      grid-column: 1
      grid-row: 1
  .imgcontainer
    @media only screen and (min-width: 740px)
      padding-right: 0 !important

.textimage-align--flipped
  .textcontainer
    @media only screen and (min-width: 740px)
      grid-column: 1
      grid-row: 1
  img
    @media only screen and (min-width: 740px)
      grid-column: 2
      grid-row: 1
  .imgcontainer
    @media only screen and (min-width: 740px)
      padding-left: 0 !important
</style>
