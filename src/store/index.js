import Vue from 'vue'
import Vuex from 'vuex'
import interceptor from '@/network/request'

import home from './modules/home/index.js'

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
    home
  }
})
