<template>
  <div class="flex min-h-screen">
    <div class="py-10 px-5 w-full flex items-center lg:w-1/2">
      <div class="max-w-md mx-auto space-y-8">
        <div>
          <h1 class="text-4xl font-bold text-zinc-900">Zaloguj się do <span class="font-extrabold underline">Taskly</span></h1>
          <p class="text-zinc-500 mt-2">Witaj ponownie! Zaloguj się do swojego konta używając maila i hasła bądź kontynuuj z użyciem google</p>
        </div>
        <form class="space-y-4">
          <input v-model="email" type="email" class="input" placeholder="Email" required>
          <input v-model="password" type="password" class="input" placeholder="Hasło" required>
          <button class="p-2.5 h-[46px] rounded-lg bg-emerald-500 text-white w-full font-medium hover:bg-emerald-600 transition" @click.prevent="login">
            <i v-if="isLoading" class="fa-solid fa-circle-notch animate-spin" />
            <span v-if="!isLoading">Zaloguj się</span>
          </button>
        </form>
        <p class="text-zinc-500 text-sm text-center">Nie masz konta? <router-link :to="{name: 'register'}" class="text-zinc-900 font-medium">Zarejestruj się</router-link></p>
      </div>
    </div>
    <OnBoarding />
  </div>
</template>

<script>
import OnBoarding from '@/components/OnBoarding'
export default {
  name: 'LoginView',
  components: { OnBoarding },
  data () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    login () {
      if (this.email && this.password) {
        console.log('git')
      } else {
        this.$store.commit('addNotification', { nState: 'danger', text: 'Wszystkie pola są wymagane' })
      }
    }
  }
}
</script>

<style scoped>
.input {
  @apply border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 focus:ring-emerald-300 hover:border-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all;
}
</style>
