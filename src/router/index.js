import { createRouter, createWebHashHistory } from "vue-router";
import Work from "@/components/Work.vue";
import Project from "@/components/Project.vue";
import Blog from "@/components/Blog.vue";
import BlogPost from "@/components/BlogPost.vue";
import Info from "@/components/Info.vue";
import NotFound from "@/components/NotFound.vue";
import MaintenancePage from "@/components/MaintenancePage.vue";
import MyResume from "@/components/MyResume.vue";
import FormCentered from "@/components/card/FormCentered.vue";
// import maintenance from "@/middleware/maintenance.js";

// const MaintenanceMode = {
//   template: '<div><p>maintenance mode</p></div>'
// }

const routes = [
  // {
  // path: "/:catchAll(.*)",
  // component: MaintenanceMode,
  //   meta: {
  //   requiresAuth: false
  //   },
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/brb",
    name: "MaintenancePage",
    component: MaintenancePage,
    meta: {
      hideNavbar: true,
    },
  },
  {
    // hide/show maintenence page
    redirect: "/brb",

    path: "/",
    name: "Home",
    component: Work,
  },
  {
    path: "/cv",
    name: "Resume",
    component: MyResume,
  },
  {
    path: "/about",
    name: "About",
    component: Info,
  },
  {
    path: "/contact",
    name: "Contact",
    component: FormCentered,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/post",
    name: "post",
    component: BlogPost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
