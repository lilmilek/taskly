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
          <li class="menu-title pt-2" v-if="collections.length">
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
            <a class="">
              <i class="fa-solid fa-user-group" />
              Znajomi
              <span class="badge ml-auto">Wkrótce</span>
            </a>
          </li>
          <li><a><i class="fa-solid fa-gear" />Ustawienia</a></li>
          <li @click="signOut"><a><i class="fa-solid fa-arrow-right-from-bracket" />Wyloguj się</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/appInit'
export default {
  name: 'TheNavbar',
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
