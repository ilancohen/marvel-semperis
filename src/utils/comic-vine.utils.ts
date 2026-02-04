import type { CharacterFilters, ComicsFilters } from "@/types/filters";
import type { SortOrder } from "@/types/general";
import type { Sort } from "@comic-vine/client";

interface ComicVineFilter {
  limit?: number;
  offset?: number;
  sort?: Sort;
  filter?: Record<string, unknown>;
}

function getSort(sortOrder?: SortOrder, sortBy?: string): Sort | undefined {
  return sortOrder ? { field: convertCamelCaseToSnakeCase(sortBy ?? 'name'), direction: sortOrder } : undefined
}

function convertCamelCaseToSnakeCase(camelCaseString: string): string {
  return camelCaseString.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function convertFiltersToSnakeCase(filter?: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(filter ?? {}).map(([key, value]) => [convertCamelCaseToSnakeCase(key), value]))
}

export function getFilter(filters?: ComicsFilters | CharacterFilters): ComicVineFilter {
  if (!filters) {
    return {}
  }
  const filter = convertFiltersToSnakeCase(filters?.filter)
  if (filters?.searchQuery) {
    filter.name = filters.searchQuery
  }
  return {
    limit: filters?.limit,
    offset: filters?.offset,
    sort: getSort(filters?.sortOrder, filters?.sortBy),
    filter,
  }
}