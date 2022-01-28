<template>
  <Wrapper class="thumbdetail grid-card" style="padding: 0">
    <Container tight class="">
      <Wrapper class="text">
        <TextBlock
          cta="Read More"
          header=""
          :route="`${route}`"
          :details="`${details}`"
          class="textblock"
        />
      </Wrapper>
    </Container>
    <Wrapper class="">
      <!-- <router-link :to="`${route}`">
        <img
          class="zoom"
          draggable="false"
          :src="require(`@/assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link> -->

      <svg
        width="auto"
        height="auto"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M40 535.294C40 533.475 41.193 532 42.668 532H721.332C722.806 532 724 533.476 724 535.294V546C724 553.732 718.94 560 712.691 560H51.309C45.0632 560 40 553.734 40 546V535.294Z"
            fill="#B6B6B6"
          />
          <path
            d="M67 140C67 128.954 75.9543 120 87 120H677C688.046 120 697 128.954 697 140V532H67V140Z"
            fill="url(#pattern0)"
          />
        </g>
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlink:href="#image0"
              transform="translate(0 -0.00995154) scale(0.000587544 0.000901574)"
            />
          </pattern>
          <clipPath id="clip0">
            <rect width="600" height="600" fill="white" />
          </clipPath>
          <image
            id="image0"
            xlink:href="https://wallpaperaccess.com/full/399952.jpg"
          />
        </defs>
      </svg>
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
      default: "Default Caption",
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
      default: "Project",
    },
  },
};
</script>

<style lang="sass" scoped>
*
  outline: none
  text-decoration: none !important

#screen
  background-image: url("../assets/images/avatar/avatar.svg")

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
