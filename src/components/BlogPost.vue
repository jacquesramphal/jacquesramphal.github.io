<template>
  <div id="blog" class="">
    <!-- Placeholder breadcrumb -->
    <div class="container" style="background: var(--bg-darker);">
      <nav class="">
        <p>
          <router-link :to="{ name: 'Home' }">Home</router-link>
<span class="subtle" style="margin: 0 1rem;">/</span>
          <router-link :to="{ name: 'Blog' }">Blog</router-link>
          <span class="subtle" style="margin: 0 1rem;">/</span>Post
        </p>
      </nav>
    </div>

    <HeroSimple title="Post Name" subtitle="Topic" class="" />
    <div id="posts" class="container"></div>
  </div>
</template>

<script>
import HeroSimple from "@/components/HeroSimple.vue";

export default {
  name: "BlogPost",
  components: {
    HeroSimple,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
}
blog-card {
  margin-bottom: var(--spacing-md) !important;
}
h3 {
  margin-bottom: var(--spacing-md) !important;
}
#posts {
  justify-self: center;
}
#hero-simple {
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .container {
    }
    #blogpost {
      /* max-width: 75vw; */
    }
  }
}
</style>
