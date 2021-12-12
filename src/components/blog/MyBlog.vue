<template>
  <PageWrapper>
    <blog
      class="blog"
      :posts="posts"
      :information="information"
      :settings="settings"
    />
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Blog from "@/components/blog/Blog.vue";
// Mock data
import posts from "@/components/blog/data/posts.json";
import settings from "@/components/blog/data/settings.json";
export default {
  name: "MyBlog",
  components: { PageWrapper, Blog },
  data() {
    return {
      posts,
      settings,
      cposts: [],
    };
  },
  async created() {
    this.cposts = await this.getPosts();
  },
  methods: {
    getPosts: async () => {
      const query = `{
      blogPostEntryQuery {
         blogPost(id: "2PtC9h1YqIA6kaUaIsWEQ0") {
           sys {
             id
           }
           title
           description
         }
           }
         }
       }`;
      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      };
      try {
        const response = await fetch(fetchUrl, fetchOptions).then((response) =>
          response.json()
        );
        return response.data.showCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
    },
  },
};
</script>

<style scoped lang="sass"></style>
