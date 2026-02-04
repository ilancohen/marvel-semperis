import type { ApiResponse } from './api'
import type { Issue } from './comic'
import type { Image, ResourceSummary } from './general'

export interface Character extends ResourceSummary {
  description: string | null
  deck: string | null
  image?: Image
  siteDetailUrl: string
  aliases: string | null
  aliasList?: string[] | null
  birth: string | null
  countOfIssueAppearances: number | null
  dateAdded: Date | null
  dateLastUpdated: Date | null
  firstAppearedInIssue: ResourceSummary | null
  gender: number | null
  origin: ResourceSummary | null
  publisher: ResourceSummary | null
  realName: string | null
  /** Present on character detail (retrieve); list responses may omit */
  issueCredits?: Issue[]
  sampleComics?: Issue[]
}

export type CharacterListResponse = ApiResponse<Character>
