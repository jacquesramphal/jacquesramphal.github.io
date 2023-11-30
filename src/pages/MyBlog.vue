<template>
  <PageWrapper>
    <HeroBanner
      title="Docs & Resources"
      subtitle="A place to learn and share thoughts"
      eyebrow=""
    />
    <GridContainer tight id="docs" class="animate delay-2">
      <GridParent>
        <DefaultCard
        cover
          v-for="entry in docs.entries"
          :key="entry.id"
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

export default {
  name: "MyBlog",
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

<style scoped lang="scss"></style>
