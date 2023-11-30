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
        :style="style"
      >
        <!-- <span v-if="icon" class="button-icon">{{ icon }}</span> -->

        <MyIcon
          class="button-icon"
          v-if="icon"
          :name="`${icon}`"
          :is-svg="true"
          size="16"
        />
        <span class="button-label">{{ label }}</span>
      </button>
    </router-link>
    <button
      v-else
      class="custom-btn"
      type="button"
      :class="classes"
      @click="onClick"
      :style="style"
    >
      <!-- <span v-if="icon" class="button-icon">{{ icon }}</span> -->

      <MyIcon
        class="button-icon"
        v-if="icon"
        :name="`${icon}`"
        :is-svg="true"
        size="16"
      />
      <span class="button-label">{{ label }}</span>
    </button>
  </span>
</template>

<script>
import { reactive, computed } from "vue";
import MyIcon from "./Icon.vue";

export default {
  name: "my-button",
  components: {
    MyIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      validator: function (value) {
        return ["solid", "outline", "ghost"].indexOf(value) !== -1;
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
        emit("click");
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.button-icon {
  margin-right: var(--spacing-xxs); // Adjust spacing between icon and label
  line-height: 0;
  // Add any other styling as needed for the icon
}

.button-label {
  // Add styling for the label
}
.button {
  border-radius: var(--spacing-xxs);
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  font-weight: var(--font-medium);
  // padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  &:hover {
    animation: animate-shake 1s;
    animation-delay: 1s;
  }
  &:active {
    /* animation: animate-glow 1s;  */
    transform: scale(0.98);
    /* box-shadow: var(--shadow-text); */
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
  border: 2px solid var(--link) !important;
  &:before,
  &:after {
    color: var(--link) !important;
  }
  &:hover {
    color: var(--text-reversed) !important;
    background-color: var(--link) !important;
    &:before,
    &:after {
      color: var(--text) !important;
    }
  }
}

.button--ghost {
  color: var(--link) !important;
  background-color: transparent;
  border: 2px solid transparent !important;
  &:before,
  &:after {
    color: inherit !important;
  }
  &:hover {
    border: 2px solid var(--link) !important;
  }
  // &:active,
  // .router-link-exact-active {
  //   border: dashed !important;
  // }
}
.reversed  .button--ghost{
  color: var(--link-reversed) !important;
  &:hover {
    border: 2px solid var(--link-reversed) !important;
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

// .button--textlink {
//   color: var(--link) !important;
//   padding: 0 !important;
//   background-color: transparent;
//   border: 2px solid transparent !important;
//   text-decoration: underline;
//   text-underline-offset: 0.625rem;
//   text-decoration-thickness: 0.1rem !important;
//   &:before,
//   &:after {
//     color: inherit !important;
//   }
//   &:hover {
//     text-decoration: underline;
//     text-underline-offset: 0.625rem;
//     text-decoration-thickness: 0.2rem !important;
//   }
//   &:active,
//   .router-link-exact-active {
//     text-decoration: underline dashed !important;
//     text-underline-offset: 0.625rem;
//     text-decoration-thickness: 0.1rem !important;
//   }
// }

.actve-class {
  text-decoration: underline dashed !important;
}

.button--small {
  font-size: var(--font-xxs);
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
    border: 2px solid var(--link-reversed) !important;
    &:before,
    &:after {
      color: var(--link-reversed) !important;
    }
  }
  .button--outline:hover {
    color: var(--text) !important;
    background-color: var(--link-reversed) !important;
    &:before,
    &:after {
      color: var(--text) !important;
    }
  }
}
</style>
