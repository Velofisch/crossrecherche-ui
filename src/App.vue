<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header class="bg-gray-100 p-16 flex items-start space-x-16 grow-0 text-gray-600">
      <RouterLink to="/"><img alt="Sci-Gate Logo" class="logo" src="@/assets/logo.svg" width="180" height="100" /></RouterLink>
    </header>

  <RouterView />
</template>

<style>
#app {
  @apply container mx-auto mt-12 p-8 border-2 border-gray-600;
}
</style>
