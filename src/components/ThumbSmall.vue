<template>
  <span class="grid-card grey">
    <span class="caption"><p>{{ title }}</p></span>
    <a class="zoom"
      ><img draggable="false" src="@/assets/images/blank.svg"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbSmall",
  props: {
    title: String
  },
};
</script>

<style scoped>
</style>
