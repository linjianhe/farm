import Vue from 'vue'
import Vuex from 'vuex'
import interceptor from '@/network/request'

Vue.use(Vuex)

const state = {
  token: null,
  username: null
}

const getters = {
  token: state => state.token,
  username: state => state.username
}

const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_USERNAME(state, data) {
    state.username = data
  },
  LOGOUT(state) {
    state.token = null
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
  Login1({ commit }, data) {
    return new Promise((resolve, reject) => {
      resolve('sss')
    })
  },
  Login({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'login/confirm',
        method: 'post',
        data: data
      }).then(res => {
        commit('SET_TOKEN', res.data.token);
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.user));
        let id = res.data.user.userId
        // cookie.set('token' + id, res.data.token);
        this.dispatch('webSocket/InitWebSocket', id)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  CheckName({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'login/checkName',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  CheckEmail({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'login/registerCheckEmail',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  CheckPhone({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'login/registerCheckPhone',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  CheckName1({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'login/registerCheckName',
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
        url: 'login/register',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  GetCheckCode({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        method: 'post',
        url: 'mail/getCheckCode',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  CheckMessage({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'mail/checkMessage',
        method: 'post',
        data: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  SetPass({ commit }, data) {
    return new Promise((resolve, reject) => {
      interceptor({
        url: 'mail/setPass',
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
