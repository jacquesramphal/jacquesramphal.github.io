<template>
  <span>
    <router-link
      active-class="active-class"
      v-if="route"
      id="btn"
      :to="`${route}`"
    >
      <button
        class="custom-btn"
        type="button"
        :class="classes"
        @click="onClick"
        :disabled="disabled"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-label="ariaLabel || label"
      >
        <!-- <span v-if="icon" class="button-icon">{{ icon }}</span> -->

        <MyIcon
          class="button-icon"
          v-if="icon"
          :name="`${icon}`"
          :is-svg="true"
          size="16"
        />
        <span v-if="!hideLabel" class="button-label">
          <slot>{{ label }}</slot>
        </span>
        <slot v-else />
      </button>
    </router-link>
    <a v-else-if="link" id="btn" :href="`${link}`" target="blank">
      <button
        class="custom-btn"
        type="button"
        :class="classes"
        @click="onClick"
        :disabled="disabled"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-label="ariaLabel || label"
      >
        <!-- <span v-if="icon" class="button-icon">{{ icon }}</span> -->

        <MyIcon
          class="button-icon"
          v-if="icon"
          :name="`${icon}`"
          :is-svg="true"
          size="16"
        />
        <span v-if="!hideLabel" class="button-label">
          <slot>{{ label }}</slot>
        </span>
        <slot v-else />
      </button>
    </a>
    <button
      v-else
      class="custom-btn"
      type="button"
      :class="classes"
      @click="onClick"
      :disabled="disabled"
      :aria-disabled="disabled ? 'true' : 'false'"
      :aria-label="ariaLabel || label"
    >
      <!-- <span v-if="icon" class="button-icon">{{ icon }}</span> -->

      <MyIcon
        class="button-icon"
        v-if="icon"
        :name="`${icon}`"
        :is-svg="true"
        size="16"
      />
      <span v-if="!hideLabel" class="button-label">
        <slot>{{ label }}</slot>
      </span>
      <slot v-else />
    </button>
  </span>
</template>

<script>
import { reactive, computed } from "vue";
import MyIcon from "../Icon.vue";

export default {
  name: "my-button",
  components: {
    MyIcon,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: "Button Label",
    },
    ariaLabel: {
      type: String,
      default: "",
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    route: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      validator: function (value) {
        return ["solid", "outline", "ghost", "textlink"].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      validator: function (value) {
        return ["small", "large"].indexOf(value) !== -1;
      },
    },
    icon: {
      type: String,
      validator: function (value) {
        return ["none", "left", "right"].indexOf(value) !== -1;
      },
    },
  },

  emits: ["click"],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        button: true,
        // "button--outline": props.outline,
        // "button--solid": !props.outline,
        [`button--${props.type || "solid"}`]: true,
        [`button--${props.size || "large"}`]: true,
        [`button--${props.icon || "none"}`]: true,

        // "link-left": true,
        // "link-left--left": this.left,
        // "link-left--default": !this.left,

        // "link-right": true,
        // "link-right--right": this.right,
        // "link-right--default": !this.right,
      })),
      onClick() {
        if (props.disabled) return;
        emit("click");
      },
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  font-family: inherit;
}
.button-icon {
  margin-inline-end: var(    --spacing-xxs  ); // Adjust spacing between icon and label
  line-height: var(--lineHeight-none);
  // Add any other styling as needed for the icon
}

/* .button-label intentionally left unstyled */
.button {
  border-radius: var(--spacing-xxs);
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  // font-weight: var(--fontWeight-medium);
  // padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  // &:hover {
  //   animation: animate-shake 1s;
  //   animation-delay: 1s;
  // }
  &:active {
    /* animation: animate-glow 1s;  */
    transform: scale(0.98);
    /* box-shadow: var(--shadow-text); */
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
}

.button--solid {
  color: var(--color-offwhite) !important;
  background: -webkit-linear-gradient(
    var(--color-lightpurple),
    var(--color-purple)
  ) !important;
  border: 2px solid var(--link) !important;
  &:before,
  &:after {
    color: var(--color-offwhite) !important;
  }
  &:hover {
    background: -webkit-linear-gradient(var(--link), var(--link)) !important;
    
  }
}

.button--outline {
  background-color: transparent !important;
  color: var(--link) !important;
  border: 1px solid var(--link) !important;
  font-weight: var(--fontWeight-normal);

  &:before,
  &:after {
    color: var(--link) !important;
  }
  &:hover {
    color: var(--foreground-reversed) !important;
    background-color: var(--link) !important;
    &:before,
    &:after {
      color: var(--foreground) !important;
    }
  }
}

.button--ghost {
  color: var(--text) !important;
  background-color: transparent;
  border: 1px solid transparent !important;
  font-weight: var(--fontWeight-normal);
  &:before,
  &:after {
    color: var(--link) !important;
  }
  &:hover {
    background-color: var(--background-darker) !important;
  }
  // &:active,
  // .router-link-exact-active {
  //   border: dashed !important;
  // }
}
.reversed .button--ghost {
  color: var(--link-reversed) !important;
  &:hover {
    border: 1px solid var(--link-reversed) !important;
  }
  &:before,
  &:after {
    color: var(--link-reversed) !important;
  }
  &:active {
    // border: dashed !important;
    opacity: 0.5;
  }
}

.button--textlink {
  color: var(--foreground) !important;

  padding: 0 !important;
  color: var(--link);
  background-color: transparent;
  border: none;
  text-decoration: underline;
  text-underline-offset: 0.625rem;
  text-decoration-thickness: 0.1rem !important;
  &:before,
  &:after {
    color: inherit !important;
  }
  &:hover {
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 0.625rem;
    text-decoration-thickness: 0.2rem !important;
  }
  &:active,
  .router-link-exact-active {
    text-decoration: underline dashed !important;
    text-underline-offset: 0.625rem;
    text-decoration-thickness: 0.1rem !important;
  }
}

.actve-class {
  text-decoration: underline dashed !important;
}

.button--small {
  font-size: var(--font-2xs);
  // padding: var(--spacing-xxs);
  padding: 0.95rem 1.25rem 1rem 1.25rem;

  /* border-radius: 100px; */
}
.button--large {
  font-size: var(--font-xs);
  padding: 1.5rem 2rem 1.65rem 2rem;
  // padding: var(--spacing-xs);
}

/* Icon Styles */
.button--none:before {
  content: "";
}
.button--left:before {
  content: "★ ";
  color: var(--link);
}
.button--right:after {
  content: " ★";
  color: var(--link);
}

.reversed {
  &:before,
  &:after {
    color: var(--link-reversed);
  }
  .button--outline {
    color: var(--link-reversed) !important;
    border: 1px solid var(--link-reversed) !important;
    &:before,
    &:after {
      color: var(--link-reversed) !important;
    }
  }
  .button--outline:hover {
    color: var(--foreground) !important;
    background-color: var(--link-reversed) !important;
    &:before,
    &:after {
      color: var(--foreground) !important;
    }
  }
}
</style>
