<template>
  <figure class="hero grid-card" >
  <!-- <figure class="hero grid-card" style="background-color: var(--bg-darker)"> -->
    <span>
      <span tabindex="0" class="caption" v-if="title">
        <TextBlock
          class="reversed"
          :eyebrow="`${eyebrow}`"
          :header="`${title}`"
          :details="`${details}`"
          :route="`${route}`"
        />
      </span>
      <router-link
        class="card-route"
        v-if="route"
        :to="`${route}`"
        draggable="false"
      />
      <span class="overlay"></span>
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
    </span>
    <figcaption v-if="caption" v-text="caption" class="subtle" />
  </figure>
</template>

<script>
import TextBlock from "@/stories/TextBlock.vue";

export default {
  name: "ThumbLarge",
  components: {
    TextBlock,
  },
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
      default: "templates/template-lg.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="sass" scoped>
.caption
  padding: var(--spacing-lg) var(--spacing-lg)

img
  mix-blend-mode: normal
  height: 101%
  object-fit: cover
  aspect-ratio: 16 / 8
.hero
  grid-column: 1 / 4
  @media only screen and (min-width: 740px)
    grid-column: 1 / 3
  @media only screen and (min-width: 1201px)
    grid-column: 1 / 4
</style>
