import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home/index.js'
import user from './modules/user/index.js'
import brandsDetail from './modules/brandsDetail/index.js'
import goods from './modules/goods/index.js'
import order from './modules/order/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    home,
    brandsDetail,
    user,
    goods,
    order
  }
})
