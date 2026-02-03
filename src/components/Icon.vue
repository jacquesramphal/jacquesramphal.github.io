<template>
  <span>
    <span
      v-if="isSvg"
      :class="['icon', `icon-${size}`]"
      :style="{ inlineSize: size + 'px', blockSize: size + 'px' }">
      <img
        v-if="name"
        draggable="false"
        :src="require(`../assets/images/${name}`)"
        :alt="name"
      />
      <!-- <img v-else="url" draggable="false" :src="url" :alt="name" /> -->
    </span>
    <span
      v-else
      :class="['icon', `icon-${size}`]"
      :style="{ fontSize: size + 'px' }"
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
    // alt: {
    //   type: String,
    //   required: true
    // },
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
  filter: var(--filter);
}
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
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
