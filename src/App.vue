<template>
  <PageWrapper id="app">
    <router-view />
    <StickyNav v-if="!$route.meta.hideNavbar" />
  </PageWrapper>
</template>

<script>
import StickyNav from "./components/StickyNav.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";

export default {
  name: "App",
  components: {
    PageWrapper,
    StickyNav,

  },
};
</script>
<style></style>
