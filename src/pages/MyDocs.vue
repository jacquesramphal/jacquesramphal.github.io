<template>
  <PageWrapper>
    <HeroBanner
      title="Docs & Resources"
      eyebrow=""
      :style="{ paddingBottom: '0' }"
    />
    <GridContainer id="docs" class="animate delay-2">
      <!-- <DefaultCard
        
        list
          v-for="entry in docs.entries"
          :alt="entry.alt"
          :description="entry.description"
          :filename="entry.thumbnail"
          :key="entry.id"
          :label="entry.label"
          :route="entry.btnroute"
          :tag="entry.tag"
          :title="entry.title"
        /> -->
      <GridParent>
        <DefaultCard
          borderless
          v-for="entry in docs.entries"
          :alt="entry.alt"
          :description="entry.description"
          :filename="entry.thumbnail"
          :key="entry.id"
          :label="entry.label"
          :route="entry.btnroute"
          :tag="entry.tag"
          :title="entry.title"
        />
      </GridParent>
    </GridContainer>
    <SplitImage
      
      style="background: var(--background-darker)"
      filename="article/baseline.png"
      tag="Article"
      header="The Future-Proof Designer"
      details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="mdoc/12"
      cta="Read More"
    />
<!-- 
    <SplitImage
      
      style="background: var(--background-darker)"
      filename="article/baseline.png"
      tag="Article"
      header="The Future-Proof Designer"
      details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="mdoc/12"
      cta="Read More"
    /> -->
    <!-- <BlogFeed :contentful="contentful" /> -->
  </PageWrapper>
</template>

<script>
import works from "@/assets/data/work.json";
import docs from "../assets/data/docs.json";

export default {
  name: "MyDocs",
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
  components: {  },
};
</script>

<style scoped lang="scss"></style>
