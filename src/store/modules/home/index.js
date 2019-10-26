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
  GetCars({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/api/car/',
        params: {
          type: 'brand',
          from: 0,
          pagesize: 300
        },
        method: 'get'
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  GetCarsCopy({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/api/car/',
        params: {
          type: 'brand',
          from: 0,
          pagesize: 10*data
        },
        method: 'get'
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  Login({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'login/confirm',
        method: 'post',
        data: data
      }).then(res => {
        commit('SET_TOKEN', res.data.token)
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.user))
        let id = res.data.user.userId
        // cookie.set('token' + id, res.data.token);
        this.dispatch('webSocket/InitWebSocket', id)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  GetGoods({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: shopUrl + '/goods',
        method: 'get',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  GetBanner({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: shopUrl + '/home/banner',
        method: 'get',
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
