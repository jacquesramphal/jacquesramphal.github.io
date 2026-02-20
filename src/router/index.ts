import TheLogin from "@/components/TheLogin.vue";

import { createRouter, createWebHistory } from "vue-router";
import InfoPage from "@/pages/InfoPage.vue";
import DesignSystem from "@/pages/DesignSystem.vue";
import MaintenancePage from "@/pages/misc/MaintenancePage.vue";
import MyResume from "@/pages/MyResume.vue";
import NotFound from "@/pages/misc/NotFound.vue";
import ProjectPage from "@/pages/ProjectPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
// import DocPage from "@/pages/DocPage.vue";
import MarkdownPage from "@/pages/MarkdownPage.vue";
import HomePage from "@/pages/HomePage.vue";
import MyLibrary from "@/pages/MyLibrary.vue";
import WritingIndex from "@/pages/WritingIndex.vue";
import WorkIndex from "@/pages/WorkIndex.vue";
import PlayIndex from "@/pages/PlayIndex.vue";
import UsefulLinks from "@/pages/UsefulLinks.vue";
import CoursePage from "@/pages/CoursePage.vue";
import FullscreenMenu from "../components/FullscreenMenu.vue";
import { getDocRecordById } from "@/utils/docRegistry";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      hidePageWrapper: true,
      hideFooter: true,
    },
  },
  {
    path: "/brb",
    name: "MaintenancePage",
    component: MaintenancePage,
    meta: {
      hideNav: true,
      hideFooter: true,
      hidePageWrapper: true,
    },
  },
  {
    path: "/menu",
    component: FullscreenMenu,
    beforeEnter: (to, from, next) => {
      // Delay the rendering of the component for a brief moment
      setTimeout(() => {
        next();
      }, 10);
    },
  },
  {
    path: "/login",
    name: "Login",
    component: TheLogin,
  },
  {
    path: "/",
    name: "Jacques Ramphal",
    component: HomePage,
    children: [],
    meta: {
      hideNav: false,
    },
  },

  {
    path: "/links",
    name: "Links",
    component: UsefulLinks,
  },
  {
    path: "/resume",
    name: "Resume",
    component: MyResume,
    meta: {
      hideFooter: true,
    },
  },
  {
    path: "/info",
    name: "Info",
    component: InfoPage,
  },

  {
    path: "/designsystem",
    name: "Design System",
    component: DesignSystem,
  },
  {
    name: "Library",
    path: "/library",
    component: MyLibrary,
  },
  {
    name: "WritingIndex",
    path: "/writing",
    component: WritingIndex,
  },
  {
    name: "WorkIndex",
    path: "/work",
    component: WorkIndex,
  },
  {
    name: "PlayIndex",
    path: "/play",
    component: PlayIndex,
  },
  {
    name: "Product",
    path: "/product",
    component: ProductPage,
  },
  {
    name: "Work",
    path: "/work/:id",
    component: ProjectPage,
    props: true,
    meta: {
      dynamicTitle: true
    }
  },
  {
    name: "DocById",
    path: "/doc/:id(\\d+)",
    component: MarkdownPage,
    props: true,
    meta: {
      dynamicTitle: true,
    },
    beforeEnter: (to) => {
      const raw = to.params?.id;
      const id = typeof raw === "string" ? parseInt(raw, 10) : NaN;
      if (!Number.isFinite(id)) return true;

      const record = getDocRecordById(id);
      if (record?.slug) {
        return { name: "Doc", params: { slug: record.slug } };
      }
      return true;
    },
  },
  {
    name: "Doc",
    path: "/doc/:slug",
    component: MarkdownPage,
    props: true,
    meta: {
      dynamicTitle: true,
    },
  },
  // {
  //   name: "Doc",
  //   path: "/doc/:id",
  //   component: DocPage,
  // },
  // {
  //   name: "Docs",
  //   path: "/docs",
  //   component: MyDocs,
  // },

  {
    name: "Course",
    path: "/Course",
    component: CoursePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Determine if maintenance mode is enabled by default
  const maintenanceMode = false; // Set this to true to enable maintenance mode (bypass: ?bypass=secret)

  // Check if the application is running on localhost or local network IP
  const hostname = window.location.hostname;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "192.168.2.204";

  // Check for bypass query parameter or stored bypass
  const bypassParam = to.query.bypass === "secret";
  const bypassStored = localStorage.getItem("maintenanceBypass") === "true";

  // Store bypass in localStorage if query param is present
  if (bypassParam && !bypassStored) {
    localStorage.setItem("maintenanceBypass", "true");
  }

  const canBypass = isLocalhost || bypassParam || bypassStored;

  if (canBypass) {
    // Allow access
    next();
  } else if (maintenanceMode && to.name !== "MaintenancePage") {
    // If maintenance mode is enabled and not on the maintenance page, redirect to maintenance page
    next({ name: "MaintenancePage" });
  } else {
    // Allow navigation
    next(); // This line allows the navigation to proceed
  }
});

export default router;
