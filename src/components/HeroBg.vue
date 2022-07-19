<template>
  <div id="hero-bg" class="">
    <Container>
      <div id="hero-text" class="">
        <h2>
          {{ header }}
        </h2>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "@/components/grid/Container.vue";

export default {
  name: "HeroBg",
  components: {
      Container,
    },
  props: {
    header: {
      type: String,
      default: "Under Construction",
    },
  },
};
</script>


<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero-bg {
  display: grid;
  min-height: 320px;
  height: 100vh;
  /* color: var(--color-action2) */
  background-image: url("../assets/images/splash.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
}
#hero-text {
  display: grid;
  margin-top: -2.8em;
  grid-row: 1 / 8;
  justify-content: center;
  text-align: left;
  align-items: center !important;
}
h2 {
  color: white;
}
</style>
