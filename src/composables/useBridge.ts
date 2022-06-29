import { GlobalThisElectron } from './types'

const { electron } = globalThis as GlobalThisElectron

/**
 * 渲染器
 */
export const useRenderer = () => {
  const ipcRenderer = electron?.ipcRenderer

  return { ipcRenderer }
}
