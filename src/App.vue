<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Sci-Gate Logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header>

  <RouterView />
</template>

<style>
#app {
  @apply container mx-auto mt-12 p-8 border-2 border-gray-600;
}
</style>
