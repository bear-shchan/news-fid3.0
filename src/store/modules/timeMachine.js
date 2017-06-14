export default {
  state: {
    strategyId: '', // 13
    stockCode: '', // 002069.sz
    contentId: '', // 220715
    offset: '' // 0
  },
  mutations: {
    SET_TIMEMACHINE_PARAMS (state, paramsObj) {
      Object.assign(state, paramsObj)
    }
  },
  actions: {
    SET_TIMEMACHINE_PARAMS ({ commit }, paramsObj) {
      commit('SET_TIMEMACHINE_PARAMS', paramsObj)
    }
  },
  getters: {
    getTimeMachineParams: state => state
  }
}
