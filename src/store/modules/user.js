import Vue from 'vue'

export default {
  state: JSON.parse(window.localStorage.getItem('user')) || {},
  mutations: {
    USER_SIGNIN (state, user) {
      window.localStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
    },
    USER_SIGNOUT (state) {
      window.localStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
      Object.assign(state)
    }
  },
  actions: {
    USER_SIGNIN ({ commit }, user) {
      commit('USER_SIGNIN', user)
    },
    USER_SIGNOUT ({ commit }) {
      commit('USER_SIGNOUT')
    }
  },
  getters: {
    userInfo: state => {
      return state
    },
    userDone: state => {
      return state.done
    }
  }
}
