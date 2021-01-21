<template>
  <span class="grid-card hero grey">
    <span class="caption"><p>{{ title }}</p></span>
    <a class="zoom"
      ><img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbLarge",
  props: {
    title: {
      type: String,
      default: "ThumbLarge"
    },
    filename: {
      type: String,
      default: "template.svg"
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/all.css";
</style>