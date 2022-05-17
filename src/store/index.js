import { createStore } from 'vuex'
import { collection, onSnapshot, orderBy, query, where, doc } from 'firebase/firestore'
import { db } from '@/firebase/appInit'

export default createStore({
  state: {
    notification: null,
    colors: [
      '#EB7FA1',
      '#D7BE66',
      '#D8956C',
      '#C46164',
      '#A36FDF',
      '#83C2BE',
      '#998074'
    ],
    userEmail: null,
    userUid: null,
    userEmailVerified: null,
    userPhotoUrl: null,
    userName: null,
    emojis: [
      '&#129409',
      '&#8987',
      '&#127757',
      '&#127749',
      '&#127795',
      '&#127890',
      '&#127968',
      '&#128100',
      '&#128138',
      '&#128158',
      '&#128179',
      '&#128241',
      '&#128421',
      '&#128467',
      '&#128515',
      '&#128649',
      '&#128717',
      '&#129301',
      '✌', '😂', '😝', '😁', '😱', '👉', '🙌', '🍻', '🔥', '🌈', '☀', '🎈', '🌹', '💄', '🎀', '⚽', '🎾', '🏁', '😡', '👿', '🐻', '🐶', '🐬'
    ],
    collections: [],
    receiveFriendsRequests: []
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
    },
    setUser (state, payload) {
      state.userEmail = payload.email
      state.userEmailVerified = payload.emailVerified
      state.userUid = payload.uid
      state.userPhotoUrl = payload.photoURL
      state.userName = payload.displayName
    },
    setUserName (state, payload) {
      state.userName = payload
    },
    setCollections (state, payload) {
      state.collections = payload
    },
    setUserPhotoUrl (state, payload) {
      state.userPhotoUrl = payload
    },
    setUserEmail (state, payload) {
      state.userEmail = payload
    }
  },
  actions: {
    getCollections ({ commit, state }) {
      onSnapshot(query(collection(db, 'collections'), where('owner', '==', state.userUid), orderBy('createdAt', 'desc')), (querySnapshot) => {
        const collections = []
        querySnapshot.forEach(async (doc) => {
          collections.push({
            id: doc.id,
            title: doc.data().title,
            emoji: doc.data().emoji,
            isFavourite: doc.data().isFavourite
          })
        })
        commit('setCollections', collections)
      })
    },
    getFriendsRequest ({ state }) {
      onSnapshot(doc(db, 'users', state.userUid), (doc) => {
        state.receiveFriendsRequests = doc.data().receiveFriendsRequests
      })
    }
  },
  modules: {
  }
})
