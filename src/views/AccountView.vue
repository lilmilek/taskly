<template>
  <div class="max-w-md px-5 mx-auto mt-10">
    <h1 class="text-3xl font-bold">Edytuj profil</h1>
    <div class="flex items-center mt-8">
      <label for="fileInput" class="avatar placeholder cursor-pointer" :class="{'placeholder': imgUrl}">
        <div v-if="!imgUrl" class="bg-base-300 dark:bg-base-200 text-opacity-40 rounded-full w-24">
          <i class="fa-regular fa-user text-3xl opacity-50" />
        </div>
        <div v-if="imgUrl" class="w-24 rounded-full">
          <img :src="imgUrl">
        </div>
        <div class="absolute bg-primary p-3 rounded-full bottom-0 right-0">
          <i class="fa-solid fa-pen text-white text-[10px]" />
        </div>
      </label>
      <h1 class="text-2xl ml-6 font-semibold">{{ $store.state.userName }}</h1>
    </div>
    <input id="fileInput" ref="imageInput" type="file" accept="image/*" class="hidden" @change="imageChange">
    <div class="flex flex-col space-y-3 mt-8">
      <input v-model="userName" type="text" class="input" placeholder="Imię i nazwisko">
      <input v-model="$store.state.userEmail" type="email" class="input" placeholder="Email" disabled>
      <input type="password" class="input" placeholder="Hasło" value="asdasda" disabled>
      <div class="space-x-2 flex justify-center">
        <button class="btn btn-primary">Zapisz zmiany</button>
        <button class="btn btn-error">Usuń konto</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountView',
  data () {
    return {
      imgUrl: ''
    }
  },
  computed: {
    userName: {
      get () {
        return this.$store.state.userName
      },
      set (payload) {
        this.$store.commit('setUserName', payload)
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
