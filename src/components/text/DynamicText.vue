<template>
  <component :is="as" v-bind="attrs" v-if="isHtml" v-html="text" />
  <component :is="as" v-bind="attrs" v-else v-text="text" />
</template>

<script>
export default {
  name: "DynamicText",
  props: {
    as: {
      type: String,
      required: true,
      default: "p",
    },
    text: {
      type: String,
      default: "",
    },
    isHtml: {
      type: Boolean,
      default: false,
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
