<template>
  <div class="max-w-screen-md px-5 mx-auto mt-10">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-10 h-10 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition" @click="$router.go(-1)">
          <i class="fa-solid fa-chevron-left" />
        </div>
        <h1 class="text-2xl font-bold ml-5"><span v-if="collectionEmoji" class="mr-1" v-html="collectionEmoji" /> {{ collectionTitle }}</h1>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm">
          <li @click="makeAsFavourite">
            <a>
              <i class="fa-regular fa-heart" :class="{'fa-solid': isFavourite}" />
              Ulubiona
            </a>
          </li>
          <li>
            <a>
              <i class="fa-regular fa-pen-to-square" />
              Edytuj
            </a>
          </li>
          <li @click="isDeleteModalActive = !isDeleteModalActive">
            <a class="text-error active:bg-error active:text-error-content">
              <i class="fa-regular fa-trash-can" />
              Usuń
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-control mt-10">
      <div class="input-group">
        <input v-model="todoTitle" type="text" placeholder="Nazwa zadania..." class="input input-bordered w-full" @keyup.enter="addTodo">
        <button class="btn btn-primary btn-square" @click="addTodo">
          <i class="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <div class="mt-10">
      <p class="font-medium">Zadania <span v-if="todos">- {{ todos.length }}</span></p>
      <div class="mt-5 space-y-3">
        <TransitionGroup name="list">
          <TaskItem v-for="todo in todos" :id="todo.id" :key="todo.id" :collection-id="$route.params.id" :title="todo.data().title" />
        </TransitionGroup>
      </div>
    </div>
    <div v-if="doneTodos.length" class="mt-10">
      <p class="font-medium">Ukończone <span v-if="doneTodos">- {{ doneTodos.length }}</span></p>
      <div class="mt-5 space-y-3">
        <TransitionGroup name="list">
          <TaskItem v-for="todo in doneTodos" :id="todo.id" :key="todo.id" is-done :collection-id="$route.params.id" :title="todo.data().title" />
        </TransitionGroup>
      </div>
    </div>
  </div>
  <div class="modal" :class="{'modal-open': isDeleteModalActive}">
    <div class="modal-box flex flex-col text-center">
      <i class="fa-solid fa-triangle-exclamation text-base-content/20 dark:text-base-300/30 text-8xl" />
      <h1 class="font-bold text-2xl mt-4">Na pewno chcesz usunąć tą kolekcje?</h1>
      <p class="pt-1 text-base-300/400">Tej operacji nie można cofnąć.</p>
      <div class="modal-action">
        <div class="btn btn-error" @click="deleteCollection">Tak, usuń</div>
        <button class="btn" @click="isDeleteModalActive = !isDeleteModalActive">Anuluj</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, query, where, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import TaskItem from '@/components/TaskItem'
import { db } from '@/firebase/appInit'
export default {
  name: 'CollectionView',
  components: { TaskItem },
  data () {
    return {
      todoTitle: '',
      todos: null,
      doneTodos: [],
      collectionEmoji: '',
      collectionTitle: '',
      isDeleteModalActive: false,
      isFavourite: null,
      collectionOwner: null
    }
  },
  async mounted () {
    await this.getCollectionInfo()
    await this.checkOwner()
    this.getTodo()
    this.getDoneTodo()
  },
  methods: {
    async addTodo () {
      if (this.todoTitle) {
        await addDoc(collection(db, 'collections', this.$route.params.id, 'todo'), {
          title: this.todoTitle,
          isDone: false
        })
        this.todoTitle = ''
      } else {
        this.$store.commit('addNotification', { nState: 'warning', text: 'Musisz podać nazwę zadania' })
      }
    },
    getTodo () {
      const q = query(collection(db, 'collections', this.$route.params.id, 'todo'), where('isDone', '==', false))
      onSnapshot(q, (querySnapshot) => {
        const todos = []
        querySnapshot.forEach((doc) => {
          todos.push(doc)
        })
        this.todos = todos
      })
    },
    getDoneTodo () {
      const q = query(collection(db, 'collections', this.$route.params.id, 'todo'), where('isDone', '==', true))
      onSnapshot(q, (querySnapshot) => {
        const todos = []
        querySnapshot.forEach((doc) => {
          todos.push(doc)
        })
        this.doneTodos = todos
      })
    },
    async getCollectionInfo () {
      const docSnap = await getDoc(doc(db, 'collections', this.$route.params.id))
      if (docSnap.exists()) {
        const result = docSnap.data()
        this.collectionEmoji = result.emoji
        this.collectionTitle = result.title
        this.collectionOwner = result.owner
        this.isFavourite = result.isFavourite
      }
    },
    deleteCollection () {
      deleteDoc(doc(db, 'collections', this.$route.params.id))
      this.$router.push({ name: 'collections' })
    },
    async makeAsFavourite () {
      await updateDoc(doc(db, 'collections', this.$route.params.id), {
        isFavourite: !this.isFavourite
      })
      if (!this.isFavourite) {
        this.$store.commit('addNotification', { nState: 'success', text: 'Dodano do ulubionych' })
      } else {
        this.$store.commit('addNotification', { nState: 'warning', text: 'Usunięto z ulubionych' })
      }
      this.isFavourite = !this.isFavourite
    },
    checkOwner () {
      if (this.collectionOwner !== this.$store.state.userUid) {
        this.$router.push({ name: 'collections' })
      }
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
