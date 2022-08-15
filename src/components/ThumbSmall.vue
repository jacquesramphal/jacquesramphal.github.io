<template>
  <figure class="grid-card" :data-category="`${eyebrow}`">
      <span tabindex="0" class="caption" v-if="title">
        <TextBlock
          class="reversed"
          :eyebrow="`${eyebrow}`"
          :header5="`${title}`"
          :details="`${details}`"
          :route="`${route}`"
          :link="`${link}`"
          :btnroute="`${btnroute}`"
          :cta="`${cta}`"
        />
      </span>
      <span class="overlay"> </span>
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
    <figcaption v-if="caption" v-text="caption" class="subtle" />
  </figure>
</template>

<script>
export default {
  name: "ThumbSmall",
  components: {},
  props: {
    eyebrow: {
      type: String,
      default: "",
    },
    title: {
      type: String,
    },
    details: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      required: false,
    },
    filename: {
      type: String,
      default: "templates/template-v2.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
      default: "",
    },
    btnroute: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    cta: {
      type: String,
      default: "Read More",
    },
  },
};
</script>

<style lang="sass" scoped>

// Thumbs Small
img
  mix-blend-mode: normal
  aspect-ratio: 1 / 1
  height: 101%
  object-fit: cover

// Thumbs Medium
// Thumbs Large
</style>

<style lang="sass">


.card-route
  width: 100%
  height: 100%
  z-index: 99
  position: absolute

figcaption
  padding-top: var(--spacing-xs)

.caption
  -moz-transition: all 0.1s ease-in-out
  -o-transition: all 0.1s ease-in-out
  -webkit-transition: all 0.1s ease-in-out
  transition: all 0.1s ease-in-out
  opacity: 0
  display: block !important
  float: left
  padding: var(--spacing-sm) var(--spacing-md)
  position: absolute
  text-rendering: optimizeLegibility
  z-index: 100
  width: 100%
  width: -moz-available
  width: -webkit-fill-available
  height: 100%
  background: linear-gradient(135deg, var(--background-reversed) 0%, rgba(255,255,255,0) 200%)
  #textblock
    background: transparent
    color: var(--text-reversed) !important
    letter-spacing: var(--spacing-reversed-normal)
  h3, h4, h5
    font-weight: var(--font-reversed-heavy) !important
  p
    font-weight: var(--font-reversed-medium) !important

// .grid-card:hover 
//   transform: scale(1.01)

.grid-card:hover .caption
  opacity: 1
  color: var(--color-offwhite) !important
  display: block !important

.grid-card:hover img
  // mix-blend-mode: luminosity
  // filter: saturate(0)
  // filter: saturate(0) blur(1px)
  // transform: scale(1.5)

// .zoom 
//   -moz-transition: all 0.25s ease-in-out
//   -o-transition: all 0.25s ease-in-out
//   -webkit-transition: all 0.25s ease-in-out
//   background-color: transparent
//   margin: 0
//   padding: 0
//   transition: all 0.25s ease-in-out
  
// .overlay
//   background-image: url(data:image/png;base64,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)
//   filter: contrast(1)
//   height: 100%
//   mix-blend-mode: screen
//   opacity: 1
//   position: absolute
//   width: 100%

// .grid-card
  // box-shadow: var(--shadow-z1)
  // &:hover
  //   box-shadow: none
  // box-shadow: var(--shadow-light)
</style>
