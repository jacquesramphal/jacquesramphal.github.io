<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      :eyebrow="works.eyebrow"
      :title="works.title"
      :subtitle="works.subtitle"
    />
    <GridContainer>
      <input type="radio" id="All" name="categories" value="All" checked />
      <input type="radio" id="Tag1" name="categories" value="Tag1" />
      <input type="radio" id="Tag2" name="categories" value="Tag2" />
      <input type="radio" id="Tag3" name="categories" value="Tag3" />
      <input type="radio" id="Tag4" name="categories" value="Tag4" />
      <input type="radio" id="Tag5" name="categories" value="Tag5" />
      <input type="radio" id="Tag6" name="categories" value="Tag6" />
     
      <FilterBar
        :categories="filterCategories"
        :selectedCategory.sync="selectedCategory"
        :name="groupName"
      /> 
      <!-- <FilterBar
      :categories="filterCategories"
      :selectedCategory.sync="selectedCategory"
    /> -->
      <div id="recentwork" class="posts grid-parent">
        <ImageCard
          v-for="entry in works.entries"
          :key="entry.id"
          class="post"
          :data-category="entry.tag"
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
    <SplitImage
      flipped
      style="background: var(--background-darker)"
      filename="work/glo.svg"
      header="Featured Project"
      details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="work"
      cta="Read More"
    />

    <!-- <CardRow /> -->
  </PageWrapper>
</template>

<script>
import works from "@/assets/data/work.json";
import info from "@/assets/data/info.json";
import FilterBar from "@/components/FilterBar.vue";

export default {
  name: "MoreWork",
  components: {
    FilterBar,
  },
  props: {},
  data() {
    return {
      works,
      info,
      filterCategories: [
        { value: "All", label: "All" },
        { value: "Tag1", label: "Tag1" },
        { value: "Tag2", label: "Tag2" },
        { value: "Tag3", label: "Tag3" },
        { value: "Tag4", label: "Tag4" },
        { value: "Tag5", label: "Tag5" },
        { value: "Tag6", label: "Tag6" },
        // Add other categories here
      ],
      selectedCategory: "All",
      groupName: "categories",
    };
  },
  computed: {
    filteredEntries() {
      if (this.selectedCategory === "All") {
        return this.works.entries;
      } else {
        return this.works.entries.filter(entry =>
          entry.tag.includes(this.selectedCategory)
        );
      }
    },
  },
  methods: {
    isCategoryVisible(tag) {
      return this.selectedCategory === "All" || tag.includes(this.selectedCategory);
    },
  },
};
</script>

<style lang="scss" scoped>
#hero {
  border-bottom: none !important;
}

.container {
  padding-top: 0 !important;
}

</style>
