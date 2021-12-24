<template>
  <PageWrapper>
    <HeroBanner title="Jacques’ Ramblings" eyebrow="Blog" />
    
    <blog class="blog" :posts="posts" :settings="settings" />
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Blog from "@/components/blog/Blog.vue";
import HeroBanner from "@/components/HeroBanner.vue";

// Mock data
// import fakeposts from "@/components/blog/data/posts.json";
import settings from "@/components/blog/data/settings.json";

export default {
  name: "MyBlog",
  components: { PageWrapper, Blog, HeroBanner },
  data() {
   return {
     posts: [],
     settings,
   };
 },
 async created() {
   this.posts = await this.getPosts();
 },
  methods: {
    getPosts: async () => {
      const query = `{
       blogPostCollection {
         items {
           sys {
             id
           }
           category
           title
           description
           image {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
         }
       }
     }`;
     const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
     const fetchOptions = {
       method: "POST",
       headers: {
         Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
         "Content-Type": "application/json"
       },
       body: JSON.stringify({ query })
     };

     try {
       const response = await fetch(fetchUrl, fetchOptions).then(response =>
         response.json()
       );
       return response.data.blogPostCollection.items;
     } catch (error) {
       throw new Error("Could not receive the data from Contentful!");
     }
   }
 }
};
</script>

<style scoped lang="sass"></style>
