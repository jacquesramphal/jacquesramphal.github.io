<template>
  <GridWrapper :class="classes">
    <GridContainer tight style="padding: 0 !important">
      <div id="grid-parent" class="grid-parent">

        <!-- <GridContainer class="imgcontainer parallaxBack fadeInUp"> -->

        <GridContainer class="imgcontainer">
          <img
            class="splitimg"
            draggable="false"
            :src="require(`../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </GridContainer>
        <!-- <GridContainer class="textcontainer parallaxFront fadeInUp"> -->

        <GridContainer class="textcontainer">
          <TextBlock
            :eyebrow="`${eyebrow}`"
            is="h2"
            :title="`${title}`"
            :label="`${label}`"
            :route="route ? `${route}` : undefined"
            :btnroute="btnroute ? `${btnroute}` : undefined"
            :description="`${description}`"
          />
        </GridContainer>
      </div> </GridContainer
  ></GridWrapper>
</template>
<script>
import GridContainer from "../grid/GridContainer.vue";
import GridWrapper from "../grid/GridWrapper.vue";
import TextBlock from "../TextBlock.vue";

export default {
  name: "TextImage",
  components: {
    GridContainer,
    GridWrapper,
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

.grid-parent {
  grid-gap: 0;

  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-template-rows: 1fr !important;
  }
}

// COLOR

.TextImage-color--red {
  background-color: red !important;
}

// ALIGNMENT

.TextImage-align {
  position: relative;
  overflow: hidden;
  grid-template-rows: repeat(2, 1fr);

  #textblock {
    // align-self: center !important;
    padding-block-start: 0;
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

    @media only screen and (min-width: 768px) {
      padding-block-start: var(--spacing-lg) !important;
      padding-block-end: var(--spacing-lg) !important;
    }
  }

  .textcontainer {
    align-self: center;
    display: block;
    grid-column: auto;
    // grid-row: 2 / 2;
    grid-template-columns: 1fr !important;
  }
}

.TextImage-align--default {
  .textcontainer {
    @media only screen and (min-width: 768px) {
      grid-column: 2;
      grid-row: 1;
    }
  }

  img {
    @media only screen and (min-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .imgcontainer {
    @media only screen and (min-width: 768px) {
      padding-inline-end: 0 !important;
    }
  }
}

.TextImage-align--flipped {
  .textcontainer {
    @media only screen and (min-width: 768px) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  img {
    @media only screen and (min-width: 768px) {
      grid-column: 2;
      grid-row: 1;
    }
  }

  .imgcontainer {
    @media only screen and (min-width: 768px) {
      padding-inline-start: 0 !important;
    }
  }
}
</style>
