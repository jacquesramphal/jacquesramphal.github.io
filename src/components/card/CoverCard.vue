<template>
  <div id="coverCard" class="coverCard card" :data-category="`${tag}`">
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

    <div class="info reversed">
      <TextBlock
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
  name: "CoverCard",
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
  },
};
</script>

<style scoped lang="scss">
* {
  border-radius: 0;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--spacing-xxs) !important;
  // border: var(--border);
  overflow: hidden;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
  // box-shadow: var(--shadow-z1);


  &:hover {
    box-shadow: var(--shadow-z5);
    transform: scale(1.01);

    img {
      transform: scale(1.1);
    }
  }

  &:active {
    // box-shadow: var(--shadow-hover);
    // transform: rotate(1deg);
  }
}

.info {
  display: grid;
  flex: 1;
  padding: var(--spacing-md);
  z-index: 100;
  align-content: end; //alignment
  // background-color: blue;
  background: linear-gradient(
    45deg,
    var(--background-reversed) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

.textblock {
  // background: pink !important;

}

.card-description {
  margin-bottom: var(--spacing-md) !important;
  overflow: hidden;
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
height: 100%;
width: 100%;

 // aspect-ratio: 16/9;
  border-radius: 0 !important;
  position: absolute;

}

.card-title {
  line-height: 1.5;
  margin-bottom: var(--spacing-xxs);
}
</style>
