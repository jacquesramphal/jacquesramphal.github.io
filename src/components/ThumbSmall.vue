<template>
  <span class="grid-card" style="background-color: var(--color-xxlight)">
    <span tabindex="0" class="caption">
      <h6 tabIndex="0" class="">{{ title }}</h6>
      <p tabIndex="0" class="subtle">{{ date }}</p>
    </span>
    <span class="overlay"> </span>
    <a class="zoom">
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
    </a>
  </span>
</template>

<script>
export default {
  name: "ThumbSmall",
  props: {
    /**
     * Sets the caption text
     */
    title: {
      type: String,
    },
    date: {
      type: String,
      default: " ",
    },
    /**
     * Sets the image
     */
    filename: {
      type: String,
      default: "template-sm.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/all.css";
.caption {
}
.grid-card {
}
* {
}
img {
  mix-blend-mode: normal;
}
</style>
