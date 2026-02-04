import type { Character } from './character'
import type { SortOrder } from './general'
import type { PrimitiveKeys } from './util'
import type { Issue } from './comic'

/** Sortable character fields for list view (Comic Vine supports sort on these) */
type CharacterSortField = PrimitiveKeys<Character>
type ComicSortField = PrimitiveKeys<Issue>

export const COMIC_SORT_BY_OPTIONS: Record<string, ComicSortField> = {
  NAME: 'name',
  ID: 'id',
  ISSUE_NUMBER: 'issueNumber',
  COVER_DATE: 'coverDate',
  STORE_DATE: 'storeDate',
  DATE_ADDED: 'dateAdded',
  DATE_LAST_UPDATED: 'dateLastUpdated',
}

export const CHARACTER_SORT_BY_OPTIONS: Record<string, CharacterSortField> = {
  NAME: 'name',
  ID: 'id',
  COUNT_OF_ISSUE_APPEARANCES: 'countOfIssueAppearances',
  DATE_ADDED: 'dateAdded',
  DATE_LAST_UPDATED: 'dateLastUpdated',
  DECK: 'deck',
  REAL_NAME: 'realName',
}

export const CHARACTER_GENDER_OPTIONS = {
  ALL: 'all',
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const;

export type ComicSortBy = (typeof COMIC_SORT_BY_OPTIONS)[keyof typeof COMIC_SORT_BY_OPTIONS]
export type CharacterSortBy = (typeof CHARACTER_SORT_BY_OPTIONS)[keyof typeof CHARACTER_SORT_BY_OPTIONS]
export type CharacterGender = (typeof CHARACTER_GENDER_OPTIONS)[keyof typeof CHARACTER_GENDER_OPTIONS]
export type CharacterFilterOptions = {
  gender?: CharacterGender
  name?: string
}

export interface FilterState {
  sortBy: CharacterSortBy
  sortOrder: SortOrder
  filter: CharacterFilterOptions
}

export interface PaginationParams {
  offset: number
  limit: number
}

/** Filters passed to character list API (Comic Vine client list options) */
export interface CharacterFilters extends PaginationParams {
  filter?: CharacterFilterOptions
  sortOrder?: SortOrder
  sortBy?: CharacterSortBy
  searchQuery?: string
}

export interface ComicsFilters extends PaginationParams {
  filter?: Record<string, unknown>
  sortOrder?: SortOrder
  sortBy?: ComicSortBy
  searchQuery?: string
}