<template>
  <span class="grid-card">
    <span class="overlay"> </span>
    <div id="avatar" draggable="false" :alt="`${alt}`" />
  </span>
</template>

<script>
export default {
  name: "ImageCard2",
  props: {
    filename: String,
    alt: {
      type: String,
      default: "This is an image",
    },
  },
};
</script>

<style scoped>
#avatar {
  cursor: help;
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../assets/images/avatar/avatar.svg");
  filter: var(--filter);
}
span:hover > #avatar {
  background-image: url("../assets/images/avatar/avatar-h.svg");
}
span:active > #avatar {
  background-image: url("../assets/images/avatar/avatar-a.svg");
}
</style>
