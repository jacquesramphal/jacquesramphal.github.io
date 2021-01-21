import Vue from 'vue'
import router from './router'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  created () {
    AOS.init()
  },
}).$mount('#app')
