import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueProgressiveImage from 'vue-progressive-image'
import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/appInit'

let app

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App).use(VueProgressiveImage).use(store).use(router).mount('#app')
  }
})
