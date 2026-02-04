import ComicVine, { type ComicVineOptions } from '@comic-vine/client'

function getComicVineBaseUrl(): string | undefined {
  // In browser, use same-origin /api/ proxy to avoid CORS
  // In Node (tests), use undefined to hit Comic Vine directly
  return typeof window === 'undefined' ? undefined : `${window.location.origin}/api/`
}

function getApiKey(): string {
  // In browser, proxy handles API key, so empty is fine
  // In Node (tests), read from environment variable
  return typeof window === 'undefined'
    ? (process.env.COMIC_VINE_API_KEY || '')
    : ''
}

const baseUrl = getComicVineBaseUrl()
const apiKey = getApiKey()
const options: ComicVineOptions = { apiKey, ...(baseUrl && { baseUrl }) }

export const comicVineClient = new ComicVine(options)