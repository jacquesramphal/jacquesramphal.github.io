<template>
  <figure class="hero grid-card">
    <span class="grid-card"
      >
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
    ></span>
    <figcaption class="subtle">{{ caption }}</figcaption>
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

    },
    filename: {
      type: String,
      default: "template-lg.svg",
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

<style scoped>
@import "../assets/styles/all.css";

.caption {
  display: block !important;
}
</style>
