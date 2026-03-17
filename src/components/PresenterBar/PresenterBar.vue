<template>
  <div class="presenter-bar" role="navigation" aria-label="Presenter controls">
    <MyButton
      type="ghost"
      size="xs"
      label="↑"
      aria-label="Previous section"
      :disabled="currentIndex === 0"
      @click="$emit('navigate', currentIndex - 1)"
    />
    <span class="presenter-bar__counter">{{ currentIndex + 1 }} / {{ total }}</span>
    <MyButton
      type="ghost"
      size="xs"
      label="↓"
      aria-label="Next section"
      :disabled="currentIndex >= total - 1"
      @click="$emit('navigate', currentIndex + 1)"
    />
    <MyButton
      type="ghost"
      size="xs"
      label="Exit"
      aria-label="Exit presenter mode"
      @click="$emit('exit')"
    />
  </div>
</template>

<script>
import MyButton from '@/components/Button/Button.vue';

export default {
  name: 'PresenterBar',
  components: { MyButton },
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  emits: ['navigate', 'exit'],
};
</script>

<style lang="scss" scoped>
.presenter-bar {
  position: fixed;
  bottom: var(--spacing-sm);
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
  background: var(--background);
  border: var(--border);
  border-radius: 999px;
  padding: var(--spacing-xxs) var(--spacing-xs);
  box-shadow: var(--shadow-z3);

  &__counter {
    font-size: var(--font-400);
    opacity: 0.6;
    min-width: 4rem;
    text-align: center;
    user-select: none;
  }
}
</style>
