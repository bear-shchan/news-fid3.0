export default {
  state: {
    spinner: false
  },
  mutations: {
    REVERT_STATE (state) {
      state.spinner = false
    },
    TOGGLE_SPINNER (state) {
      state.spinner = !state.spinner
    }
  },
  actions: {
    REVERT_STATE ({ commit }) {
      commit('REVERT_STATE')
    },
    TOGGLE_SPINNER ({ commit }) {
      commit('TOGGLE_SPINNER')
    }
  },
  getters: {
    getSpinner: state => {
      return state.spinner
    }
  }
}
