/**
 * Composable for character list operations (Task 4.1).
 * Connect to characters slice; expose characters, loading, error, pagination; loadCharacters, searchCharacters, loadMore.
 */
import { computed } from 'vue'
import { Status } from '@/types/general'
import type { CharacterFilters } from '@/types/filters'
import { useCharactersStore } from '@/store/characters'
import { useFiltersStore } from '@/store/filters'

export function useCharacters() {
  const store = useCharactersStore()
  const filtersStore = useFiltersStore()

  const characters = computed(() => store.characters)
  const loading = computed(() => store.status === Status.LOADING)
  const error = computed(() => store.error)
  const pagination = computed(() => store.pagination)
  const hasMore = computed(() => store.hasMore)
  const filters = computed(() => filtersStore.$state)

  const loadCharacters = () => {
    store.fetchCharacters({ ...filters.value, offset: 0, limit: pagination.value.limit })
  }
  const loadMore = () => {
    store.fetchCharacters({
      ...filters.value,
      ...pagination.value,
      offset: pagination.value.offset + pagination.value.limit,
    }, true) // Pass true to append results
  }

  return {
    characters,
    loading,
    error,
    pagination,
    hasMore,
    loadCharacters,
    loadMore,
    filters
  }
}
