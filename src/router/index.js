import Vue from 'vue'
import Router from 'vue-router'
import WorkPlay from '@/components/WorkPlay.vue'
import Hero from '@/components/Hero.vue'
import Info from '@/components/Info.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
                name: "Hero",
                component: Hero
        },
        {
            path: "/work",
                name: "Work",
                component: WorkPlay
        },
        {
            path: "/info",
                name: "Info",
                component: Info
        },
        
    ]
})