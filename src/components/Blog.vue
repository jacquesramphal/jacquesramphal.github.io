<template>
  <div id="blog" class="">
    <HeroSimple title="Recent Writing" class="" />

    <div id="posts" class="container">
      <BlogCard
        id=""
        date="08/21"
        title="Heller World this is a test Heller World this is a test Heller World this is a test"
        description="Heller World this is a test"
      />
      <BlogCard
        id=""
        date="08/21"
        title="My Journey from Print to Development"
        description="Test Post"
      />
      <BlogCard
        id=""
        date="08/21"
        title="Visual Quality Assurance"
        description="Test Post"
      />
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
  color: inherit !important;
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
    #blog {
      /* max-width: 75vw; */
    }
  }
}
</style>
