<template>
  <PageWrapper>
    <HeroBanner
      title="Library"
      eyebrow=""
      :style="{ paddingBottom: '0' }"
      subtitle="A collection of resources and documentation to help you get started with your project."
    />
    <TextImage
    flipped
      :eyebrow="docs.featEyebrow"
      :title="docs.featTitle"
      :description="docs.featDescription"
      :btnroute="docs.btnroute"
      :label="docs.label"
    />
    <GridContainer id="docs" class="animate delay-2">
      <GridParent>
        <ArticleCard
          borderless
          v-for="entry in docs.entries"
          :alt="entry.alt"
          :description="entry.description"
          :filename="entry.thumbnail"
          :key="entry.id"
          :label="entry.label"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :eyebrow="entry.eyebrow"
          :title="entry.title"
        />
      </GridParent>
    </GridContainer>
    <!-- <BlogFeed :contentful="contentful" /> -->
  </PageWrapper>
</template>

<script>
import work from "@/assets/data/work.json";
import docs from "../assets/data/docs.json";

export default {
  name: "MyDocs",
  data() {
    return {
      work,
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
  components: {},
};
</script>

<style scoped lang="scss"></style>
