/**
 * Image utilities for Comic Vine character/image objects (Task 7.1).
 * Comic Vine image: icon_url, medium_url, screen_url, small_url, super_url, thumb_url, tiny_url.
 */
import type { Image } from '@/types/general'
import type { Character } from '@/types/character'

/** Comic Vine image size keys */
export type ImageSizeKey = keyof Image

export function getImageUrl(
  image: Image,
  size: ImageSizeKey = 'mediumUrl'
): string {
  const url = image[size]
  if (url) {
    return url
  }
  return ''
}

export function getCharacterImageUrl(
  character: Pick<Character, 'image'>,
  size?: ImageSizeKey
): string {
  if (!character.image) {
    return ''
  }
  return getImageUrl(character.image, size ?? 'mediumUrl')
}