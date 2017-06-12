import Vue from 'vue'
import _localStorage from '@/assets/js/localStorage.js'
import request from '@/api/request.js'

export default {
  state: _localStorage.isExpired('user') ? {} : _localStorage.get('user'),
  mutations: {
    USER_SIGNIN (state, user) {
      // 如果有过期时间，设置过期时间
      // _localStorage.maxAge(0).set('user', user)
      _localStorage.set('user', user)
      Object.assign(state, user)
    },
    USER_SIGNOUT (state) {
      _localStorage.remove('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
      Object.assign(state)
    }
  },
  actions: {
    USER_SIGNIN ({ commit }, form) {
      return new Promise((resolve, reject) => {
        request.get('/fidnews/v1/mobileWeb/login', {
          params: {
            userName: form.username,
            password: form.password
          }
        })
        .then((data) => {
          if (data.code !== '-1') {
            let user = {
              menus: data.menus,
              userName: form.username,
              password: form.password
            }
            commit('USER_SIGNIN', user)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    USER_SIGNOUT ({ commit }) {
      commit('USER_SIGNOUT')
    }
  },
  getters: {
    userInfo: state => {
      return state
    }
    // userDone: state => {
    //   return state.done
    // }
  }
}
