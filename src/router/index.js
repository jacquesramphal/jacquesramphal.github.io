import Vue from "vue";
import Router from "vue-router";
import Work from "@/components/Work.vue";
import Project from "@/components/Project.vue";
import Blog from "@/components/Blog.vue";
import Info from "@/components/Info.vue";
import Library from "@/components/Library.vue";
import NotFound from "@/components/NotFound.vue";
import FormCentered from "@/components/card/FormCentered.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Work,
    },
    {
      path: "/info",
      name: "Info",
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
      path: "/library",
      name: "Library",
      component: Library,
    },
    {
      path: "/blog",
      name: "Blog",
      component: Blog,
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFound,
    },
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      //  selector: to.hash,
      //  behavior: 'smooth'
    };
  },
});
