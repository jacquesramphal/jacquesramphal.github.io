<template>
  <PageWrapper id="doc" class="">
    <!-- <h1>{{ $route.params.id }}</h1> -->
    <HeroBanner
      center
      eyebrow=""
      :key="entry.id"
      :title="`${entry.title}`"
      :subtitle="`${entry.description}`"
      :tag="`${entry.tag}`"
    />
    <GridContainer class="animate glow delay-2">
      <ImageCard
        size="large"
        title=""
        :filename="`${entry.thumbnail}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>
    <div class="section">
      <!-- <MarkdownRenderer :markdown="pageContent" /> -->
      <GridWrapper v-for="(section, j) in entry.entries" :key="j">
        <AnimatedComponent>
          <GridContainer class="width">
            <GridWrapper>
              <TextBlock
                left
                eyebrow=""
                :header="section.title"
                :details="section.body"
                :blockquote="section.blockquote"
              />
            </GridWrapper>
          </GridContainer>
          <GridContainer
            v-if="section.images.filename"
            id=""
            style="padding-top: 0 !important"
          >
            <ImageCard
              size="large"
              v-if="section.images.filename"
              class="width1"
              title=""
              :filename="section.images.filename"
              :alt="section.images.alt"
              :caption="section.images.caption"
            />
          </GridContainer>
        </AnimatedComponent>
      </GridWrapper>
      <GridContainer>
        <!-- <ButtonRow :buttons="entry.buttonsData" /> -->
        <ButtonRow
          :buttons="[
            { label: 'Custom Label', route: '/custom-route' },
            { label: 'Custom Label2', route: '/custom-route2' },
          ]"
        />
      </GridContainer>
    </div>
    <!-- Make this list constrained and limit to 3 -->
    <CardRow2 header="Related" />
  </PageWrapper>
</template>

<script>
import docData from "../assets/data/docs.json";
// import pageContent from "../assets/content/content.md";
import PageWrapper from "../components/grid/PageWrapper.vue";
import GridContainer from "../components/grid/GridContainer.vue";
import GridWrapper from "../components/grid/GridWrapper.vue";
import TextBlock from "../components/TextBlock.vue";
import AnimatedComponent from "../components/AnimatedComponent.vue";
import ImageCard from "../components/ImageCard.vue";
import CardRow2 from "../components/CardRow2.vue";
import ButtonRow from "../components/ButtonRow.vue";

export default {
  name: "DocPage",
  components: {
    GridContainer,
    GridWrapper,
    TextBlock,
    AnimatedComponent,
    ImageCard,
    CardRow2,
    PageWrapper,
    ButtonRow,
  },
  // data() {
  //   return {
  //     pageContent: pageContent, // Store the Markdown content here
  //   };
  // },
  computed: {
    docId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return docData.entries.find((entry) => entry.id === this.docId);
    },
  },
  mounted() {
    // Check if this.$route.params is defined
    if (!this.$route.params) {
      // Handle the case when $route.params is undefined
      // You can redirect to an error page or display an error message
      console.error("Invalid route parameters");
      // Example: Redirect to the homepage
      this.$router.push("/brb");
    }
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding-bottom: var(--spacing-lg);
}
</style>
