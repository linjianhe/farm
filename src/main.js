import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueLazyLoad from 'vue-lazyload'
import vant from 'vant'

Vue.use(ElementUI)
Vue.use(vueLazyLoad)
Vue.use(vant)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
