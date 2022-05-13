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
          <button class="btn btn-primary w-full" :class="{loading: isLoading}" @click.prevent="login">
            <span v-if="!isLoading">Zaloguj się</span>
          </button>
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
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/appInit'
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
        this.isLoading = true
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push({ name: 'home' })
          })
          .catch((error) => {
            this.isLoading = false
            console.log(error)
            if (error.code === 'auth/weak-password') {
              this.$store.commit('addNotification', { nState: 'danger', text: 'Hasło musi zawierać co najmniej 6 znaków' })
            }
            if (error.code === 'auth/invalid-email') {
              this.$store.commit('addNotification', { nState: 'danger', text: 'Wprowadź poprawny adres Email' })
            }
            if (error.code === 'auth/user-not-found') {
              this.$store.commit('addNotification', { nState: 'danger', text: 'Nie znaleziono użytkownika' })
            }
            if (error.code === 'auth/wrong-password') {
              this.$store.commit('addNotification', { nState: 'danger', text: 'Błędne hasło' })
            }
          })
      } else {
        this.$store.commit('addNotification', { nState: 'danger', text: 'Wszystkie pola są wymagane' })
      }
    }
  }
}
</script>

<style scoped>
.input {
  @apply border border-zinc-300 focus:ring-offset-base-100 focus:ring-offset-2 focus:ring-2 focus:ring-emerald-300 hover:border-emerald-500 focus:border-emerald-500 transition-all;
}
</style>
