<template>
  <div ref="rootEl" class="selector-cta" @keydown.esc.stop.prevent="close">
    <button
      class="selector-cta__trigger"
      type="button"
      :class="{ 'is-open': isOpen, 'is-disabled': disabled }"
      :disabled="disabled"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="menu"
      @click="toggle"
    >
      <span v-if="$slots.icon || icon" class="selector-cta__icon" aria-hidden="true">
        <slot name="icon">
          <MyIcon v-if="icon" :name="icon" :is-svg="true" :size="16" />
        </slot>
      </span>

      <span class="selector-cta__label">
        <slot>{{ label }}</slot>
      </span>

      <span class="selector-cta__caret" aria-hidden="true">
        <svg
          class="selector-cta__caret-svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6.25L8 10.25L12 6.25"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <div
      v-if="isOpen"
      class="selector-cta__menu"
      :class="[menuPlacementClass, `align-${align}`]"
      role="menu"
      @click.stop
    >
      <slot name="menu" :close="close" />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, onBeforeUnmount } from "vue";
import MyIcon from "../Icon.vue";

export default {
  name: "SelectorCta",
  components: { MyIcon },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Select",
    },
    icon: {
      type: String,
      required: false,
    },
    align: {
      type: String,
      default: "start",
      validator: (v) => ["start", "end"].includes(v),
    },
    placement: {
      type: String,
      required: false,
      validator: (v) =>
        ["bottom-start", "bottom-end", "top-start", "top-end"].includes(v),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "open", "close", "toggle"],
  setup(props, { emit }) {
    const rootEl = ref(null);
    const isOpen = ref(!!props.modelValue);

    const menuPlacementClass = computed(() => {
      // Back-compat: if placement is not provided, fall back to `align` + bottom.
      const placement =
        props.placement || `bottom-${props.align === "end" ? "end" : "start"}`;
      return `placement-${placement}`;
    });

    const setOpen = (next) => {
      if (props.disabled) return;
      isOpen.value = next;
      emit("update:modelValue", next);
      emit("toggle", next);
      emit(next ? "open" : "close");
    };

    const close = () => setOpen(false);
    const toggle = () => setOpen(!isOpen.value);

    const onDocumentClick = (e) => {
      const root = rootEl.value;
      if (!root) return;
      if (root.contains(e.target)) return;
      close();
    };

    const onDocumentKeydown = (e) => {
      if (e.key === "Escape") close();
    };

    watch(
      () => props.modelValue,
      (v) => {
        isOpen.value = !!v;
      }
    );

    watch(
      isOpen,
      (open) => {
        if (open) {
          document.addEventListener("click", onDocumentClick);
          document.addEventListener("keydown", onDocumentKeydown);
        } else {
          document.removeEventListener("click", onDocumentClick);
          document.removeEventListener("keydown", onDocumentKeydown);
        }
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onDocumentKeydown);
    });

    return { rootEl, isOpen, toggle, close, menuPlacementClass };
  },
};
</script>

<style lang="scss" scoped>
.selector-cta {
  position: relative;
  display: inline-block;
  max-inline-size: 100%;
}

.selector-cta__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xxs);
  max-inline-size: 100%;
  padding: 0.85rem 1.15rem;

  color: var(--foreground);
  background: var(--background);
  border: var(--border);
  border-radius: 999px;

  box-shadow: var(--shadow-light);
  cursor: pointer;
  user-select: none;
  transition: background 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease,
    transform 0.06s ease;

  &:hover {
    background: var(--background-darker);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--link) 35%, transparent),
      var(--shadow-light);
  }

  &.is-open {
    border-color: var(--link);
    background: var(--background);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--link) 25%, transparent),
      var(--shadow-light);

    .selector-cta__caret-svg {
      transform: rotate(180deg);
    }
  }

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.selector-cta__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 16px;
  block-size: 16px;
  flex: 0 0 16px;
}

.selector-cta__label {
  font-size: var(--font-400);
  line-height: 1;
  white-space: nowrap;
  // overflow: hidden;
  text-overflow: ellipsis;
}

.selector-cta__caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline-start: 0.1rem;
}

.selector-cta__caret-svg {
  display: block;
  transition: transform 0.12s ease;
}

.selector-cta__menu {
  position: absolute;
  z-index: 1000;

  background: var(--background);
  border: var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-deep);
  overflow: hidden;
  // padding: 0.4rem;

  min-inline-size: 240px;
  max-inline-size: min(360px, 90vw);
}

.selector-cta__menu.placement-bottom-start,
.selector-cta__menu.placement-bottom-end {
  inset-block-start: calc(100% + var(--spacing-xxs));
}

.selector-cta__menu.placement-top-start,
.selector-cta__menu.placement-top-end {
  inset-block-end: calc(100% + var(--spacing-xxs));
}

.selector-cta__menu.placement-bottom-start,
.selector-cta__menu.placement-top-start {
  inset-inline-start: 0;
}

.selector-cta__menu.placement-bottom-end,
.selector-cta__menu.placement-top-end {
  inset-inline-end: 0;
}

.selector-cta__menu.align-start {
  inset-inline-start: 0;
}

.selector-cta__menu.align-end {
  inset-inline-end: 0;
}
</style>
