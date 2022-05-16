<template>
  <div class="max-w-screen-md px-5 mx-auto mt-20">
    <h1 class="text-4xl font-bold">Kolekcje</h1>
    <ul class="cards">
      <li class="mr-4">
        <a href="#" class="card-btn" :class="{active: isShowFavourite === true}" aria-current="page" @click="isShowFavourite = true">Ulubione</a>
      </li>
      <li class="mr-4">
        <a href="#" class="card-btn" :class="{active: isShowFavourite === false}" @click="isShowFavourite = false">Wszystkie</a>
      </li>
    </ul>
    <div class="grid xs:grid-cols-2 sm:grid-cols-3 gap-4 pt-10">
      <template v-if="!isShowFavourite">
        <CollectionCard v-for="collection in collections" :key="collection.id" :id="collection.id" :collection="collection" />
      </template>
      <template v-if="isShowFavourite">
        <CollectionCard v-for="collection in favCollections" :key="collection.id" :id="collection.id" :collection="collection" />
      </template>
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
// import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
// import { db } from '@/firebase/appInit'
export default {
  name: 'CollectionsView',
  components: { CreateCollectionsModal, CollectionCard },
  data () {
    return {
      isCreateCollectionsModal: false,
      isCollectionLoading: true,
      isShowFavourite: false
    }
  },
  computed: {
    collections () {
      return this.$store.state.collections
    },
    favCollections () {
      return this.collections.filter(collection => collection.isFavourite === true)
    }
  },
  methods: {
    toggleCreateCollectionModal () {
      this.isCreateCollectionsModal = !this.isCreateCollectionsModal
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
