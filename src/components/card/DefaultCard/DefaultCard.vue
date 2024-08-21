<template :class="classes">
  <div class="default-card" :class="classes" :data-category="`${eyebrow}`">
    <div v-if="alt" class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" />
        <img
          draggable="false"
          v-if="filename"
          :src="require(`../../../assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </div>

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

      <!-- <TextBlock
        v-else
        clamped
        class="textblock"
        :eyebrow="tag"
        :header4="title"
        :description="description"
        :btnroute="route"
        :route="route"
        :cta="label"
      /> -->
    </div>
    <!-- <MyButton style="" secondary :label="`${label}`" size="large" :route="`${route}`" /> -->
  </div>
</template>

<script>
import TextBlock from "../../text/TextBlock/TextBlock.vue";

export default {
  name: "DefaultCard",
  components: {
    TextBlock,
  },
  props: {
    imgurl: {
      type: String,
    },
    filename: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
    },
    eyebrow: {
      default: "",
      required: false,
      type: String,
    },
    icon: {
      type: String,
      required: false,
    },
    iconsize: {
      type: String,
      required: false,
    },
    title: {
      default: "Hello World",
      required: true,
      type: String,
    },
    description: {
      default: "",
      required: false,
      type: String,
    },

    route: {
      default: "",
      type: String,
      required: false,
    },
    btnroute: {
      default: "",
      type: String,
      required: false,
    },
    label: {
      type: String,
    },
    cover: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        defaultcard: true,
        "defaultcard--cover": this.cover,
        "defaultcard--borderless": this.borderless,
        "defaultcard--list": this.list,
      };
    },
  },
};
</script>

<style scoped lang="scss">
* {
  border-radius: 0;
}

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
  aspect-ratio: 16/9;
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
    border: red 1px solid !important;
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
      // aspect-ratio: 16/9 !important;
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
</style>
