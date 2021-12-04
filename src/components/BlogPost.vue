<template>
  <PageWrapper id="blog">
    <Wrapper id="posts" class="">
      <!-- TMP BREADCRUMB -->
      <Container id="section1" class="">
        <p>
          <!-- <router-link :to="{ name: 'Home' }">Home</router-link>
            <span class="subtle" style="margin: 0 1rem">/</span> -->
          <router-link :to="{ name: 'Blog' }">Blog</router-link>
          <span class="subtle" style="margin: 0 1rem">/</span>Post
        </p>
      </Container>
      <!-- TMP BREADCRUMB -->

      <Container id="section1" class="width">
        <TextBlock
          center
          eyebrow="Category"
          header="Post Title"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </Container>

      <Container tight id="">
        <ThumbLarge
          class=""
          title=""
          filename="about.jpg"
          alt="Jacques working at Myplanet"
        />
      </Container>

      <!-- Section 1 -->
      <Wrapper id="section1">
        <Container class="width">
          <TextBlock
            left
            eyebrow=""
            header="Section 1"
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
          />
          <p><code>This is a callout or code block</code></p>
        </Container>
        <Container tight id="" class="width">
          <ThumbLarge
            class=""
            title=""
            filename="about.jpg"
            alt="Jacques working at Myplanet"
          />
        </Container>
      </Wrapper>

      <!-- Section 1 -->
      <Wrapper id="section2">
        <Container class="width">
          <TextBlock
            left
            eyebrow=""
            header="Section 2"
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. "
          />
        </Container>
        <Container tight id="" class="width">
          <ThumbLarge
            class=""
            title=""
            filename="about.jpg"
            alt="Jacques working at Myplanet"
          />
        </Container>
      </Wrapper>
    </Wrapper>
    <!-- <HeroBanner
      
      title="Post Title"
      eyebrow="Blog / Blog Post"
      subtitle="Post Description"
    /> -->
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
// import HeroBanner from "@/components/HeroBanner.vue";
import TextBlock from "@/stories/TextBlock.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
// import ThumbMedium from "@/components/ThumbMedium.vue";

export default {
  name: "BlogPost",
  components: {
    PageWrapper,
    Wrapper,
    Container,
    // HeroBanner,
    TextBlock,
    ThumbLarge,
    // ThumbMedium,
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
.width {
  max-width: 86.4rem;
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
