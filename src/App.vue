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
    <MobileTOCBar
      :headings="markdownHeadings || []"
      :active-heading="markdownActiveHeading"
    />
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
      <component :is="Component" />
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
    <!-- Chat with Jake's agent button and sidebar -->
    <!-- <div class="fixed-chat-entry" @click="toggleChatSidebar">
      <span class="vertical-text">chat with Jake's agent</span>
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
import MyButton from "./components/Button/Button.vue";

// import NewsletterSubscription from "./components/form/NewsletterSubscription.vue";
import FullscreenMenu from "./components/FullscreenMenu.vue";
import StickyNav from "./components/StickyNav.vue";
import HeaderNav from "./components/HeaderNav/HeaderNav.vue";
import MainFooter from "./components/MainFooter.vue";
import TextLink from "./components/text/TextLink.vue";
import MobileTOCBar from "./components/MobileTOCBar.vue";
// import SimpleFooter from "./components/SimpleFooter.vue";
import TheLogin from "./components/TheLogin.vue";
// import ThemeButton from "./components/ThemeButton.vue";
// import BreadCrumb from "./components/BreadCrumb.vue";
import SidebarNav from "./components/SidebarNav.vue";
import { useRouter } from 'vue-router'; // Import Vue Router
import { provide, ref } from 'vue';

export default {
  name: "App",
  components: {
    StickyNav,
    HeaderNav,
    MainFooter,
    TextLink,
    MobileTOCBar,
    // SimpleFooter,
    // ThemeButton,
    TheLogin,
    FullscreenMenu,
    MyButton,
    // NewsletterSubscription,
    // BreadCrumb,
    SidebarNav,
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
    router.afterEach(() => {
      this.closeMenu();
    });
    
    // Dynamically load the n8nchatui.com widget script only once
    if (!window.__n8nChatUILoaded) {
      const script = document.createElement('script');
      script.type = 'module';
      script.defer = true;
      script.innerHTML = `
          import Chatbot from "https://cdn.n8nchatui.com/v1/pole-embed-yard.js";
  Chatbot.init({
    n8nChatUrl: "https://orium.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat",
    metadata: {},
    theme: {
      button: {
        backgroundColor: "#fff",
        right: 20,
        bottom: 20,
        size: 50,
        iconColor: "#000",
        customIconSrc: "https://www.svgrepo.com/show/339963/chat-bot.svg",
        customIconSize: 60,
        customIconBorderRadius: 15,
        autoWindowOpen: {
          autoOpen: false,
          openDelay: 2
        },
        borderRadius: "rounded"
      },
      tooltip: {
        showTooltip: false,
        tooltipMessage: "Jake Ramphal's AI Agent",
        tooltipBackgroundColor: "#fff9f6",
        tooltipTextColor: "#1c1c1c",
        tooltipFontSize: 15
      },
      chatWindow: {
        borderRadiusStyle: "rounded",
        avatarBorderRadius: 25,
        messageBorderRadius: 6,
        showTitle: true,
        title: "Rambot",
        titleAvatarSrc: "https://www.svgrepo.com/show/339963/chat-bot.svg",
        avatarSize: 40,
        welcomeMessage: "Hey! I’m Jake Ramphal’s site guide. Looking to learn about his projects, design work, or writing? Just ask—I’ll point you in the right direction.",
        errorMessage: "Please connect me to n8n first",
        backgroundColor: "#ffffff",
        height: 600,
        width: 400,
        fontSize: 16,
        starterPrompts: [
          "Who is Jake Ramphal?",
          "What is Jake Ramphal's work?",
          "What is Jake Ramphal's writing?",
        ],
        starterPromptFontSize: 15,
        renderHTML: false,
        clearChatOnReload: false,
        showScrollbar: false,
        botMessage: {
          backgroundColor: "#fff",
          textColor: "#050505",
          showAvatar: true,
          avatarSrc: "https://www.svgrepo.com/show/334455/bot.svg"
        },
        userMessage: {
          backgroundColor: "#f2f2f2",
          textColor: "#050505",
          showAvatar: true,
          avatarSrc: "https://www.svgrepo.com/show/532363/user-alt-1.svg"
        },
        textInput: {
          placeholder: "Type your query",
          backgroundColor: "#ffffff",
          textColor: "#1e1e1f",
          sendButtonColor: "#000",
          maxChars: 50,
          maxCharsWarningMessage: "You exceeded the characters limit. Please input less than 50 characters.",
          autoFocus: false,
          borderRadius: 6,
          sendButtonBorderRadius: 50
        },
        // footer: {
        //   companyLink: "ramphal.design",
        //   company: "ramphal.design"
        // }
      }
    }
  });
      `;
      document.body.appendChild(script);
      window.__n8nChatUILoaded = true;
    }
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
@import "./assets/styles/css/all.css";

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
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
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
              opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
// Remove the custom chat sidebar and entrypoint styles
</style>
