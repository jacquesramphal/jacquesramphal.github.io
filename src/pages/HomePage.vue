<template>
  <PageWrapper>
    <!-- <HeroBanner
      id="hero"
      class="display"
      eyebrow=""
      title="Multi-disciplinary Designer."
    /> -->
    <!-- <HeroBanner
      id="hero"
      eyebrow=""
      title="Design journeys fueled by mindfulness."
      fullvh
    /> -->
   <!-- <HeroBanner
      id="hero"
      eyebrow=""
      title="Ramphal Design"
    /> -->
    <!-- <HeroBanner
      id="hero"
      class="display"
      eyebrow=""
      title="<strong>Front-end Designer</strong> of things."
    /> -->
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
          secondary
          style="margin-top: var(--spacing-sm)"
          class="justify-end"
          label="View More"
          route="work2"
        />
        <p class="external justify-end">
          <router-link :to="{ name: 'MoreWork' }">See More</router-link>
        </p>
      </div>
    </GridContainer> -->
    <GridContainer id="work" class="animate delay-2">
      <div id="recentwork" class="grid-parent">
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
        <ImageCard alt="Giftbook" filename="work/gob.svg" title="Giftbook" />

        <ImageCard
          style="background-color: var(--bg-darker)"
          alt="Template Project"
          filename="templates/template-desktop-blank.svg"
          title="Small Template"
          route="work"
          details="This is a work description that would give a preview into the work..."
        />
        <ThumbDetail
          alt="Project Template"
          filename="templates/template-v2.svg"
          style="background-color: #35363a"
          title="Project Title"
          route="work/1"
          details="This is a work description that would give a preview into the work..."
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
          :style="entry.bgcolor"
        />
      </div>
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
