<template>
  <span :class="classes" class="grid-card">
    <span class="grid-card">
      <figure :data-category="`${eyebrow}`">
        <span tabindex="0" class="caption" v-if="title">
          <TextBlock
            clamped
            class="reversed"
            :eyebrow="`${eyebrow}`"
            :header5="`${title}`"
            :details="`${details}`"
            :route="`${route}`"
            :link="`${link}`"
            :btnroute="`${btnroute}`"
            :cta="`${cta}`"
          />
        </span>
        <img
          draggable="false"
          :src="require(`../assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </figure>
    </span>
    <figcaption v-if="caption" v-text="caption" class="subtle" />
  </span>
</template>

<script>
import TextBlock from "./TextBlock.vue";

export default {
  name: "ImageCard",
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
      default: "templates/template-v2.svg",
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
    // Override props
    large: {
      type: Boolean,
      default: false,
      required: true,
    },
    detail: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        thumb: true,
        "thumb--small": !this.large,
        "thumb--large": this.large,
        "thumb--detail": this.detail,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// Thumbs Small
.thumb {
  img {
    mix-blend-mode: normal;
    aspect-ratio: 1 / 1;
    height: 101%;
    object-fit: cover;
    object-position: 0% 100%;
  }
}

// Thumbs Medium
// Thumbs Large
.thumb--large {
  @media only screen and (min-width: 740px) {
    grid-column: 1 / 3;
    img {
      aspect-ratio: 16 / 8;
    }
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
    color: var(--text-reversed) !important;
    letter-spacing: var(--spacing-reversed-normal);
  }

  h3,
  h4,
  h5 {
    font-weight: var(--font-reversed-bold) !important;
  }

  p {
    font-weight: var(--font-reversed-medium) !important;
  }
}

.grid-card:hover {
  .caption {
    opacity: 1;
    color: var(--color-offwhite) !important;
    display: block !important;
  }
}
</style>
