export default {
  state: {
    spinner: false,
    importance: -1,
    msgType: -1
  },
  mutations: {
    REVERT_STATE (state) {
      // state.spinner = false
      state.importance = -1
      state.msgType = -1
    },
    TOGGLE_SPINNER (state) {
      state.spinner = !state.spinner
    },
    SET_RADIOS_PARAM (state, paramObj) {
      state[paramObj.name] = paramObj.param
    }
  },
  actions: {
    REVERT_STATE ({ commit }) {
      commit('REVERT_STATE')
    },
    TOGGLE_SPINNER ({ commit }) {
      commit('TOGGLE_SPINNER')
    },
    SET_RADIOS_PARAM ({ commit }, paramObj) {
      commit('SET_RADIOS_PARAM', paramObj)
    }
  },
  getters: {
    getSpinner: state => {
      return state.spinner
    },
    getImportance: state => {
      return state.importance
    },
    getMsgType: state => state.msgType
  }
}
