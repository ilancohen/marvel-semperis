
export interface Image {
  iconUrl: string;
  mediumUrl: string;
  screenUrl: string;
  screenLargeUrl: string;
  smallUrl: string;
  superUrl: string;
  thumbUrl: string;
  tinyUrl: string;
  originalUrl: string;
  imageTags: string;
}

/**
 * Summary of a related resource (Comic Vine style)
 */
export interface ResourceSummary {
  id: number
  name: string | null
  apiDetailUrl: string | null
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
