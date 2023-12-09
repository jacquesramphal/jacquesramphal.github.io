<template>
  <PageWrapper>
    <GridWrapper motif1>
      <HeroBanner
        red
        id="hero"
        class="display"
        title="Jake is a Full-stack Designer"
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

    <!-- HEADER COMPONENT START -->
    <!-- <GridContainer>
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <TextBlock
          style="grid-column: 1 / 3"
          header="Work"
          details="I have worked with a variety of clients, from small startups to large corporations. I have also worked with a variety of agencies, from small boutique agencies to large global agencies."
        />
        <p class="external justify-end" style="align-self: flex-end">
          <router-link :to="{ name: 'MoreWork' }">View All</router-link>
        </p>
      </div>
    </GridContainer> -->
    <!-- HEADER COMPONENT END -->

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
      <!-- <CardRow2 /> -->
    </GridContainer>

    <!-- <TestimonialCarousel/> -->

    <!-- 
    Get in touch banner -->
    <!-- <HeroBanner
        
        
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
import GridContainer from "@/components/grid/GridContainer.vue";
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
  components: { GridContainer },
};
</script>

<style lang="scss">
@media only screen and (min-width: 1201px) {
  .banner-container {
    // background-color: red !important;
    padding: 0 !important;
  }
}
</style>
