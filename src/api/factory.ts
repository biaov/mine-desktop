import { service } from '@/utils/request'
import type { PagingResponse } from './types'

export const restful = (path: string) => ({
  paging: (query = {}) => service.get(path, { params: query }) as Promise<PagingResponse>,
  all: (query = {}) => service.get(path, { params: { ...query, all: true } }) as Promise<Record<string, any>[]>,
  get: (id: number) => service.get(`${path}/${id}`),
  create: (data = {}) => service.post(path, data) as Promise<Record<string, any>>,
  delete: (id: number) => service.delete(`${path}/${id}`),
  update: (id: number, data = {}) => service.patch(`${path}/${id}`, data),
  replace: (id: number, data = {}) => service.put(`${path}/${id}`, data)
})

export const command = (path: string) => ({
  get: (query = {}) => service.get(path, { params: query }) as Promise<Record<string, any>>,
  post: (data = {}) => service.post(path, data)
})
