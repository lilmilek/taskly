<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </div>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
          <li class="menu-title pt-2">
            <span>Podstrony</span>
          </li>
          <li><router-link :to="{name: 'home'}">Strona główna</router-link></li>
          <li><router-link :to="{name: 'collections'}">Kolekcje</router-link></li>
          <li v-if="collections.length" class="menu-title pt-2">
            <span>Kolekcje</span>
          </li>
          <li v-for="collection in collections" :key="collection.id"><router-link :to="{name: 'collection', params: {id: collection.id}}">{{ collection.title }}</router-link></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <router-link :to="{name: 'home'}" class="btn btn-ghost normal-case text-xl font-extrabold">Taskly.</router-link>
    </div>
    <div class="navbar-end">
      <!--      <div class="relative">-->
      <!--        <button class="btn btn-ghost btn-circle mr-2">-->
      <!--          <div class="indicator">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>-->
      <!--            <span class="badge badge-xs badge-primary indicator-item" />-->
      <!--          </div>-->
      <!--        </button>-->
      <!--        <div class="absolute top-16 w-80 right-0 bg-base-200 rounded-box px-3 py-5 space-y-6">-->
      <!--          {{ requestUsers.length }}-->
      <!--          <div v-for="request in requestUsers" :key="request" class="flex text-left">-->
      <!--            <img class="aspect-square w-10 h-10 object-cover rounded-full mr-4" src="https://firebasestorage.googleapis.com/v0/b/taskly-ab50a.appspot.com/o/profileImages%2FzlLB4jHs8bORAqE2LpKA9Ns7Cxw2.jpg?alt=media&token=c02029d0-4826-4c63-96d1-3f30df283711" alt="">-->
      <!--            <div>-->
      <!--              <p class="capitalize font-normal text-sm mb-2"><span class="font-bold">Michał Papryczek</span> wysłał ci zaproszenie do grona znajomych</p>-->
      <!--              <button class="btn btn-xs btn-success mr-2">Zaakceptuj</button>-->
      <!--              <button class="btn btn-xs btn-error btn-outline">Usuń</button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="$store.state.userPhotoUrl" alt="">
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
          <li>
            <router-link :to="{name: 'account'}">
              <i class="fa-solid fa-user" />
              Profil
            </router-link>
          </li>
          <li class="disabled">
            <router-link to="" class="flex items-center">
              <i class="fa-solid fa-user-group" />
              Znajomi<span class="badge ml-auto">Wkrótce</span>
            </router-link>
          </li>
          <!--          <li class="disabled"><a><i class="fa-solid fa-gear" />Ustawienia<span class="badge ml-auto">Wkrótce</span></a></li>-->
          <li @click="signOut"><a><i class="fa-solid fa-arrow-right-from-bracket" />Wyloguj się</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/appInit'
// import { doc, getDoc } from 'firebase/firestore'
export default {
  name: 'TheNavbar',
  data () {
    return {
      requestUsers: [],
      rawRequestUsers: this.$store.state.receiveFriendsRequests
    }
  },
  computed: {
    collections () {
      return this.$store.state.collections
    }
  },
  methods: {
    signOut () {
      signOut(auth).then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style scoped>

</style>
