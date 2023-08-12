<template>
  <GridWrapper class="thumbdetail grid-card" style="padding: 0">
    <GridContainer class="text-container">
      <GridWrapper class="text">
        <TextBlock
          :details="`${details}`"
          :header3="`${title}`"
          :link="`${link}`"
          :route="`${route}`"
          class="textblock"
          :cta="`${cta}`"
        />
      </GridWrapper>
    </GridContainer>
    <GridWrapper class="">
      <router-link :to="`${route}`" draggable="false">
        <img
          class="zoom"
          draggable="false"
          :src="require(`../assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </GridWrapper>
  </GridWrapper>
</template>

<script>
import TextBlock from "./TextBlock.vue";
import GridContainer from "./grid/GridContainer.vue";
import GridWrapper from "./grid/GridWrapper.vue";

export default {
  name: "ThumbDetail",
  components: {
    TextBlock,
    GridContainer,
    GridWrapper,
  },
  props: {
    title: {
      type: String,
      default: "Default Title",
    },
    details: {
      type: String,
      default:
        "Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet ",
    },
    filename: {
      type: String,
      default: "templates/template-desktop-device.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    cta: {
      type: String,
      default: "Read More",
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  outline: none;
  text-decoration: none !important;
}

#screen {
  background-image: url("../assets/images/avatar/avatar.svg");
}

img {
  mix-blend-mode: normal;
  aspect-ratio: 1 / 1;
  height: 101%;
  object-fit: cover;
}

.thumbdetail {
  background-color: var(--background-darker) !important;
  /* background-color: #35363a !important; */
  grid-column: 1 / 4;
  grid-template-rows: 2, 1fr;
  text-decoration: none !important;

  @media only screen and (min-width: 740px) {
    grid-gap: var(--spacing-md);
    grid-column: 1 / 3;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
  }

  @media only screen and (min-width: 1201px) {
    grid-column: span 2;
  }
}

.text-container {
  padding: var(--spacing-md) var(--spacing-md) 0 var(--spacing-md) !important;

  @media only screen and (min-width: 740px) {
    padding: var(--spacing-sm) 0 var(--spacing-md) var(--spacing-md) !important;
  }

  @media only screen and (min-width: 1201px) {
    padding: var(--spacing-lg) 0 var(--spacing-lg) var(--spacing-lg) !important;
  }
}

.textblock {
  text-decoration: none !important;
  /* color: var(--color-offwhite) !important; */
  text-decoration: none !important;
}

.textblock:hover {
  text-decoration: none !important;
}

.title {
  margin-bottom: 1.6rem;
}

.text {
  @media only screen and (min-width: 740px) {
    grid-column: 1 / 2;
  }
}

</style>
