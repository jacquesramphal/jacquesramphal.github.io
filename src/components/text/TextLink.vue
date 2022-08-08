<template>
  <div id="richlink">
    <router-link :class="classes" v-if="route" :to="`${route}`"
      >{{ label }}
    </router-link>
    <a
      :class="classes"
      class="external"
      v-if="link"
      target="blank"
      :href="`${link}`"
    >
      {{ label }}
    </a>
  </div>
</template>

<script>
export default {
  name: "TextLink",
  props: {
    label: {
      type: String,
      required: true,
      default: "Text Link Label",
    },
    route: {
      type: String,
    },
    link: {
      type: String,
    },

    // Override props
    large: {
      type: Boolean,
      default: false,
      required: true,
    },
    left: {
      type: Boolean,
      default: false,
      required: true,
    },
    right: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        "link-size": true,
        "link-size--large": this.large,
        "link-size--normal": !this.large,

        "link-left": true,
        "link-left--left": this.left,
        "link-left--normal": !this.left,

        "link-right": true,
        "link-right--right": this.right,
        "link-right--normal": !this.right,
      };
    },
  },
};
</script>
<style></style>

<style lang="sass" scoped>
*
  color: inherit
  font-weight: var(--font-medium)

.link-size
  /*  background: var(--color-xlight); */
  font-size: var(--font-xs)
/* .link-size--normal */
.link-size--large
  font-size: var(--font-lg) !important

/* .link-left */
.link-left--left:before
  content: "★ "
  color: var(--link)
/* .link-right */
.link-right--right:after
  content: " ★"
  color: var(--link)

/* ---- External Link ---- */
.external:after
  content: " ↗"
  color: var(--link)
</style>
