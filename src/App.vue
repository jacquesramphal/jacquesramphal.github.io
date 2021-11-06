<template>
  <div id="app">
    <ThemeButton />
    <StickyNav />
    <router-view />
  </div>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import ThemeButton from "./components/ThemeButton.vue";


export default {
  name: "App",
  components: {
    StickyNav,
    ThemeButton,
  },
};
</script>
<style></style>
