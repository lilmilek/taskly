<template>
  <div class="flex min-h-screen">
    <div class="py-10 px-5 w-full flex items-center text-center">
      <div class="max-w-md w-full mx-auto space-y-8">
        <div>
          <h1 class="text-4xl font-bold">Zarejestruj się w <span class="font-extrabold underline">Taskly</span></h1>
          <p class="text-zinc-500 mt-2">Zarejestruj się używając swojego adresu email oraz hasła</p>
        </div>
        <form class="space-y-4 flex flex-col">
          <label for="fileInput" class="avatar placeholder mx-auto cursor-pointer" :class="{'placeholder': imgUrl}">
            <div v-if="!imgUrl" class="bg-base-300 dark:bg-base-200 text-opacity-40 rounded-full w-24">
              <i class="fa-regular fa-user text-3xl opacity-50" />
            </div>
            <div v-if="imgUrl" class="w-24 rounded-full">
              <img :src="imgUrl" alt="">
            </div>
            <div class="absolute bg-primary p-2 rounded-full bottom-0 right-0">
              <i class="fa-solid fa-plus text-white" />
            </div>
          </label>
          <input id="fileInput" ref="imageInput" type="file" accept="image/*" class="hidden" @change="imageChange">
          <input v-model="name" type="text" placeholder="Imię" class="input input-bordered w-full">
          <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full">
          <input v-model="password" type="password" placeholder="Hasło" class="input input-bordered w-full">
          <div class="form-control">
            <label class="cursor-pointer label justify-start">
              <input v-model="terms" type="checkbox" class="checkbox checkbox-sm checkbox-primary">
              <span class="label-text ml-2">Akceptuje <span class="font-medium">Regulamin</span> oraz <span class="font-medium">Politykę Prywatności</span></span>
            </label>
          </div>
          <button class="btn btn-primary w-full" :class="{loading: isLoading}" @click.prevent="validate">
            <span v-if="!isLoading">Zarejestruj się</span>
          </button>
        </form>
        <p class="text-zinc-500 text-sm text-center">Masz już konto? <router-link :to="{name: 'login'}" class="font-medium text-primary hover:text-primary-focus transition">Zaloguj się</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db, storage } from '@/firebase/appInit'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default {
  name: 'RegisterView',
  components: {},
  data () {
    return {
      email: '',
      password: '',
      name: '',
      isLoading: false,
      image: null,
      imgUrl: '',
      terms: false,
      dbImageUrl: null
    }
  },
  computed: {
    sendDbImageUrl () {
      if (this.dbImageUrl) {
        return this.dbImageUrl
      } else {
        return 'https://firebasestorage.googleapis.com/v0/b/taskly-ab50a.appspot.com/o/profileImages%2FPortrait_Placeholder.png?alt=media&token=1dd284e3-c3ee-4057-9323-3f591fb0fdda'
      }
    }
  },
  methods: {
    validate () {
      if (this.email && this.password && this.name) {
        if (this.name.split(' ').length >= 2) {
          if (this.terms) {
            this.register()
          } else {
            this.$store.commit('addNotification', { nState: 'danger', text: 'Musisz zaakceptować nasz regulamin oraz Polityke Prywatności' })
          }
        } else {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Wprowadź imię oraz nazwisko' })
        }
      } else {
        this.$store.commit('addNotification', { nState: 'danger', text: 'Wszystkie pola są wymagane' })
      }
    },
    register () {
      this.isLoading = true
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async () => {
          if (this.image) {
            await this.updateImage()
          }
          await updateProfile(auth.currentUser, {
            displayName: this.name,
            photoURL: this.sendDbImageUrl
          })
          await setDoc(doc(db, 'users', auth.currentUser.uid), {
            email: this.email,
            displayName: this.name,
            photoUrl: this.sendDbImageUrl
          })
          this.$store.commit('setUser', auth.currentUser)
          this.isLoading = false
          await this.$router.push({ name: 'home' })
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
        })
    },
    async updateImage () {
      const profileImagesRef = ref(storage, `profileImages/${auth.currentUser.uid}.jpg`)
      await uploadBytes(profileImagesRef, this.image)
      this.dbImageUrl = await getDownloadURL(ref(storage, profileImagesRef))
    },
    imageChange () {
      this.image = this.$refs.imageInput.files[0]
      if (this.image.size < 5000000) {
        this.imgUrl = URL.createObjectURL(this.image)
      } else {
        this.$store.commit('addNotification', { nState: 'danger', text: 'Zdjęcie nie może być większe niz 5 mb.' })
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
