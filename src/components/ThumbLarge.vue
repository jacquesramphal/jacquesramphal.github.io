<template>
  <span class="grid-card hero grey">
    <span class="caption"
      ><p>{{ title }}</p></span
    >
    <router-link :to="`${route}`"
      ><img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></router-link>
  </span>
</template>

<script>
export default {
  name: "ThumbLarge",
  props: {
    title: {
      type: String,
      default: "ThumbLarge",
    },
    filename: {
      type: String,
      default: "template.svg",
    },
    route: {
      type: String,
      default: "Project",
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/all.css";
</style>
