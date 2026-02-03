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
      <template v-slot:menu-button>
        <TextLink
          style="border: 0 !important; line-height: inherit"
          type="textlink"
          :label="menuOpen ? 'Close' : 'Menu'"
          @click="toggleMenu"
        />
      </template>
      <template v-slot:menu-button-mobile>
        <TextLink
          style="border: 0 !important; line-height: inherit"
          type="textlink"
          :label="menuOpen ? 'Close' : 'Menu'"
          @click="toggleMenu"
        />
      </template>
    </HeaderNav>
    <!-- <ThemeButton v-if="!$route.meta.hideThemeButton" /> -->
    <transition name="fade" mode="out-in">
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
    <!-- <NewsletterSubscription /> -->
    <MainFooter v-if="!$route.meta.hideFooter" />
    <!-- <SimpleFooter v-if="!$route.meta.hideFooter" /> -->
    <CustomChatUI />
    <!-- Chat with Jacques's agent button and sidebar -->
    <!-- <div class="fixed-chat-entry" @click="toggleChatSidebar">
      <span class="vertical-text">chat with Jacques's agent</span>
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
import MainFooter from './components/MainFooter.vue';
import TextLink from './components/text/TextLink.vue';
import MobileTOCBar from './components/MobileTOCBar.vue';
import SimpleFooter from './components/SimpleFooter.vue';
import TheLogin from './components/TheLogin.vue';
// import ThemeButton from "./components/ThemeButton.vue";
// import BreadCrumb from "./components/BreadCrumb.vue";
import SidebarNav from './components/SidebarNav.vue';
import CustomChatUI from './components/CustomChatUI.vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import { provide, ref } from 'vue';

export default {
  name: 'App',
  components: {
    StickyNav,
    HeaderNav,
    MainFooter,
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
  },
  setup() {
    const markdownHeadings = ref([]);
    const markdownActiveHeading = ref(null);

    // Provide functions for markdown pages to update headings
    const updateMarkdownHeadings = (headings) => {
      markdownHeadings.value = headings;
    };

    const updateMarkdownActiveHeading = (activeHeading) => {
      markdownActiveHeading.value = activeHeading;
    };

    provide('updateMarkdownHeadings', updateMarkdownHeadings);
    provide('updateMarkdownActiveHeading', updateMarkdownActiveHeading);

    return {
      markdownHeadings,
      markdownActiveHeading,
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
