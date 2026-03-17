<template>
  <div>
    <aside v-if="isOpen && hasH2Headings" class="toc-drawer">
      <div class="toc-drawer__content">
        <MarkdownTOC
          :headings="headings"
          :active-heading="activeHeading"
        />
      </div>
    </aside>
  </div>
</template>

<script>
import MarkdownTOC from "./MarkdownTOC.vue";

export default {
  name: "TOCDrawer",
  components: {
    MarkdownTOC,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    headings: {
      type: Array,
      default: () => [],
    },
    activeHeading: {
      type: String,
      default: null,
    },
  },
  computed: {
    hasH2Headings() {
      return this.headings && this.headings.some((h) => h.level === 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.toc-drawer {
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 400px;
  max-inline-size: 90vw;
  block-size: 100vh;
  background: transparent;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media only screen and (min-width: 768px) {
    inline-size: 480px;
  }

  @media only screen and (min-width: 1201px) {
    inline-size: 520px;
  }
}

.toc-drawer__content {
  flex: 1;
  overflow-y: auto;
  padding-block: var(--spacing-md);
  padding-inline-end: var(--spacing-md);
  padding-inline-start: 0;
  border-inline-end: var(--border);
  min-block-size: 0;
}

/* Scrollbar styling */
.toc-drawer__content::-webkit-scrollbar {
  width: 4px;
}

.toc-drawer__content::-webkit-scrollbar-track {
  background: transparent;
}

.toc-drawer__content::-webkit-scrollbar-thumb {
  background: var(--foreground-subtle);
  border-radius: 2px;
}

.toc-drawer__content::-webkit-scrollbar-thumb:hover {
  background: var(--foreground);
}

</style>
