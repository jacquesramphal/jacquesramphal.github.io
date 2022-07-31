// import { createApp } from "vue";
// import AnimatedComponent from '@/components/AnimatedComponent.vue';
// import App from "@/App.vue";
// const app = createApp(App);
// app.component("AnimatedComponent", AnimatedComponent); // global registration - can be used anywhere
// app.mount("#app");

// import TheLogin from "@/components/TheLogin.vue";

import { createRouter, createWebHistory } from "vue-router";
import BlogPost from "@/components/blog/BlogPost.vue";
import Info from "@/views/Info.vue";
import Library from "@/views/Library.vue";
import MaintenancePage from "@/views/misc/MaintenancePage.vue";
import MyBlog from "@/views/MyBlog.vue";
import MyResume from "@/views/MyResume.vue";
import NotFound from "@/views/misc/NotFound.vue";
import Project from "@/views/Project.vue";
import Work from "@/views/Work.vue";
import Work2 from "@/views/Work2.vue";
import Links from "@/views/Links.vue";

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
    component: Work,
  },
  {
    path: "/work",
    name: "Work",
    component: Work,
  },
  {
    path: "/work2",
    name: "Work2",
    component: Work2,
  },
  {
    path: "/links",
    name: "Links",
    component: Links,
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
    component: Info,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
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
    component: Library,
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



