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
  GetGoodsBanner({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/home/banner',
        method: 'get',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  AddCart({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/goods/addCart',
        method: 'get',
        params: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  BuyNow({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/goods/buyNow',
        method: 'get',
        params: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  CartInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/goods/cartInfo',
        method: 'get',
        params: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  Detail({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/goods/detail',
        method: 'get',
        params: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  UpdateCart({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/farm/goods/updateCart',
        method: 'get',
        params: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.log('网络出现问题')
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
