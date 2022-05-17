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
      <p class="font-bold">Inni użytkownicy</p>
      <template v-for="user in searchedUsers" :key="user.id">
        <div v-if="user.id !== $store.state.userUid" class="flex justify-between items-center">
          <div class="flex items-center">
            <img :src="user.photoUrl" class="aspect-square w-14 object-cover rounded-full">
            <div class="ml-4">
              <h3 class="font-bold">{{ user.name }}</h3>
              <p class="text-base-content/60 text-sm">{{ user.email }}</p>
            </div>
          </div>
          <div>
            <template v-if="user.receiveFriendsRequests">
              <button v-if="user.receiveFriendsRequests.includes($store.state.userUid)" class="btn btn-xs btn-outline" @click="removeFriendRequest(user.id)">Wysłano zaproszenie</button>
            </template>
            <button v-if="!user.receiveFriendsRequests || !user.receiveFriendsRequests.includes($store.state.userUid)" class="btn btn-xs btn-outline" @click="sendFriendRequest(user.id)">Zaproś</button>
          </div>
        </div>
      </template>
    </div>
    <p v-if="receiveFriendsRequests">Zaproszenia wyslane do mnie {{ receiveFriendsRequests.join(', ') }} </p>
    <p v-if="sentFriendsRequest">Zaproszenia wyslane przeze mnie {{ sentFriendsRequest.join(', ') }} </p>
  </div>
</template>

<script>
import { collection, query, getDocs, doc, updateDoc, arrayUnion, onSnapshot, arrayRemove } from 'firebase/firestore'
import { db } from '@/firebase/appInit'
export default {
  name: 'FriendsView',
  data () {
    return {
      searchModel: '',
      users: [],
      receiveFriendsRequests: [],
      sentFriendsRequest: []
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
    this.getCurrentUserRequests()
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
          photoUrl: doc.data().photoUrl,
          receiveFriendsRequests: doc.data().receiveFriendsRequests
        })
      })
      this.users = users
    },
    getCurrentUserRequests () {
      onSnapshot(doc(db, 'users', this.$store.state.userUid), (doc) => {
        this.receiveFriendsRequests = doc.data().receiveFriendsRequests
        this.sentFriendsRequest = doc.data().sentFriendsRequest
      })
    },
    async sendFriendRequest (id) {
      console.log(id)
      await updateDoc(doc(db, 'users', id), {
        receiveFriendsRequests: arrayUnion(this.$store.state.userUid)
      })
      await this.getUsers()
    },
    async removeFriendRequest (id) {
      console.log(id)
      await updateDoc(doc(db, 'users', id), {
        receiveFriendsRequests: arrayRemove(this.$store.state.userUid)
      })
      await this.getUsers()
    }
  }
}
</script>

<style scoped>

</style>
