<template>
  <Wrapper class="thumbdetail grid-card" style="padding: 0">
    <Container class="text-container">
      <Wrapper class="text">
        <TextBlock
          cta="Read More"
          :header4="`${title}`"
          :route="`${route}`"
          :details="`${details}`"
          class="textblock"
        />
      </Wrapper>
    </Container>
    <Wrapper class="">
      <router-link :to="`${route}`" draggable="false">
        <img
          class="zoom"
          draggable="false"
          :src="require(`@/assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </Wrapper>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import TextBlock from "@/stories/TextBlock.vue";

export default {
  name: "ThumbDetail",
  components: {
    Wrapper,
    TextBlock,
    Container,
  },
  props: {
    title: {
      type: String,
      default: "Default Title",
    },
    details: {
      type: String,
      default:
        "Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet ",
    },
    filename: {
      type: String,
      default: "templates/template-sm.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
    },
    // link: {
    //   type: String,
    // },
  },
};
</script>

<style lang="sass" scoped>
*
  outline: none
  text-decoration: none !important

#screen
  background-image: url("../assets/images/avatar/avatar.svg")

img
  mix-blend-mode: normal
  aspect-ratio: 1 / 1
  height: 101%
  object-fit: cover

.thumbdetail
  background-color: var(--bg-darker) !important
  // background-color: #35363a !important
  grid-column: 1 / 4
  grid-template-rows: 2, 1fr
  text-decoration: none !important
  @media only screen and (min-width: 740px)
    grid-gap: var(--spacing-md)
    grid-column: 1 / 3
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: none
  @media only screen and (min-width: 1201px)
    grid-column: span 2
.text-container
  padding: var(--spacing-md) var(--spacing-md) 0 var(--spacing-md) !important
  @media only screen and (min-width: 740px)
    padding: var(--spacing-md) 0 var(--spacing-md) var(--spacing-md)!important
  @media only screen and (min-width: 1201px)
    padding: var(--spacing-lg) 0 var(--spacing-lg) var(--spacing-lg)!important
.textblock
  text-decoration: none !important
  // color: var(--color-offwhite) !important
  text-decoration: none !important
.textblock:hover
  text-decoration: none !important

.title
  margin-bottom: 1.6rem

.text
  @media only screen and (min-width: 740px)
      grid-column: 1 / 2
</style>
