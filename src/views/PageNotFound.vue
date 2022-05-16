<template>
  <div class="text-center mt-20 xs:mt-10 px-6">
    <h1 class="text-[140px] xs:text-[210px] font-extrabold text-primary">404</h1>
    <h4 class="text-2xl xs:text-3xl font-bold">Coś poszło nie tak...</h4>
    <p class="text-base-content/40">Nie udało się znaleźć podstrony.</p>
    <router-link to="/" class="btn btn-primary mt-8">Wróć na stronę główną</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>

</style>
