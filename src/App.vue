<template>
  <div id="app" data-aos="fade">
    <StickyNav />
    <router-view />
  </div>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";


export default {
  name: "App",
  components: {
    StickyNav,
  },
};

</script>

<!-- global styles -->
<style>
@import "./assets/styles/all.css";

#app {
  line-height: 0;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-rendering: optimizeLegibility;
  color: var(--color-offblack) !important;
  background: var(--color-offwhite);
}
a:hover {
  color: var(--color-action) !important;
}
.reversed {
  color: var(--color-offwhite) !important;
  mix-blend-mode: normal !important;
  background: var(--color-offblack);
}

@media (prefers-color-scheme: dark) {
  #app {
  color: var(--color-offwhite) !important;
    background: var(--color-offblack);
  }

  #app a:hover {
    color: var(--color-action-dark) !important;
  }
  .reversed {
  color: var(--color-dark) !important;
  background: var(--color-offwhite);
  mix-blend-mode: normal !important;
}
/* .overlay {
  display: none;
} */
}

</style>
