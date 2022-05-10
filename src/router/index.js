import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import CollectionsView from '@/views/CollectionsView'
import CollectionView from '@/views/CollectionView'
import AccountView from '@/views/AccountView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Strona główna'
    }
  },
  {
    path: '/logowanie',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Logowanie'
    }
  },
  {
    path: '/rejestracja',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Rejestracja'
    }
  },
  {
    path: '/kolekcje',
    name: 'collections',
    component: CollectionsView,
    meta: {
      title: 'Kolekcje'
    }
  },
  {
    path: '/kolekcje/:id',
    name: 'collection',
    component: CollectionView,
    meta: {
      title: 'Kolekcja'
    }
  },
  {
    path: '/konto',
    name: 'account',
    component: AccountView,
    meta: {
      title: 'Konto'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Taskly`
  next()
})

export default router
