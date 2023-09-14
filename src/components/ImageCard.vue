<template>
  <GridWrapper
    v-if="size === 'split'"
    class="thumbdetail grid-card"
    style="padding: 0"
  >
    <GridContainer class="text-container">
      <GridWrapper class="text">
        <TextBlock
          clamped
          :eyebrow="`${eyebrow}`"
          :header3="`${title}`"
          :details="`${details}`"
          :route="`${route}`"
          :link="`${link}`"
          :btnroute="`${btnroute}`"
          :cta="`${cta}`"
        />
      </GridWrapper>
    </GridContainer>
    <GridWrapper class="">
      <router-link :to="`${route}`" draggable="false">
        <img
          class="zoom bg"
          draggable="false"
          :src="require(`../assets/images/${filename1}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </GridWrapper>
  </GridWrapper>

  <span v-else :class="classes" class="grid-card">
    <span class="grid-card">
      <figure :data-category="`${eyebrow}`">
        <!-- Caption -->
        <span tabindex="0" class="caption" v-if="title">
          <span class="text"
            ><TextBlock
              clamped
              class="reversed line-length"
              :eyebrow="`${eyebrow}`"
              :header3="`${title}`"
              :details="`${details}`"
              :route="`${route}`"
              :link="`${link}`"
              :btnroute="`${btnroute}`"
              :cta="`${cta}`"
          /></span>
        </span>
        <!-- Foreground Image (if filename2 exists), using conditional class BLUR when TITLE is true -->
        <img
          v-if="filename2"
          class="filename2"
          :class="{ blur: title }"
          style="position: absolute"
          draggable="false"
          :src="filename2 ? require(`../assets/images/${filename2}`) : null"
          :alt="`${alt}`"
        />
        <img
          v-if="filename3"
          class="filename3"
          :class="{ blur: title }"
          style="position: absolute"
          draggable="false"
          :src="filename3 ? require(`../assets/images/${filename3}`) : null"
          :alt="`${alt}`"
        />
        <!-- Background Image -->
        <img
          class="bg"
          :class="{ blur: title }"
          draggable="false"
          :src="require(`../assets/images/${filename1}`)"
          :alt="`${alt}`"
        />
      </figure>
    </span>
    <figcaption v-if="caption" v-text="caption" class="subtle"></figcaption>
  </span>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";
import GridWrapper from "./grid/GridWrapper.vue";
import TextBlock from "./TextBlock.vue";
import { reactive, computed } from "vue";

export default {
  name: "ImageCard",

  components: {
    TextBlock,
    GridContainer,
    GridWrapper,
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
    filename3: {
      type: String,
      required: false,
    },
    filename2: {
      type: String,
      required: false,
    },
    filename1: {
      type: String,
      default: "empty.png",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
    route: {
      type: String,
      default: "",
    },
    btnroute: {
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
    detail: {
      type: Boolean,
      default: false,
      required: true,
    },
    size: {
      type: String,
      validator: function (value) {
        return ["small", "large", "split"].indexOf(value) !== -1;
      },
    },
  },

  setup(props) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "image-card": true,
        [`image-card--${props.size || "small"}`]: true,
      })),
    };
  },
};
</script>

<style lang="scss" scoped>
// image-cards Small
.image-card {
  .bg {
    mix-blend-mode: normal;
    aspect-ratio: 1 / 1;
    height: 101%;
    object-fit: cover;
    object-position: 0% 100%;
  }
  .filename2 {
    z-index: 1;
    right: -18%;
    top: 14.75%;
    height: 68%;
    border-radius: 0 !important;
    object-fit: cover !important;
    object-position: 0% 0% !important;
  }
  .filename3 {
    z-index: 1;
    left: 20%;
    top: 15%;
    height:100%;
    rotate: -7deg;
    box-shadow: var(--shadow-z5);
    border-radius: var(--spacing-xxs) 0 0 0 !important;
    object-fit: cover !important;
    object-position: 0% 0% !important;
  }
}

// image-cards Large
.image-card--large {
  @media only screen and (min-width: 740px) {
    grid-column: 1 / 3;
    .bg {
      aspect-ratio: 16 / 9;
      object-position: 0% 0%;
    }
    .filename2 {
      top: 29.25%;
      right: -17.75%;
      object-position: 0% 100%;
      height: 100%;
    }
    // .fg2 {
    //   top: 29.25%;
    //   right: -17.75%;
    //   object-position: 0% 100%;
    //   height: 100%;
    // }
    .caption {
      padding: var(--spacing-md);
    }
  }

  @media only screen and (min-width: 1201px) {
    grid-column: 1 / 4;
    .caption {
      padding: var(--spacing-lg);
    }
  }
}

.image-card--split {
  background-color: var(--background-darker) !important;
  grid-column: 1 / 4;
  grid-template-rows: 2, 1fr;
  text-decoration: none !important;
  .caption {
    background: transparent;
    opacity: 1;
    display: block !important;
    padding: var(--spacing-md) var(--spacing-md) 0 var(--spacing-md) !important;
  }

  @media only screen and (min-width: 740px) {
    grid-gap: var(--spacing-md);
    grid-column: 1 / 3;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
    .caption {
      padding: var(--spacing-md) 0 var(--spacing-md) var(--spacing-md) !important;
    }
    .text {
      grid-column: 1 / 2;
    }
  }

  @media only screen and (min-width: 1201px) {
    grid-column: span 2;
    .caption {
      padding: var(--spacing-lg) 0 var(--spacing-lg) var(--spacing-lg) !important;
    }
  }
}
.card-route {
  width: 100%;
  height: 100%;
  z-index: 99;
  position: absolute;

  figcaption {
    padding: var(--spacing-xxs) 0 var(--spacing-xs) 0;
  }
}

.caption {
  -moz-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  opacity: 0;
  display: block !important;
  float: left;
  padding: var(--spacing-sm) var(--spacing-md);
  position: absolute;
  text-rendering: optimizeLegibility;
  z-index: 100;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--background-reversed) 0%,
    rgba(255, 255, 255, 0) 200%
  );

  #textblock {
    background: transparent;
  }

  h3,
  h4,
  h5 {
    // font-weight: var(--font-reversed-medium) !important;
  }

  p {
    // font-weight: var(--font-reversed-normal) !important;
  }
}

.grid-card:hover {
  .caption {
    opacity: 1;
    color: var(--color-offwhite) !important;
    display: block !important;
  }
}
.grid-card:hover .fg.blur,
.grid-card:hover .bg.blur {
  filter: blur(2px); /* Blur amount on hover, can be adjusted */
}

// SPLIT STYLES
.bg {
  mix-blend-mode: normal;
  aspect-ratio: 1 / 1;
  height: 101%;
  object-fit: cover;
}
.thumbdetail {
  background-color: var(--background-darker) !important;
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
  text-decoration: none !important;
}

.textblock:hover {
  text-decoration: none !important;
}

.title {
  margin-bottom: 1.6rem;
}

.text {
  // max-width: 60px;
  @media only screen and (min-width: 740px) {
    grid-column: 1 / 2;
  }
}
.wrap {
}
</style>
