<template>
  <div class="loading-spinner">
    <div class="comic-spinner" :style="{ width: spinnerSize, height: spinnerSize }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const SIZES = {
  small: '20px',
  medium: '40px',
  large: '60px',
} as const;

const props = defineProps<{
  size?: 'small' | 'medium' | 'large';
}>();
const defaultSize = 'medium';
const spinnerSize = computed(() => {
  return SIZES[props.size ?? defaultSize];
});
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--spacing-lg) 0;
}

.comic-spinner {
  width: 60px;
  height: 60px;
  border: var(--border-comic) solid var(--comic-red-dark);
  border-top-color: var(--comic-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: var(--spacing-xl) auto;
  box-shadow: var(--shadow-md);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
