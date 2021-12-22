// import { createApp } from "vue";
// import AnimatedComponent from '@/components/AnimatedComponent.vue';
// import App from "@/App.vue";

// const app = createApp(App);

// app.component("AnimatedComponent", AnimatedComponent); // global registration - can be used anywhere

// app.mount("#app");

import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Work from "@/components/Work.vue";
import Project from "@/components/Project.vue";
import MyBlog from "@/components/blog/MyBlog.vue";
import BlogPost from "@/components/BlogPost.vue";
import NotFound from "@/components/misc/NotFound.vue";
import MaintenancePage from "@/components/misc/MaintenancePage.vue";
import MyResume from "@/components/resume/MyResume.vue";
import Library from "@/components/Library.vue";
import Info from "@/components/Info.vue";

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
    redirect: "/brb",
    path: "/",
    name: "Home",
    component: Work,
  },
  {
    path: "/helloworld",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/work",
    name: "Work",
    component: Work,
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
    path: "/blog",
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
    name: "library",
    component: Library,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
