<template>
  <div id="textblock" :class="classes">
    <MyIcon
      v-if="icon"
      style="margin-block-end: var(--spacing-sm)"
      :name="`${icon}`"
      :is-svg="true"
      :size="`${iconsize}`"
    />
    <p v-if="tags && tags.length" class="tags eyebrow subtle">
      <span v-for="tag in tags" :key="tag" class="tag" @click="$emit('tag-click', tag)">
        <a>{{ tag }}</a>
      </span>
    </p>
    <DynamicText v-else-if="eyebrow" :text="eyebrow" :attrs="{ class: 'eyebrow subtle' }" />
    <a
      v-if="title && titleRoute && isExternalTitleLink"
      :href="titleRoute"
      target="_blank"
      rel="noopener noreferrer"
      class="title-link"
    >
      <DynamicText :as="as" tabIndex="0" :text="title" :attrs="{ class: 'title' }" />
    </a>
    <router-link v-else-if="title && titleRoute" :to="titleRoute" class="title-link">
      <DynamicText :as="as" tabIndex="0" :text="title" :attrs="{ class: 'title' }" />
    </router-link>
    <DynamicText
      v-else-if="title"
      :as="as"
      tabIndex="0"
      :text="title"
      :attrs="{ class: 'title' }"
    />
    <DynamicText
      v-if="description"
      isHtml
      tabIndex="0"
      :text="description"
      :attrs="{ class: 'description' }"
    />
    <!-- <TextLink
      v-if="route"
      :label="label"
      :route="route ? `${route}` : undefined"
      :link="link ? `${link}` : undefined"
    />
    <MyButton
      id="btn"
      v-if="route"
      :label="label"
      :route="route"
      type="textlink"
    /> -->
    <MyButton
      id="btn"
      :type="btntype"
      v-if="(route || btnroute || link) && label"
      :label="label"
      :route="link ? undefined : route || btnroute"
      :link="link"
    />
  </div>
</template>

<script>
import MyButton from '../../Button/Button.vue';
// import TextLink from "../TextLink.vue";
import DynamicText from '../DynamicText.vue';
import MyIcon from '../../Icon.vue';

export default {
  name: 'TextBlock',
  components: {
    MyButton,
    // TextLink,
    DynamicText,
    MyIcon,
  },
  props: {
    icon: {
      type: String,
    },
    iconsize: {
      type: String,
      default: '64',
    },
    alt: {
      type: String,
    },
    eyebrow: {
      type: String,
      required: false,
    },
    as: {
      default: 'h3',
      type: String,
      required: false,
    },
    btntype: {
      type: String,
    },
    title: {
      type: String,
      default: '',
      required: false,
    },

    description: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      required: false,
    },
    // blockquote: {
    //   type: String,
    //   default: "",
    //   required: false,
    // },
    center: {
      type: Boolean,
      default: false,
    },
    clamped: {
      type: Boolean,
      default: false,
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    route: {
      type: String,
      required: false,
    },
    btnroute: {
      type: String,
      required: false,
    },
    link: {
      default: '',
      type: String,
    },
    titleRoute: {
      type: String,
      required: false,
    },
    tags: {
      type: Array,
      default: () => [],
      required: false,
    },
  },

  computed: {
    classes() {
      return {
        'textblock-align': true,
        'textblock-align--center': this.center,
        'textblock-align--left': !this.center,

        'textblock--clamped': this.clamped,
        'textblock--normal': !this.clamped,

        reversed: this.reversed,
      };
    },
    isExternalTitleLink() {
      return (
        this.titleRoute &&
        (this.titleRoute.startsWith('http://') || this.titleRoute.startsWith('https://'))
      );
    },
  },
};
</script>
<style scoped>
* {
  color: inherit;
}
#textblock {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
}
.eyebrow {
  word-spacing: 1rem;
  margin-block-end: 1em;
}
.title {
  /* flex: 1; */
  inline-size: 100%;
  white-space: normal;
}

.title-link {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 1px;
  }
}
.description {
  /* flex: 1; */
  inline-size: 100%;
  white-space: normal;
}
.textblock-align {
  grid-column: 1 / 4;
}
.description {
  margin: 1rem 0 0 0;
}
.textblock--clamped p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#btn {
  display: inline-block;
  margin-block-start: var(--spacing-sm);
}
#richlink {
  margin-block-start: var(--spacing-sm) !important;
}
.route {
  margin: var(--spacing-sm) 0 0 0;
}
.textblock-align--left {
  text-align: left;
}
.textblock-align--center {
  text-align: center;
}

.tags {
  margin-block-end: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.tag {
  cursor: pointer;
  padding: 0 var(--spacing-xs) 0 0;
}
.tag a {
  text-decoration: none;
  color: var(--color-text) !important;
}

.tag a:hover {
  text-decoration: underline;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  .textblock-align {
    grid-column: auto;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .textblock-align {
      grid-column: auto;
    }
  }
}
</style>
