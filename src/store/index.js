import { createStore } from 'vuex'

export default createStore({
  state: {
    notification: null
  },
  getters: {
  },
  mutations: {
    addNotification (state, { nState, text }) {
      state.notification = null
      setTimeout(() => {
        state.notification =
          {
            state: nState,
            text: text
          }
      }, 300)
      setTimeout(() => {
        state.notification = null
      }, 4000)
    },
    clearNotification (state) {
      state.notification = null
    }
  },
  actions: {
  },
  modules: {
  }
})
