<template>
  <div id="textblock" :class="classes">
    <MyIcon
      v-if="icon"
      style="margin-block-end: var(--spacing-sm)"
      :name="`${icon}`"
      :is-svg="true"
      :size="`${iconsize}`"
    />
    <!-- Type badge hidden temporarily -->
    <!-- <div v-if="shouldShowTags" class="tags">
      <MyButton
        type="subtle"
        size="xs"
        :label="typeLabel"
        :customBgColor="typeColorSubtle"
        :customTextColor="typeColor"
      />
    </div> -->
    <p v-else-if="eyebrow" class="eyebrow subtle">{{ eyebrow }}</p>
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
    <!-- Content tags at bottom -->
    <div v-if="shouldShowTags && (tags && tags.length || readTime)" class="tags tags--content">
      <span v-for="tag in tags" :key="tag" class="tag-label subtle" @click="$emit('tag-click', tag)"
        ><p style="font-size: var(--font-2xs)">{{ tag }}</p></span
      >
      <span v-if="readTime" class="tag-label tag-label--read-time subtle">
        <p style="font-size: var(--font-2xs)">{{ readTime }}</p>
      </span>
    </div>
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
    cardType: {
      type: String,
      default: null,
      required: false,
    },
    readTime: {
      type: String,
      default: '',
      required: false,
    },
  },

  computed: {
    shouldShowTags() {
      // Show tags only when used in a card context (cardType is explicitly provided)
      return this.cardType !== null;
    },
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
    typeColor() {
      const typeColorMap = {
        article: 'var(--text)',
        tool: 'var(--text)',
        'case-study': 'var(--text)',
        'design-project': 'var(--text)',
      };
      return typeColorMap[this.cardType] || '#0066b3';
    },
    typeColorSubtle() {
      const subtleColorMap = {
        article: 'var(--background-darker)',
        tool: 'var(--background-darker)',
        'case-study': 'var(--background-darker)',
        'design-project': 'var(--background-darker)',
      };
      return subtleColorMap[this.cardType] || 'rgba(0, 134, 230, 0.15)';
    },
    typeLabel() {
      const typeLabelMap = {
        article: 'Writing',
        tool: 'Writing',
        'case-study': 'Case Study',
        'design-project': 'Project',
      };
      return typeLabelMap[this.cardType] || 'Writing';
    },
  },
};
</script>
<style scoped>
/* Links and text should inherit global styles, not force color inheritance */
/* * {
  color: inherit;
} */
#textblock {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
}
.eyebrow {
  word-spacing: 1rem;
  margin-block-end: 1em;
}

.eyebrow-badge {
  display: inline-block;
  padding: var(--spacing-xxxs) var(--spacing-xs);
  border-radius: var(--spacing-xxxs);
  font-size: var(--font-300);
  font-weight: var(--fontWeight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-block-end: var(--spacing-xs);
}
.title {
  /* flex: 1; */
  inline-size: 100%;
  white-space: normal;
  font-weight: var(--fontWeight-bold) !important;
}

.title-link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 0.15rem;
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
  margin-block-end: var(--spacing-xs);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tags--content {
  margin-block-start: auto;
  margin-block-end: 0;
  padding-block-start: var(--spacing-xs);
}

.tag-label {
  display: inline;
  cursor: pointer;
}

.tag-label p {
  display: inline;
  font-size: var(--font-2xs);
}

.tag-label--read-time {
  cursor: default;
  opacity: 0.65;
}

/* .tag-label::after {
  content: '•';
  margin-inline-start: var(--spacing-xxs);
  color: var(--text-subtle);
}
.tag-label:last-child::after {
  content: '';
  margin: 0;
} */

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
