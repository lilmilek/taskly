<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
          <li class="menu-title pt-2">
            <span>Podstrony</span>
          </li>
          <li><router-link :to="{name: 'home'}">Strona główna</router-link></li>
          <li><router-link :to="{name: 'collections'}">Kolekcje</router-link></li>
          <li class="menu-title pt-2">
            <span>Kolekcje</span>
          </li>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <router-link :to="{name: 'home'}" class="btn btn-ghost normal-case text-xl font-extrabold">Taskly.</router-link>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=33791" alt="">
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
          <li>
            <router-link :to="{name: 'account'}">
              <i class="fa-solid fa-user" />
              Profil
            </router-link>
          </li>
          <li class="disabled">
            <a class="">
              <i class="fa-solid fa-user-group"></i>
              Znajomi
              <span class="badge ml-auto">Wkrótce</span>
            </a>
          </li>
          <li><a><i class="fa-solid fa-gear" />Ustawienia</a></li>
          <li><a><i class="fa-solid fa-arrow-right-from-bracket" />Wyloguj się</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>

<style scoped>

</style>
