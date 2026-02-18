<template>
  <span
    class="counter-text"
    :aria-label="text"
    role="img"
  >
    <!-- Loading fallback: show plain text while parsing -->
    <span
      v-if="isLoading"
      class="counter-text__fallback"
    >
      {{ text }}
    </span>

    <!-- Error fallback: show plain text if parsing fails -->
    <span
      v-else-if="error"
      class="counter-text__fallback"
    >
      {{ text }}
    </span>

    <!-- SVG render: show counter-fill effect -->
    <svg
      v-else
      :viewBox="viewBox"
      class="counter-text__svg"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
    >
      <!-- Layer 1: Counter fills (colored circles/holes) -->
      <g class="counter-text__counters">
        <path
          v-for="(pathData, i) in counterPaths"
          :key="`counter-${i}`"
          :d="pathData"
          :fill="counterColor"
        />
      </g>

      <!-- Layer 2: Foreground text (letter bodies with holes) -->
      <path
        :d="foregroundPath"
        :fill="foregroundColor"
        fill-rule="evenodd"
        class="counter-text__foreground"
      />
    </svg>

    <!-- Screen reader text (always present for accessibility) -->
    <span class="sr-only">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue';
import { useCounterTypography } from '@/composables/useCounterTypography';

// ============================================================================
// PROPS & DEFAULTS
// ============================================================================

interface Props {
  text: string;
  fontSize?: number;
  counterColor?: string;
  foregroundColor?: string;
  fontPath?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fontSize: 48,
  counterColor: 'var(--color-yellow)',
  foregroundColor: 'var(--foreground)',
  fontPath: 'assets/type/epilogue/epilogue-regular.ttf'
});

// ============================================================================
// COMPOSABLE & STATE
// ============================================================================

const { parseText, isLoading, error } = useCounterTypography({
  fontPath: props.fontPath,
  cacheResults: true
});

// SVG data refs
const counterPaths: Ref<string[]> = ref([]);
const foregroundPath: Ref<string> = ref('');
const viewBox: Ref<string> = ref('0 0 800 200');

// ============================================================================
// TEXT PARSING
// ============================================================================

/**
 * Update SVG paths by parsing the text
 */
async function updatePaths() {
  if (!props.text || props.text.trim() === '') {
    return;
  }

  try {
    const result = await parseText(props.text, props.fontSize);

    if (result) {
      counterPaths.value = result.counterPaths;
      foregroundPath.value = result.foregroundPath;
      viewBox.value = result.viewBox;
    }
  } catch (err) {
    console.error('CounterText: Failed to parse text', err);
  }
}

// ============================================================================
// LIFECYCLE & WATCHERS
// ============================================================================

// Parse text on mount
onMounted(() => {
  updatePaths();
});

// Re-parse when text or fontSize changes
watch(
  [() => props.text, () => props.fontSize],
  () => {
    updatePaths();
  },
  { immediate: false }
);
</script>

<style scoped lang="scss">
@import './CounterText.scss';
</style>
