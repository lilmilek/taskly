<template>
  <div class="modal" :class="{'modal-open': isShow}">
    <div class="modal-box">
      <h1 class="font-bold text-2xl">Utwórz kolekcje</h1>
      <div class="form-control w-full mt-2">
        <label class="label">
          <span class="label-text">Nazwa kolekcji</span>
        </label>
        <input v-model="title" type="text" placeholder="Moja kolekcja" class="input input-bordered w-full">
      </div>
      <div class="mt-2">
        <label class="label">
          <span class="label-text">Ikona</span>
        </label>
        <div class="flex flex-wrap gap-2">
          <div v-for="(emoji, index) in $store.state.emojis" :key="index" class="w-10 h-10 rounded-lg cursor-pointer flex items-center justify-center" :class="{'bg-white/20': selectedEmoji === index}" @click="selectedEmoji = index">
            <p class="text-3xl" v-html="emoji" />
          </div>
        </div>
      </div>
      <div class="modal-action mt-10">
        <div class="btn btn-primary" :class="{loading: isLoading}" @click.prevent="createCollection"><span>Utwórz</span></div>
        <div class="btn btn-outline btn-success" @click="$emit('close')">Anuluj</div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/appInit'
export default {
  name: 'CreateCollectionsModal',
  props: {
    isShow: Boolean
  },
  data () {
    return {
      selectedEmoji: 0,
      title: '',
      isLoading: false
    }
  },
  methods: {
    async createCollection () {
      if (this.title) {
        this.isLoading = true
        await addDoc(collection(db, 'collections'), {
          title: this.title,
          emoji: this.$store.state.emojis[this.selectedEmoji],
          owner: this.$store.state.userUid,
          createdAt: serverTimestamp()
        })
        this.isLoading = false
        this.$emit('close')
        this.title = ''
        this.selectedEmoji = 0
      } else {
        this.$store.commit('addNotification', {
          nState: 'danger',
          text: 'Wprowadź tytuł kolekcji'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
