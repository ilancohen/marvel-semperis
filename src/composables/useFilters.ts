import { useFiltersStore } from "@/store/filters";
import type { CharacterGender, CharacterSortBy, FilterState } from "@/types/filters";
import type { SortOrder } from "@/types/general";
import { computed } from "vue";

export function useFilters() {
  const filtersStore = useFiltersStore();

  const sortBy = computed(() => filtersStore.sortBy);
  const sortOrder = computed(() => filtersStore.sortOrder);
  const filter = computed(() => filtersStore.filter);

  const setGenderFilter = (gender: CharacterGender) => {
    filtersStore.setGenderFilter(gender);
  }
  const setSearchQuery = (searchQuery: string) => {
    filtersStore.setSearchQuery(searchQuery);
  }
  const setSortBy = (sortBy: CharacterSortBy) => {
    filtersStore.setSortBy(sortBy);
  }
  const setSortOrder = (sortOrder: SortOrder) => {
    filtersStore.setSortOrder(sortOrder);
  }
  const resetFilters = () => {
    filtersStore.resetFilters();
  }

  return {
    sortBy,
    sortOrder,
    filter,
    setSearchQuery,
    setGenderFilter,
    setSortBy,
    setSortOrder,
    resetFilters
  }
}
