<template>
  <div id="textblock" :class="classes">
    <MyIcon
      v-if="icon"
      style="margin-block-end: var(--spacing-sm)"
      :name="`${icon}`"
      :is-svg="true"
      :size="`${iconsize}`"
    />
    <DynamicText
      v-if="eyebrow"
      :text="eyebrow"
      :attrs="{ class: 'eyebrow subtle' }"
    />
    <DynamicText
      v-if="title"
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
    <TextLink
      v-if="route && label"
      :label="label"
      :route="route ? `${route}` : undefined"
      :link="link ? `${link}` : undefined"
    />
    <MyButton
      id="btn"
      v-if="btnroute && label"
      :label="label"
      :route="btnroute"
      type="solid"
    />
  </div>
</template>

<script>
import MyButton from "../../Button/Button.vue";
import TextLink from "../TextLink.vue";
import DynamicText from "../DynamicText.vue";
import MyIcon from "../../Icon.vue";

export default {
  name: "TextBlock",
  components: {
    MyButton,
    TextLink,
    DynamicText,
    MyIcon,
  },
  props: {
    icon: {
      type: String,
    },
    iconsize: {
      type: String,
      default: "64",
    },
    alt: {
      type: String,
    },
    eyebrow: {
      type: String,
      required: false,
    },
    as: {
      default: "h3",
      type: String,
      required: false,
    },
    title: {
      type: String,
      default: "",
      required: false,
    },

    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    label: {
      type: String,
      default: "",
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
      default: "",
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        "textblock-align": true,
        "textblock-align--center": this.center,
        "textblock-align--left": !this.center,

        "textblock--clamped": this.clamped,
        "textblock--normal": !this.clamped,
      };
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
