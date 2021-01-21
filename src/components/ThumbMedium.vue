<template>
  <span class="grid-card twowide grey">
    <span class="caption"
      ><p>{{ title }}</p></span
    >
    <a class="zoom"
      ><img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbMedium",
  props: {
    title: {
      type: String,
      default: "Default Caption"
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