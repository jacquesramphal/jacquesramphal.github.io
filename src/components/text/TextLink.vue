<template>
  <div id="richlink">
    <router-link :class="classes" v-if="route" :to="`${route}`" @click="onClick">
      <MyIcon
        v-if="icon || unicode"
        :style="{ 'margin-inline-end': iconsize / 2 + 'px' }"
        :name="icon"
        :is-svg="isSvg"
        :size="iconsize"
        :url="iconurl"
        :unicode="unicode"
      />
      {{ label }}
    </router-link>
    <a
      :class="classes"
      class="external"
      v-else-if="link"
      target="blank"
      :href="`${link}`"
      @click="onClick"
    >
      <MyIcon
        v-if="icon || unicode"
        :style="{ 'margin-inline-end': iconsize / 2 + 'px' }"
        :name="`${icon}`"
        :is-svg="isSvg"
        :size="iconsize"
        :url="iconurl"
        :unicode="unicode"
      />
      <span class="label-text">{{ label }}</span>
    </a>
    <a
      :class="classes"
      v-else
      target="blank"
      @click="onClick"
    >
      <MyIcon
        v-if="icon || unicode"
        :style="{ 'margin-inline-end': iconsize / 2 + 'px' }"
        :name="`${icon}`"
        :is-svg="isSvg"
        :size="iconsize"
        :url="iconurl"
        :unicode="unicode"
      />
      {{ label }}
      <MyIcon
        v-if="iconRight || unicodeRight"
        :style="{ 'margin-inline-start': iconsize / 2 + 'px' }"
        :name="`${iconRight}`"
        :is-svg="isSvg"
        :size="iconsize"
        :url="iconurl"
        :unicode="unicodeRight"
      />
    </a>
  </div>
</template>

<script>
import MyIcon from "./../Icon.vue";
import { reactive, computed } from "vue";

export default {
  name: "TextLink",
  components: {
    MyIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
      default: "Text Link Label",
    },
    route: {
      type: String,
    },
    isSvg: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
    },
    icon: {
      type: String,
    },
    iconRight: {
      type: String,
    },
    iconsize: {
      type: String,
      default: "64",
    },
    iconurl: {
      type: String,
    },
    unicode: {
      type: String,
    },
    unicodeRight: {
      type: String,
    },
    // Override props
    large: {
      type: Boolean,
      default: false,
      required: false,
    },
    left: {
      type: Boolean,
      default: false,
      required: false,
    },
    right:  {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  
  emits: ["click"],
setup(props, { emit }) {
  const reactiveProps = reactive(props);
  return {
    classes: computed(() => ({
      "link-size": true,
      "link-size--large": reactiveProps.large,

      "link-left": true,
      "link-left--left": reactiveProps.left,
      "link-left--default": !reactiveProps.left,

      "link-right": true,
      "link-right--right": reactiveProps.right,
      "link-right--default": !reactiveProps.right,
    })),
    onClick() {
      emit("click");
    },
  };
},
  
};
</script>
<style></style>

<style lang="scss" scoped>
// Links should inherit global link styles, not parent element colors
// * {
//   color: inherit;
// }

.link-size {
  /* background: var(--color-xlight); */
  display: flex;
  align-items: center;

}

/* .link-size--default */

.link-size--large {
  font-size: var(--font-lg) !important;
}

/* .link-left */

.link-left--left:before {
  content: "★ ";
  color: var(--link);
  text-decoration: none;
}

/* .link-right */

.link-right--right:after {
  content: " ★";
  color: var(--link);
}

/* ---- External Link ---- */
.external {
  text-decoration: none !important;

  .label-text {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }

  &::after {
    content: ' ↗';
    text-decoration: none;
    display: inline-block;
    margin-inline-start: 0.2em;
  }

  &:hover .label-text {
    text-decoration-thickness: 2px;
  }
}
</style>
