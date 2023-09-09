<template :class="classes">
  <div id="default-card" :class="classes" :data-category="`${tag}`">
    <div v-if="alt" class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" />
        <img
          draggable="false"
          v-if="filename"
          :src="require(`../../assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </div>

    <div class="info">
      <TextBlock
        v-if="cover"
        clamped
        class="textblock"
        :eyebrow="`${tag}`"
        :header4="`${title}`"
        :details="`${description}`"
        :btnroute="`${route}`"
        :cta="`${label}`"
      />
      <TextBlock
        v-else
        clamped
        class="textblock"
        :eyebrow="`${tag}`"
        :header4="`${title}`"
        :details="`${description}`"
        :btnroute="`${route}`"
        :cta="`${label}`"
      />
    </div>
    <!-- <MyButton style="" secondary :label="`${label}`" size="large" :route="`${route}`" /> -->
  </div>
</template>

<script>
import TextBlock from "../TextBlock.vue";

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
    },
    alt: {
      type: String,
    },
    eyebrow: {
      default: "",
      required: false,
      type: String,
    },
    title: {
      default: "Hello World",
      required: true,
      type: String,
    },
    description: {
      default:
        "This is a short description taken from the article. Maybe a little longer ...",
      type: String,
    },
    tag: {
      default: "",
      type: String,
    },
    route: {
      type: String,
    },
    label: {
      default: "Read More",
      type: String,
      required: true,
    },
    cover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        defaultcard: true,
        "defaultcard--cover": this.cover,
      };
    },
  },
};
</script>

<style scoped lang="scss">
* {
  border-radius: 0;
}

#default-card {
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
.defaultcard--cover {
  background-color: transparent;
  &:hover {
    background: transparent;
  }
  aspect-ratio: 3/4;

  // @media only screen and (min-width: 740px) {
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
    height: 100%;
    width: 100%;
    border-radius: 0 !important;
    position: absolute;
  }
}
.info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--spacing-md);
}

img {
  width: 100%;
  height: 101% !important;
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
</style>
