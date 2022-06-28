<template>
  <PageWrapper id="blog">
    <Wrapper id="posts" class="">
      <!-- TMP BREADCRUMB -->
      <Container id="section1">
        <p>
          <router-link :to="{ name: 'Blog' }">Blog</router-link>
          <span class="subtle" style="margin: 0 1rem">/</span>Post
        </p>
      </Container>
      <!-- TMP BREADCRUMB -->

      <Container class="animate glow width">
        <TextHeader
          v-for="blogPost in contentful"
          v-bind:key="blogPost.sys.id"
          :title="blogPost.title"
          :description="blogPost.description"
          :tag2="blogPost.category"
        />
      </Container>

      <Container class="animate glow delay-1" tight id="">
        <ThumbLarge
          class=""
          title=""
          filename="about.jpg"
          alt="Jacques working at Myplanet"
        />
      </Container>
      <!-- Section 1 -->
      <Wrapper id="section1">
        <!-- <AnimatedComponent animationType="zoom"> -->
        <!-- <AnimatedComponent>
          <Container class="width">
            <p class="dropcap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p></Container
          ></AnimatedComponent
        > -->
        <AnimatedComponent>
          <Container class="width">
            <Wrapper>
              <TextBlock
                left
                eyebrow=""
                header="Section 1"
                details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
                header=""
                details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
              />
            </Wrapper>
          </Container>
        </AnimatedComponent>
        <AnimatedComponent>
          <TextImage
          flipped
            class=""
            style="background: var(--bg-darker)"
            header="About Me"
            route="post"
            cta="Learn More"
          />
        </AnimatedComponent>
      </Wrapper>

      <!-- Section 1 -->

      <Wrapper id="section2" class="">
        <AnimatedComponent>
          <Container class="width">
            <TextBlock
              left
              eyebrow=""
              header="Section 2"
              details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
          </Container>
        </AnimatedComponent>

        <AnimatedComponent>
          <Container tight id="" class="width2">
            <ThumbLarge
              class=""
              title=""
              filename="work/glo.svg"
              alt="Jacques working at Myplanet"
              caption="This is caption text."
            />
          </Container>
        </AnimatedComponent>

        <!-- Section 3 -->

        <Wrapper id="section3" class="">
          <AnimatedComponent>
            <Container class="width">
              <TextBlock
                left
                eyebrow=""
                header="Section 3"
                details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
            </Container>
          </AnimatedComponent>
        </Wrapper>
        <AnimatedComponent>
          <TextImage
            class=""
            style="background: var(--bg-darker)"
          />
          /></AnimatedComponent
        >
      </Wrapper>
    </Wrapper>
    <!-- <HeroBanner
      
      title="Post Title"
      eyebrow="Blog / Blog Post"
      subtitle="Post Description"
    /> -->
    <CardRow header="Related" />
  </PageWrapper>
</template>

<script>
import AnimatedComponent from "@/components/AnimatedComponent.vue";

import PageWrapper from "@/components/grid/PageWrapper.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import TextHeader from "@/components/text/TextHeader.vue";
import CardRow from "@/components/CardRow.vue";
import TextImage from "@/components/card/TextImage.vue";
import TextBlock from "@/stories/TextBlock.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "BlogPost",
  components: {
    AnimatedComponent,
    PageWrapper,
    Wrapper,
    Container,
    CardRow,
    TextHeader,
    TextBlock,
    ThumbLarge,
    TextImage,
  },
  props: {
    title: {
      default: "Hello World",
      required: true,
      type: String,
    },
    tag2: {
      default: "Category",
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
          category
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

<style scoped>
* {
}

blog-card {
  margin-bottom: var(--spacing-md) !important;
}
h3 {
  margin-bottom: var(--spacing-md) !important;
}
#posts {
  justify-self: center;
}
#hero-simple {
}
.width {
  max-width: 86.4rem;
}
.width2 {
  max-width: 98rem;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
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
