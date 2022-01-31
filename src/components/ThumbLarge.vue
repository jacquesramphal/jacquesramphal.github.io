<template>
  <figure class="hero grid-card">
    <span class="grid-card" >
      <span tabindex="0" class="caption">
        <h6 tabIndex="0" class="">{{ title }}</h6>
        <p tabIndex="0" class="subtle">{{ date }}</p>
      </span>
      <router-link :to="`${route}`">
        <span class="overlay"></span>
        <img
        
          draggable="false"
          :src="require(`@/assets/images/${filename}`)"
          :alt="`${alt}`"
        /> </router-link
    >
</span>    <figcaption class="subtle">{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: "ThumbLarge",
  props: {
    title: {
      type: String,
      default: "ThumbLarge",
    },
    date: {
      type: String,
    },
    caption: {
      type: String,
      required: false,
    },
    filename: {
      type: String,
      default: "templates/template-lg.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
      default: "#",
    },
  },
};
</script>

<style lang="sass" scoped>

.caption
  display: block !important
img
  aspect-ratio: 16 / 8
.hero
  grid-column: 1 / 4
  @media only screen and (min-width: 740px)
    grid-column: 1 / 3
  @media only screen and (min-width: 1201px)
    grid-column: 1 / 4
</style>
