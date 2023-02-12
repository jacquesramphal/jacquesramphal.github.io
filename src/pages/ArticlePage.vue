<template>
  <PageWrapper id="article" class="">
    <!-- <h2>{{ $route.params.id }}</h2> -->
    <HeroBanner
      center
      eyebrow=""
      class="animate glow"
      :key="entry.id"
      :title="`${entry.title}`"
      :subtitle="`${entry.description}`"
      :tag="`${entry.tag}`"
    />
    <!-- <DetailCard2
      id="detail1"
      class=""
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
      :description="`${entry.description}`"
    />-->
    <!-- <StatsBar class="width2"/>  -->
    <!-- <GridContainer class="animate glow delay-2" style="padding-top: 0 !important;"> -->
    <GridContainer class="animate glow delay-2">
      <ThumbLarge
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>
    <!--    
    <DetailCard2
      id="detail1"
      class=""
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
      :description="`${entry.description}`"
    /> -->
    <!-- <DetailCard/> -->

    <!-- <StatsBar /> -->
    <!-- <StatsBar
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
    /> -->
    <!-- <AnimatedComponent>
      <GridContainer>
        <ThumbLarge
          title=""
          :filename="`${entry.images.filename2}`"
          :alt="`${entry.images.alt1}`"
          route=""
          :caption="`${entry.images.caption1}`"
        />
      </GridContainer>
    </AnimatedComponent> -->
    <!-- Section 1 - START -->

    <GridWrapper id="section1">
      <AnimatedComponent>
        <GridContainer class="width">
          <GridWrapper>
            <TextBlock
              left
              eyebrow=""
              header="Section 1"
              :details="`${entry.description}`"
              :blockquote="`${entry.description}`"
            />

            <TextBlock
              left
              eyebrow=""
              header=""
              :details="`${entry.description}`"
            />
          </GridWrapper>
          
        </GridContainer>
      </AnimatedComponent>
      <AnimatedComponent>
        <GridContainer id="" style="padding-top: 0 !important;">
          <ThumbLarge
            class="width2"
            title=""
            filename="work/glo.svg"
            alt="Jacques working at Myplanet"
            caption="This is caption text."
          />
        </GridContainer>
      </AnimatedComponent>
    </GridWrapper>

    <!-- Section 1 - END - Make this a mapped component ^ duplicate for # of sections in data-->

    <!-- <TextImage filename="work/glo.svg" flipped style="background: var(--bg-darker)" />
    <TextImage filename="work/glo.svg" class="" /> -->

    <!-- <CardRow header="Related Work" /> -->
  </PageWrapper>
</template>

<script>
import articleData from "@/assets/data/articles.json";

export default {
  name: "ArticlePage",
  components: {},
  computed: {
    articleId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return articleData.entries.find((entry) => entry.id == this.articleId);
    },
  },
};
</script>

<style scoped></style>
