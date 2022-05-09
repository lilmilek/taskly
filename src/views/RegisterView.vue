<template>
  <div class="flex min-h-screen">
    <div class="py-10 px-5 w-full flex items-center lg:w-1/2">
      <div class="max-w-md w-full mx-auto space-y-8">
        <div>
          <h1 class="text-4xl font-bold text-zinc-900">Zarejestruj się w <span class="font-extrabold underline">Taskly</span></h1>
          <p class="text-zinc-500 mt-2">Zarejestruj się używając swojego adresu email oraz hasła</p>
        </div>
        <form class="space-y-4">
          <input type="text" class="input" placeholder="Imię i nazwisko" v-model="name" required>
          <input type="email" class="input" placeholder="Email" v-model="email" required>
          <input type="password" class="input" placeholder="Hasło" v-model="password" required>
          <button @click.prevent="register" class="p-2.5 h-[46px] rounded-lg bg-emerald-500 text-white w-full font-medium hover:bg-emerald-600 transition">
            <i class="fa-solid fa-circle-notch animate-spin" v-if="isLoading"></i>
            <span v-if="!isLoading">Zarejestruj się</span>
          </button>
        </form>
        <p class="text-zinc-500 text-sm text-center">Masz już konto? <router-link :to="{name: 'login'}" class="text-zinc-900 font-medium">Zaloguj się</router-link></p>
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
  name: 'RegisterView',
  components: { TheNotifications, OnBoarding },
  data () {
    return {
      email: '',
      password: '',
      name: '',
      isLoading: false
    }
  },
  methods: {
    register () {
      if (this.email && this.password && this.name) {
        if (this.name.split(' ').length >= 2) {
          console.log('git')
        } else {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Wprowadź imię oraz nazwisko' })
        }
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
