import { defineStore } from "pinia";
import type { Character } from "@/types/character";
import type { CharacterFilters, PaginationParams } from "@/types/filters";
import { Status } from "@/types/general";
import { getRandomCharacters, getMarvelCharacters } from "@/services/characters.service";
interface CharactersState {
  characters: Character[]
  status: Status
  error: string | null
  pagination: PaginationParams & { total?: number; count?: number }
}

const initialState: CharactersState = {
  characters: [],
  status: Status.IDLE,
  error: null,
  pagination: { offset: 0, limit: 20 },
}

function hasNoFilters(filters: CharacterFilters): boolean {
  return !Object.values(filters.filter ?? {}).some(value => value?.trim())
}


export const useCharactersStore = defineStore('characters', {
  state: () => ({
    ...initialState,
  }),
  getters: {
    hasMore(): boolean {
      const { total, offset, count } = this.pagination;
      return total !== undefined && (offset + (count || 0)) < total;
    },
  },
  actions: {
    async fetchCharacters(filters: CharacterFilters & PaginationParams, append: boolean = false) {
      this.status = Status.LOADING;
      if (!append) {
        this.characters = [];
      }

      try {
        let newCharacters: Character[];
        let total: number | undefined;
        let count: number;

        if (hasNoFilters(filters)) {
          newCharacters = await getRandomCharacters();
          total = undefined; // Random characters don't support pagination
          count = newCharacters.length;
        } else {
          const response = await getMarvelCharacters(filters);
          newCharacters = response.characters;
          total = response.total;
          count = response.count;
        }

        this.characters = append ? [...this.characters, ...newCharacters] : newCharacters;
        this.pagination = { ...this.pagination, offset: filters.offset, total, count };
        this.status = Status.SUCCEEDED;
      } catch (error) {
        this.status = Status.FAILED;
        this.error = error as string;
      }
    },
  },
})