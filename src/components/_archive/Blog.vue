<template>
  <PageWrapper id="blog" class="">
    <HeroBanner
      title="Recent Writing"
      eyebrow="Blog"
      subtitle="A collection of thoughts and ideas"
    />
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
  </PageWrapper>
</template>

<script>
import BlogCard from "@/components/card/BlogCard.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "Blog",
  components: {
    PageWrapper,
    Container,
    BlogCard,
    HeroBanner,
  },
};
</script>

<style lang="sass" scoped></style>
