<template>
  <div class="max-w-screen-md px-5 mx-auto mt-20">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-10 h-10 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition" @click="$router.go(-1)">
          <i class="fa-solid fa-chevron-left" />
        </div>
        <h1 class="text-2xl font-bold ml-3">Kolekcja</h1>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm">
          <li>
            <a>
              <i class="fa-regular fa-heart" />
              Ulubiona
            </a>
          </li>
          <li>
            <a>
              <i class="fa-regular fa-pen-to-square" />
              Edytuj
            </a>
          </li>
          <li>
            <a class="text-error active:bg-error active:text-error-content">
              <i class="fa-regular fa-trash-can" />
              Usuń
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-control mt-10">
      <div class="input-group">
        <input type="text" placeholder="Nazwa zadania..." class="input input-bordered w-full">
        <button class="btn btn-primary btn-square">
          <i class="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <div class="mt-10">
      <p class="font-medium">Zadania - 11</p>
      <div class="mt-5 space-y-3">
        <div class="p-3 flex items-center bg-base-200 rounded-xl">
          <input type="checkbox" checked="checked" class="checkbox checkbox-primary">
          <p class="ml-2">Pościelić łóżko</p>
          <div class="dropdown dropdown-end ml-auto">
            <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
              <li>
                <a>
                  <i class="fa-regular fa-pen-to-square" />
                  Edytuj
                </a>
              </li>
              <li>
                <a class="text-error active:bg-error active:text-error-content">
                  <i class="fa-regular fa-trash-can" />
                  Usuń
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="p-3 flex items-center bg-base-200 rounded-xl">
          <input type="checkbox" checked="checked" class="checkbox checkbox-primary">
          <p class="ml-2">Pościelić łóżko</p>
          <div class="dropdown dropdown-end ml-auto">
            <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
              <li>
                <a>
                  <i class="fa-regular fa-pen-to-square" />
                  Edytuj
                </a>
              </li>
              <li>
                <a class="text-error active:bg-error active:text-error-content">
                  <i class="fa-regular fa-trash-can" />
                  Usuń
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="p-3 flex items-center bg-base-200 rounded-xl">
          <input type="checkbox" checked="checked" class="checkbox checkbox-primary">
          <p class="ml-2">Pościelić łóżko</p>
          <div class="dropdown dropdown-end ml-auto">
            <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
              <li>
                <a>
                  <i class="fa-regular fa-pen-to-square" />
                  Edytuj
                </a>
              </li>
              <li>
                <a class="text-error active:bg-error active:text-error-content">
                  <i class="fa-regular fa-trash-can" />
                  Usuń
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <p class="font-medium">Ukończone - 11</p>
      <div class="mt-5 space-y-3">
        <div class="p-3 flex items-center bg-base-200 rounded-xl">
          <input type="checkbox" class="checkbox checkbox-primary">
          <p class="ml-2">Pościelić łóżko</p>
          <div class="dropdown dropdown-end ml-auto">
            <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
              <li>
                <a>
                  <i class="fa-regular fa-pen-to-square" />
                  Edytuj
                </a>
              </li>
              <li>
                <a class="text-error active:bg-error active:text-error-content">
                  <i class="fa-regular fa-trash-can" />
                  Usuń
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="p-3 flex items-center bg-base-200 rounded-xl">
          <input type="checkbox" class="checkbox checkbox-primary">
          <p class="ml-2">Pościelić łóżko</p>
          <div class="dropdown dropdown-end ml-auto">
            <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
              <li>
                <a>
                  <i class="fa-regular fa-pen-to-square" />
                  Edytuj
                </a>
              </li>
              <li>
                <a class="text-error active:bg-error active:text-error-content">
                  <i class="fa-regular fa-trash-can" />
                  Usuń
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="p-3 flex items-center bg-base-200 rounded-xl">
          <input type="checkbox" class="checkbox checkbox-primary">
          <p class="ml-2">Pościelić łóżko</p>
          <div class="dropdown dropdown-end ml-auto">
            <label tabindex="0" class="w-6 h-6 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-ellipsis text-lg opacity-50 hover:opacity-100 cursor-pointer transition" />
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 text-sm dark:border-base-300 dark:border">
              <li>
                <a>
                  <i class="fa-regular fa-pen-to-square" />
                  Edytuj
                </a>
              </li>
              <li>
                <a class="text-error active:bg-error active:text-error-content">
                  <i class="fa-regular fa-trash-can" />
                  Usuń
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionView'
}
</script>

<style scoped>

</style>
