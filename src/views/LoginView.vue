<template>
  <div class="flex min-h-screen">
    <div class="py-10 px-5 w-full flex items-center lg:w-1/2">
      <div class="max-w-md mx-auto space-y-8">
        <div>
          <h1 class="text-4xl font-bold">Zaloguj się do <span class="font-extrabold underline">Taskly</span></h1>
          <p class="mt-2 opacity-60">Witaj ponownie! Zaloguj się do swojego konta używając maila i hasła bądź kontynuuj z użyciem google</p>
        </div>
        <form class="space-y-4">
          <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full">
          <input v-model="password" type="password" placeholder="Hasło" class="input input-bordered w-full">
          <button class="btn btn-primary w-full" @click.prevent="login">Zaloguj się</button>
        </form>
        <p class="text-zinc-500 text-sm text-center">Nie masz konta? <router-link :to="{name: 'register'}" class="text-primary hover:text-primary-focus transition font-medium">Zarejestruj się</router-link></p>
      </div>
    </div>
    <OnBoarding />
  </div>
  <TheNotifications />
</template>

<script>
import OnBoarding from '@/components/OnBoarding'
import TheNotifications from '@/components/TheNotifications'
export default {
  name: 'LoginView',
  components: { TheNotifications, OnBoarding },
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
  @apply border border-zinc-300 text-zinc-900 focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 focus:ring-emerald-300 hover:border-emerald-500 focus:border-emerald-500 transition-all;
}
</style>
