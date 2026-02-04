<template>
  <div class="filter-tabs" role="radiogroup" aria-labelledby="filter-tabs-label">
    <label class="filter-tab">
      <input type="radio" name="gender-filter" value="all" aria-label="All characters"
        :checked="selectedGender === CHARACTER_GENDER_OPTIONS.ALL"
        @change="handleFilterChange(CHARACTER_GENDER_OPTIONS.ALL)" />
      All
    </label>
    <label class="filter-tab">
      <input type="radio" name="gender-filter" value="male" aria-label="Male"
        :checked="selectedGender === CHARACTER_GENDER_OPTIONS.MALE"
        @change="handleFilterChange(CHARACTER_GENDER_OPTIONS.MALE)" />
      Male
    </label>
    <label class="filter-tab">
      <input type="radio" name="gender-filter" value="female" aria-label="Female"
        :checked="selectedGender === CHARACTER_GENDER_OPTIONS.FEMALE"
        @change="handleFilterChange(CHARACTER_GENDER_OPTIONS.FEMALE)" />
      Female
    </label>
    <label class="filter-tab">
      <input type="radio" name="gender-filter" value="other" aria-label="Other"
        :checked="selectedGender === CHARACTER_GENDER_OPTIONS.OTHER"
        @change="handleFilterChange(CHARACTER_GENDER_OPTIONS.OTHER)" />
      Other
    </label>
  </div>
</template>

<script setup lang="ts">
import { useFilters } from '@/composables/useFilters';
import { CHARACTER_GENDER_OPTIONS, type CharacterGender } from '@/types/filters';
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'filter', value: CharacterGender): void
}>();

const { filter } = useFilters();
const selectedGender = computed(() => filter.value.gender ?? CHARACTER_GENDER_OPTIONS.ALL);

const handleFilterChange = (gender: CharacterGender) => {
  emit('filter', gender);
}
</script>

<style scoped>
.filter-tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin: var(--spacing-lg) 0;
  flex-wrap: wrap;
}

.filter-tab input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.filter-tab {
  font-family: var(--font-comic);
  font-size: 1rem;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: var(--border-medium) solid var(--comic-border-color);
  background: var(--comic-bg-panel);
  color: var(--comic-text-light);
  cursor: pointer;
  transition: all 0.2s ease, background-color 0.3s ease;
  text-transform: uppercase;
  position: relative;
  border-radius: 0;
  display: inline-block;
}

.filter-tab:hover,
.filter-tab:focus-within {
  background: var(--comic-blue-dark);
  color: var(--comic-text-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(var(--comic-blue-rgb), var(--color-opacity-40-shadow));
  border-color: var(--comic-border-color-hover);
  outline: none;
}

/* Active/Checked State */
.filter-tab.active,
.filter-tab:has(input[type="radio"]:checked) {
  background: var(--comic-red);
  color: var(--comic-text-light);
  border-color: var(--comic-border-color-active);
  box-shadow: 0 4px 20px rgba(var(--comic-red-rgb), var(--color-opacity-40-shadow));
}

/* Active Indicator - Bottom Border Effect */
.filter-tab.active::after,
.filter-tab:has(input[type="radio"]:checked)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--comic-red);
  box-shadow: 0 2px 8px rgba(var(--comic-red-rgb), var(--color-opacity-60));
}

/* Focus visible for keyboard navigation */
.filter-tab:focus-visible {
  outline: 2px solid var(--comic-blue);
  outline-offset: 2px;
}
</style>
