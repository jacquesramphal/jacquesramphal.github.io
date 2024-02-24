<template>
  <PageWrapper>
    <HeroBanner
    
      id="hero"
      :title="work.title"
      :subtitle="work.description"
    />
    <!-- <SplitImage
      :eyebrow="work.featEyebrow"
      :title="work.featTitle"
      :description="work.featDescription"
      :btnroute="work.btnroute"
      :label="work.label"
    /> -->
    <GridContainer>
      <input type="radio" id="All" name="categories" value="All" checked />
      <input type="radio" id="Tag1" name="categories" value="Tag1" />
      <input type="radio" id="Tag2" name="categories" value="Tag2" />
      <input type="radio" id="Tag3" name="categories" value="Tag3" />
      <input
        type="radio"
        id="Product-Design"
        name="categories"
        value="Product-Design"
      />
      <input type="radio" id="Tag5" name="categories" value="Tag5" />
      <input type="radio" id="Tag6" name="categories" value="Tag6" />

      <FilterBar
        :categories="filterCategories"
        :selectedCategory.sync="selectedCategory"
        :groupName="groupName"
      />

      <div
        v-if="filteredEntries.length > 0"
        id="recentwork"
        class="posts grid-parent"
      >
      <ImageCard   alt="J Monogram" filename1="work/j.svg" id="top" />
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
          v-for="entry in work.entries"
          :key="entry.id"
          class="post"
          :data-category="entry.tag"
          :eyebrow="entry.tag"
          :title="entry.title"
          :description="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :filename1="entry.filename1"
          :filename2="entry.filename2"
          :filename3="entry.filename3"
          :style="entry.bgcolor"

        />
      </div>
      <div v-else>
        <!-- Not working -->
        <p>No results found.</p>
      </div>
    </GridContainer>
    <SplitImage
      flipped
      style="background: var(--background-darker)"
      filename="work/glo.svg"
      header="Featured Project"
      description="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="work"
      cta="Read More"
    />

    <!-- <CardRow /> -->
  </PageWrapper>
</template>

<script>
import work from "@/assets/data/work.json";
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
      work,
      info,
      filterCategories: [
        { value: "All", label: "All" },
        { value: "Tag1", label: "Tag1" },
        { value: "Tag2", label: "Tag2" },
        { value: "Tag3", label: "Tag3" },
        { value: "Product-Design", label: "Product-Design" },
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
      return this.work.entries;
    } else {
      const filtered = this.work.entries.filter(entry =>
        entry.tag.split(' ').includes(this.selectedCategory)
      );
      console.log('Filtered Entries:', filtered);
      return filtered;
    }
  },
},
  methods: {
    isCategoryVisible(tag) {
      return (
        this.selectedCategory === "All" || tag.includes(this.selectedCategory)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#hero {
  border-bottom: none !important;
}

.container {
  padding-block-start: 0 !important;
}
</style>
