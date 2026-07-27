<template>
  <component :is="as" v-bind="attrs" v-if="isHtml" v-html="renderedText" />
  <component :is="as" v-bind="attrs" v-else v-text="renderedText" />
</template>

<script>
import { fillExperienceTokens } from "@/utils/experience";

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
  computed: {
    // Substitute {{yearsExperience}} so years-of-experience stays current
    // wherever prose flows through DynamicText (resume summary, segments, cards).
    renderedText() {
      return fillExperienceTokens(this.text);
    },
  },
};
</script>
