<template>
  <div id="app">
    <ThemeButton />
    <StickyNav />
    <router-view />
        <MainFooter />

  </div>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import MainFooter from "./components/MainFooter.vue";
import ThemeButton from "./components/ThemeButton.vue";


export default {
  name: "App",
  components: {
    StickyNav,
    ThemeButton,
    MainFooter,
  },
};
</script>
<style></style>
