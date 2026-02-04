<template>
  <header class="app-header">
    <ThemeToggle />
  </header>
  <main class="app-main">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: absolute;
  top: 0;
  right: 0;
  padding: var(--spacing-lg);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1001;
}

.app-main {
  flex: 1;
  padding: var(--spacing-lg);
}
</style>
