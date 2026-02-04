<template>
  <button class="theme-toggle" @click="toggleTheme"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`" type="button">
    <span class="theme-toggle-icon">
      <ThemeIcon :theme="theme" />
    </span>
    <span>{{ theme === 'light' ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import ThemeIcon from '@/components/ThemeIcon.vue';

const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--comic-bg-panel);
  border: var(--border-comic) solid var(--theme-toggle-border);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  font-family: var(--font-comic);
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--theme-toggle-color);
  border-radius: 0;
}

.theme-toggle:hover {
  transform: scale(1.05);
  box-shadow: var(--theme-toggle-hover-shadow);
  border-color: var(--theme-toggle-hover-border);
}

.theme-toggle:focus-visible {
  outline: none;
  transform: scale(1.05);
  box-shadow: var(--theme-toggle-hover-shadow);
  border-color: var(--theme-toggle-hover-border);
}

.theme-toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.theme-toggle-icon :deep(.icon-wrapper) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.theme-toggle:hover .theme-toggle-icon {
  transform: rotate(15deg);
}
</style>
