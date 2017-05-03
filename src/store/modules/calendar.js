export default {
  state: {
    eventItem: {
    },
    calendarItem: {
    }
  },
  mutations: {
    SET_EVENT_ITEM (state, eventItem) {
      state.eventItem = eventItem
    },
    SET_CALENDAR_ITEM (state, calendarItem) {
      state.calendarItem = calendarItem
    }
  },
  actions: {
    SET_EVENT_ITEM ({ commit }, item) {
      commit('SET_EVENT_ITEM', item)
    },
    SET_CALENDAR_ITEM ({ commit }, item) {
      commit('SET_CALENDAR_ITEM', item)
    }
  },
  getters: {
    getEventItem: state => {
      return state.eventItem
    },
    getCalendarItem: state => {
      return state.calendarItem
    }
  }
}
