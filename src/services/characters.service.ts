import type { CharacterListResponse, Character } from '@/types/character'
import type { Issue } from '@/types/comic'
import type { CharacterFilters } from '@/types/filters'
import { comicVineClient } from './comic-vine-client'
import { getComicsByIds } from './comics.service'
import { getFilter } from '@/utils/comic-vine.utils'
import { getRandomIds } from '@/utils/random-ids'

const MARVEL_PUBLISHER_ID = 31

function formatCharacter(character: Character): Character {
  return {
    ...character,
    aliasList: character.aliases?.split('\n') ?? [],
  }
}

export async function getCharacters(filters?: CharacterFilters): Promise<Character[]> {
  const response: CharacterListResponse = await comicVineClient.character.list(getFilter(filters))
  return response.data.map(formatCharacter)
}

export async function getCharacterById(characterId: number): Promise<Character> {
  const character = await comicVineClient.character.retrieve(characterId)
  if (character.publisher?.id !== MARVEL_PUBLISHER_ID) {
    throw new Error(`Character ${characterId} is not a Marvel character`)
  }
  return formatCharacter(character as unknown as Character);
}

export function getRandomCharacters(limit: number = 10): Promise<Character[]> {
  return getCharactersByIds(getRandomIds(limit))
}

async function getCharactersByIds(characterIds: number[]): Promise<Character[]> {
  const results = await Promise.all(
    characterIds.map((id) => getCharacterById(id).catch(() => null))
  )
  return results.filter((c): c is Character => c !== null)
}

export async function getComicsForCharacter(
  characterId: number,
  limit?: number
): Promise<Issue[]> {
  const character = await getCharacterById(characterId)
  const issueIds = (character.issueCredits ?? []).map(issue => issue.id)
  return getComicsByIds(issueIds.slice(0, limit))
}

/* Note: There's no way to filter for Marvel characters only in the Comic Vine API,
  so we're doing the filtering on the client side. */
export async function getMarvelCharacters(filters?: CharacterFilters): Promise<{ characters: Character[]; total: number; count: number }> {
  const response: CharacterListResponse = await comicVineClient.character.list(getFilter(filters))
  const characters = response.data.map(formatCharacter).filter(character => character.publisher?.id === MARVEL_PUBLISHER_ID)
  return {
    characters,
    total: response.numberOfTotalResults,
    count: response.numberOfPageResults,
  }
}