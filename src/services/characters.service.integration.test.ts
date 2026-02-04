/**
 * Integration test: real fetch from Comic Vine API via charactersService.
 * Expects COMIC_VINE_API_KEY to be set when the service is implemented.
 * Fails while getCharacters/getCharacterById are not implemented (expected).
 */
import { describe, it, expect } from 'vitest'
import { getCharacters, getCharacterById, getComicsForCharacter } from './characters.service'

describe('charactersService (integration)', () => {
  it('getCharacters fetches paginated list from API', async () => {
    const response = await getCharacters({ limit: 5, offset: 0 })

    expect(response).toBeDefined()
    expect(response.length).toBeLessThanOrEqual(5)
  })

  it('getCharacterById fetches single character from API', async () => {
    const character = await getCharacterById(40470)

    expect(character).toBeDefined()
    expect(character.id).toBe(40470)
    expect(character.name).toBeDefined()
    expect(typeof character.name).toBe('string')
  })

  it('getComicsForCharacter fetches comics for a character from API', async () => {
    const comics = await getComicsForCharacter(40470, 5)

    expect(comics).toBeDefined()
    expect(comics.length).toBeLessThanOrEqual(5)
  })
})
