<template>
  <GridWrapper>
    <HeroBg
      header="Thanks for visiting my site. Im pushing pixels and will be back soon."
    />
  </GridWrapper>
</template>

<script>
import HeroBg from "@/components/HeroBg.vue";

export default {
  name: "MaintenancePage",
  components: {
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
