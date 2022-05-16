<template>
  <div class="max-w-screen-md px-5 mx-auto mt-20">
    <h1 class="text-4xl font-bold">Znajomi</h1>
    <div class="form-control mt-5">
      <div class="input-group">
        <input v-model="searchModel" type="text" placeholder="Szukaj…" class="input input-bordered w-full">
        <button class="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </div>
    <div class="mt-10 space-y-4">
      <div v-for="user in searchedUsers" :key="user.id" class="flex items-center">
        <img :src="user.photoUrl" class="aspect-square w-14 object-cover rounded-full">
        <div class="ml-4">
          <h3 class="font-bold">{{ user.name }}</h3>
          <p class="text-base-content/60 text-sm">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/appInit'
export default {
  name: 'FriendsView',
  data () {
    return {
      searchModel: '',
      users: []
    }
  },
  computed: {
    searchedUsers () {
      return this.users.filter(user => {
        return (
          user.email.toLowerCase().includes(this.searchModel.toLowerCase()) || user.name.toLowerCase().includes(this.searchModel.toLowerCase())
        )
      })
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const q = query(collection(db, 'users'))
      const querySnapshot = await getDocs(q)
      const users = []
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().displayName,
          photoUrl: doc.data().photoUrl
        })
        this.users = users
      })
    }
  }
}
</script>

<style scoped>

</style>
