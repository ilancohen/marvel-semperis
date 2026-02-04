<template>
  <div class="container">
    <div class="header">
      <SearchBar @search="searchCharacters" />
      <FilterPanel @filter="filterCharacters" />
    </div>
    <div ref="listContainer" class="list">
      <CharacterList :characters="characters" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import CharacterList from '@/components/CharacterList.vue';
import SearchBar from '@/components/SearchBar.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import { useCharacters } from '@/composables/useCharacters';
import { useFilters } from '@/composables/useFilters';
import type { CharacterGender } from '@/types/filters';

const { loadCharacters, loading, characters, loadMore, hasMore } = useCharacters();
const listContainer = ref<HTMLElement | null>(null);
const { setSearchQuery, setGenderFilter } = useFilters();

useInfiniteScroll(
  listContainer,
  () => {
    if (!loading.value && hasMore.value) {
      loadMore();
    }
  },
  {
    distance: 200,
    canLoadMore: () => !loading.value && hasMore.value,
  }
);

onMounted(() => {
  loadCharacters();
});

const searchCharacters = (searchQuery: string) => {
  setSearchQuery(searchQuery);
  loadCharacters();
}

const filterCharacters = (gender: CharacterGender) => {
  setGenderFilter(gender);
  loadCharacters();
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: stretch;
  width: stretch;
}

.header {
  z-index: 100;
  flex-basis: 100px;
  flex-shrink: 0;
  flex-grow: 1;
}

.list {
  overflow-y: auto;
}
</style>
