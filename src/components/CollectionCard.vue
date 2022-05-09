<template>
  <router-link :to="{name: 'collection', params: {id: '1'}}" class="bg-base-200 rounded-2xl p-6 hover:bg-base-300 transition-all cursor-pointer">
    <div class="w-10 flex items-center justify-center aspect-square rounded-xl" :style="{'background-color': collection.color}">
      <i class="fa-solid fa-check text-white text-xl" />
    </div>
    <h1 class="text-xl font-medium mt-7">{{ collection.title }}</h1>
    <div class="flex justify-between items-center mt-1">
      <p class="text-sm text-zinc-500">1/5 gotowe</p>
      <CircualProgress :value="collection.todos.length + '0'" :stroke-width="4" :radius="8" :stroke-color="collection.color" />
    </div>
  </router-link>
</template>

<script>
import CircualProgress from '@/components/CircualProgress'
export default {
  name: 'CollectionCard',
  components: { CircualProgress },
  props: {
    collection: Object
  }
}
</script>

<style scoped>

</style>
