<template>
  <PageWrapper>
    <HeroBanner
    class=""
      id="hero"
      title="Library"
      subtitle="
A curated collection of my writing, professional work, and personal projects."
    />
    <!-- <TextImage
      :eyebrow="work.featEyebrow"
      :title="work.featTitle"
      :description="work.featDescription"
      :btnroute="work.btnroute"
      :label="work.label"
      :filename="work.featImage"
    /> -->
    
    <!-- WRITING SECTION - MOVED TO TOP FOR PROMINENCE -->
    <GridContainer id="writing" class="animate delay-1">
      <GridParent
        style="padding-block-end: var(--spacing-md); align-items: center"
      >
        <TextBlock
          as="h2"
          style="grid-column: 1 / 3"
          title="Writing"
          description=""
        />
        <!-- description="Thoughts on design systems, AI/AX patterns, design-development integration, and the evolving landscape of product design." -->

      </GridParent>
      <GridParent tight class="">
        <ArticleCard
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

    <!-- WORK SECTION -->
    <GridContainer id="work">
      <GridParent
        style="padding-block-end: var(--spacing-md); align-items: center"
      >
        <TextBlock
          as="h2"
          style="grid-column: 1 / 3"
          title="Work"
          description=""
          
        />
        <!-- description="Case studies and project work showcasing design systems, AI/AX design, and design-development integration." -->

      </GridParent>
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
      <GridParent
        tight
        v-if="filteredWorkEntries.length > 0"
        id="recentwork"
        class="posts"
      >
        <!-- <ImageCard alt="J Monogram" filename1="work/j.svg" id="top" />
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
        /> -->
        <!-- <ArticleCard
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
         -->
        <!-- <ArticleCard
        cover
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
          alt="project image"
          :filename="entry.filename3"
        /> -->
        <ImageCard
          v-for="entry in filteredWorkEntries"
          :key="entry.id"
          class="post"
          :data-category="entry.tag"
          :title="entry.title"
          :description="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :alt="entry.alt"
          :filename1="entry.filename1"
          :filename2="entry.filename2"
          :filename3="entry.filename3"
          :style="entry.bgcolor"
          :size="entry.size"
          :variant="entry.variant"
        />
      </GridParent>
      <div v-else>
        <!-- Not working -->
        <p>No results found.</p>
      </div>
    </GridContainer>
    <!-- PLAY SECTION - HIDDEN FOR NOW -->
    <!-- <GridContainer id="play">
      <GridParent
        style="padding-block-end: var(--spacing-md); align-items: center"
      >
        <TextBlock
          as="h2"
          style="grid-column: 1 / 3"
          title="Play"
          description="Experimental projects, tools, and personal explorations in design and development."
        />
      </GridParent>
      
      <GridParent
        tight
        v-if="filteredPlayEntries.length > 0"
        id="recentplay"
        class="posts"
      >
       
        <ImageCard
          v-for="entry in filteredPlayEntries"
          :key="entry.id"
          class="post"
          :data-category="entry.tag"
          :title="entry.title"
          :description="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :alt="entry.alt"
          :filename1="entry.filename1"
          :filename2="entry.filename2"
          :filename3="entry.filename3"
          :style="entry.bgcolor"
          :size="entry.size"
          :variant="entry.variant"
        />
      </GridParent>
      <div v-else>
        <p>No results found.</p>
      </div>
    </GridContainer> -->
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
    filteredWorkEntries() {
      return this.work.entries.filter(entry => entry.category === "Work" && (this.selectedCategory === "All" || entry.tag.split(" ").includes(this.selectedCategory)));
    },
    filteredPlayEntries() {
      return this.work.entries.filter(entry => entry.category === "Play" && (this.selectedCategory === "All" || entry.tag.split(" ").includes(this.selectedCategory)));
    },
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
