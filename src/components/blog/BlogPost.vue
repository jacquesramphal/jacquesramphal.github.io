<template>
  <PageWrapper id="Docs">
    <GridWrapper id="posts" class="">
      <!-- TMP BREADCRUMB -->

      <GridContainer id="section1">
        <p>
          <router-link :to="{ name: 'Library' }">Blog</router-link>
          <span class="subtle" style="margin: 0 1rem">/</span>Post
        </p>
      </GridContainer>
      <!-- TMP BREADCRUMB -->

      <!-- <HeroBanner
        center
        class=""
        v-for="blogPost in contentful"
        v-bind:key="blogPost.sys.id"
        :title="blogPost.title"
        :subtitle="blogPost.description"
        :typography="blogPost.tag"
      />
       -->
      <GridContainer class="animate glow width">
        <TextHeader
          v-for="blogPost in contentful"
          v-bind:key="blogPost.sys.id"
          :title="blogPost.title"
          :description="blogPost.description"
          :typography="blogPost.tag"
        />
      </GridContainer>

      <GridContainer class="animate glow delay-1" tight id="">
        <ImageCard
          large
          class=""
          title=""
          filename="jacques.jpg"
          alt="Jake working at Orium"
        />
      </GridContainer>
      <!-- Section 1 -->
      <GridWrapper id="section1">
        <!-- <AnimatedComponent animationType="zoom"> -->
        <!-- <AnimatedComponent>
          <GridContainer class="width">
            <p class="dropcap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p></GridContainer
          ></AnimatedComponent
        > -->
        <AnimatedComponent>
          <GridContainer class="width">
            <GridWrapper>
              <TextBlock
                left
                eyebrow=""
                title="Section 1"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
              />
              <blockquote>
                <p><em>This</em> is a blockquote.</p>
              </blockquote>
              <TextBlock
                left
                eyebrow=""
                title=""
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
              />
            </GridWrapper>
          </GridContainer>
        </AnimatedComponent>
        <AnimatedComponent>
          <TextImage
            flipped
            class=""
            style="background: var(--background-darker)"
            route="post"
            cta="Learn More"
          />
        </AnimatedComponent>
      </GridWrapper>

      <!-- Section 1 -->

      <GridWrapper id="section2" class="">
        <AnimatedComponent>
          <GridContainer class="width">
            <TextBlock
              left
              eyebrow=""
              title="Section 2"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. "
            />
          </GridContainer>
        </AnimatedComponent>

        <AnimatedComponent>
          <GridContainer id="" class="width1">
            <ImageCard
              large
              class=""
              title=""
              filename="work/glo.svg"
              alt="Jake working at Orium"
              caption="This is caption text."
            />
          </GridContainer>
        </AnimatedComponent>

        <!-- Section 3 -->

        <GridWrapper id="section3" class="">
          <AnimatedComponent>
            <GridContainer class="width">
              <TextBlock
                left
                eyebrow=""
                title="Section 3"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. "
              />
            </GridContainer>
          </AnimatedComponent>
        </GridWrapper>
        <AnimatedComponent>
          <TextImage class="" style="background: var(--background-darker)" />
        </AnimatedComponent>
      </GridWrapper>
    </GridWrapper>
    <!-- <HeroBanner
      
      title="Post Title"
      eyebrow="Blog / Blog Post"
      subtitle="Post Description"
    /> -->
    <CardRow title="Related" />
  </PageWrapper>
</template>

<script>
import CardRow from "@/components/CardRow.vue";
import TextImage from "@/components/card/TextImage.vue";

export default {
  name: "BlogPost",
  components: {
    CardRow,
    TextImage,
  },
  props: {
    title: {
      default: "Hello World",
      required: true,
      type: String,
    },
    typography: {
      default: "tag",
      required: true,
      type: String,
    },
  },
  mounted() {
    window.scrollTo(0, 0);
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
       blogPostCollection(limit: 1) {
        items {
          sys {
            id
          }
          title
          description
          tag
       }
       }
     }`;
      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
      const fetchOptions = {
        method: "POST",
        titles: {
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

<style scoped>
* {
}

blog-card {
  margin-block-end: var(--spacing-md) !important;
}
h3 {
  margin-block-end: var(--spacing-md) !important;
}
#posts {
  justify-self: center;
}
#hero-simple {
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .container {
    }
    #blogpost {
      /* max-width: 75vw; */
    }
  }
}
</style>
