<template>
  <figure class="grid-card twowide" style="background-color: var(--bg-darker)">
    <span>
      <span tabindex="0" class="caption" v-if="title">
        <TextBlock
          class="reversed"
          :eyebrow="`${eyebrow}`"
          :header5="`${title}`"
          :details="`${details}`"
          :route="`${route}`"
        />
      </span>
      <router-link
        class="card-route"
        v-if="route"
        :to="`${route}`"
        draggable="false"
      />

      <span class="overlay"> </span>
      <img
        draggable="false"
        :src="require(`@/assets/images/${filename}`)"
        :alt="`${alt}`"
      />
    </span>
    <figcaption v-if="caption" v-text="caption" class="subtle" />
  </figure>
</template>

<script>
import TextBlock from "@/stories/TextBlock.vue";

export default {
  name: "ThumbMedium",
  components: {
    TextBlock,
  },
  props: {
    eyebrow: {
      type: String,
      default: "",
    },
    title: {
      type: String,
    },
    details: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      required: false,
    },
    filename: {
      type: String,
      default: "templates/template-sm.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="sass" scoped>
img
  mix-blend-mode: normal
  height: 101%
  object-fit: cover
</style>

<style scoped>
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
