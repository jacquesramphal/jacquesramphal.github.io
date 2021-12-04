<template>
  <Wrapper id="app">
    <router-view />
    <StickyNav v-if="!$route.meta.hideNavbar" />
  </Wrapper>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import Wrapper from "@/components/grid/Wrapper.vue";

export default {
  name: "App",
  components: {
    Wrapper,
    StickyNav,
  },
};
</script>
<style></style>
