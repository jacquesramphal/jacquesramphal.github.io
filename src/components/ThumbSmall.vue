<template>
  <span class="grid-card">
    <span tabindex="0" class="caption">
      <p>{{ title }}</p></span>
    <span class="overlay"> </span>
    <a class="">
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
    /**
     * Sets the image
     */
    filename: {
      type: String,
      default: "template-m.svg",
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
</style>
