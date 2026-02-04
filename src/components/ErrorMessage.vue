<template>
  <div class="card error-message">
    <div class="error-title">Error</div>
    <p class="comic-body">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped>
.error-message {
  box-shadow: var(--component-shadow);
}

.error-title {
  font-family: var(--font-comic);
  font-size: 1.5rem;
  color: var(--component-color-light);
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
}
</style>
