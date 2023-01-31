<template>
  <PageWrapper>

<!-- This works! BG as a prop  -->
<!-- <HeroBanner
      background
      filename="bg.jpg"
      title="🗂️ Documents"
      eyebrow=""
    /> -->

    <HeroBanner
      title="Docs & Resources"
      eyebrow=""
    />
 

    <!-- <ul class="container">
      <li v-for="blogPost in posts" v-bind:key="blogPost.sys.id">
        <p>{{ blogPost.tag }}</p>
        <h4>{{ blogPost.title }}</h4>
        <p>{{ blogPost.description }}</p>
      </li>
    </ul> -->
    <CardRow2 />
    <CardRow2 />

    <BlogFeed :contentful="contentful" />
    <!-- <BlogCard />
    <BlogCard />
    <BlogCard /> -->
    <!--          <BlogPost :contentful="contentful"  />  -->
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import BlogFeed from "@/components/blog/BlogFeed.vue";
// import BlogCard from "@/components/card/BlogCard.vue";
// import BlogPost from "@/components/blog/BlogPost.vue";

// Mock data
// import fakeposts from "@/components/blog/data/posts.json";

export default {
  name: "MyBlog",
  components: {
    PageWrapper,
    BlogFeed,
    // BlogCard,
  },
  data() {
    return {
      contentful: [],
    };
  },
  async created() {
    this.contentful = await this.getContentful();
  },
  methods: {
    getContentful: async () => {
      const query = `{
       blogPostCollection {
         items {
           sys {
             id
           }
           tag
           title
           description
           imgurl
           route
           label
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions).then((response) =>
          response.json()
        );
        return response.data.blogPostCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
    },
  },
};
</script>

<style scoped lang="sass"></style>
