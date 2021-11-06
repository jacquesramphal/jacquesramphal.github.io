<template>
  <div id="hero-simple">
    <!-- Placeholder breadcrumb -->

    <!-- <div class="container">
      <nav class="">
        <p>
          <router-link :to="{ name: 'Home' }">Home</router-link>
          <span class="subtle" style="margin: 0 1rem;">/</span>Current Page
        </p>
      </nav>
    </div> -->

    <div id="" class="container">
      <div id="hero-text" class="">
        <h2>
          {{ title }}
        </h2>
        <h6 class="">
          {{ subtitle }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
// import PageNav from "@/components/PageNav.vue";

export default {
  name: "HeroSimple",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    subtitle: {
      type: String,
      default: "Front-end Design, Wellness, what else?",
    },
  },
  components: {
    // PageNav,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#hero-simple {
  display: grid;
  background-color: var(--bg-darker);
}
#hero-text {
  display: grid;
  justify-content: left;
  text-align: left;
  align-items: end !important;
}
@media (prefers-color-scheme: dark) {
}
/* ------------ BREAKPOINT MD ------------ */

@media only screen and (min-width: 740px) {
  #hero-simple {
  }
  #hero-text {
    align-items: end !important;
  }
}
</style>
