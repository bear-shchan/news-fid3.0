export default {
  state: {
    spinner: false,
    importance: -1
  },
  mutations: {
    REVERT_STATE (state) {
      state.spinner = false
    },
    TOGGLE_SPINNER (state) {
      state.spinner = !state.spinner
    },
    SET_IMPORTANCE (state, importance) {
      state.importance = importance
    }
  },
  actions: {
    REVERT_STATE ({ commit }) {
      commit('REVERT_STATE')
    },
    TOGGLE_SPINNER ({ commit }) {
      commit('TOGGLE_SPINNER')
    },
    SET_IMPORTANCE ({ commit }, importance) {
      commit('SET_IMPORTANCE', importance)
    }
  },
  getters: {
    getSpinner: state => {
      return state.spinner
    },
    getImportance: state => {
      return state.importance
    }
  }
}
