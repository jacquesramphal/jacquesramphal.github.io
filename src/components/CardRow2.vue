<template>
  <div class="" style="overflow: visible !important; background: transparent !important">
    <!-- FEATURE-LIST VARIANT: one featured card + a short list of rows, with a
         View All link. Text-first, so it degrades cleanly when items lack images.
         Responsive via ArticleCard's own list/featured/mobileList styles — no
         isDesktopScreen branch needed. -->
    <template v-if="variant === 'feature-list'">
      <GridContainer style="overflow: visible !important">
        <GridParent tight>
          <!-- Section title and View All hold column 1; the featured card and
               list rows stack together across columns 2/3. -->
          <div class="feature-list__intro">
            <TextBlock :title="title" as="h2" description="" />
            <p class="feature-list__viewall">
              <router-link v-if="viewAllTo" :to="viewAllTo">View All</router-link>
            </p>
          </div>

          <GridParent tight rows class="feature-list__content">
            <!-- <ArticleCard
              v-if="featuredItem"
              borderless
              featured
              :key="`feat-${featuredItem.id}`"
              :eyebrow="featuredItem.eyebrow"
              :filename="featuredItem.thumbnail"
              :imageVariant="featuredItem.imageVariant"
              :bgcolor="featuredItem.bgcolor"
              :alt="featuredItem.alt"
              :title="featuredItem.title"
              :description="featuredItem.description"
              :route="
                featuredItem.route || (featuredItem.btnroute ? `/${featuredItem.btnroute}` : '')
              "
              :link="featuredItem.link"
              :label="featuredItem.label"
              :tags="featuredItem.tags"
              :type="featuredItem.type"
              :contentFile="featuredItem.contentFile"
              :date="featuredItem.date"
            /> -->
            <ArticleCard
              v-for="entry in listItems"
              :key="`list-${entry.id}`"
              borderless
              list
              mobileList
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
              :contentFile="entry.contentFile"
              :date="entry.date"
            />
          </GridParent>
        </GridParent>
      </GridContainer>
    </template>

    <template v-else>
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
          <template v-if="kind === 'writing' || kind === 'work'">
            <ArticleCard
              borderless
              v-for="entry in visibleItems"
              :key="`writing-${entry.id}`"
              eyebrow=""
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
              :contentFile="entry.contentFile"
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
          <GridParent class="cardmobile" v-for="entry in visibleItemsMobile" :key="entry.id">
            <ArticleCard
              borderless
              v-if="kind === 'writing' || kind === 'work'"
              :key="`writing-${entry.id}`"
              :image="entry.image"
              eyebrow=""
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
              :contentFile="entry.contentFile"
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
    </template>
  </div>
</template>

<script>
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
    variant: {
      // 'grid' (default card grid) | 'feature-list' (1 featured + list rows)
      type: String,
      default: 'grid',
    },
    // feature-list editorial control: pin the featured entry and order the rows
    // by entry id. Both fall back to recency when omitted.
    featuredId: {
      type: Number,
      default: null,
    },
    listIds: {
      type: Array,
      default: null,
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
    limitMobile: {
      type: Number,
      default: 10,
    },
    filterByType: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
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

      // Exclude unpublished items
      items = items.filter((item) => item.published !== false);

      // Filter by type if filterByType prop is provided
      if (this.filterByType) {
        items = items.filter((item) => item.type === this.filterByType);
      }

      // Filter out the current document if we're on a doc page
      if (currentRoute.name === 'Doc' || currentRoute.name === 'DocById') {
        const currentSlug = currentRoute.params.slug;
        const currentId = currentRoute.params.id;

        items = items.filter((item) => {
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
    // feature-list variant. Curated by id when featuredId/listIds are given,
    // otherwise recency: first item featured, the next `limit` as rows.
    // Resolve curated ids against the full published pool so the pick doesn't
    // depend on filterByType.
    publishedPool() {
      return this.resolvedItems.filter((item) => item.published !== false);
    },
    featuredItem() {
      // Explicit 0 = no featured card (list-only).
      if (this.featuredId === 0) return null;
      if (this.featuredId != null) {
        return (
          this.publishedPool.find((item) => item.id === this.featuredId) ||
          this.filteredItems[0] ||
          null
        );
      }
      return this.filteredItems[0] || null;
    },
    listItems() {
      if (this.listIds && this.listIds.length) {
        const byId = new Map(this.publishedPool.map((item) => [item.id, item]));
        return this.listIds.map((id) => byId.get(id)).filter(Boolean);
      }
      return this.filteredItems.slice(1, 1 + this.limit);
    },
    visibleItemsMobile() {
      return this.filteredItems.slice(0, this.limitMobile);
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
/* FEATURE-LIST VARIANT
   The columns and gaps come from GridParent; these rules only place its two
   children. GridParent is 2-column between 768px and 1200px, which is too
   narrow to split title from cards, so both children span the full row until
   the 3-column breakpoint takes over at 1201px. */
.feature-list__intro {
  grid-column: 1 / -1;

  @media only screen and (min-width: 1201px) {
    grid-column: 1 / 2;
  }
}

.feature-list__viewall {
  white-space: nowrap;
}

.feature-list__content {
  grid-column: 1 / -1;

  @media only screen and (min-width: 1201px) {
    grid-column: 2 / -1;
  }
}

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
    vertical-align: top;
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
