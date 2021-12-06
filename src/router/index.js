import { createRouter, createWebHashHistory } from "vue-router";
import Work from "@/components/Work.vue";
import Project from "@/components/Project.vue";
import Blog from "@/components/Blog.vue";
import MyBlog from "@/components/blog/MyBlog.vue";
import BlogPost from "@/components/BlogPost.vue";
import NotFound from "@/components/misc/NotFound.vue";
import MaintenancePage from "@/components/misc/MaintenancePage.vue";
import MyResume from "@/components/MyResume.vue";
import Library from "@/components/Library.vue";
// import Info from "@/components/Info.vue";

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
      hideNavbar: true,
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
    path: "/cv",
    name: "Resume",
    component: MyResume,
  },
  {
    path: "/info",
    name: "Resume",
    component: MyResume,
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
    path: "/blog2",
    name: "Blog2",
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
