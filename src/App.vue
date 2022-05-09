<template>
  <router-view/>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.myInput {
  @apply border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 focus:ring-emerald-300 hover:border-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all;
}
.notification-enter-active,
.notification-leave-active {
  @apply transition-all duration-200;
}

.notification-enter-from,
.notification-leave-to {
  @apply opacity-0 scale-0
}
</style>
