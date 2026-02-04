<template>
  <RouterLink to="/" class="back-link">← Back to list</RouterLink>
  <div class="character-detail">
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <CharacterDetail v-else-if="character" :character="character" />
    <div v-else>No character found</div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterDetail } from '@/composables/useCharacterDetail';
import { watch } from 'vue';
import { RouterLink } from 'vue-router';
import CharacterDetail from '@/components/CharacterDetail.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';


const props = defineProps<{ id: string }>();
const { loadCharacter, character, loading, error } = useCharacterDetail();

watch(() => props.id, (id) => {
  const num = parseInt(id, 10);
  loadCharacter(num);
}, { immediate: true });</script>

<style scoped>
.back-link {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-comic);
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--comic-white);
  background: var(--comic-blue-dark);
  border: var(--border-comic) solid var(--comic-blue);
  border-radius: 0;
  text-decoration: none;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-link:hover,
.back-link:focus-visible {
  background: var(--comic-blue);
  border-color: var(--comic-blue-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-comic-blue);
  outline: none;
}
</style>
