import Vue from 'vue'
import Vuex from 'vuex'
import interceptor from '@/network/request'

Vue.use(Vuex)

const state = {
  username: null
}

const getters = {
  username: state => state.username
}

const mutations = {
  SET_USERNAME(state, data) {
    state.username = data
  },
  LOGOUT(state) {
    state.username = null
    // cookie.delete('token' + JSON.parse(sessionStorage.getItem('userInfo')).userId);
    sessionStorage.clear()
    // console.log('退出')
  }
}

const actions = {
  // 登出
  LogOut({ commit }) {
    commit('LOGOUT')
  },
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
