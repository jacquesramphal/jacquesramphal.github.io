<!--
  A Vue island. This is the ONLY interactive piece on the page, so it's the
  ONLY component that ships JavaScript to the browser (client:visible below).
  The rest of the doc is static HTML. This is the "only touch what the user
  will read" principle expressed as an architecture — and it's a plain .vue
  SFC, the same kind you already have in src/components, proving incremental
  reuse during a migration.
-->
<template>
  <nav class="toc" aria-label="Table of contents">
    <p class="toc__label">On this page</p>
    <ul>
      <li v-for="h in headings" :key="h.slug" :class="['toc__item', `toc__item--h${h.depth}`]">
        <a
          :href="`#${h.slug}`"
          :class="{ 'toc__link--active': active === h.slug }"
          @click="active = h.slug"
        >{{ h.text }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({ headings: { type: Array, default: () => [] } });
const active = ref(props.headings[0]?.slug ?? '');
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = e.target.id;
      }
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 }
  );
  for (const h of props.headings) {
    const el = document.getElementById(h.slug);
    if (el) observer.observe(el);
  }
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.toc {
  position: sticky;
  top: 2rem;
  font-size: 0.85rem;
  line-height: 1.4;
}
.toc__label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  color: var(--color-medium);
  margin: 0 0 0.75rem;
}
.toc ul { list-style: none; margin: 0; padding: 0; }
.toc__item { margin: 0.35rem 0; }
.toc__item--h3 { padding-left: 0.9rem; }
.toc a {
  color: var(--color-medium);
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 0.6rem;
  margin-left: -0.6rem;
  display: block;
  transition: color 0.15s, border-color 0.15s;
}
.toc a:hover { color: var(--foreground); }
.toc__link--active {
  color: var(--foreground) !important;
  border-left-color: var(--foreground);
  font-weight: 500;
}
</style>
