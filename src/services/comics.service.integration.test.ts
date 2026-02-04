/**
 * Integration test: real fetch from Comic Vine API via comicsService.
 * Expects COMIC_VINE_API_KEY to be set.
 */
import { ComicVineObjectNotFoundError } from '@comic-vine/client'
import { describe, it, expect } from 'vitest'
import { getComics, getComicById } from './comics.service'
import { SortOrder } from '@/types/general'
import { COMIC_SORT_BY_OPTIONS } from '@/types/filters'

describe('comicsService (integration)', () => {
  it('getComics fetches paginated list from API', async () => {
    const response = await getComics({ limit: 5, offset: 0 })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeLessThanOrEqual(5)
  })

  it('getComics with no filters returns default list from API', async () => {
    const response = await getComics()

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.offset).toBeDefined()
    expect(response.limit).toBeDefined()
    expect(typeof response.numberOfTotalResults).toBe('number')
  })

  it('getComics with offset returns next page', async () => {
    const first = await getComics({ limit: 3, offset: 0 })
    const second = await getComics({ limit: 3, offset: 3 })

    expect(second.offset).toBe(3)
    expect(second.limit).toBe(3)
    expect(second.data.length).toBeLessThanOrEqual(3)
    if (first.data.length > 0 && second.data.length > 0) {
      const firstIds = new Set(first.data.map(c => c.id))
      second.data.forEach(comic => {
        expect(firstIds.has(comic.id)).toBe(false)
      })
    }
  })

  it('getComics with filter by volume returns comics in that volume', async () => {
    const response = await getComics({ limit: 5, offset: 0, filter: { volume: 1 } })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    response.data.forEach(comic => {
      expect(comic.volume).toBeDefined()
      if (comic.volume?.id !== undefined) {
        expect(comic.volume.id).toBe(1)
      }
    })
  })

  it('getComics with sort returns ordered results', async () => {
    const response = await getComics({ limit: 5, offset: 0, sortOrder: SortOrder.ASC, sortBy: COMIC_SORT_BY_OPTIONS.NAME })

    expect(response).toBeDefined()
    expect(response.data.length).toBeGreaterThan(0)
    const names = response.data.map(c => c.name ?? '').filter(Boolean)
    if (names.length >= 2) {
      for (let i = 1; i < names.length; i++) {
        expect(names[i].localeCompare(names[i - 1])).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('getComicById fetches single comic from API', async () => {
    const comic = await getComicById(4000)

    expect(comic).toBeDefined()
    expect(comic.id).toBe(4000)
    expect(comic.name !== undefined || comic.issueNumber !== undefined).toBe(true)
    expect(typeof comic.id).toBe('number')
  })

  it('getComicById rejects with ComicVineObjectNotFoundError for non-existent id', async () => {
    await expect(getComicById(999999999)).rejects.toThrow(ComicVineObjectNotFoundError)
  })
})
