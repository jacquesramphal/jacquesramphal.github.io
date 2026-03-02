<template>
  <span>
    <span
      v-if="isSvg"
      :class="['icon', 'icon-svg', `icon-${size}`]"
      :style="{
        inlineSize: size + 'px',
        blockSize: size + 'px',
        '--icon-src': name ? `url(${require('../assets/images/' + name)})` : 'none'
      }"
      :role="ariaLabel ? 'img' : undefined"
      :aria-label="ariaLabel || undefined"
      :aria-hidden="ariaLabel ? undefined : 'true'"
    >
      <!-- Hidden img for fallback -->
      <img
        v-if="name"
        draggable="false"
        :src="require(`../assets/images/${name}`)"
        :alt="name"
        style="display: none;"
      />
    </span>
    <span
      v-else
      :class="['icon', `icon-${size}`]"
      :style="{ fontSize: size + 'px' }"
      :role="ariaLabel ? 'img' : undefined"
      :aria-label="ariaLabel || undefined"
      :aria-hidden="ariaLabel ? undefined : 'true'"
    >
      {{ unicode }}
    </span>
  </span>
</template>

<!-- Usage -->

<!-- <Icon name="my-icon" :unicode="'\u{1F60A}'" size="16" />
    <Icon name="my-icon" :unicode="'\u{1F60A}'" size="32" />
    <Icon name="my-icon" :unicode="'\u{1F60A}'" size="64" />
    <Icon name="my-icon" :unicode="'\u{1F60A}'" size="128" />
    <Icon name="my-icon" :unicode="':)'" size="128" />
    <Icon name="my-icon" :unicode="'👶🏽'" size="128" />
    <Icon name="j-logo" :is-svg="true" size="16" />
    <Icon name="j-logo" :is-svg="true" size="32" />
    <Icon name="j-logo" :is-svg="true" size="64" />
    <Icon name="j-logo" :is-svg="true" size="128" /> -->

<script>
export default {
  name: "MyIcon",
  props: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    ariaLabel: {
      type: String,
      default: '',
    },
    unicode: {
      type: String,
    },
    size: {
      type: Number,
      default: 16,
    },
    isSvg: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>

img {
  border-radius: 0 !important;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  color: inherit;
}

/* Use CSS mask for SVG icons to recolor them with foreground */
.icon-svg {
  background-color: var(--foreground);
  -webkit-mask-image: var(--icon-src);
  mask-image: var(--icon-src);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}
.icon-16 {
  /* 16px styles */
}
.icon-32 {
  /* 32px styles */
}
.icon-64 {
  /* 64px styles */
}
.icon-128 {
  /* 128px styles */
}
</style>
