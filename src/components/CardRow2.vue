<template>
  <div class="" style="overflow: visible !important; background: transparent !important">
    <!-- DESKTOP VIEW START -->
    <GridContainer v-if="isDesktopScreen" id="cards" style="overflow: visible !important">
      <!-- HEADER COMPONENT START -->
      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <TextBlock style="grid-column: 1 / 3" :title="title" as="h2" description="" />

        <p class="justify-end" style="align-self: center; white-space: nowrap">
          <router-link v-if="viewAllTo" :to="viewAllTo">View All</router-link>
        </p>
      </div>

      <!-- HEADER COMPONENT END -->

      <GridParent tight>
        <template v-if="kind === 'writing'">
          <ArticleCard
            borderless
            v-for="entry in visibleItems"
            :key="`writing-${entry.id}`"
            :eyebrow="entry.eyebrow || entry.tag"
            :filename="entry.thumbnail"
            :imageVariant="entry.imageVariant"
            :bgcolor="entry.bgcolor"
            :alt="entry.alt"
            :title="entry.title"
            :description="entry.description"
            :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
            :link="entry.link"
            :label="entry.label"
            :tags="entry.tags"
            :type="entry.type"
          />
        </template>
        <template v-else>
          <ImageCard
            v-for="entry in visibleItems"
            :key="`nonwriting-${entry.id}`"
            class="post"
            :data-category="entry.tag"
            :title="entry.title"
            :description="entry.description"
            :cta="entry.cta"
            :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
            :btnroute="entry.btnroute"
            :link="entry.link"
            :alt="entry.alt"
            :filename2="kind === 'work' ? null : entry.filename2 || entry.images?.filename2"
            :filename3="
              kind === 'work'
                ? entry.filename3 ||
                  entry.filename2 ||
                  entry.filename1 ||
                  entry.images?.filename1 ||
                  entry.images?.filename3
                : entry.filename3 || entry.images?.filename3
            "
            :style="entry.bgcolor"
            size="small"
          />
        </template>
      </GridParent>
    </GridContainer>

    <!-- DESKTOP VIEW END -->

    <!-- MOBILE VIEW START -->
    <span v-else
      ><GridContainer style="padding-block-end: 0 !important; overflow: visible !important">
        <!-- HEADER COMPONENT START -->
        <div
          class="grid-parent"
          style="
            padding-block-end: var(--spacing-md);
            align-items: center;
            grid-template-columns: repeat(1fr);
          "
        >
          <TextBlock style="grid-column: 1 / 3" :title="title" as="h2" description="" />
          <p class="justify-end" style="grid-column: 3 / 3; align-self: center">
            <router-link v-if="viewAllTo" :to="viewAllTo">View All</router-link>
          </p>
        </div>
        <!-- HEADER COMPONENT END -->
      </GridContainer>

      <div class="scrolling-wrapper">
        <GridParent class="cardmobile" v-for="entry in visibleItems" :key="entry.id">
          <ArticleCard
            borderless
            v-if="kind === 'writing'"
            :key="`writing-${entry.id}`"
            :image="entry.image"
            :eyebrow="entry.eyebrow || entry.tag"
            :filename="entry.thumbnail"
            :imageVariant="entry.imageVariant"
            :bgcolor="entry.bgcolor"
            :alt="entry.alt"
            :title="entry.title"
            :description="entry.description"
            :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
            :link="entry.link"
            :label="entry.label"
            :tags="entry.tags"
            :type="entry.type"
          />
          <ImageCard
            v-else
            :key="`nonwriting-${entry.id}`"
            :data-category="entry.tag"
            :title="entry.title"
            :description="entry.description"
            :cta="entry.cta"
            :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
            :btnroute="entry.btnroute"
            :link="entry.link"
            :alt="entry.alt"
            :filename1="
              kind === 'work'
                ? 'blank.svg'
                : entry.filename1 || entry.filename3 || entry.images?.filename1
            "
            :filename2="kind === 'work' ? null : entry.filename2 || entry.images?.filename2"
            :filename3="
              kind === 'work'
                ? entry.filename3 ||
                  entry.filename2 ||
                  entry.filename1 ||
                  entry.images?.filename1 ||
                  entry.images?.filename3
                : entry.filename3 || entry.images?.filename3
            "
            :style="entry.bgcolor"
            size="small"
          />
        </GridParent>
      </div>
    </span>
    <!-- MOBILE VIEW END -->
  </div>
</template>

<script>
import docs from '../assets/data/docs.json';
import library from '../assets/data/library.json';
import ArticleCard from '@/components/card/ArticleCard/ArticleCard.vue';
import ImageCard from '@/components/card/ImageCard/ImageCard.vue';
const OFFSET = 60;

export default {
  name: 'CardRow2',
  components: { ArticleCard, ImageCard },
  props: {
    title: {
      type: String,
      default: 'Writing',
    },
    kind: {
      type: String,
      default: 'writing',
    },
    items: {
      type: Array,
      default: null,
    },
    viewAllTo: {
      // string path or vue-router location object
      type: [String, Object],
      default: null,
    },
    limit: {
      type: Number,
      default: 3,
    },
    filterByType: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      docs,
      library,
      lastScrollPosition: 0,
      scrollValue: 0,
      showMobile: false, // Change to regular data property
      isDesktopScreen: false, // Change to regular data property
    };
  },
  computed: {
    resolvedItems() {
      if (Array.isArray(this.items)) return this.items;
      // Use library data (which has type info) instead of docs
      return this.library.entries;
    },
    filteredItems() {
      const currentRoute = this.$route;
      let items = this.resolvedItems;

      // Filter by type if filterByType prop is provided
      if (this.filterByType) {
        items = items.filter(item => item.type === this.filterByType);
      }

      // Filter out the current document if we're on a doc page
      if (currentRoute.name === 'Doc' || currentRoute.name === 'DocById') {
        const currentSlug = currentRoute.params.slug;
        const currentId = currentRoute.params.id;

        items = items.filter(item => {
          // Filter by slug if available
          if (currentSlug && item.slug) {
            return item.slug !== currentSlug;
          }
          // Filter by docId if numeric id route is used
          if (currentId && item.docId) {
            return item.docId !== parseInt(currentId, 10);
          }
          return true;
        });
      }

      return items;
    },
    visibleItems() {
      return this.filteredItems.slice(0, this.limit);
    },
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onWindowResize);
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(viewportMeta);

    // Call the resize method on initial mount to set the initial visibility
    this.onWindowResize();
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onWindowResize);
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
  @media only screen and (max-width: 768px) {
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
[value='All']:checked ~ .filters [for='All'],
[value='CSS']:checked ~ .filters [for='CSS'],
[value='JavaScript']:checked ~ .filters [for='JavaScript'],
[value='Figma']:checked ~ .filters [for='Figma'],
[value='All']:checked ~ .posts [data-category] {
  display: block;
}

[value='CSS']:checked ~ .posts .post:not([data-category~='CSS']),
[value='JavaScript']:checked ~ .posts .post:not([data-category~='JavaScript']),
[value='Typography']:checked ~ .posts .post:not([data-category~='Typography']),
[value='Figma']:checked ~ .posts .post:not([data-category~='Figma']) {
  display: none;
}
</style>
