import { createStore } from 'vuex'

export default createStore({
  state: {
    notification: null,
    collections: [
      {
        title: 'Kolekcja',
        color: '#6FC4BE',
        todos: [
          {
            id: 1,
            title: 'delectus aut autem',
            completed: false
          },
          {
            id: 2,
            title: 'quis ut nam facilis et officia qui',
            completed: false
          },
          {
            id: 3,
            title: 'fugiat veniam minus',
            completed: false
          },
          {
            id: 4,
            title: 'et porro tempora',
            completed: true
          },
          {
            id: 4,
            title: 'et porro tempora',
            completed: true
          },
          {
            id: 4,
            title: 'et porro tempora',
            completed: true
          }
        ]
      },
      {
        title: 'Szkoła',
        color: '#FD77A1',
        todos: [
          {
            id: 1,
            title: 'delectus aut autem',
            completed: false
          },
          {
            id: 2,
            title: 'quis ut nam facilis et officia qui',
            completed: false
          }
        ]
      }
    ],
    colors: [
      '#EB7FA1',
      '#D7BE66',
      '#D8956C',
      '#C46164',
      '#A36FDF',
      '#83C2BE',
      '#998074'
    ]
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
