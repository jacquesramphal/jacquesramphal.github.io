import { createRouter, createWebHashHistory } from 'vue-router'
import Work from "@/components/Work.vue";
import Project from "@/components/Project.vue";
import Blog from "@/components/Blog.vue";
import BlogPost from "@/components/BlogPost.vue";
// import Info from "@/components/Info.vue";
import NotFound from "@/components/NotFound.vue";
import MyResume from "@/components/MyResume.vue";
import FormCentered from "@/components/card/FormCentered.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Work,
  },
  {
    path: "/info",
    name: "Resume",
    component: MyResume,
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

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
