<template>
  <Wrapper>
    <HeroBg header="Thanks for  my site. Im pushing pixels and will be back soon." />
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import HeroBg from "@/components/HeroBg.vue";

export default {
  name: "MaintenancePage",
  components: {
    Wrapper,
    HeroBg,
  },
};
</script>

<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
.grid-parent {
  grid-gap: var(--spacing-lg) !important;
}
#stickynav .container {
  display: none !important;
}
</style>
