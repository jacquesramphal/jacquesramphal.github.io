<template>
  <router-link id="btn" :to="`${route}`">
    <button
      type="button"
      :class="classes"
      @click="onClick"
      :style="style"
      v-text="label"
    />
  </router-link>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "my-button",

  props: {
    label: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: false,
    },
    // secondary: {
    //   type: Boolean,
    //   default: false,
    // },
    type: {
      type: String,
      validator: function (value) {
        return ["primary", "secondary"].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      validator: function (value) {
        return ["small", "large"].indexOf(value) !== -1;
      },
    },

  },

  emits: ["click"],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "storybook-button": true,
        // "storybook-button--secondary": props.secondary,
        // "storybook-button--primary": !props.secondary,
        [`storybook-button--${props.type || "primary"}`]: true,
        [`storybook-button--${props.size || "large"}`]: true,
      })),
      onClick() {
        emit("click");
      },
    };
  },
};
</script>
<style scoped>
.storybook-button {
  border-radius: var(--spacing-xxs);
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  font-weight: 500;
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
}
.storybook-button:hover {
  animation: animate-shake 1s;
  animation-delay: 1s;
}
.storybook-button:active {
  /* animation: animate-glow 1s;  */
  transform: scale(0.98);
  /* box-shadow: var(--shadow-text); */
}
.storybook-button--primary {
  color: var(--color-offwhite) !important;
  background: -webkit-linear-gradient(
    var(--color-lightpurple),
    var(--color-purple)
  ) !important;
  border: 2px solid var(--link) !important;
}
.storybook-button--primary:hover {
  background: -webkit-linear-gradient(var(--link), var(--link)) !important;
}
.storybook-button--secondary {
  background-color: transparent !important;
  color: var(--link) !important;
  border: 2px solid var(--link) !important;
}

.storybook-button--secondary:hover {
  color: var(--text-reversed) !important;
  background-color: var(--link) !important;
}
.storybook-button--small {
  font-size: var(--font-xxs);
  padding: 1rem 2rem 1rem 2rem;
  /* border-radius: 100px; */
}
.storybook-button--large {
  font-size: var(--font-xs);
  padding: 1.5rem 2.5rem 1.5rem 2.5rem;
}

/* Reversed States */
.reversed .storybook-button--secondary {
  color: var(--link-reversed) !important;
  border: 2px solid var(--link-reversed) !important;
}
.reversed .storybook-button--secondary:hover {
  color: var(--text) !important;
  background-color: var(--link-reversed) !important;
}
</style>
