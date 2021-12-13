<template>
  <Wrapper id="textimage" :class="classes">
    <Container tight>
      <div id="grid-parent" class="grid-parent">
        <img
          class="splitimg"
          draggable="false"
          :src="require(`@/assets/images/${filename}`)"
          :alt="`${alt}`"
        />
        <Container class="textcontainer">
          <TextBlock
            cta="Read More"
            :route="`${route}`"
            eyebrow=""
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </Container>
      </div> </Container
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
  height: auto
  position: relative
  grid-gap: 0 !important
  @media only screen and (min-width: 1201px)
    grid-template-columns: repeat(2, 1fr) !important
    grid-template-rows: 2fr !important

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
    height: auto
    display: block
    overflow: hidden
    aspect-ratio: 1 / 1
    grid-column: 1 / 1
    grid-row: 1 / 1
    @media only screen and (min-width: 740px)
      position: absolute
      height: 100%
    @media only screen and (min-width: 1201px)
      aspect-ratio: 16 / 9
      height: 100%
  .textcontainer
    display: block
    grid-column: auto
    grid-row: 2 / 2
    grid-template-columns: 1fr !important

.textimage-align--default
  .textcontainer
    @media only screen and (min-width: 740px)
      grid-column: 2
      grid-row: 1 / 1
  img
    @media only screen and (min-width: 740px)
      grid-column: 1
      grid-row: 1 / 1

.textimage-align--flipped
  .textcontainer
    @media only screen and (min-width: 740px)
      grid-column: 1
      grid-row: 1 / 1
  img
    @media only screen and (min-width: 740px)
      grid-column: 2
      grid-row: 1 / 1
</style>
