import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Project from './Project.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "App"
            }
        },
        {
            path: '/App',
            name: 'App',
            component: App
        },
        {
            path: '/Project',
            name: 'Project',
            component: Project
        }
    ]
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  created () {
    AOS.init()
  },
}).$mount('#app')
