import { contextBridge, ipcRenderer } from 'electron'
import type { CheckForUpdateCallback } from './types'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  onCheckForUpdate: (callback: CheckForUpdateCallback) => ipcRenderer.on('check-for-updates', (_event, value) => callback(value))
})
