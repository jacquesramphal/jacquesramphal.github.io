<template>
  <div class="word-counter-page">
    <iframe
      :src="gameUrl"
      title="Word Counter"
      class="game-frame"
      allowfullscreen
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayWordCounter',
  computed: {
    gameUrl(): string {
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:3001';
      }
      return '/play/word-counter/';
    },
  },
});
</script>

<style scoped>
.word-counter-page {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
}

.game-frame {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
