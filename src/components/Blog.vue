<template>
  <Wrapper id="blog" class="">
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
    <Container id="posts">
      <BlogCard
        id=""
        date="08/21"
        title="Hello World"
        description="Heller World this is a test"
        route="post"
      />
      <BlogCard />
      <BlogCard />
    </Container>
  </Wrapper>
</template>

<script>
import BlogCard from "@/components/card/BlogCard.vue";
import HeroSimple from "@/components/HeroSimple.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "Blog",
  components: {
    Wrapper,
    Container,
    BlogCard,
    HeroSimple,
  },
};
</script>

<style lang="sass" scoped>
</style>
