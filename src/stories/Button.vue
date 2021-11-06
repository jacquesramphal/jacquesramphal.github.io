<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script>
import { reactive, computed } from 'vue';

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
      validator: function (value) {
        return ['small', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'large'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit('click');
      }
    }
  },
};
</script>
<style scoped>
@import "../assets/styles/all.css";
.storybook-button {
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  font-weight: 500;
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  transition: box-shadow 0.15s ease-in-out;
  -webkit-transition: box-shadow 0.15s ease-in-out;
}
.storybook-button--primary {
  color: white;
  background-color: var(--link) !important;
}
.storybook-button--secondary {
background-color: transparent !important;
  color: var(--text) !important;
  border: 1px solid var(--link) !important;
}
.storybook-button--small {
  font-size: 12px;
  padding: 1rem 2rem 1rem 2rem;
    border-radius: 100px;

}
.storybook-button--large {
  font-size: 16px;
  padding: 1.5rem 2.5rem 1.5rem 2.5rem;
}

</style>