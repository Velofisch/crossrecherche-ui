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
