import type { ComicListResponse, Issue } from '@/types/comic'
import { comicVineClient } from './comic-vine-client'
import { getFilter } from '@/utils/comic-vine.utils'
import type { ComicsFilters } from '@/types/filters'

export async function getComics(filters?: ComicsFilters): Promise<ComicListResponse> {
  return comicVineClient.issue.list(getFilter(filters))
}

export async function getComicById(comicId: number): Promise<Issue> {
  return comicVineClient.issue.retrieve(comicId)
}

export async function getComicsByIds(comicIds: number[]): Promise<Issue[]> {
  return Promise.all(comicIds.map(getComicById))
}
