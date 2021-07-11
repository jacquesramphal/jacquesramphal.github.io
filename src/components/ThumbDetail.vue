<template>
  <span class="grid-card thumbdetail">
    <router-link :to="`${route}`">
      <span tabindex="0" class="caption">
        <h6 tabIndex="0" class="title">{{ title }}</h6>
        <p tabIndex="0" class="details">{{ details }}</p>
      </span>
    </router-link>
    <router-link :to="`${route}`">
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
    </router-link>
  </span>
</template>

<script>
export default {
  name: "ThumbDetail",

  props: {
    title: {
      type: String,
      default: "Default Caption",
    },
    details: {
      type: String,
      default:
        "Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet ",
    },
    filename: {
      type: String,
      default: "template-v2.svg",
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
* {
  outline: none;
}
.thumbdetail {
  background-color: var(--color-slate);
  grid-column: 1 / 4;
  grid-gap: 2.8rem;
  grid-template-rows: repeat(2, 1fr);
  height: 100vh;
}
.caption {
  color: white !important;
}

.grid-card:hover .caption {
  color: white !important;
}
.title {
  margin-bottom: 1.6rem;
}
.details {
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .thumbdetail {
    grid-column: 1 / 3;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
    height: auto;
  }
  .caption {
    grid-column: 1 / 2;
    height: 100%;
  }
}

/* ------------ BREAKPOINT LG ------------ */
@media only screen and (min-width: 1201px) {
  .thumbdetail {
    grid-column: span 2;
  }
}
</style>
