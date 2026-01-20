<template>
  <span
    v-if="variant === 'split'"
    :class="classes"
    class="thumbdetail grid-card"
    style="padding: 0"
  >
    <GridContainer class="text-container">
      <GridWrapper class="text" style="overflow: visible !important">
        <TextBlock
          clamped
          :eyebrow="`${eyebrow}`"
          as="h4"
          :title="`${title}`"
          :description="`${description}`"
          :route="`${route}`"
          :link="`${link}`"
          :btnroute="`${btnroute}`"
          :label="`${label}`"
        />
      </GridWrapper>
    </GridContainer>
    <router-link :to="`${route}`" draggable="false">
      <!-- Foreground Image (if filename2 exists), using conditional class BLUR when TITLE is true -->
      <img
        v-if="filename2"
        class="filename2"
        style="position: absolute"
        draggable="false"
        :src="filename2 ? require(`../../../assets/images/${filename2}`) : null"
        :alt="`${alt}`"
      />
      <img
        v-if="filename3"
        class="filename3"
        style="position: absolute"
        draggable="false"
        :src="filename3 ? require(`../../../assets/images/${filename3}`) : null"
        :alt="`${alt}`"
      />
      <!-- Background Image -->
      <img
        class="bg"
        draggable="false"
        :src="require(`../../../assets/images/${filename1}`)"
        :alt="`${alt}`"
        :style="bgImageStyle"
      />
    </router-link>
  </span>

  <span
    v-else-if="variant === 'default' || variant === 'borderless'"
    :class="classes"
    class="thumbdetail2 grid-card"
    style="padding: 0; border: var(--border)"
  >
    <GridContainer tight class="text-container2">
      
      <GridWrapper class="text2" style="overflow: visible !important">
        <TextBlock
          clamped
          :eyebrow="`${eyebrow}`"
          as="h4"
          :title="`${title}`"
          :description="`${description}`"
          :route="`${route}`"
          :link="`${link}`"
          :btnroute="`${btnroute}`"
          :label="`${label}`"
        />
      </GridWrapper>
    </GridContainer>

    <router-link :to="`${route}`" draggable="false">
      <!-- Foreground Image (if filename2 exists), using conditional class BLUR when TITLE is true -->
      <img
        v-if="filename2"
        class="filename2"
        style="position: absolute"
        draggable="false"
        :src="filename2 ? require(`../../../assets/images/${filename2}`) : null"
        :alt="`${alt}`"
      />
      <img
        v-if="filename3"
        class="filename3"
        style="position: absolute"
        draggable="false"
        :src="filename3 ? require(`../../../assets/images/${filename3}`) : null"
        :alt="`${alt}`"
      />
      <!-- Background Image -->
      <img
        class="bg2"
        draggable="false"
        :src="require(`../../../assets/images/${filename1}`)"
        :alt="`${alt}`"
        :style="bgImageStyle"
      />
    </router-link>
  </span>

  <div
    v-else-if="variant === 'cover' || variant === 'list'"
    class="default-card"
    :class="classes"
    :data-category="`${eyebrow}`"
  >
    <div class="info">
      <TextBlock
        clamped
        class="textblock"
        :eyebrow="eyebrow"
        as="h4"
        :icon="icon"
        :iconsize="iconsize"
        :title="title"
        :description="description"
        :label="label"
        :route="route ? `${route}` : undefined"
        :btnroute="btnroute ? `${btnroute}` : undefined"
      />
    </div>
    <div v-if="alt" class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" />

        <img
          class="bg"
          :class="{ blur: title }"
          draggable="false"
          :src="require(`../../../assets/images/${filename1}`)"
          :alt="`${alt}`"
          :style="bgImageStyle"
        />
      </router-link>
    </div>
  </div>

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
              as="h4"
              :title="`${title}`"
              :description="`${description}`"
              :route="`${route}`"
              :link="`${link}`"
              :btnroute="`${btnroute}`"
              :label="`${label}`"
          /></span>
        </span>
        <!-- Foreground Image (if filename2 exists), using conditional class BLUR when TITLE is true -->
        <img
          v-if="filename2"
          class="filename2"
          :class="{ blur: title }"
          style="position: absolute"
          draggable="false"
          :src="
            filename2 ? require(`../../../assets/images/${filename2}`) : null
          "
          :alt="`${alt}`"
        />
        <img
          v-if="filename3"
          class="filename3"
          :class="{ blur: title }"
          style="position: absolute"
          draggable="false"
          :src="
            filename3 ? require(`../../../assets/images/${filename3}`) : null
          "
          :alt="`${alt}`"
        />
        <!-- Background Image -->
        <img
          class="bg"
          :class="{ blur: title }"
          draggable="false"
          :src="require(`../../../assets/images/${filename1}`)"
          :alt="`${alt}`"
          :style="bgImageStyle"
        />
      </figure>
    </span>
    <figcaption v-if="caption" v-text="caption" class="subtle"></figcaption>
  </span>
</template>

<script>
import GridContainer from "../../grid/GridContainer.vue";
import GridWrapper from "../../grid/GridWrapper.vue";
import TextBlock from "../../text/TextBlock/TextBlock.vue";
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
    description: {
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
      required: true,
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
    label: {
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
        return ["small", "large"].indexOf(value) !== -1;
      },
    },
    variant: {
      type: String,
      validator: function (value) {
        return (
          ["default", "borderless", "cover", "split", "list"].indexOf(value) !==
          -1
        );
      },
    },
  },

  setup(props) {
    const reactiveProps = reactive(props);

    return {
      classes: computed(() => ({
        "image-card": true,
        [`image-card--${reactiveProps.size || "small"}`]: true,
        defaultcard: true,
        [`defaultcard--${reactiveProps.variant}`]: true,
      })),
      bgImageStyle: computed(() => {
        const filename = reactiveProps.filename1 || "";
        const isSvg = typeof filename === "string" && filename.toLowerCase().endsWith(".svg");
        const isLarge = reactiveProps.size === "large";
        // For large SVG "logo cards" (like work/dod.svg), keep the image centered (not pinned).
        if (isSvg && isLarge) {
          return { objectPosition: "50% 50%", objectFit: "contain" };
        }
        return {};
      }),
    };
  },
};
</script>

<style lang="scss" scoped>
.default-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--spacing-xxs) !important;
  border: var(--border);
  // background: var(--background-darker);
  overflow: hidden;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
  box-shadow: var(--shadow-z1);

  &:hover {
    background: var(--background);
    box-shadow: var(--shadow-z5);
    // transform: scale(1.01);

    img {
      transform: scale(1.1);
    }
  }
  // &:active {
  //   box-shadow: var(--shadow-hover);
  //   transform: rotate(1deg);
  // }
}
.info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--spacing-md);
}

img {
  inline-size: 100%;
  block-size: 101% !important;
  object-fit: cover !important;
  max-width: 100%;
  border-radius: 0 !important;
  -moz-transition: transform 0.25s ease-in-out;
  -o-transition: transform 0.25s ease-in-out;
  -webkit-transition: transform 0.25s ease-in-out;
}

.image {
  overflow: hidden;
  aspect-ratio: 4/3;
  border-radius: 0 !important;
}
.defaultcard--list {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none;
  padding: var(--spacing-md) 0;
  display: grid !important;

  &:hover {
    background: transparent;
    box-shadow: none;
  }
  .image {
    overflow: hidden !important;
    border-radius: var(--spacing-xxs) !important;
    object-fit: cover;
    border: var(--border);
  }
  .info {
    padding: var(--spacing-xs) 0 0 0 !important;
  }
  @media only screen and (min-width: 1201px) {
    border-block-end: 1px solid var(--color-xlight) !important;
  }
  // &:last-child {
  //   border-block-end: none !important;
  // }
  @media only screen and (min-width: 1201px) {
    flex-direction: row-reverse !important;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-md);
    .image {
      aspect-ratio: 16/9 !important;
      // flex: 3;
      grid-column: 3 / 4 !important;
      block-size: 100% !important;
    }
    .info {
      // flex: 6;
      grid-column: 1 / 3 !important;
      grid-row: 1;
      padding: 0 !important;
      border: none !important;
    }
  }
}

.defaultcard--borderless {
  border: none !important ;
  box-shadow: none !important;
  &:hover {
    background: transparent;
    box-shadow: none;
  }
  @media only screen and (min-width: 1201px) {
    .info {
      padding: var(--spacing-xs) 0 0 0 !important;
    }
  }
  .info {
    padding: var(--spacing-sm) 0 !important;
  }

  .image {
    border-radius: var(--spacing-xxs) !important;
  }
}
.defaultcard--cover {
  
  background-color: transparent;
  &:hover {
    background: transparent;
  }
  aspect-ratio: 3/4;

  // @media only screen and (min-width: 768px) {
  //   aspect-ratio: auto;
  // }
  .info {
    display: grid;
    flex: 1;
    padding: var(--spacing-md);
    z-index: 100;
    align-content: end; //alignment
    background: linear-gradient(
      15deg,
      var(--background) 25%,
      rgba(0, 0, 0, 0) 120%
    );
  }
  .textblock {
    background: transparent !important;
  }
  .image {
    overflow: hidden;
    block-size: 100%;
    inline-size: 100%;
    border-radius: 0 !important;
    position: absolute;
  }
}
// image-cards Small
.image-card {
  .bg {
    mix-blend-mode: normal;
    aspect-ratio: 1 / 1;
    block-size: 101%;
    object-fit: cover;
    object-position: 0% 100%;
    // border-radius: var(--spacing-xxs) ;
  }
  .filename2 {
    z-index: 1;
    inset-block-start: 14.75%;
    inset-inline-end: -18%;
    block-size: 100%;
    border-radius: var(--spacing-xxs) 0 0 var(--spacing-xxs) !important;
    box-shadow: var(--shadow-z5);
    object-fit: cover !important;
    object-position: 0% 0% !important;
  }
  .filename3 {
    z-index: 1;
    inset-inline-start: 20%;
    inset-block-start: 15%;
    block-size: 100%;
    rotate: -7deg;
    box-shadow: var(--shadow-z5);
    border-radius: var(--spacing-xxs) 0 0 0 !important;
    object-fit: cover !important;
    object-position: 0% 0% !important;
  }
}

// image-cards Large
.image-card--large {
  @media only screen and (min-width: 768px) {
    grid-column: 1 / 3;
    .bg {
      aspect-ratio: 16 / 8;
      object-position: 0% 0%;
    }
    // .filename2 {
    //   inset-block-start:  29.25%;
    //   inset-inline-end:  -17.75%;
    //   object-position: 0% 100%;
    //   block-size: 100%;
    // }
    // .fg2 {
    //   inset-block-start:  29.25%;
    //   inset-inline-end:  -17.75%;
    //   object-position: 0% 100%;
    //   block-size: 100%;
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

  @media only screen and (min-width: 768px) {
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
.bg {
  mix-blend-mode: normal;
  aspect-ratio: 1 / 1;
  block-size: 101%;
  object-fit: cover;
}
.thumbdetail {
  background-color: var(--background-darker) !important;
  grid-column: 1 / 4;
  grid-template-rows: 2, 1fr;
  text-decoration: none !important;

  @media only screen and (min-width: 768px) {
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

  @media only screen and (min-width: 768px) {
    padding: var(--spacing-sm) 0 var(--spacing-md) var(--spacing-md) !important;
  }

  @media only screen and (min-width: 1201px) {
    padding: var(--spacing-lg) 0 var(--spacing-lg) var(--spacing-lg) !important;
  }
}
.text-container2 {
  padding: var(--spacing-md) var(--spacing-md) 0 var(--spacing-md) !important;
}

.textblock {
  text-decoration: none !important;
  text-decoration: none !important;
}

.textblock:hover {
  text-decoration: none !important;
}

.title {
  margin-block-end: 1.6rem;
}

.text {
  // max-width: 60px;

  overflow: visible !important;
  @media only screen and (min-width: 768px) {
    grid-column: 1 / 2;
  }
}
.wrap {
}
.image-card--default {
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
}
// .bg2 {
//     aspect-ratio: 4 / 3 !important;
//   }
.card-route {
  inline-size: 100%;
  block-size: 100%;
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
  inline-size: 100%;
  inline-size: -moz-available;
  inline-size: -webkit-fill-available;
  block-size: 100%;
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
</style>
