<template>
  <div class="card character-card" tabindex="0" role="button"
    :aria-label="`${character.name ?? 'Character'} character card`" :data-color="color" @click="handleClick($event)">
    <div class="character-image">
      <img v-if="characterImageUrl" :src="characterImageUrl" :alt="character.name ?? ''" />
      <span v-else class="character-image-placeholder">{{ (character.name ?? 'CHARACTER').toUpperCase() }}</span>
    </div>
    <h3 class="character-name">{{ character.name }}</h3>
    <div class="speech-bubble">
      <dl>
        <dt v-if="aliasList">Aliases</dt>
        <dd v-if="aliasList">{{ aliasList }}</dd>
        <dt v-if="character.realName">Real name</dt>
        <dd v-if="character.realName">{{ character.realName }}</dd>
        <dt v-if="character.birth">Birth</dt>
        <dd v-if="character.birth">{{ character.birth }}</dd>
        <dt v-if="character.origin?.name">Origin</dt>
        <dd v-if="character.origin?.name">{{ character.origin.name }}</dd>
        <dt v-if="character.publisher?.name">Publisher</dt>
        <dd v-if="character.publisher?.name">{{ character.publisher.name }}</dd>
        <dt v-if="character.countOfIssueAppearances !== null">Issue appearances</dt>
        <dd v-if="character.countOfIssueAppearances !== null">{{ character.countOfIssueAppearances }}</dd>
      </dl>
      <p v-if="descriptionText" class="description-text">{{ descriptionText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/character';
import { getCharacterImageUrl, type ImageSizeKey } from '@/utils/image.utils';
import { computed, inject } from 'vue';

const props = defineProps<{
  character: Character;
  imageSize?: ImageSizeKey;
  color?: string;
}>();

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const defaultImageSize = 'mediumUrl';
const characterImageUrl = computed(() => {
  return getCharacterImageUrl(props.character, props.imageSize ?? defaultImageSize);
});

const descriptionText = computed(() => {
  return props.character.deck ?? null;
});

const aliasList = computed(() => {
  return props.character.aliasList?.join(', ') ?? '';
});

function handleClick(event: MouseEvent): void {
  emit('click', props.character.id);
}
</script>

<style scoped>
.character-card {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: var(--spacing-md);
  max-width: 400px;
  margin: 0;
}

.character-card:hover,
.character-card:focus-visible {
  transform: translateY(-8px) scale(1.05);
  box-shadow: var(--component-shadow);
  border-color: var(--component-color-light);
  outline: none;
}

.character-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--component-color-dark), var(--component-color), var(--comic-purple-dark));
  border: var(--border-medium) solid var(--component-color-dark);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-comic);
  font-size: 1.5rem;
  color: var(--comic-white);
  border-radius: 8px;
  box-shadow: inset 0 0 20px rgba(var(--comic-black-rgb), var(--color-opacity-50));
}

.character-image[data-color="blue"] {
  background: linear-gradient(135deg, var(--comic-blue-dark), var(--comic-blue), var(--comic-cyan-dark));
}

.character-image[data-color="purple"] {
  background: linear-gradient(135deg, var(--comic-purple-dark), var(--comic-purple), var(--comic-pink-dark));
}

.character-image[data-color="red"] {
  background: linear-gradient(135deg, var(--comic-red-dark), var(--comic-red), var(--comic-orange-dark));
}

.character-image[data-color="orange"] {
  background: linear-gradient(135deg, var(--comic-orange-dark), var(--comic-orange), var(--comic-yellow-dark));
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.character-image-placeholder {
  font-family: var(--font-comic);
  font-size: 1rem;
  color: var(--comic-white);
}

.speech-bubble {
  background: var(--comic-bg-paper);
  border: var(--border-medium) solid var(--comic-blue-dark);
  border-radius: 20px;
  padding: var(--spacing-md);
  margin: var(--spacing-sm) 0;
  position: relative;
  font-size: 0.9rem;
  color: var(--comic-text);
  box-shadow: 0 2px 8px rgba(var(--comic-black-rgb), var(--color-opacity-20));
}

.speech-bubble dl {
  margin: var(--spacing-sm) 0 0 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xs) var(--spacing-md);
  align-items: baseline;
}

.speech-bubble dt {
  font-family: var(--font-comic);
  font-size: 1rem;
  color: var(--comic-label-color);
  text-shadow: 1px 1px 0px var(--comic-label-text-shadow);
  text-transform: uppercase;
  font-weight: 400;
}

.speech-bubble dd {
  margin: 0;
  color: var(--comic-text);
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    overflow: visible;
    white-space: normal;
    text-overflow: clip;
  }
}


.description-text {
  margin-top: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
}
</style>
