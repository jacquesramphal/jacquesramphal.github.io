<template>
  <PageWrapper>
    <HeroBanner
    
      id="hero"
      class="display"
      eyebrow=""
      title="Front-end Designer of things"
    />
    <!-- <HeroBanner
      id="hero"
      class="display"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    /> -->
    <ThemeButton v-if="!$route.meta.hideNav" />
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
    <GridContainer id="work" class="" tight>
      <div id="recentwork" class="animate glow delay-3 grid-parent">
        
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
        <ThumbSmall alt="Giftbook" filename="work/gob.svg" title="Giftbook" />

        <ThumbSmall
          style="background-color: var(--bg-darker)"
          alt="Template Project"
          filename="templates/template-desktop-blank.svg"
          title="Small Template"
          route="project"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbDetail
          alt="Project Template"
          filename="templates/template-v2.svg"
          style="background-color: #35363a"
          title="Project Title"
          route="project"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall
          v-for="entry in projects.entries"
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
      <!-- <MyButton
        secondary
        style="margin-top: var(--spacing-sm)"
        class="justify-end"
        label="View More"
        route="work2"
      /> -->
    </GridContainer>
    <!-- <TextImage/> -->
    <!-- <CardRow /> -->
    <!-- <CardRow2 /> -->
  </PageWrapper>
</template>

<script>
import projects from "@/assets/data/projects.json";

export default {
  name: "HomePage",
  components: {
  },
  props: {
    // project: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      projects,
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
      padding-top: 0 !important
      // padding-bottom: 0 !important
</style>
