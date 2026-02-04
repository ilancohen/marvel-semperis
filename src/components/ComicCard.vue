<template>
  <div class="card comic-card" data-color="blue">
    <img :src="comicImageUrl" :alt="comic.name ?? ''" />
    <h3>{{ comic.name }}</h3>
    <p class="comic-body">{{ comic.deck }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Issue } from '@/types/comic';
import { getImageUrl } from '@/utils/image.utils';
import { computed } from 'vue';

const props = defineProps<{
  comic: Issue;
}>();

const comicImageUrl = computed(() => {
  if (!props.comic.image) return '';
  return getImageUrl(props.comic.image, 'mediumUrl');
});
</script>

<style scoped>
.comic-card {
  background: var(--comic-card-bg);
  padding: var(--spacing-md);
  margin: 0;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comic-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: var(--component-shadow);
  border-color: var(--component-color-light);
}

.comic-card img {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, var(--comic-red-dark), var(--comic-blue-dark), var(--comic-purple-dark));
  border: var(--border-medium) solid var(--comic-blue-dark);
  border-radius: 8px;
  object-fit: cover;
  object-position: top;
  margin-bottom: var(--spacing-md);
  box-shadow: inset 0 0 20px rgba(var(--comic-black-rgb), var(--color-opacity-50));
}

.comic-card h3 {
  font-family: var(--font-comic);
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--comic-red-light);
  margin-bottom: var(--spacing-sm);
  text-align: center;
  text-shadow: 2px 2px 0px var(--comic-bg-dark);
  font-weight: 400;
}

.comic-card p {
  font-family: var(--font-comic);
  font-size: 0.9rem;
  text-align: center;
  padding: var(--spacing-sm);
}
</style>