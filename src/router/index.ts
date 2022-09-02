// import { createApp } from "vue";
// import AnimatedComponent from '@/components/AnimatedComponent.vue';
// import App from "@/App.vue";
// const app = createApp(App);
// app.component("AnimatedComponent", AnimatedComponent); // global registration - can be used anywhere
// app.mount("#app");

// import TheLogin from "@/components/TheLogin.vue";

import { createRouter, createWebHistory } from "vue-router";
import BlogPost from "@/components/blog/BlogPost.vue";
import InfoPage from "@/pages/InfoPage.vue";
import MyLibrary from "@/pages/MyLibrary.vue";
import MaintenancePage from "@/pages/misc/MaintenancePage.vue";
import MyBlog from "@/pages/MyBlog.vue";
import MyResume from "@/pages/MyResume.vue";
import NotFound from "@/pages/misc/NotFound.vue";
import ProjectPage from "@/pages/ProjectPage.vue";
import HomePage from "@/pages/HomePage.vue";
import MoreWork from "@/pages/MoreWork.vue";
import UsefulLinks from "@/pages/UsefulLinks.vue";
import CoursesHome from '@/pages/library/CoursesHome.vue'
import CoursePage from '@/pages/library/CoursePage.vue'
import LessonPage from '@/pages/library/LessonPage.vue'


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
    path: "/library",
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
  { name: 'coursehome', path: '/courses', component: CoursesHome },
  { name: 'coursepage', path: '/courses/:courseId', component: CoursePage },
  { name: 'lessonpage', path: '/courses/:courseId/lessons/:lessonId', component: LessonPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;



