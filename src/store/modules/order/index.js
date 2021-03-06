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
  AddOrder({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/order/addOrder',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  GetOrder({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/order/getOrder',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  ChangeState({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/order/changeState',
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
