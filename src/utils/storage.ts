import type { StorageType } from './types'

/**
 * 缓存类型
 */
const StorageTypeValue: Record<string, StorageType> = {
  Local: 'local',
  Session: 'session'
}

/**
 * 设置临时缓存
 */
const setSessionStorage = (key: string, value: unknown) => {
  sessionStorage.setItem(`$-${key}`, JSON.stringify({ value }))
}

/**
 * 获取临时缓存
 */
const getSessionStorage = (key: string): unknown => {
  const storage = sessionStorage.getItem(`$-${key}`)
  return storage ? JSON.parse(storage).value : ''
}

/**
 * 移除临时缓存
 */
const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(`$-${key}`)
}

/**
 * 设置永久缓存
 */
const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(`$-${key}`, JSON.stringify({ value }))
}

/**
 * 获取永久缓存
 */
const getLocalStorage = (key: string): unknown => {
  const storage = localStorage.getItem(`$-${key}`)
  return storage ? JSON.parse(storage).value : ''
}

/**
 * 移除永久缓存
 */
const removeLocalStorage = (key: string) => {
  localStorage.removeItem(`$-${key}`)
}

/**
 * 移除缓存
 * @param { string } key 获取缓存的 key
 * @param { unknown } value 缓存的值
 * @param { StorageType } type 缓存类型
 * @example
 * ```
 * import { setStorage } from '@/utils/storage'
 *
 * setStorage('key', 'value')
 * ```
 */
export const setStorage = (key: string, value: unknown, type: StorageType = StorageTypeValue.Local) => {
  switch (type) {
    case StorageTypeValue.Local:
      setLocalStorage(key, value)
      break
    case StorageTypeValue.Session:
      setSessionStorage(key, value)
      break
  }
}

/**
 * 移除缓存
 * @param { string } key 获取缓存的 key
 * @param { StorageType } type 缓存类型
 * @returns { unknown } 缓存值
 *  * @example
 * ```
 * import { getStorage } from '@/utils/storage'
 *
 * getStorage('key')
 * ```
 */
export const getStorage = (key: string, type: StorageType = StorageTypeValue.Local): unknown => {
  switch (type) {
    case StorageTypeValue.Local:
      return getLocalStorage(key)
    case StorageTypeValue.Session:
      return getSessionStorage(key)
    default:
      return ''
  }
}

/**
 * 移除缓存
 * @param { string } key 移除缓存的 key
 * @param { StorageType } type 缓存类型
 */
export const removeStorage = (key: string, type: StorageType = StorageTypeValue.Local) => {
  switch (type) {
    case StorageTypeValue.Local:
      removeLocalStorage(key)
      break
    case StorageTypeValue.Session:
      removeSessionStorage(key)
      break
  }
}
