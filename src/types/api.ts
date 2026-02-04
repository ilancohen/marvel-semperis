export interface ApiResponse<T> {
  limit: number;
  numberOfPageResults: number
  numberOfTotalResults: number
  offset: number
  data: T[]
}
