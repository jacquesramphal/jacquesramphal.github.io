<template>
  <span class="grid-card twowide">
    <span tabindex="0" class="caption">
      <h6 tabIndex="0" class="">{{ title }}</h6>
      <p tabIndex="0" class="subtle">{{ date }}</p>
    </span>
    <span class="overlay"> </span>
    <a class="">
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
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
    date: {
      type: String,
      default: " ",
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

.twowide {
  grid-column: 1 / 4;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .twowide {
    grid-column: 1 / 3;
  }
}

/* ------------ BREAKPOINT LG ------------ */
@media only screen and (min-width: 1201px) {
  .grid-parent {
    grid-template-columns: repeat(3, 1fr);
  }
  .twowide {
    grid-column: span 2;
  }
}
</style>
