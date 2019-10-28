import Vue from 'vue'
import Vuex from 'vuex'
import interceptor from '@/network/request'
import urlList from '@/network/UrlList'

const shopUrl = urlList.shop
Vue.use(Vuex)

const state = {
  userInfo: ''
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
  },
  Register({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: shopUrl + '/users/register',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  SendEmail({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: shopUrl + '/users/sendEmail',
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
