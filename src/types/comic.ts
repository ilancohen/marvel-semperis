
import type { ApiResponse } from './api'
import type { Image, ResourceSummary } from './general'

export interface Issue extends ResourceSummary {
  issueNumber: string | null
  coverDate: Date | null
  storeDate: Date | null
  description: string | null
  deck: unknown | null
  image: Image | null
  siteDetailUrl: string | null
  dateAdded: Date | null
  dateLastUpdated: Date | null
  volume: ResourceSummary | null
}

export type ComicListResponse = ApiResponse<Issue>
