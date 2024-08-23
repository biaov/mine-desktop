interface Meta {
  total: number
  current: number
  pageSize: number
}

export interface PagingResponse {
  meta: Meta
  list: Record<string, unknown>[]
}
