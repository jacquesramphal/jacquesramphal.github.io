<template>
  <Wrapper class="thumbdetail grid-card">
    <Container tight class="">
      <router-link :to="`${route}`">
        <Wrapper class="text">
          <TextBlock header="" class="textblock" />

          <!-- <router-link class="caption" :to="`${route}`">
          <h5 tabIndex="0" class="title">{{ title }}</h5>
          <p tabIndex="0" class="details">{{ details }}</p>
      
      </router-link> -->
          <!-- <button>test</button> -->
        </Wrapper></router-link
      >
    </Container>
    <Wrapper class="">
      <router-link :to="`${route}`">
        <img
          class="zoom"
          draggable="false"
          :src="require(`@/assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </Wrapper>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import TextBlock from "@/stories/TextBlock.vue";

export default {
  name: "ThumbDetail",
  components: {
    Wrapper,
    TextBlock,
    Container,
  },
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
      default: "template-sm.svg",
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
  text-decoration: none !important;
}
.thumbdetail {
  background-color: #35363a;
  grid-column: 1 / 4;
  grid-template-rows: 2, 1fr;
  text-decoration: none !important;
}
.textblock {
  text-decoration: none !important;

  color: var(--color-offwhite) !important;
  text-decoration: none !important;
}
.textblock:hover {
  text-decoration: none !important;
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
  }
  .text {
    grid-column: 1 / 2;
  }
}

/* ------------ BREAKPOINT LG ------------ */
@media only screen and (min-width: 1201px) {
  .thumbdetail {
    grid-column: span 2;
  }
}
</style>
