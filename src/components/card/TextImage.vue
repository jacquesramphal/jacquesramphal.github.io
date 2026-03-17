<template>
  <GridWrapper>
    <GridContainer>
      <GridParent :class="classes">
        <!-- <GridContainer class="imgcontainer parallaxBack fadeInUp"> -->
        <GridWrapper class="imgcontainer">
          <img
            class="splitimg"
            draggable="false"
            :src="require(`../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </GridWrapper>
        <!-- <GridWrapper class="textcontainer parallaxFront fadeInUp"> -->

        <GridWrapper class="textcontainer">
          <TextBlock
            :eyebrow="`${eyebrow}`"
            :as="`${as}`"
            :title="`${title}`"
            :label="`${label}`"
            :route="route ? `${route}` : undefined"
            :btnroute="btnroute ? `${btnroute}` : undefined"
            :description="`${description}`"
          />
        </GridWrapper>
      </GridParent>
    </GridContainer>
  </GridWrapper>
</template>
<script>
import TextBlock from "../text/TextBlock/TextBlock.vue";

export default {
  name: "TextImage",
  components: {
    TextBlock,
  },
  props: {
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
    title: {
      type: String,
      default: "Detail Card",
    },
    as:{
      type: String,
      default: "h3",
    },
    description: {
      type: String,
      default:
        "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    alt: {
      type: String,
      default: "Alt Text",
    },
    filename: {
      type: String,
      default: "jacques.jpg",
    },
    label: {
      type: String,
      default: "Read More",
    },
    btnroute: {
      type: String,
      default: "",
      required: false,
    },
    route: {
      type: String,
      default: "",
      required: false,
    },
    flipped: {
      type: Boolean,
      default: false,
      required: true,
    },
    red: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  // Multiple classes
  computed: {
    classes() {
      return {
        "TextImage-align": true,
        "TextImage-align--flipped": this.flipped,
        "TextImage-align--default": !this.flipped,
        "TextImage-color": true,
        "TextImage-color--red": this.red,
        "TextImage-color--default": !this.red,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: inherit;
}

// COLOR

.TextImage-color--red {
  background-color: red !important;
}

// ALIGNMENT

.TextImage-align {
  position: relative;
  overflow: hidden;
  // margin-block-start: var(--spacing-lg) !important;
  // margin-block-end: var(--spacing-lg) !important;
  padding-block-end: var(--spacing-md);
  @media only screen and (min-width: 768px) {
    padding-block-end: 0 !important;
  }
  #textblock {
    // align-self: center !important;
    padding-block: 0;
    @media only screen and (min-width: 768px) {
      padding-block-start: 0;
    }
  }

  img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover !important;
    position: relative;
    display: block;
    overflow: hidden;
    aspect-ratio: 16 / 9 !important;
    grid-column: 1;
    // Swap img postiton on mobile
    grid-row: 2;
    // grid-row: 1 / 1;

    // @media only screen and (min-width: 1201px) {
    //   aspect-ratio: 16 / 9 !important;
    // @media screen and (-webkit-min-device-pixel-ratio:0) {
    //   block-size: auto;
    //   background: yellow;
    // }
    // }
  }

  .imgcontainer {
    padding-block-end: 0 !important;
    grid-column: span 2;
    // background-color: pink !important;

    @media only screen and (min-width: 768px) {
    }
  }

  .textcontainer {
    align-self: center;
    display: block;
    grid-column: auto;
    // background-color: blue !important;

    // grid-row: 2 / 2;
    grid-template-columns: 2fr !important;
  }
}

.TextImage-align--default {
  .textcontainer {
    grid-column: 1 / 3;

    @media only screen and (min-width: 768px) {
    }
    @media only screen and (min-width: 1201px) {
      grid-row: 1;
      // padding-inline-end: var(--spacing-md);
      grid-column: 1;
    }
  }

  img {
    @media only screen and (min-width: 768px) {
      grid-column: 1 / 2;
      grid-row: 1;
    }
  }

  .imgcontainer {
    @media only screen and (min-width: 768px) {
      padding-inline-end: 0 !important;
      grid-column: span 2;
    }
  }
}

.TextImage-align--flipped {
  .textcontainer {
    grid-column: 1 / 3;

    @media only screen and (min-width: 768px) {
    }
    @media only screen and (min-width: 1201px) {
      grid-row: 1;
      // padding-inline-start: var(--spacing-md);

      grid-column: 3;
    }
  }

  img {
    @media only screen and (min-width: 768px) {
      grid-row: 1;
    }
  }

  .imgcontainer {
    // @media only screen and (min-width: 768px) {
    //   padding-inline: 0 !important;
    // }
    @media only screen and (min-width: 1201px) {
      // margin-inline-end: var(--spacing-md) !important;
    }
  }
}
</style>
