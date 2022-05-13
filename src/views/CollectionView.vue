<template>
  <div class="max-w-screen-md px-5 mx-auto mt-10">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-10 h-10 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition" @click="$router.go(-1)">
          <i class="fa-solid fa-chevron-left" />
        </div>
        <h1 class="text-2xl font-bold ml-3">Kolekcja</h1>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm">
          <li>
            <a>
              <i class="fa-regular fa-heart" />
              Ulubiona
            </a>
          </li>
          <li>
            <a>
              <i class="fa-regular fa-pen-to-square" />
              Edytuj
            </a>
          </li>
          <li>
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
        <input v-model="title" type="text" placeholder="Nazwa zadania..." class="input input-bordered w-full" @keyup.enter="addTodo">
        <button class="btn btn-primary btn-square" @click="addTodo">
          <i class="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <div class="mt-10">
      <p class="font-medium">Zadania <span v-if="todos">- {{ todos.length }}</span></p>
      <div class="mt-5 space-y-3">
        <TransitionGroup name="list">
          <TaskItem v-for="todo in todos" :key="todo.id" :id="todo.id" :collection-id="$route.params.id" :title="todo.data().title" />
        </TransitionGroup>
      </div>
    </div>
    <div class="mt-10">
      <p class="font-medium">Ukończone <span v-if="doneTodos">- {{ doneTodos.length }}</span></p>
      <div class="mt-5 space-y-3">
        <TransitionGroup name="list">
          <TaskItem v-for="todo in doneTodos" is-done :key="todo.id" :id="todo.id" :collection-id="$route.params.id" :title="todo.data().title" />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore'
import TaskItem from '@/components/TaskItem'
import { db } from '@/firebase/appInit'
export default {
  name: 'CollectionView',
  components: { TaskItem },
  data () {
    return {
      title: '',
      todos: null,
      doneTodos: null
    }
  },
  mounted () {
    this.getTodo()
    this.getDoneTodo()
  },
  methods: {
    async addTodo () {
      await addDoc(collection(db, 'collections', this.$route.params.id, 'todo'), {
        title: this.title,
        isDone: false
      })
      this.title = ''
      console.log('asd')
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
