import { getCharacterById } from "@/services/characters.service";
import { getComicsByIds } from "@/services/comics.service";
import type { Character } from "@/types/character";
import type { Issue } from "@/types/comic";
import { Status } from "@/types/general";
import { defineStore } from "pinia";


interface CharacterDetailState {
  character: Character | null
  status: Status
  error: string | null
  sampleComics: Issue[] | null
}

const initialState: CharacterDetailState = {
  character: null,
  status: Status.IDLE,
  error: null,
  sampleComics: null,
}


export const useCharacterDetailsStore = defineStore('characterDetails', {
  state: () => ({
    ...initialState,
  }),
  actions: {
    setCharacter(character: Character) {
      this.character = character;
    },
    setStatus(status: Status) {
      this.status = status;
    },
    setError(error: string | null) {
      this.error = error;
    },
    clearCharacter() {
      this.character = null;
    },
    async fetchSampleComics() {
      const comics = this.character?.issueCredits?.slice(0, 5) ?? [];
      if (comics.length === 0) {
        this.sampleComics = [];
        return;
      }

      try {
        const comicIds = comics.map(comic => comic.id);
        const sampleComics = await getComicsByIds(comicIds);
        this.sampleComics = sampleComics;
      } catch (error) {
        console.error('Failed to fetch comics:', error);
        this.sampleComics = [];
      }
    },
    async fetchCharacterById(characterId: number) {
      this.status = Status.LOADING;
      try {
        const response = await getCharacterById(characterId);
        this.character = response;
        this.status = Status.SUCCEEDED;
        await this.fetchSampleComics();
      } catch (error) {
        this.status = Status.FAILED;
        this.error = error as string;
      }
    },
  },
})