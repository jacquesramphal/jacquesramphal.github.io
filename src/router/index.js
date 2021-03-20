import Vue from "vue";
import Router from "vue-router";
import Work from "@/components/Work.vue";
import Hero from "@/components/Hero.vue";
import Project from "@/components/Project.vue";
import Info from "@/components/Info.vue";

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: "/",
      name: "",
      component: Hero,
    },
    {
      path: "/work",
      name: "Work",
      component: Work,
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
  ],
  scrollBehavior () {
    return {
       x: 0, y: 0 
      //  selector: to.hash,
      //  behavior: 'smooth'
      }
  }  
});
