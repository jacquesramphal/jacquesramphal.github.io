<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<script>

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'large',
      validator: function (value) {
        return ['small', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        'storybook-button': true,
        'storybook-button--primary': this.primary,
        'storybook-button--secondary': !this.primary,
        [`storybook-button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>
<style scoped>
@import "../assets/styles/all.css";

.storybook-button {
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  transition: box-shadow 0.15s ease-in-out;
  -webkit-transition: box-shadow 0.15s ease-in-out;
}
.storybook-button:hover {
  box-shadow: var(--shadow-z1);
}
.storybook-button:active {
  opacity: 0.8;
  box-shadow: var(--shadow-z2);
}
.storybook-button--primary {
  font-weight: 600;
  color: white;
  background-color: var(--link);
  border: 2px solid var(--link);
}
.storybook-button--secondary {
  font-weight: 500;
  color: var(--text);
  background-color: transparent;
  border: 2px solid var(--link);
}
.storybook-button--small {
  border-radius: 3rem;
  font-size: var(--font-xxxs);
  padding: 0.8rem 1.6rem;
}
.storybook-button--large {
  border-radius: 0.8rem;
  font-size: var(--font-xxs);
  padding: 12px 24px;
  padding: 1.6rem 2rem;

}
</style>
