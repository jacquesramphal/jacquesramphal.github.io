<template>
  <Wrapper id="blog">
    <!--  list view -->
    <!-- <Container>
      <blog-post-entry
        v-for="blogPost in contentful"
        v-bind:key="blogPost.sys.id"
        :image="blogPost.image"
        :imgurl="blogPost.imgurl"
        :category="blogPost.category"
        :title="blogPost.title"
        :description="blogPost.description"
        :route="blogPost.route"
      />
    </Container> -->


    <!--  card view -->

    <div class="">
      <Container id="cards" style="overflow: visible">
        
        <div class="grid-parent">
          <DefaultCard
            v-for="blogPost in contentful"
            v-bind:key="blogPost.sys.id"
            :image="blogPost.image"
            :category="blogPost.category"
            :imgurl="blogPost.imgurl"
            :title="blogPost.title"
            :description="blogPost.description"
            :route="blogPost.route"
          />
        </div>
      </Container>
    </div>
  </Wrapper>
</template>

<script>
// import BlogPostEntry from "@/components/blog/BlogPostEntry.vue";
import DefaultCard from "@/components/card/DefaultCard.vue";
import Container from "@/components/grid/Container.vue";
import Wrapper from "@/components/grid/Wrapper.vue";

export default {
  name: "BlogFeed",
  components: { 
    // BlogPostEntry, 
  Container, 
  Wrapper, 
  DefaultCard },
  props: {
    contentful: {
      type: Array,
      required: true,
      // TODO: add validation
    },
  },
};
</script>

<style scoped lang="sass">
.blog
  display: grid
  grid-gap: var(--spacing-xs)
  background: var(--background)
  color: var(--text)
  font-size: var(--font-xs)
  font-family: inherit
.blog-post
  // font-size: var(--font-xxs)
  // margin-bottom: var(--spacing-md)
  @media only screen and (min-width: 740px)
    margin-bottom: var(--spacing-lg)
.blog-post-entry:first-child
  padding-top: 0
.blog-post-entry:last-child
  @media only screen and (min-width: 740px)
    padding-bottom: 0
  @media only screen and (min-width: 740px)
</style>
