<template>
  <div class="max-w-screen-md px-5 mx-auto mt-20">
    <h1 class="text-4xl font-bold">Kolekcje</h1>
    <ul class="cards">
      <li class="mr-4">
        <a href="#" class="card-btn" :class="{active: selectedTab === 1}" aria-current="page" @click="selectedTab = 1">Ulubione</a>
      </li>
      <li class="mr-4">
        <a href="#" class="card-btn" :class="{active: selectedTab === 2}" @click="selectedTab = 2">Wszystkie</a>
      </li>
    </ul>
    <div class="grid grid-cols-3 gap-4 pt-10">
      <CollectionCard v-for="collection in collections" :key="collection.id" :id="collection.id" :collection="collection" />
      <div v-if="!collections.length" class="flex flex-col text-center p-6 col-span-3 items-center justify-center border-2 border-base-200 rounded-2xl cursor-pointer hover:bg-base-200 transition-all duration-200" @click="toggleCreateCollectionModal">
        <i class="fa-solid fa-plus text-3xl text-base-content/20" />
        <h1 class="text-lg font-semibold mt-3">Nie masz jeszcze żadnych kolekcji</h1>
        <p class="text-base-content/60 mt-1">Utwórz jedną</p>
      </div>
      <div v-if="collections.length" class="flex items-center justify-center h-20 border-2 border-base-200 rounded-2xl cursor-pointer hover:bg-base-200 transition-all duration-200" @click="toggleCreateCollectionModal">
        <i class="fa-solid fa-plus" />
      </div>
    </div>
  </div>
  <CreateCollectionsModal :is-show="isCreateCollectionsModal" @close="toggleCreateCollectionModal" />
</template>

<script>
import CollectionCard from '@/components/CollectionCard'
import CreateCollectionsModal from '@/components/CreateCollectionsModal'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '@/firebase/appInit'
export default {
  name: 'CollectionsView',
  components: { CreateCollectionsModal, CollectionCard },
  data () {
    return {
      selectedTab: 2,
      isCreateCollectionsModal: false,
      collections: [],
      isCollectionLoading: true
    }
  },
  created () {
    this.getCollections()
  },
  methods: {
    toggleCreateCollectionModal () {
      this.isCreateCollectionsModal = !this.isCreateCollectionsModal
    },
    getCollections () {
      console.log('pobieram')
      const q = query(collection(db, 'collections'), where('owner', '==', this.$store.state.userUid), orderBy('createdAt', 'desc'))
      onSnapshot(q, (querySnapshot) => {
        const collections = []
        querySnapshot.forEach(async (doc) => {
          // const querySnapshot = await getDocs(collection(db, 'collections', doc.id, 'todo'))
          collections.push({
            id: doc.id,
            title: doc.data().title,
            emoji: doc.data().emoji
            // size: querySnapshot.size
          })
        })
        this.collections = collections
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cards {
  @apply flex flex-wrap text-sm font-medium text-center text-zinc-400 mt-6;
  .card-btn {
    @apply inline-block py-3 px-4 rounded-lg hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-all dark:border-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-200;}
  .card-btn.active {
    @apply text-white bg-zinc-800 border-zinc-800
  }
}
</style>
