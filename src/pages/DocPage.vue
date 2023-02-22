<template>
  <PageWrapper id="doc" class="">
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
        :filename="`${entry.thumbnail}`"
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
    <!-- Make this mapped sections and subfields using entries and ids. Generate sections like RESUME -->

    <GridWrapper v-for="(entry, j) in entry.entries" :key="j" class="section">
      <AnimatedComponent>
        <GridContainer class="width">
          <GridWrapper>
            <TextBlock
              left
              eyebrow=""
              :header="entry.title"
              :details="entry.body"
              :blockquote="entry.blockquote"
            />
          </GridWrapper>
        </GridContainer>
        <GridContainer id="" style="padding-top: 0 !important">
          <ThumbLarge
            class="width2"
            title=""
            :filename="entry.images.filename"
            :alt="entry.images.alt"
            :caption="entry.images.caption"
          />
        </GridContainer>
      </AnimatedComponent>
    </GridWrapper>

    
    <!-- <TextImage filename="work/glo.svg" flipped style="background: var(--bg-darker)" />
    <TextImage filename="work/glo.svg" class="" /> -->

    <!-- <CardRow2 header="Related" /> -->
  </PageWrapper>
</template>

<script>
import docData from "@/assets/data/docs.json";

export default {
  name: "DocPage",
  components: {},
  props: {
    testsections: {
      type: Array,
      required: true,
    },
  },
  computed: {
    docId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return docData.entries.find((entry) => entry.id == this.docId);
    },
  },
};
</script>

<style scoped></style>
