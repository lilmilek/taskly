<template>
  <div class="max-w-md px-5 mx-auto mt-10">
    <h1 class="text-3xl font-bold">Edytuj profil</h1>
    <div class="flex items-center mt-8">
      <label for="fileInput" class="avatar cursor-pointer" :class="{'placeholder': imgUrl}">
        <div v-if="imgUrl" class="w-24 rounded-full">
          <img :src="imgUrl" alt="">
        </div>
        <div class="absolute bg-primary p-3 rounded-full bottom-0 right-0">
          <i class="fa-solid fa-pen text-white text-[10px]" />
        </div>
      </label>
      <h1 class="text-2xl ml-6 font-semibold">{{ $store.state.userName }}</h1>
    </div>
    <input id="fileInput" ref="imageInput" type="file" accept="image/*" class="hidden" @change="updateImage">
    <div class="flex flex-col space-y-4 mt-8">
      <div>
        <label class="block mb-2 text-[12px] text-base-content/60">Imię i Nazwisko</label>
        <input v-model="userName" type="text" class="input w-full" placeholder="Imię i nazwisko">
      </div>
      <div>
        <label class="block mb-2 text-[12px] text-base-content/60">Adres email</label>
        <input v-model="email" type="email" class="input w-full" placeholder="Email">
      </div>
      <input type="password" class="input" placeholder="Hasło" value="asdasdasdf" disabled>
      <div v-if="!$store.state.userEmailVerified" class="alert alert-warning shadow-lg mt-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Zweryfikuj swój adres email.</span>
        </div>
      </div>
      <div class="space-x-2 flex justify-center">
        <button class="btn btn-primary" @click="toggleReauthenticateModal">Zapisz zmiany</button>
        <!--        <button class="btn btn-error">Usuń konto</button>-->
      </div>
    </div>
  </div>
  <div class="modal" :class="{'modal-open': isReauthenticateModal}">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Wprowadź ponownie swoje hasło!</h3>
      <input v-model="reauthenticateModel" type="password" placeholder="Hasło..." class="input w-full mt-4">
      <div class="modal-action">
        <div class="btn btn-primary" @click="updateProfile">Dalej</div>
        <div class="btn btn-outline btn-success" @click="toggleReauthenticateModal">Anuluj</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendEmailVerification } from 'firebase/auth'
import { auth, db, storage } from '@/firebase/appInit'

export default {
  name: 'AccountView',
  data () {
    return {
      // imgUrl: ''
      dbImageUrl: null,
      isReauthenticateModal: false,
      reauthenticateModel: ''
    }
  },
  computed: {
    imgUrl () {
      return this.$store.state.userPhotoUrl
    },
    userName: {
      get () {
        return this.$store.state.userName
      },
      set (payload) {
        this.$store.commit('setUserName', payload)
      }
    },
    email: {
      get () {
        return this.$store.state.userEmail
      },
      set (payload) {
        this.$store.commit('setUserEmail', payload)
      }
    }
  },
  methods: {
    async updateImage () {
      if (this.$refs.imageInput.files[0].size < 5000000) {
        const profileImagesRef = ref(storage, `profileImages/${auth.currentUser.uid}.jpg`)
        await uploadBytes(profileImagesRef, this.$refs.imageInput.files[0])
        this.dbImageUrl = await getDownloadURL(ref(storage, profileImagesRef))
        await updateDoc(doc(db, 'users', this.$store.state.userUid), {
          photoUrl: this.dbImageUrl
        })
        await updateProfile(auth.currentUser, {
          photoURL: this.dbImageUrl
        })
        this.$store.commit('setUserPhotoUrl', this.dbImageUrl)
        this.$store.commit('addNotification', { nState: 'success', text: 'Zdjęcie zostało zaktualizowane' })
      } else {
        this.$store.commit('addNotification', { nState: 'danger', text: 'Zdjęcie nie może być większe niz 5 mb.' })
      }
    },
    toggleReauthenticateModal () {
      this.isReauthenticateModal = !this.isReauthenticateModal
    },
    async updateProfile () {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        this.reauthenticateModel
      )
      let error = false
      await reauthenticateWithCredential(
        auth.currentUser,
        credential
      ).catch((errorMsg) => {
        error = true
        if (errorMsg.code === 'auth/weak-password') {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Hasło musi zawierać co najmniej 6 znaków' })
        }
        if (errorMsg.code === 'auth/invalid-email') {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Wprowadź poprawny adres Email' })
        }
        if (errorMsg.code === 'auth/user-not-found') {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Nie znaleziono użytkownika' })
        }
        if (errorMsg.code === 'auth/wrong-password') {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Błędne hasło' })
        }
        if (errorMsg.code === 'auth/too-many-requests') {
          this.$store.commit('addNotification', { nState: 'danger', text: 'Spróbuj ponownie później' })
        }
      })
      if (!error) {
        await updateEmail(auth.currentUser, this.$store.state.userEmail).then(() => {
          console.log()
        }).catch((errorMsg) => {
          error = true
          if (errorMsg.code === 'auth/email-already-in-use') {
            this.$store.commit('addNotification', { nState: 'danger', text: 'Email jest już zajęty' })
          }
        })
      }
      if (!error) {
        await updateDoc(doc(db, 'users', this.$store.state.userUid), {
          displayName: this.$store.state.userName,
          email: this.$store.state.userEmail
        })
        await updateProfile(auth.currentUser, {
          displayName: this.$store.state.userName
        })
        await sendEmailVerification(auth.currentUser).catch((error) => { console.log(error) })
        this.isReauthenticateModal = false
        this.reauthenticateModel = ''
        this.$store.commit('addNotification', { nState: 'success', text: 'Zaktualizowano profil' })
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
