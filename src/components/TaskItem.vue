<template>
  <div class="p-3 flex items-center bg-base-200 rounded-xl">
    <input type="checkbox" :checked="isDone" class="checkbox checkbox-primary" @click.prevent="toggleTodoState(id)">
    <p class="ml-2">{{ title }}</p>
    <div class="dropdown dropdown-end ml-auto">
      <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
        <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
        <li>
          <a>
            <i class="fa-regular fa-pen-to-square" />
            Edytuj
          </a>
        </li>
        <li @click.prevent="removeTodo(id)">
          <a class="text-error active:bg-error active:text-error-content">
            <i class="fa-regular fa-trash-can" />
            Usuń
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/appInit'
export default {
  name: 'TaskItem',
  props: {
    title: String,
    id: String,
    collectionId: String,
    isDone: Boolean
  },
  methods: {
    async removeTodo (id) {
      await deleteDoc(doc(db, 'collections', this.collectionId, 'todo', this.id))
    },
    async toggleTodoState (id) {
      const docRef = doc(db, 'collections', this.collectionId, 'todo', this.id)
      await updateDoc(docRef, {
        isDone: !this.isDone
      })
    }
  }
}
</script>

<style scoped>

</style>
