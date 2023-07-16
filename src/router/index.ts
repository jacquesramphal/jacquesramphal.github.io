import TheLogin from "@/components/TheLogin.vue";

import { createRouter, createWebHistory } from "vue-router";
import InfoPage from "@/pages/InfoPage.vue";
import MyLibrary from "@/pages/MyLibrary.vue";
import MaintenancePage from "@/pages/misc/MaintenancePage.vue";
import MyBlog from "@/pages/MyBlog.vue";
import MyResume from "@/pages/MyResume.vue";
import NotFound from "@/pages/misc/NotFound.vue";
import ProjectPage from "@/pages/ProjectPage.vue";
import DocPage from "@/pages/DocPage.vue";
import MarkdownPage from "@/pages/MarkdownPage.vue";
import HomePage from "@/pages/HomePage.vue";
import MoreWork from "@/pages/MoreWork.vue";
import UsefulLinks from "@/pages/UsefulLinks.vue";

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
    path: "/login",
    name: "Login",
    component: TheLogin,
  },
  {
    redirect: { name: 'MaintenancePage' },
    path: "/",
    name: "Home",
    component: HomePage,
    children: [],
    meta: {
      hideNav: false,
    },
  },
  {
    path: "/work2",
    name: "MoreWork",
    component: MoreWork,
  },
  {
    path: "/links",
    name: "Links",
    component: UsefulLinks,
  },
  {
    path: "/cv",
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
    path: "/docs",
    name: "Blog",
    component: MyBlog,
  },
  {
    path: "/library2",
    name: "Library",
    component: MyLibrary,
  },
  {
    name: "Project",
    path: "/work/:id",
    component: ProjectPage,
  },
  {
    name: "Doc",
    path: "/doc/:id",
    component: DocPage,
  },
  {
    name: "Mdoc",
    path: "/mdoc/:id",
    component: MarkdownPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
