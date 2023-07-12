<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      class="display"
      eyebrow=""
      title="Multi-disciplinary Designer"
    />


    <!-- CONTENTFUL HEADER EXAMPLE -->
    <!-- <HeroBanner
      id="hero"
      class="display"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    /> -->

    <!-- <GridContainer id="work" class="">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Selected Work</h4>
        <MyButton
          type="secondary"
          style="margin-top: var(--spacing-sm)"
          class="justify-end"
          label="View More"
          route="work2"
        />
      </div>
    </GridContainer> -->
    <GridContainer tight id="work" class="animate delay-2">
      <GridParent id="recentwork">
        <ImageCard alt="J Monogram" filename="work/j.svg" id="top" />
        <ImageCard2
          alt="Avatar"
          class="hidemobile"
          filename="avatar/avatar.svg"
          title="Avatar"
        />
        <ImageCard
          alt="Avatar"
          class="showmobile"
          filename="avatar/avatar.svg"
          title="Avatar"
        />

        <ImageCard
          v-for="entry in works.entries"
          :key="entry.id"
          class="post"
          :eyebrow="entry.tag"
          :title="entry.title"
          :details="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :filename="entry.thumbnail"
          :filename2="entry.screenshot"
          :style="entry.bgcolor"
          :size="entry.size"
          :buttons="entry.buttonsData"
        />
      </GridParent>
    </GridContainer>
    <!-- <GridContainer tight>
      <HeroBanner
        center
        fullvh
        eyebrow=""
        route="/"
        label="Get in touch"
        style="background-color: var(--bg-darker)"
    /></GridContainer> -->
  </PageWrapper>
</template>

<script>
import works from "@/assets/data/work.json";
import GridContainer from "@/components/grid/GridContainer.vue";

export default {
  name: "HomePage",
  components: { GridContainer },
  props: {
    // work: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      works,
      // contentful: [],
    };
  },

  // async created() {
  //   this.contentful = await this.getContentful();
  // },

  // methods: {
  //   getContentful: async () => {
  //     const query = `{
  //      homePageCollection {
  //        items {
  //          sys {
  //            id
  //          }
  //          heroText
  //          heroRichText {
  //            json
  //          }
  //        }
  //      }
  //    }`;

  //     const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
  //     const fetchOptions = {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ query }),
  //     };

  //     try {
  //       const response = await fetch(fetchUrl, fetchOptions).then((response) =>
  //         response.json()
  //       );
  //       return response.data.homePageCollection.items;
  //     } catch (error) {
  //       throw new Error("Could not receive the data from Contentful!");
  //     }
  //   },
  // },
};
</script>

<style lang="sass" scoped>
@media only screen and (min-width: 1201px)
    #work
      // padding-top: 0 !important
</style>
