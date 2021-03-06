import Vue from "vue";
import Router from "vue-router";
import Work from "@/components/Work.vue";
import Project from "@/components/Project.vue";
import Info from "@/components/Info.vue";
import Library from "@/components/Library.vue";
import Hero from "@/components/Hero.vue";
import FormCentered from "@/components/card/FormCentered.vue";

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: "/",
      name: "",
      component: Hero,
    },
    {
      path: "/info",
      name: "Info",
      component: Info,
    },
    {
      path: "/work",
      name: "Work",
      component: Work,
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
  ],
  scrollBehavior () {
    return {
       x: 0, y: 0 
      //  selector: to.hash,
      //  behavior: 'smooth'
      }
  }  
});
