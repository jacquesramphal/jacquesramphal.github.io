// import { createApp } from "vue";
// import AnimatedComponent from '@/components/AnimatedComponent.vue';
// import App from "@/App.vue";
// const app = createApp(App);
// app.component("AnimatedComponent", AnimatedComponent); // global registration - can be used anywhere
// app.mount("#app");

// import TheLogin from "@/components/TheLogin.vue";

import { createRouter, createWebHistory } from "vue-router";
import BlogPost from "@/components/blog/BlogPost.vue";
import InfoPage from "@/views/InfoPage.vue";
import MyLibrary from "@/views/MyLibrary.vue";
import MaintenancePage from "@/views/misc/MaintenancePage.vue";
import MyBlog from "@/views/MyBlog.vue";
import MyResume from "@/views/MyResume.vue";
import NotFound from "@/views/misc/NotFound.vue";
import ProjectPage from "@/views/ProjectPage.vue";
import HomePage from "@/views/HomePage.vue";
import MoreWork from "@/views/MoreWork.vue";
import UsefulLinks from "@/views/UsefulLinks.vue";

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
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: TheLogin,
  // },
  {
    // redirect: "/brb",
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/work",
    name: "Work",
    component: HomePage,
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
    path: "/project",
    name: "Project",
    component: ProjectPage,
  },
  {
    path: "/docs",
    name: "Blog",
    component: MyBlog,
  },
  {
    path: "/post",
    name: "post",
    component: BlogPost,
  },
  {
    path: "/library",
    name: "Library",
    component: MyLibrary,
  },
  // {
  //   path: "/read/:title",
  //   name: "post",
  //   props: true,
  //   component: BlogPost,
  // },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;



