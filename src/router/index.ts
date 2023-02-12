import TheLogin from "@/components/TheLogin.vue";

import { createRouter, createWebHistory } from "vue-router";
import InfoPage from "@/pages/InfoPage.vue";
import MyLibrary from "@/pages/MyLibrary.vue";
import MaintenancePage from "@/pages/misc/MaintenancePage.vue";
import MyBlog from "@/pages/MyBlog.vue";
import MyResume from "@/pages/MyResume.vue";
import NotFound from "@/pages/misc/NotFound.vue";
import ProjectPage from "@/pages/ProjectPage.vue";
import ArticlePage from "@/pages/ArticlePage.vue";
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
    path: "/",
    redirect: { name: 'MaintenancePage' },
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
    path: "/library",
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
    path: "/project/:id",
    component: ProjectPage,
  },
 
  {
    name: "Article",
    path: "/post/:id",
    component: ArticlePage,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
