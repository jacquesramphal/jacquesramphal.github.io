<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      title="Library"
      subtitle="Writings, ramblings, professional and personal projects. A collection of my work and thoughts.
"
    />
    <TextImage
      :eyebrow="work.featEyebrow"
      :title="work.featTitle"
      :description="work.featDescription"
      :btnroute="work.btnroute"
      :label="work.label"
      :filename="work.featImage"
    />
    <GridContainer>
      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <TextBlock style="grid-column: 1 / 3" title="Projects" description="" />
      </div>
      <!-- 
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
      /> -->

      <!-- <TextBlock
        as="h2"
        title="Design Work & Play"
        description="A collection of resources and documentation to help you get started with your project."
        style="margin-block: var(--spacing-lg)"
      /> -->
      <div
        v-if="filteredEntries.length > 0"
        id="recentwork"
        class="posts grid-parent"
      >
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
          :size="entry.size"

        />
      </div>
      <div v-else>
        <!-- Not working -->
        <p>No results found.</p>
      </div>
    </GridContainer>

    <GridContainer id="docs" class="animate delay-2">
      <!-- <DynamicText
        as="h3"
        text="Library"
        style="margin-block-end: var(--spacing-md);"
      /> -->
      <!-- <TextBlock
        as="h2"
        title="My Ramblings"
        description=""
        style="margin-block: var(--spacing-lg)"
      /> -->
      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <TextBlock style="grid-column: 1 / 3" title="Writing" description="" />
      </div>
      <GridParent>
        <DefaultCard
          borderless
          v-for="entry in docs.entries"
          :alt="entry.alt"
          :description="entry.description"
          :filename="entry.thumbnail"
          :key="entry.id"
          :label="entry.label"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :eyebrow="entry.eyebrow"
          :title="entry.title"
        />
      </GridParent>
    </GridContainer>
  </PageWrapper>
</template>

<script>
import work from "@/assets/data/work.json";
import docs from "../assets/data/docs.json";
import info from "@/assets/data/info.json";
// import FilterBar from "@/components/FilterBar.vue";

export default {
  name: "MyLibrary",
  components: {
    // FilterBar,
  },
  props: {},
  data() {
    return {
      work,
      docs,
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
        const filtered = this.work.entries.filter((entry) =>
          entry.tag.split(" ").includes(this.selectedCategory)
        );
        console.log("Filtered Entries:", filtered);
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
  border-block-end: none !important;
}

.container {
  padding-block-start: 0 !important;
}
</style>
