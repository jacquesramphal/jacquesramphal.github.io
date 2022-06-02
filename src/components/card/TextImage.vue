<template>
  <Wrapper id="textimage" :class="classes">
    <Container tight style="padding: 0 !important">
      <div id="grid-parent" class="grid-parent">
        <Container tight class="imgcontainer">
          <img
            class="splitimg"
            draggable="false"
            :src="require(`@/assets/images/${filename}`)"
            :alt="`${alt}`"
        /></Container>
        <Container  class="textcontainer">
          <TextBlock
            :header="`${header}`"
            :cta="`${cta}`"
            :route="`${route}`"
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </Container></div></Container
  ></Wrapper>
</template>
<script>
import TextBlock from "@/stories/TextBlock.vue";
import Container from "@/components/grid/Container.vue";
import Wrapper from "@/components/grid/Wrapper.vue";

export default {
  name: "TextImage",
  components: {
    Container,
    TextBlock,
    Wrapper,
  },
  props: {
    header: {
      type: String,
      default: "Detail Card",
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
    @media only screen and (min-width: 740px)
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
  .textcontainer
    // align-self: center
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
