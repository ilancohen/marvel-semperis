<template>
  <div class="card comic-panel" data-color="red">
    <div class="character-detail-layout">
      <div class="character-image-wrapper">
        <h1 class="character-name">{{ character.name }}</h1>
        <img :src="characterImageUrl" :alt="character.name ?? ''" />
      </div>
      <div class="info-block" data-color="blue">
        <p v-if="character.deck" class="comic-body">{{ character.deck }}</p>
        <dl>
          <dt>Aliases</dt>
          <dd>{{ aliasList || '—' }}</dd>
          <dt>Real name</dt>
          <dd>{{ character.realName || '—' }}</dd>
          <dt>Issue appearances</dt>
          <dd>{{ character.countOfIssueAppearances ?? '—' }}</dd>
        </dl>
      </div>
    </div>
    <div class="comics-section">
      <h2 class="comic-subheading">Comics</h2>
      <div class="comic-list">
        <ComicCard v-for="comic in character.sampleComics" :key="comic.id" :comic="comic" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/character';
import ComicCard from '@/components/ComicCard.vue';
import { getCharacterImageUrl } from '@/utils/image.utils';
import { computed } from 'vue';

const props = defineProps<{
  character: Character;
}>();

const characterImageUrl = computed(() => {
  return getCharacterImageUrl(props.character, 'mediumUrl');
});

const aliasList = computed(() => {
  return props.character.aliasList?.join(', ') ?? '';
});
</script>

<style scoped>
.comic-panel {
  position: relative;
}

.comic-panel:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--component-shadow);
  border-color: var(--component-color);
}


.character-detail-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: var(--spacing-lg);
}

.character-image-wrapper {
  min-width: 300px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--spacing-sm);


  img {
    width: 100%;
    max-width: 300px;
    height: 300px;
    background: linear-gradient(135deg, var(--component-color-dark), var(--component-color), var(--comic-purple-dark));
    border: var(--border-medium) solid var(--component-color-dark);
    border-radius: 8px;
    object-fit: cover;
    object-position: top;
    margin-bottom: var(--spacing-md);
    box-shadow: inset 0 0 20px rgba(var(--comic-black-rgb), var(--color-opacity-50));
  }
}

.info-block {
  background: var(--comic-bg-secondary);
  border: var(--border-medium) solid var(--component-color-dark);
  border-radius: 4px;
  padding: var(--spacing-lg);
  margin: 0;
  color: var(--comic-text-light);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  flex: 1 1 auto;
}

.info-block p {
  color: var(--comic-text-light);
  margin: 0 0 var(--spacing-md);
}

.info-block dl {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xs) var(--spacing-lg);
  align-items: baseline;
}

.info-block dt {
  font-family: var(--font-comic);
  font-size: 1rem;
  color: var(--comic-yellow-dark);
  text-shadow: 2px 2px 0px var(--comic-red);
  text-transform: uppercase;
  font-weight: 400;
}

.info-block dd {
  margin: 0;
  color: var(--comic-text-light);
}

.comics-section {
  margin-top: var(--spacing-xl);
  width: 100%;
}

.comic-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}
</style>
