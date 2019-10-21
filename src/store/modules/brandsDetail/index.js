import Vue from 'vue'
import Vuex from 'vuex'
import interceptor from '@/network/request'

Vue.use(Vuex)

const state = {
  token: null
}

const getters = {
  token: state => state.token
}

const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  }
}

const actions = {
  GetBrandsDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: '/api/car/',
        params: {
          type: 'info',
          from: 0,
          pagesize: 3000,
          brand_id: id
        },
        method: 'get'
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
