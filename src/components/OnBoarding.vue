<template>
  <div class="w-1/2 shadow-2xl bg-gradient-to-bl from-emerald-400 to-emerald-700 hidden items-center lg:flex">
    <div class="max-w-md mx-auto">
      <div class="text-white p-6 bottom-12 text-center">
        <img class="rounded-xl aspect-video" src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?cs=srgb&dl=pexels-julia-m-cameron-4145190.jpg&fm=jpg" alt="">
        <h1 class="text-3xl font-bold mb-1 mt-8">{{ onBoardings[onBoardingIndex].title }}</h1>
        <p class="text-white/80">{{ onBoardings[onBoardingIndex].content }}</p>
        <div class="mt-12 flex justify-between items-center">
          <i class="fa-solid fa-chevron-left text-sm cursor-pointer" @click="onBoardingIndex--"></i>
          <div class="flex space-x-2 justify-center">
            <div v-for="index in onBoardings.length" :key="index" class="h-1.5 w-1.5 bg-emerald-100 rounded-full transition-all duration-300" :class="{'w-10': index - 1 === onBoardingIndex}"></div>
          </div>
          <i class="fa-solid fa-chevron-right text-sm cursor-pointer" @click="onBoardingIndex++"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnBoarding',
  data () {
    return {
      onBoardings: [
        {
          image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?cs=srgb&dl=pexels-julia-m-cameron-4145190.jpg&fm=jpg',
          title: 'Utwórz zadaniea',
          content: 'Lorem ipsum dolor sit amet adipisicing elit. Eos fugiat illo maiores nesciunt praesentium quibusdam vel voluptas.'
        },
        {
          image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?cs=srgb&dl=pexels-julia-m-cameron-4145190.jpg&fm=jpg',
          title: 'Utwórz zadanie2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos fugiat illo maiores nesciunt praesentium quibusdam vel voluptas.'
        },
        {
          image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?cs=srgb&dl=pexels-julia-m-cameron-4145190.jpg&fm=jpg',
          title: 'Utwórz zadani3',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. quibusdam vel voluptas.'
        }
      ],
      onBoardingIndex: 0
    }
  }
}
</script>

<style scoped>

</style>
