import Vue from 'vue'
import Router from 'vue-router'
import WorkPlay from '@/components/WorkPlay.vue'
import WorkPlay2 from '@/components/WorkPlay2.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
                name: "WorkPlay",
                component: WorkPlay
        },
        {
            path: "/test",
                name: "WorkPlay2",
                component: WorkPlay2
        }
    ]
})