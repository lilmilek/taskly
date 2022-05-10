<template>
  <div class="modal" :class="{'modal-open': isShow}">
    <div class="modal-box">
      <h1 class="font-bold text-2xl">Utwórz kolekcje</h1>
      <div class="form-control w-full mt-2">
        <label class="label">
          <span class="label-text">Nazwa kolekcji</span>
        </label>
        <input type="text" placeholder="Moja kolekcja" class="input input-bordered w-full">
      </div>
      <div class="mt-2">
        <label class="label">
          <span class="label-text">Kolor</span>
        </label>
        <div class="flex flex-wrap gap-2">
          <div v-for="(color, index) in $store.state.colors" :key="index" class="w-10 h-10 rounded-lg cursor-pointer flex items-center justify-center" :style="{'background-color': color}" @click="selectedColor = index">
            <transition name="notification">
              <i v-if="selectedColor === index" class="fa-solid fa-check" />
            </transition>
          </div>
        </div>
      </div>
      <div class="modal-action mt-10">
        <div class="btn btn-primary">Utwórz</div>
        <div class="btn btn-outline btn-success" @click="$emit('close')">Anuluj</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateCollectionsModal',
  props: {
    isShow: Boolean
  },
  data () {
    return {
      selectedColor: 0
    }
  }
}
</script>

<style scoped>

</style>
