<template id="app">
  <!-- <router-view v-if="isLoggedIn" v-slot="{ Component }"> -->

  <router-view v-slot="{ Component }">
    <!-- <BreadCrumb v-if="!$route.meta.hideBreadCrumb" /> -->
    <!-- <SidebarNav/> -->
    <!-- <TextLink
            style="    position: absolute !important;
left: 0; top: 0;
z-index: 1000;
writing-mode: vertical-rl;
transform: rotate(90deg);
"
            label="Jacques Ramphal"
            route="/"
            v-show="isDesktopScreen && !menuOpen"
          /> -->
    <!-- <MobileTOCBar
      :headings="markdownHeadings || []"
      :active-heading="markdownActiveHeading"
    /> -->
    <HeaderNav
      :toggle-menu="toggleMenu"
      v-if="!$route.meta.hideNav"
      :menu-open="menuOpen"
      :has-headings="markdownHeadings && markdownHeadings.length > 0"
      :headings="markdownHeadings || []"
      :active-heading="markdownActiveHeading"
    >
      <!-- menu button hidden: Library link in HeaderNav handles primary nav -->
    </HeaderNav>
    <SectionStickyBar v-if="!$route.meta.hideNav && !menuOpen" :sections="stickySections" />
    <!-- <ThemeButton v-if="!$route.meta.hideThemeButton" /> -->
    <transition name="fade">
      <component :is="Component" :key="$route.path" />
    </transition>

    <transition name="slide">
      <fullscreen-menu
        v-if="menuOpen"
        :is-open="menuOpen"
        @close="menuOpen = false"
      ></fullscreen-menu>
    </transition>

    <!-- <StickyNav v-if="!$route.meta.hideNav" :menu-open="menuOpen">
      <template v-slot:menu-button>
        <MyButton
          type="ghost"
          :label="menuOpen ? 'close' : 'menu'"
          @click="toggleMenu"
        />
      </template>
    </StickyNav> -->
    <GridContainer full v-if="showSubscribeBar" class="article-outro-band">
      <ArticleOutro />
    </GridContainer>
    <MainFooter v-if="!$route.meta.hideFooter" />
    <!-- <SimpleFooter v-if="!$route.meta.hideFooter" /> -->
    <!-- <UnderConstructionBar /> -->

    <!-- <img
      src="./assets/images/work/3-avatar/sketches/avatar-standing.png"
      alt=""
      aria-hidden="true"
      class="avatar-standing"
    />-->

    <CustomChatUI v-if="!$route.meta.hideChat" />
    <!-- Chat with Jacques' agent button and sidebar -->
    <!-- <div class="fixed-chat-entry" @click="toggleChatSidebar">
      <span class="vertical-text">chat with Jacques' agent</span>
    </div>
    <transition name="slide">
      <div v-if="showChatSidebar" class="chat-sidebar">
        <div class="chat-sidebar-header">
          <span>AI Chat (n8n agent)</span>
          <button class="close-btn" @click.stop="toggleChatSidebar">&times;</button>
        </div>
        <div class="chat-sidebar-content">
          <p>This is a placeholder for the n8n chat agent UI.</p>
        </div>
      </div>
    </transition> -->
  </router-view>
  <!-- <TheLogin v-else @TheLogin::loginResult="handleLoginResult" /> -->
</template>

<script lang="js">
import MyButton from './components/Button/Button.vue';

// import NewsletterSubscription from "./components/form/NewsletterSubscription.vue";
import FullscreenMenu from './components/FullscreenMenu.vue';
import StickyNav from './components/StickyNav.vue';
import HeaderNav from './components/HeaderNav/HeaderNav.vue';
import SectionStickyBar from './components/SectionStickyBar.vue';
import MainFooter from './components/MainFooter.vue';
import ArticleOutro from './components/blog/ArticleOutro.vue';
import TextLink from './components/text/TextLink.vue';
import MobileTOCBar from './components/MobileTOCBar.vue';
import SimpleFooter from './components/SimpleFooter.vue';
import TheLogin from './components/TheLogin.vue';
// import ThemeButton from "./components/ThemeButton.vue";
// import BreadCrumb from "./components/BreadCrumb.vue";
import SidebarNav from './components/SidebarNav.vue';
import CustomChatUI from './components/CustomChatUI.vue';
// import UnderConstructionBar from './components/UnderConstructionBar.vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import { provide, ref, computed } from 'vue';
export default {
  name: 'App',
  components: {
    StickyNav,
    HeaderNav,
    SectionStickyBar,
    MainFooter,
    ArticleOutro,
    TextLink,
    MobileTOCBar,
    SimpleFooter,
    // ThemeButton,
    TheLogin,
    FullscreenMenu,
    MyButton,
    // NewsletterSubscription,
    // BreadCrumb,
    SidebarNav,
    CustomChatUI,
    // UnderConstructionBar,
  },
  setup() {
    const router = useRouter();
    const markdownHeadings = ref([]);
    const markdownActiveHeading = ref(null);
    // Section list fed by non-markdown pages (e.g. the Library) for the mobile
    // sticky section bar. Kept separate from markdownHeadings so each source
    // owns its own lifecycle.
    const librarySections = ref([]);
    // Type of the doc currently being viewed (from the library registry), set
    // by MarkdownPage. Drives the subscribe bar, which shows on writing
    // articles only.
    const currentDocType = ref(null);

    // Provide functions for markdown pages to update headings
    const updateMarkdownHeadings = (headings) => {
      markdownHeadings.value = headings;
    };

    const updateCurrentDocType = (type) => {
      currentDocType.value = type || null;
    };

    const updateMarkdownActiveHeading = (activeHeading) => {
      markdownActiveHeading.value = activeHeading;
    };

    const updateLibrarySections = (sections) => {
      librarySections.value = Array.isArray(sections) ? sections : [];
    };

    provide('updateMarkdownHeadings', updateMarkdownHeadings);
    provide('updateMarkdownActiveHeading', updateMarkdownActiveHeading);
    provide('updateLibrarySections', updateLibrarySections);
    provide('updateCurrentDocType', updateCurrentDocType);

    // Subscribe bar (above the footer) shows on writing articles only.
    const showSubscribeBar = computed(() => currentDocType.value === 'article');

    // Sections shown in the mobile sticky bar, chosen by route: the Library
    // feeds its own section headers; article/doc pages reuse the markdown H2s.
    const stickySections = computed(() => {
      const path = router.currentRoute.value.path || '';
      if (path.startsWith('/library')) {
        return librarySections.value || [];
      }
      return (markdownHeadings.value || [])
        .filter((h) => h.level === 2 && h.slug && h.title)
        .map((h) => ({ id: h.slug, title: h.title }));
    });

    return {
      markdownHeadings,
      markdownActiveHeading,
      librarySections,
      stickySections,
      currentDocType,
      showSubscribeBar,
    };
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
  mounted() {
    const router = useRouter();

    // Use Vue Router's afterEach hook to close the menu on route change
    router.afterEach((to) => {
      this.closeMenu();
      // Clear headings when navigating away from markdown pages
      if (!to.path.startsWith('/doc/')) {
        this.markdownHeadings = [];
        this.markdownActiveHeading = null;
        // Also drop the doc type so the subscribe bar hides off doc pages.
        this.currentDocType = null;
      }
      // Clear library-fed sections when leaving the Library so the sticky bar
      // doesn't carry stale entries onto the next page.
      if (!to.path.startsWith('/library')) {
        this.librarySections = [];
      }
    });
  },

  // data() {
  //   return {
  //     userIsLoggedIn: false
  //   }
  // },
  // computed: {
  //   isLoggedIn() {
  //     return this.userIsLoggedIn
  //   }
  // },
  // methods: {
  //   handleLoginResult({loginResult}) {
  //     this.userIsLoggedIn = loginResult
  //   }
  // }
};
</script>

<style lang="scss">
@import './assets/styles/css/all.css';

/* Full-width subscribe band above the footer (writing articles only). The
   `full` GridContainer drops the horizontal gutters so the bar spans the
   content width; its fill and radius live on the component. */

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-active {
  transition:
    transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-active {
  transition:
    transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.avatar-standing {
  position: fixed;
  bottom: 0;
  right: -10rem;
  width: clamp(12rem, 35vw, 120rem); /* design-guard:ignore */
  pointer-events: none;
  z-index: 0;
}

/* Safety: hide legacy n8nchatui inline widget if it ever loads */
.n8n-chat-ui,
[class^='n8n-chat-ui'],
[class*=' n8n-chat-ui'],
[id*='n8n-chat-ui'],
[id*='n8nchatui'] {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
</style>
