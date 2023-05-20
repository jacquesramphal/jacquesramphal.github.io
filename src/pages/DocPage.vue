<template>
  <PageWrapper id="doc" class="">
    <!-- <h2>{{ $route.params.id }}</h2> -->
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
        large
        title=""
        :filename="`${entry.thumbnail}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>
    <div class="section">
      <GridWrapper v-for="(entry, j) in entry.entries" :key="j">
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
          <GridContainer v-if="entry.images.filename" id="" style="padding-top: 0 !important">
            <ImageCard
              large
              v-if="entry.images.filename"
              class="width2"
              title=""
              :filename="entry.images.filename"
              :alt="entry.images.alt"
              :caption="entry.images.caption"
            />
          </GridContainer>
        </AnimatedComponent>
      </GridWrapper>
    </div>
    <!-- Make this list constrained and limit to 3 -->
    <CardRow2 header="Related" />
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

<style lang="sass" scoped>
.section
  padding-bottom: var(--spacing-lg)
</style>
