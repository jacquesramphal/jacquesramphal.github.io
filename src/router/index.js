import Vue from 'vue'
import Router from 'vue-router'
import WorkPlay from '@/components/WorkPlay.vue'
import Info from '@/components/Info.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
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