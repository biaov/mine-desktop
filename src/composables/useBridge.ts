import type { GlobalThisElectron } from './types'

const { electron } = globalThis as unknown as GlobalThisElectron

/**
 * 渲染器
 */
export const useRenderer = () => {
  return electron ?? {}
}
