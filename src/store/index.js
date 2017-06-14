import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import user from './modules/user'
import calendar from './modules/calendar'
import timeMachine from './modules/timeMachine'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    index,
    user,
    calendar,
    timeMachine
  }
})
