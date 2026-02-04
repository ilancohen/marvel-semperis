<template>
  <div class="search-bar">
    <label for="search-heroes" class="visually-hidden">Search for heroes</label>
    <input type="text" id="search-heroes" class="search-input" placeholder="Search for heroes..." v-model="searchQuery"
      @input="handleInput">
    <span class="search-icon" aria-hidden="true">🔍</span>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { shallowRef } from 'vue';

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()
const searchQuery = shallowRef('')

const debouncedFn = useDebounceFn(() => {
  emit('search', searchQuery.value)
}, 300, { maxWait: 5000 })

const handleInput = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value
  debouncedFn()
}
</script>

<style scoped>
.search-bar {
  position: relative;
  margin-bottom: var(--spacing-lg);
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) 3rem var(--spacing-md) var(--spacing-xl);
  border: var(--border-comic) solid var(--comic-border-color);
  border-radius: 0;
  font-family: var(--font-body);
  font-size: 1rem;
  background: var(--comic-bg-panel);
  color: var(--comic-text-light);
  transition: all 0.3s ease, background-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--comic-border-color-hover);
    box-shadow: 0 0 0 4px rgba(var(--comic-blue-rgb), var(--color-opacity-20)), 0 4px 20px rgba(var(--comic-blue-rgb), var(--color-opacity-40-shadow));
    background: var(--comic-bg-secondary);
  }

  &::placeholder {
    font-family: var(--font-comic);
    color: var(--comic-text-muted);
    opacity: 0.7;
  }
}


.search-icon {
  position: absolute;
  right: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: var(--comic-red);
}
</style>
