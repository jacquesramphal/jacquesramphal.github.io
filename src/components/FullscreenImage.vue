<template>
  <transition name="slide" mode="out-in">
    <div
      class="fullscreen-image"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-heading"
    >
      <p @click="closeImage" class="close-button">Close Image</p>
      <img :src="imageSrc" alt="" class="fullscreen-image__img" />
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-image__img {
  max-width: 90%;
  max-height: 90%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>