<template>
  <PageWrapper>
    <!-- <HeroBanner
      id="hero"
      class="display"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    /> -->

    <HeroBanner
      id="hero"
      class="display"
      title="Designer of things, working & playing at Myplanet"
      eyebrow=""
    />

    <Container id="work" tight>
      <!-- <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Selected Work</h4>
        <p class="external justify-end">
          <router-link :to="{ name: 'Work2' }">See More</router-link>
        </p>
      </div> -->
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          alt="J Monogram"
          filename="work/j.svg"
          id="top"
          title="Monogram"
        />

        <ThumbSmall2
          alt="Avatar"
          class="hidemobile"
          filename="avatar/avatar.svg"
          title="Avatar"
        />
        <ThumbSmall
          alt="Avatar"
          class="showmobile"
          filename="avatar/avatar.svg"
          title="Avatar"
        />
        <ThumbSmall
          style="background-color: var(--bg-darker)"
          alt="Template Project"
          filename="templates/template-v2.svg"
          route="project"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall alt="Giftbook" filename="work/gob.svg" title="Giftbook" />

        <ThumbDetail
          alt="Project Template"
          filename="templates/template-mobile-blank.svg"
          style="background-color: #35363a"
          title="Project Title"
          route="project"
          details="This is a project description that would give a preview into the project..."
        />
      </div>
      <TextLink
        style="padding-top: var(--spacing-sm)"
        class="justify-end"
        label="See more work"
        route="work2"
      />
    </Container>
    <!-- <TextImage class="" style="background: var(--bg-darker);" filename="jacques.jpeg" header="The tools I use" details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. " route="post" cta="Read More"/> -->
    <!-- <CardRow /> -->
  </PageWrapper>
</template>

<script>
// import CardRow from "@/components/CardRow.vue";
// import TextImage from "@/components/card/TextImage.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";

import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import TextLink from "@/components/text/TextLink.vue";

export default {
  name: "Work",
  components: {
    ThumbDetail,
    ThumbSmall2,
    TextLink,
  },
  props: {
    // header: {
    //   type: String,
    //   default: "Work",
    // },
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
       homePageCollection {
         items {
           sys {
             id
           }
           heroText
           heroRichText {
             json
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
        return response.data.homePageCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
#hero
  border-bottom: none !important
#work
  // padding-top: var(--spacing-sm) !important
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>
