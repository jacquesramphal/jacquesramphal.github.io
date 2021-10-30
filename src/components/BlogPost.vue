<template>
  <div id="blog" class="">
    <!-- Placeholder breadcrumb -->
    <div class="container" style="background: var(--bg-darker)">
      <nav class="">
        <p>
          <router-link :to="{ name: 'Home' }">Home</router-link>
          <span class="subtle" style="margin: 0 1rem">/</span>
          <router-link :to="{ name: 'Blog' }">Blog</router-link>
          <span class="subtle" style="margin: 0 1rem">/</span>Post
        </p>
      </nav>
    </div>

    <HeroSimple title="Post Title" subtitle="Post Description" class="" />
    <div id="posts" class="">
      <div id="section1" class="container">
        <TextBlock
          center
          header="Section Title"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>

      <div id="section2" class="grid-parent container reversed">
        <TextBlock left />
        <ThumbMedium
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="400"
          data-aos-once="true"
          data-aos-anchor-placement="top"
          class=""
          title=""
          filename="about.jpg"
          alt="Jacques working at Myplanet"
        />
      </div>

      <div id="section3" class="grid-parent container">
        <TextBlock
          left
          header="Section Title"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        />
        <TextBlock
          left
          header="Section Title"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        />
        <TextBlock
          left
          header="Section Title"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>

      <div id="" class="container">
        <ThumbLarge
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="400"
          data-aos-once="true"
          data-aos-anchor-placement="top"
          class=""
          title=""
          filename="about.jpg"
          alt="Jacques working at Myplanet"
        />
        <TextBlock center />
      </div>
    </div>
  </div>
</template>

<script>
import HeroSimple from "@/components/HeroSimple.vue";
import TextBlock from "@/stories/TextBlock.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "BlogPost",
  components: {
    HeroSimple,
    TextBlock,
    ThumbLarge,
    ThumbMedium,
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
