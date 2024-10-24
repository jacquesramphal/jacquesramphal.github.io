<template>
  <div class="" style="overflow: visible !important">
    <!-- DESKTOP VIEW START -->
    <GridContainer
      v-if="isDesktopScreen"
      id="cards"
      style="overflow: visible !important"
    >
      <!-- HEADER COMPONENT START -->
      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
          
        "
      >
        <TextBlock
          style="grid-column: 1 / 3"
          :title="title"
          as="h2"
          description=""
        />
        
        <p class="justify-end" style="align-self: center">
          <router-link :to="{ name: 'Library', hash: '#writing' }">View All</router-link>
        </p>
      </div>
      
      <!-- HEADER COMPONENT END -->

      <GridParent tight>
        
        <ArticleCard
          borderless
          v-for="entry in docs.entries.slice(0, 3)"
          :key="entry.id"
          :eyebrow="entry.eyebrow"
          :filename="entry.thumbnail"
          :alt="entry.alt"
          :title="entry.title"
          :description="entry.description"
          :btnroute="entry.btnroute"
          :route="entry.route"
          :label="entry.label"
        />
      </GridParent>
    </GridContainer>

    <!-- DESKTOP VIEW END -->

    <!-- MOBILE VIEW START -->
    <span v-else
      ><GridContainer
        style="padding-block-end: 0 !important; overflow: visible !important"
      >
        <!-- HEADER COMPONENT START -->
        <div
          class="grid-parent"
          style="
            padding-block-end: var(--spacing-md);
            align-items: center;
            grid-template-columns: repeat(1fr);
          "
        >
          <TextBlock
            style="grid-column: 1 / 3"
            :title="title"
            description= ""
          />
          <p class="justify-start" style="grid-column: 3 / 3; align-self: flex-start">
            <router-link :to="{ name: 'Library' }">View All</router-link>
          </p>
        </div>
        <!-- HEADER COMPONENT END -->
      </GridContainer>

      <div class="scrolling-wrapper">
        <GridParent
          class="cardmobile"
          v-for="entry in docs.entries.slice(0, 3)"
          :key="entry.id"
        >
          <ArticleCard
          borderless
            :image="entry.image"
            :eyebrow="entry.eyebrow"
            :filename="entry.thumbnail"
            :alt="entry.alt"
            :title="entry.title"
            :description="entry.description"
            :route="entry.btnroute"
            :label="entry.label"
          />
        </GridParent></div
    ></span>
    <!-- MOBILE VIEW END -->
  </div>
</template>

<script>
import docs from "../assets/data/docs.json";
const OFFSET = 60;

export default {
  name: "CardRow2",
  components: {},
  props: {
    title: {
      type: String,
      default: "Writing",
    },
  },
  data() {
    return {
      docs,
      lastScrollPosition: 0,
      scrollValue: 0,
      showMobile: false, // Change to regular data property
      isDesktopScreen: false, // Change to regular data property
    };
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onWindowResize);
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);

    // Call the resize method on initial mount to set the initial visibility
    this.onWindowResize();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onWindowResize);
  },

  methods: {
    onScroll() {
      if (window.pageYOffset < 0) {
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return;
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
    onWindowResize() {
      this.showNavbar = true; // Ensure the navbar is always visible when resizing
      this.showMobile = window.innerWidth < 740;
      this.isDesktopScreen = window.innerWidth >= 740;
    },
  },
};
</script>
<style scoped lang="scss">
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  // display: flex;
  flex-direction: row;
  .cardmobile {
    margin: 0 0 var(--spacing-sm) var(--spacing-sm);
    display: inline-flex;
    inline-size: 25vw;
  }
  /* ------------ BREAKPOINT MD ------------ */
  @media only screen and (max-width: 740px) {
    .cardmobile {
      margin: 0 0 var(--spacing-sm) var(--spacing-sm);
      inline-size: 85vw;
    }
  }
  .cardmobile:last-child {
    margin-inline-end: var(--spacing-sm);
  }
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.filters {
  text-align: left;
  margin-block-end: 2rem;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem;
  margin-block-end: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
}

.filters label:hover {
  background: var(--green);
  color: var(--white);
}

/* FILTERED ELEMENTS (POSTS)
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/* FILTERING RULES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
[value="All"]:checked ~ .filters [for="All"],
[value="CSS"]:checked ~ .filters [for="CSS"],
[value="JavaScript"]:checked ~ .filters [for="JavaScript"],
[value="Figma"]:checked ~ .filters [for="Figma"],
[value="All"]:checked ~ .posts [data-category] {
  display: block;
}

[value="CSS"]:checked ~ .posts .post:not([data-category~="CSS"]),
[value="JavaScript"]:checked ~ .posts .post:not([data-category~="JavaScript"]),
[value="Typography"]:checked ~ .posts .post:not([data-category~="Typography"]),
[value="Figma"]:checked ~ .posts .post:not([data-category~="Figma"]) {
  display: none;
}
</style>
