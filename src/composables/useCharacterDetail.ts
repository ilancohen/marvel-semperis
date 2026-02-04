import { computed } from "vue";
import { Status } from "@/types/general";
import { useCharacterDetailsStore } from "@/store/character-details";
import type { Character } from "@/types/character";

export function useCharacterDetail() {
  const store = useCharacterDetailsStore();

  const loading = computed(() => store.status === Status.LOADING);
  const character = computed<Character | null>(() => {
    if (!store.character) return null;
    return { ...store.character, sampleComics: store.sampleComics ?? undefined };
  });
  const error = computed(() => store.error);

  const loadCharacter = (characterId: number) => {
    store.fetchCharacterById(characterId);
  };

  return {
    character,
    loading,
    error,
    loadCharacter,
  };
}
