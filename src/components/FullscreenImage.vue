<template>
  <transition name="fade" mode="out-in">
    <div
      class="fullscreen-image"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-heading"
    >
      
      <img draggable="false" @click="closeImage" :src="imageSrc" :alt="imageSrc" class="fullscreen-image__img" />
      <TextLink @click="closeImage" class="close-button" label="Close"/>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeImage() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.fullscreen-image {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto; /* Allow scrolling */
}

.fullscreen-image__img {
  cursor: zoom-out;
  max-width: 100%;
  border-radius: 0 !important;
  max-height: 100%;
  display: block; /* Ensure the image is block-level for proper scrolling */
}

.close-button {
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  cursor: pointer;
}
</style>