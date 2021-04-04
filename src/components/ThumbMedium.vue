<template>
  <span class="grid-card twowide">
    <span class="caption"
      ><p>{{ title }}</p></span
    >
        <span class="overlay">
    </span>
    <a class="">
      <img 
        draggable="false" 
        :src="require(`@/assets/images/${filename}`)"
        :alt="(`${alt}`)"
      />
    </a>
  </span>
</template>

<script>
export default {
  name: "ThumbMedium",
  props: {
    title: {
      type: String,
      default: "Default Caption",
    },
    filename: {
      type: String,
      default: "template.svg",
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

</style>
