<template>
  <PageWrapper>
    <GridWrapper motif1>
      <HeroBanner
      red
        id="hero"
        class="display"
        title="Multi-disciplinary Designer"
        :style="{ paddingBottom: '0' }" 
      />
    </GridWrapper>

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
          type="outline"
          style="margin-top: var(--spacing-sm)"
          class="justify-end"
          label="View More"
          route="work2"
        />
      </div>
    </GridContainer> -->
    
    <GridContainer tight id="work" class="animate delay-2">
      <GridParent id="recentwork">
        <ImageCard alt="J Monogram" filename1="work/j.svg" id="top" />
        <ImageCard2
          alt="Avatar"
          class="hidemobile"
          filename1="avatar/avatar.svg"
          title="Avatar"
        />
        <ImageCard
          alt="Avatar"
          class="showmobile"
          filename1="avatar/avatar.svg"
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
          :filename1="entry.filename1"
          :filename2="entry.filename2"
          :filename3="entry.filename3"
          :alt="entry.alt"
          :style="entry.bgcolor"
          :size="entry.size"
          :buttons="entry.buttonsData"
        />
        <!-- <DefaultCard
          cover
          v-for="entry in works.entries"
          :key="entry.id"
          :tag="entry.tag"
          :filename="entry.filename1"
          :alt="entry.alt"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        /> -->
      </GridParent>
    </GridContainer>

    <!-- <TestimonialCarousel/> -->

    <!-- <CardRow2/> -->
    <!-- 
    Get in touch banner -->
    <!-- <HeroBanner
        center
        fullvh
        eyebrow=""
        route="/"
        title="Have a question? Get in touch."
        label="Get in touch"
        labeltwo="Get in touch"
    /> -->
  </PageWrapper>
</template>

<script>
import works from "@/assets/data/work.json";
// import TestimonialCarousel from "@/components/TestimonialCarousel.vue";

export default {
  name: "HomePage",
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

<style lang="scss">
@media only screen and (min-width: 1201px) {
  .banner-container{
    // background-color: red !important;
    padding: 0 !important;
  }
}
</style>
