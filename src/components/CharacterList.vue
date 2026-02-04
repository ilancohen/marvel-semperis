<template>
  <div class="character-list">
    <template v-if="loading && characters.length === 0">
      <CardSkeleton v-for="n in skeletonCount" :key="`skeleton-${n}`" :color="colors[n % colors.length]" />
    </template>
    <CharacterCard v-for="(character, i) in characters" :key="character.id" :character="character"
      :color="colors[i % colors.length]" @click="handleClick" />
    <template v-if="loading && characters.length > 0">
      <LoadingSpinner />
    </template>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import CardSkeleton from '@/components/CardSkeleton.vue';
import type { Character } from '@/types/character';

const colors = ['red', 'blue', 'purple', 'orange', 'teal'];

const props = defineProps<{
  characters: Character[];
  loading?: boolean;
}>();

const skeletonCount = 8;

const handleClick = (id: number) => {
  router.push(`/character/${id}`);
};
</script>

<style scoped>
.character-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
}
</style>