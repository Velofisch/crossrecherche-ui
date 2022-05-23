<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-full flex flex-col justify-between border-2 border-gray-500 bg-white">
    <header class="bg-gray-100 p-16 flex items-start space-x-16 grow-0 text-gray-600">
      <RouterLink to="/"><img alt="Sci-Gate Logo" class="logo" src="@/assets/logo.svg" width="180" height="100" /></RouterLink>
      <SearchBar />
    </header>

    <main class="grow">
      <RouterView />
    </main>
    <footer class="bg-gray-100 p-16 grow-0 flex flex-row justify-between">
      <span class="text-gray-700 text-sm font-medium uppercase">© 2022 | Crossrecherche</span>
      <div>
        <RouterLink to="/" class="text-gray-700 text-sm font-medium uppercase">Home</RouterLink> |
        <RouterLink to="/search" class="text-gray-700 text-sm font-medium uppercase">Search</RouterLink> |
        <RouterLink to="/about" class="text-gray-700 text-sm font-medium uppercase">About</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  @apply bg-gray-300 min-h-screen;
}
#app {
  @apply container h-full mx-auto my-12;
}
</style>
