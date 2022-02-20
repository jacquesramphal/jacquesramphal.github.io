<template>
  <Wrapper>
     <HeroBg header="404 Page not found" />
    <!--<Container class="grid-parent">
      <div>
        <TextDefault
          eyebrow=" "
          header="404 Page not found"
          details="The page you're looking for does not exist."
        />
        <router-link :to="{ name: 'Home' }"><p>Back to Home</p></router-link>
      </div>
      <ThumbMedium title="" filename="luna.jpg" />
    </Container>  -->
</Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
// import Container from "@/components/grid/Container.vue";
import HeroBg from "@/components/HeroBg.vue";
// import TextDefault from "@/components/text/TextDefault.vue";
// import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "NotFound",
  components: {
    Wrapper,
    // Container,
    HeroBg,
    // TextDefault,
    // ThumbMedium,
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
</style>
