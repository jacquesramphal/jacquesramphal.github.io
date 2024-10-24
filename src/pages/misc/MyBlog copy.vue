<template>
  <PageWrapper>
    <HeroBanner title="Library" eyebrow="" />
    <GridContainer
      style="background-color: var(--background-darker)"
      tight
      id="work"
      class="animate delay-2"
    >
    <input type="radio" id="All" name="categories" value="All" checked />
      <input type="radio" id="Tag1" name="categories" value="Tag1" />
      <input type="radio" id="Tag2" name="categories" value="Tag2" />
      <input type="radio" id="Tag3" name="categories" value="Tag3" />
      <input
        type="radio"
        id="Product-Design"
        name="categories"
        value="Product-Design"
      />
      <input type="radio" id="Tag5" name="categories" value="Tag5" />
      <input type="radio" id="Tag6" name="categories" value="Tag6" />

      <FilterBar
        :categories="filterCategories"
        :selectedCategory.sync="selectedCategory"
        :groupName="groupName"
      />
      <GridParent>
        <ArticleCard
          v-for="entry in docs.entries"
          :key="entry.id"
          :image="entry.image"
          :tag="entry.tag"
          :filename="entry.thumbnail"
          :alt="entry.alt"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        />
      </GridParent>
    </GridContainer>
    <!-- <BlogFeed :contentful="contentful" /> -->
  </PageWrapper>
</template>

<script>
import works from "@/assets/data/work.json";
import docs from "../assets/data/docs.json";

import PageWrapper from "@/components/grid/PageWrapper.vue";
// import CourseCard from "@/components/card/CourseCard.vue";
// import BlogPost from "@/components/blog/BlogPost.vue";

// Mock data
// import fakeposts from "@/components/blog/data/posts.json";

export default {
  name: "MyDocs",
  components: {
    PageWrapper,
    // CourseCard,
  },
  data() {
    return {
      works,
      docs,
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
           alt
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
            block-size
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

<style scoped lang="scss"></style>
