import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import CollectionsView from '@/views/CollectionsView'
import CollectionView from '@/views/CollectionView'
import AccountView from '@/views/AccountView'
import { auth } from '@/firebase/appInit'
import PageNotFound from '@/views/PageNotFound'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CollectionsView,
    meta: {
      title: 'Strona główna',
      requiresAuth: true
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
      title: 'Kolekcje',
      requiresAuth: true
    }
  },
  {
    path: '/kolekcje/:id',
    name: 'collection',
    component: CollectionView,
    meta: {
      title: 'Kolekcja',
      requiresAuth: true
    }
  },
  {
    path: '/konto',
    name: 'account',
    component: AccountView,
    meta: {
      title: 'Konto',
      requiresAuth: true
    }
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: PageNotFound,
    meta: {
      title: 'Nie znaleziono strony',
      requiresAuth: false
    }
  },
  // {
  //   path: '/znajomi',
  //   name: 'friends',
  //   component: FriendsView,
  //   meta: {
  //     title: 'Znajomi',
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
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

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next()
    }
    return next({ name: 'login' })
  }
  return next()
})

export default router
