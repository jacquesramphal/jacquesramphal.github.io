<template>
  <span class="grid-card">
    <span class="caption"
      ><p>{{ title }}</p></span
    >
    <span class="overlay"> </span>
    <div id="avatar" draggable="false" :alt="(`${alt}`)" />
  </span>
</template>

<script>
export default {
  name: "ThumbSmall2",
  props: {
    title: String,
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
  background-size: 100%;
  background-image: url("../assets/images/avatar.svg");
}
span:hover > #avatar {
  background-image: url("../assets/images/avatar-h.svg");
}
span:active > #avatar {
  background-image: url("../assets/images/avatar-a.svg");
}
</style>
