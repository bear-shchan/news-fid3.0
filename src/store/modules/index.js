export default {
  state: {
    spinner: false,
    importance: -1,
    msgType: -1,
    title: ''
  },
  mutations: {
    REVERT_STATE (state) {
      state.importance = -1
      state.msgType = -1
    },
    SET_SPINNER (state, blooen) {
      state.spinner = blooen
    },
    SET_RADIOS_PARAM (state, paramObj) {
      state[paramObj.name] = paramObj.param
    },
    SET_TITLE (state, title) {
      state.title = title
    }
  },
  actions: {
    REVERT_STATE ({ commit }) {
      commit('REVERT_STATE')
    },
    SET_SPINNER ({ commit }, param) {
      commit('SET_SPINNER', param)
    },
    SET_RADIOS_PARAM ({ commit }, paramObj) {
      commit('SET_RADIOS_PARAM', paramObj)
    },
    SET_TITLE ({ commit }, title) {
      commit('SET_TITLE', title)
    }
  },
  getters: {
    getSpinner: state => {
      return state.spinner
    },
    getImportance: state => {
      return state.importance
    },
    getMsgType: state => state.msgType,
    getTitle: state => state.title
  }
}
