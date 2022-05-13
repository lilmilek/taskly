import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDZLnw5dYAhPEWy9E-EVTnJNmU3O4NYbWo',
  authDomain: 'taskly-ab50a.firebaseapp.com',
  projectId: 'taskly-ab50a',
  storageBucket: 'taskly-ab50a.appspot.com',
  messagingSenderId: '712375965504',
  appId: '1:712375965504:web:c5ff61db4a06c0378c0ca5'
}

const appInit = initializeApp(firebaseConfig)
const auth = getAuth(appInit)
const db = getFirestore(appInit)
const storage = getStorage(appInit)

export { auth, db, storage }
