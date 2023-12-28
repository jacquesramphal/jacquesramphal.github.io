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
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
          
        "
      >
        <TextBlock
          style="grid-column: 1 / 3"
          :header="header"
          details=""
        />
        
        <p class="external justify-end" style="align-self: center">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>
      <!-- HEADER COMPONENT END -->

      <GridParent>
        <DefaultCard
          borderless
          v-for="entry in docs.entries.slice(0, 3)"
          :key="entry.id"
          :tag="entry.tag"
          :filename="entry.thumbnail"
          :alt="entry.alt"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        />
      </GridParent>
    </GridContainer>

    <!-- DESKTOP VIEW END -->

    <!-- MOBILE VIEW START -->
    <span v-else
      ><GridContainer
        style="padding-bottom: 0 !important; overflow: visible !important"
      >
        <!-- HEADER COMPONENT START -->
        <div
          class="grid-parent"
          style="
            padding-bottom: var(--spacing-md);
            align-items: center;
            grid-template-columns: repeat(1fr);
          "
        >
          <TextBlock
            style="grid-column: 1 / 3"
            :header="header"
          />
          <p class="external justify-start" style="align-self: flex-end">
            <router-link :to="{ name: 'Blog' }">View All</router-link>
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
          <DefaultCard
            cover
            :image="entry.image"
            :tag="entry.tag"
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
    header: {
      type: String,
      default: "Docs",
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
    width: 25vw;
  }
  /* ------------ BREAKPOINT MD ------------ */
  @media only screen and (max-width: 740px) {
    .cardmobile {
      margin: 0 0 var(--spacing-sm) var(--spacing-sm);
      width: 85vw;
    }
  }
  .cardmobile:last-child {
    margin-right: var(--spacing-sm);
  }
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.filters {
  text-align: left;
  margin-bottom: 2rem;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
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
