<template>
  <span class="grid-card">
    <span class="caption">
      <p>{{ title }}</p></span
    >
    <span class="overlay"> </span>
    <a class="">
      <img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></a>
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
