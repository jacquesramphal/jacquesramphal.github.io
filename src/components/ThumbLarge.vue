<template>
  <span class="grid-card hero grey">
    <span tabindex="0" class="caption">
      <p>{{ title }}</p></span>
    <router-link :to="`${route}`">
      <span class="overlay"></span
      >
        <img 
          draggable="false" 
          :src="require(`@/assets/images/${filename}`)"
          :alt="(`${alt}`)"
        />
      </router-link>
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

<style scoped>
@import "../assets/styles/all.css";
</style>
