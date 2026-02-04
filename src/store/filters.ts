import { CHARACTER_GENDER_OPTIONS, CHARACTER_SORT_BY_OPTIONS, type CharacterGender, type CharacterSortBy, type FilterState } from "@/types/filters";
import { SortOrder } from "@/types/general";
import { defineStore } from "pinia";

const initialState: FilterState = {
  sortBy: CHARACTER_SORT_BY_OPTIONS.NAME,
  sortOrder: SortOrder.ASC,
  filter: {},
}

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    ...initialState,
  }),
  actions: {
    setSearchQuery(searchQuery: string) {
      this.filter.name = searchQuery;
    },
    setGenderFilter(gender: CharacterGender) {
      if (gender === CHARACTER_GENDER_OPTIONS.ALL) {
        delete this.filter.gender;
      } else {
        this.filter.gender = gender;
      }
    },
    setSortBy(sortBy: CharacterSortBy) {
      this.sortBy = sortBy;
    },
    setSortOrder(sortOrder: SortOrder) {
      this.sortOrder = sortOrder;
    },
    resetFilters() {
      this.sortBy = initialState.sortBy;
      this.sortOrder = initialState.sortOrder;
      this.filter = initialState.filter;
    },
  },
})