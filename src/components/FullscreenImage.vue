<template>
  <transition name="fade" mode="out-in">
    <div
      class="fullscreen-image"
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      @click.self="closeImage"
    >
      <div
        class="fullscreen-image__viewport"
        ref="viewport"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
        @click.self="closeImage"
      >
        <img
          :src="imageSrc"
          :alt="imageSrc"
          class="fullscreen-image__img"
          :style="{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }"
          draggable="false"
        />
      </div>
      <TextLink @click="closeImage" class="close-button" label="Close"/>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: { type: Boolean, required: true },
    imageSrc: { type: String, required: true },
  },
  data() {
    return {
      scale: 1,
      tx: 0,
      ty: 0,
      lastDist: 0,
      lastMidX: 0,
      lastMidY: 0,
    };
  },
  watch: {
    isOpen(val) {
      if (val) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        document.addEventListener('keydown', this.onKeydown);
        this.$nextTick(() => {
          this.$refs.viewport?.addEventListener('touchmove', this.onTouchMove, { passive: false });
        });
      } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.removeEventListener('keydown', this.onKeydown);
        this.$refs.viewport?.removeEventListener('touchmove', this.onTouchMove);
        this.resetZoom();
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.removeEventListener('keydown', this.onKeydown);
    this.$refs.viewport?.removeEventListener('touchmove', this.onTouchMove);
  },
  methods: {
    closeImage() {
      this.$emit('close');
    },
    onKeydown(e) {
      if (e.key === 'Escape') this.closeImage();
    },
    resetZoom() {
      this.scale = 1;
      this.tx = 0;
      this.ty = 0;
    },
    dist(t1, t2) {
      return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
    },
    onTouchStart(e) {
      if (e.touches.length === 2) {
        this.lastDist = this.dist(e.touches[0], e.touches[1]);
        this.lastMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        this.lastMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      } else if (e.touches.length === 1) {
        this.lastMidX = e.touches[0].clientX;
        this.lastMidY = e.touches[0].clientY;
      }
    },
    onTouchMove(e) {
      e.preventDefault();
      if (e.touches.length === 2) {
        const d = this.dist(e.touches[0], e.touches[1]);
        const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        this.scale = Math.min(Math.max(this.scale * (d / this.lastDist), 1), 6);
        this.tx += mx - this.lastMidX;
        this.ty += my - this.lastMidY;
        this.lastDist = d;
        this.lastMidX = mx;
        this.lastMidY = my;
      } else if (e.touches.length === 1 && this.scale > 1) {
        this.tx += e.touches[0].clientX - this.lastMidX;
        this.ty += e.touches[0].clientY - this.lastMidY;
        this.lastMidX = e.touches[0].clientX;
        this.lastMidY = e.touches[0].clientY;
      }
    },
    onTouchEnd(e) {
      if (e.touches.length === 0 && this.scale < 1.1) {
        this.resetZoom();
      }
    },
  },
};
</script>

<style scoped>
.fullscreen-image {
  z-index: 200000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.fullscreen-image__viewport {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
  overflow: hidden;
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-md);
}

.fullscreen-image__img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0 !important;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  will-change: transform;
  transform-origin: center center;
}

.close-button {
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  cursor: pointer;
  z-index: 1;
}
</style>
