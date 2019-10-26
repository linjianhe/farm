import Vue from 'vue'
import Vuex from 'vuex'
import interceptor from '@/network/request'
import urlList from '@/network/UrlList'

const shopUrl = urlList.shop
Vue.use(Vuex)

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  Login({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: shopUrl + '/users/login',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
