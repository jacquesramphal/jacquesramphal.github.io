<template>
  <Wrapper id="textimage" class="reversed" :class="classes">
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
    right: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        "textimage-align": true,
        "textimage-align--right": this.right,
        "textimage-align--left": !this.right,
      };
    },
  },
};
</script>

<style lang="sass" scoped>


*
  color: inherit
.grid-parent
  grid-gap: 0 !important
  @media only screen and (min-width: 1201px)
    grid-template-columns: repeat(2, 1fr) !important


.textimage-align
  overflow: hidden
  #textblock
    // align-self: center !important
    @media only screen and (min-width: 740px)
  img
    aspect-ratio: 1 / 1
    @media only screen and (min-width: 1201px)
      aspect-ratio: 16 / 9
  .textcontainer
    grid-template-columns: repeat(1fr) !important

.textimage-align--left
  img
    @media only screen and (min-width: 740px)
      grid-column: 2
      grid-row: 1
  .textcontainer
    @media only screen and (min-width: 740px)
      grid-column: 1
      grid-row: 1

.textimage-align--right
  img
    @media only screen and (min-width: 740px)
      grid-column: 1
      grid-row: 1
  .textcontainer
    @media only screen and (min-width: 740px)
      grid-column: 2
      grid-row: 1
</style>
