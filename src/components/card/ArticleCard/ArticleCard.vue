<template :class="classes">
  <div class="default-card" :class="classes" :data-category="`${eyebrow}`">
    <div v-if="alt" class="image" :style="bgcolor">
      <!-- Show placeholder when no image -->
      <template v-if="!hasImage">
        <router-link v-if="(route || btnroute) && !link" :to="`${route || btnroute}`">
          <div class="placeholder" :style="{ backgroundColor: placeholderColor }">
            <div class="display placeholder-text" :style="{ color: placeholderTextColor }">
              <span
                v-for="(word, index) in placeholderWords"
                :key="index"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <h1>{{ word }}</h1>
              </span>
            </div>
          </div>
        </router-link>
        <a v-else-if="link" :href="link" target="_blank" rel="noopener noreferrer">
          <div class="placeholder" :style="{ backgroundColor: placeholderColor }">
            <div class="placeholder-text" :style="{ color: placeholderTextColor }">
              <span
                v-for="(word, index) in placeholderWords"
                :key="index"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                {{ word }}
              </span>
            </div>
          </div>
        </a>
        <div v-else class="placeholder" :style="{ backgroundColor: placeholderColor }">
          <div class="placeholder-text" :style="{ color: placeholderTextColor }">
            <span
              v-for="(word, index) in placeholderWords"
              :key="index"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              {{ word }}
            </span>
          </div>
        </div>
      </template>

      <!-- Show images when available -->
      <template v-else>
        <router-link v-if="(route || btnroute) && !link" :to="`${route || btnroute}`">
          <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" :class="`image-${imageVariant}`" />
          <img
            draggable="false"
            v-if="filename"
            :class="`image-${imageVariant}`"
            :src="require(`../../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </router-link>
        <a v-else-if="link" :href="link" target="_blank" rel="noopener noreferrer">
          <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" :class="`image-${imageVariant}`" />
          <img
            draggable="false"
            v-if="filename"
            :class="`image-${imageVariant}`"
            :src="require(`../../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </a>
        <div v-else>
          <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" :class="`image-${imageVariant}`" />
          <img
            draggable="false"
            v-if="filename"
            :class="`image-${imageVariant}`"
            :src="require(`../../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </div>
      </template>
    </div>

    <div class="info">
      <!-- Color bar at top when no image (COMMENTED OUT - using placeholder images instead) -->
      <!-- <div v-if="!hasImage" class="color-bar" :style="{ backgroundColor: typeColorSubtle }"></div> -->

      <TextBlock
        clamped
        class="textblock"
        :class="{ 'textblock--mobile-list': mobileList }"
        :eyebrow="eyebrow"
        as="h4"
        :icon="icon"
        :iconsize="iconsize"
        :title="title"
        :titleRoute="route || btnroute || link"
        :description="description"
        :tags="tags"
        :cardType="type"
        :readTime="readTime"
        @tag-click="$emit('tag-click', $event)"
      />

      <!-- :description="mobileList ? title : description" -->

      <!-- Read more link -->
      <!-- <div class="card-footer">
        <TextLink :label="label || 'Read more'" :route="route || btnroute" :link="link" />
      </div> -->
    </div>
    <!-- <MyButton style="" secondary :label="`${label}`" size="large" :route="`${route}`" /> -->
  </div>
</template>

<script>
import TextBlock from '../../text/TextBlock/TextBlock.vue';
import { getReadTime } from '../../../utils/readTime';
// import TextLink from '../../text/TextLink.vue';

export default {
  name: 'ArticleCard',
  components: {
    TextBlock,
    //TextLink,
  },
  props: {
    imgurl: {
      type: String,
    },
    filename: {
      type: String,
      required: false,
    },
    filename1: {
      type: String,
      required: false,
    },
    filename2: {
      type: String,
      required: false,
    },
    filename3: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
    },
    eyebrow: {
      default: '',
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
      default: 'Hello World',
      required: true,
      type: String,
    },
    description: {
      default: '',
      required: false,
      type: String,
    },

    route: {
      default: '',
      type: String,
      required: false,
    },
    btnroute: {
      default: '',
      type: String,
      required: false,
    },
    link: {
      default: '',
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
    mobileList: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: () => [],
      required: false,
    },
    index: {
      type: Number,
      default: 0,
      required: false,
    },
    type: {
      type: String,
      default: 'article',
      required: false,
    },
    bgcolor: {
      type: String,
      required: false,
    },
    imageVariant: {
      type: String,
      default: 'full',
      required: false,
      validator: (value) => ['full', 'offset', 'angled'].includes(value),
    },
    contentFile: {
      type: String,
      default: '',
      required: false,
    },
  },
  computed: {
    classes() {
      return {
        defaultcard: true,
        'defaultcard--cover': this.cover,
        'defaultcard--borderless': this.borderless,
        'defaultcard--list': this.list,
        'defaultcard--mobile-list': this.mobileList,
      };
    },
    hasImage() {
      return !!(this.imgurl || this.filename || this.filename1 || this.filename3);
    },
    typeColor() {
      // Color mapping based on article type (darker variants for text)
      const typeColorMap = {
        article: 'var(--color-yellow)',
        tool: 'var(--color-yellow)',
        'case-study': 'var(--color-yellow)',
        'design-project': 'var(--color-yellow)',
      };

      return typeColorMap[this.type] || '#0066b3';
    },
    typeColorSubtle() {
      // Create subtle/transparent variants for backgrounds
      const subtleColorMap = {
        article: 'var(--color-lightyellow)',
        tool: 'var(--color-lightyellow)',
        'case-study': 'var(--color-lightyellow)',
        'design-project': 'var(--color-lightyellow)',
      };

      return subtleColorMap[this.type] || 'rgba(0, 134, 230, 0.15)';
    },
    placeholderColor() {
      // Use subtle background color to match tags
      return this.typeColorSubtle;
    },
    placeholderTextColor() {
      // Use darker text color to match tags
      return this.typeColor;
    },
    placeholderWords() {
      const words = this.title.split(' ');
      return words.slice(0, 3);
    },
    readTime() {
      return getReadTime(this.contentFile);
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
  // background: var(--color-lightyellow);
  overflow: hidden;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  box-shadow: var(--shadow-z2);
  min-height: 400px;
  height: 100%;

  @media only screen and (max-width: 767px) {
    grid-column: 1 / 4;
    width: 100%;
    height: auto;
    min-height: 300px;
  }

  &:hover {
    background: var(--background);
    box-shadow: var(--shadow-z5);
    // transform: scale(1.01);

    img:not(.image-offset):not(.image-angled) {
      transform: scale(1.1);
    }

    .image-offset {
      transform: scale(1.05) translateX(15%) translateY(10%);
    }

    .image-angled {
      transform: scale(0.99) rotate(-7deg) translateX(18%) translateY(12%);
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
  height: 100%;
  padding: 0 var(--spacing-md) var(--spacing-md);
  justify-content: space-between;

  &:has(.color-bar) {
    padding-block-start: 0;
  }

  &:not(:has(.color-bar)) {
    padding-block-start: var(--spacing-sm);
  }
}

.textblock {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-footer {
  margin-block-start: auto;
  margin-block-end: var(--spacing-xxs);

  padding-block-start: var(--spacing-sm);
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
  transition: transform 0.25s ease-in-out;
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

.image-offset {
  transform: scale(0.95) translateX(15%) translateY(10%);
  box-shadow: var(--shadow-z5);
  border-radius: var(--spacing-xxs) !important;
  object-position: 0% 0% !important;
}

.image-angled {
  transform: scale(0.9) rotate(-7deg) translateX(18%) translateY(12%);
  box-shadow: var(--shadow-z5);
  border-radius: var(--spacing-xxs) !important;
  object-position: 0% 0% !important;
}

.image {
  overflow: hidden;
  border-radius: 0 !important;
  position: relative;
  border-radius: var(--spacing-xxxs) !important;
  margin: var(--spacing-xs);

  &:has(img),
  &:has(.placeholder) {
    aspect-ratio: 5/4;
  }
}

.image a,
.image router-link {
  text-decoration: none;
}

.placeholder {
  aspect-ratio: 5/4;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--spacing-md);
  position: relative;
  overflow: hidden;
}

.placeholder-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  padding: 0;
  overflow: visible;
}

.placeholder-text span {
  display: inline-block;
  animation: fadeInScale 0.6s ease-out forwards;
  opacity: 0;
  transform: scale(0.8);
}

.placeholder-text h1 {
  color: inherit !important;
  line-height: 1 !important;
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.color-bar {
  width: calc(100% + var(--spacing-md) * 2);
  height: var(--spacing-xxs);
  margin-inline-start: calc(var(--spacing-md) * -1);
  margin-block-start: 0;
  margin-block-end: var(--spacing-sm);
  -moz-transition: height 0.25s ease-in-out;
  -o-transition: height 0.25s ease-in-out;
  -webkit-transition: height 0.25s ease-in-out;
  transition: height 0.25s ease-in-out;
}

.defaultcard--list {
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none;
  padding: var(--spacing-md) 0;
  display: grid !important;
  min-height: auto;

  &:hover {
    background: transparent;
    box-shadow: none;
  }
  .image {
    display: none;
  }
  .info {
    padding: 0 0 0 0 !important;

    &:not(:has(.color-bar)) {
      padding-block-start: var(--spacing-xs) !important;
    }
  }
  .card-footer {
    padding-block-start: var(--spacing-xs);
  }
  .color-bar {
    width: 100%;
    margin-inline-start: 0;
  }
  @media only screen and (min-width: 1201px) {
    border-block-end: var(--border) !important;
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
  .info {
    padding: 0 !important;
    margin-block-start: 0;

    &:not(:has(.color-bar)) {
      padding-block-start: var(--spacing-sm) !important;
    }
  }
  @media only screen and (min-width: 1201px) {
    .info {
      padding: 0 0 var(--spacing-md) 0 !important;
      margin-block-start: var(--spacing-xxs);

      &:not(:has(.color-bar)) {
        padding-block-start: var(--spacing-xs) !important;
      }
    }
  }

  .image {
    border-radius: var(--spacing-xxs) !important;
    margin: 0 !important;
  }

  .color-bar {
    width: 100%;
    margin-inline-start: 0;
  }
}
.defaultcard--mobile-list {
  @media only screen and (max-width: 767px) {
    border-radius: 0 !important;
    box-shadow: none !important;
    border: none;
    padding-block-start: var(--spacing-sm);
    display: grid !important;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-xs);
    min-height: auto;
    border-block-start: var(--border) !important;

    &:hover {
      background: transparent;
      box-shadow: none;
    }

    .image {
      grid-column: 3 / 4;
      grid-row: 1;
      margin: 0 !important;
      aspect-ratio: 1 / 1 !important;
      inline-size: 100% !important;
      display: none !important;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }

      .placeholder {
        aspect-ratio: 1 / 1;
        block-size: 100%;
        inline-size: 100%;
      }
    }

    .info {
      grid-column: 1 / 4;
      grid-row: 1;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      &:not(:has(.color-bar)) {
        padding-block-start: 0 !important;
      }
    }

    .card-footer {
      padding-block-start: var(--spacing-xxs);
      margin-block-start: auto;
    }

    .color-bar {
      width: 100%;
      margin-inline-start: 0;
    }

    // Hide title and show description (which will contain title content)
    .textblock--mobile-list :deep(.title) {
      // display: none !important;
      // font-size: var(--font-size-sm) !important;
    }

    .textblock--mobile-list :deep(.description) {
      // margin-block-end: 0;
      // margin-block-start: 0;
    }

    .textblock--mobile-list :deep(.tags) {
      // margin-block-end: var(--spacing-xxs);
    }
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
    display: flex !important;
    flex-direction: column !important;
    flex: 1;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: var(--spacing-sm) var(--spacing-md) calc(var(--spacing-md) + var(--spacing-xs));
    z-index: 100;
    //    background: linear-gradient(15deg, var(--background) 45%, rgba(0, 0, 0, 0) 170%);
    background: linear-gradient(135deg, var(--background) 0%, rgba(255, 255, 255, 0) 200%);
  }
  .textblock {
    background: transparent !important;
    height: 100%;
    display: flex !important;
    flex-direction: column !important;
  }
  .textblock .eyebrow {
    margin-block-start: auto;
  }
  .image {
    overflow: hidden;
    block-size: 100%;
    inline-size: 100%;
    border-radius: 0 !important;
    position: absolute;
    margin: 0 !important;
  }
}
</style>
