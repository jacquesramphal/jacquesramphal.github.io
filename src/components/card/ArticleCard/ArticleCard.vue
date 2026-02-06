<template :class="classes">
  <div class="default-card" :class="classes" :data-category="`${eyebrow}`">
    <div v-if="alt" class="image">
      <!-- Show placeholder when no image -->
      <template v-if="!hasImage">
        <router-link v-if="route && !link" :to="`${route}`">
          <div class="placeholder" :style="{ backgroundColor: placeholderColor }">
            <div class="placeholder-text">
              <span
                v-for="(word, index) in placeholderWords"
                :key="index"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                {{ word }}
              </span>
            </div>
          </div>
        </router-link>
        <a v-else-if="link" :href="link" target="_blank" rel="noopener noreferrer">
          <div class="placeholder" :style="{ backgroundColor: placeholderColor }">
            <div class="placeholder-text">
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
          <div class="placeholder-text">
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
        <router-link v-if="route && !link" :to="`${route}`">
          <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" />
          <img
            draggable="false"
            v-if="filename"
            :src="require(`../../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </router-link>
        <a v-else-if="link" :href="link" target="_blank" rel="noopener noreferrer">
          <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" />
          <img
            draggable="false"
            v-if="filename"
            :src="require(`../../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </a>
        <div v-else>
          <img v-if="imgurl" :src="imgurl" :alt="`${alt}`" />
          <img
            draggable="false"
            v-if="filename"
            :src="require(`../../../assets/images/${filename}`)"
            :alt="`${alt}`"
          />
        </div>
      </template>
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
        :titleRoute="route || link"
        :description="description"
        :label="label"
        :route="route ? `${route}` : undefined"
        :btnroute="btnroute ? `${btnroute}` : undefined"
        :link="link ? `${link}` : undefined"
        :tags="tags"
        btntype="textlink"
        @tag-click="$emit('tag-click', $event)"
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
import TextBlock from '../../text/TextBlock/TextBlock.vue';

// Generate a random seed once per session (persists until page refresh)
const sessionSeed = Math.floor(Math.random() * 10000);

export default {
  name: 'ArticleCard',
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
  },
  computed: {
    classes() {
      return {
        defaultcard: true,
        'defaultcard--cover': this.cover,
        'defaultcard--borderless': this.borderless,
        'defaultcard--list': this.list,
      };
    },
    hasImage() {
      return !!(this.imgurl || this.filename);
    },
    placeholderColor() {
      const colors = [
        'var(--color-red)',
        'var(--color-green)',
        'var(--color-blue)',
        'var(--color-dodgerblue)',
        'var(--color-purple)',
        'var(--color-lightpurple)',
        'var(--color-yellow)',
        'var(--color-lightyellow)',
        'var(--color-brown)',
        'var(--color-pink)',
      ];

      const hash = this.title.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);

      // Add index to prevent adjacent cards from having the same color
      // Add sessionSeed to randomize colors per session (changes on page refresh)
      const finalHash = hash + this.index * 3 + sessionSeed;

      return colors[Math.abs(finalHash) % colors.length];
    },
    placeholderWords() {
      const words = this.title.split(' ');
      return words.slice(0, 3);
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
  box-shadow: var(--shadow-z2);
  min-height: 400px;

  @media only screen and (max-width: 767px) {
    grid-column: 1 / 4;
    width: 100%;
  }

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
  height: 100%;
  padding: var(--spacing-sm) var(--spacing-md) calc(var(--spacing-md) + var(--spacing-xs));
}

.textblock {
  height: 100%;
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
  aspect-ratio: 5/4;
  border-radius: 0 !important;
  position: relative;
}

.image a,
.image router-link {
  text-decoration: none;
}

.placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
}

.placeholder-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--spacing-md);
  text-align: center;
  transform: rotate(-5deg) scale(1.2);
  -moz-transition: transform 0.25s ease-in-out;
  -o-transition: transform 0.25s ease-in-out;
  -webkit-transition: transform 0.25s ease-in-out;

  span {
    display: block;
    font-size: clamp(2rem, 8vw, 5rem);
    font-weight: 800;
    line-height: 0.9;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: -0.05em;
    word-wrap: break-word;
    opacity: 0.85;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;

    &:nth-child(2) {
      opacity: 0.7;
      font-size: clamp(1.5rem, 6vw, 4rem);
    }

    &:nth-child(3) {
      opacity: 0.5;
      font-size: clamp(1rem, 4vw, 3rem);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.85;
    transform: translateY(0);
  }
}

.placeholder-text span:nth-child(1) {
  opacity: 0.85;
}

.placeholder-text span:nth-child(2) {
  opacity: 0.7;
}

.placeholder-text span:nth-child(3) {
  opacity: 0.5;
}

.default-card:hover .placeholder-text {
  transform: rotate(-3deg) scale(1.3);
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
    display: none;
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
      padding: var(--spacing-xs) 0 calc(var(--spacing-md) + var(--spacing-xs)) 0 !important;
    }
  }
  .info {
    padding: var(--spacing-sm) 0 calc(var(--spacing-md) + var(--spacing-xs)) 0 !important;
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
  }
}
</style>
