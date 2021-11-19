<template>
  <div id="blog" class="">
    <!-- Placeholder breadcrumb
    <div class="container" style="background: var(--bg-darker);">
      <nav class="">
        <p>
          <router-link :to="{ name: 'Home' }">Home</router-link>
          <span class="subtle" style="margin: 0 1rem;">/</span>Blog
        </p>
      </nav>
    </div>
 -->
    <HeroSimple title="Recent Writing" eyebrow="Docs" />

    <div id="posts" class="container">
      <BlogCard
        id=""
        date="08/21"
        title="Hello World"
        description="Heller World this is a test"
        route="post"
      />
      <BlogCard />
      <BlogCard />
    </div>
  </div>
</template>

<script>
import BlogCard from "@/components/card/BlogCard.vue";
import HeroSimple from "@/components/HeroSimple.vue";

export default {
  name: "Blog",
  components: {
    BlogCard,
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
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .container {
    }
    #blog {
      /* max-width: 75vw; */
    }
  }
}
</style>
