import { contextBridge, ipcRenderer } from 'electron'
import type { CheckForUpdateCallback } from './types'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: ipcRenderer.invoke,
    send: ipcRenderer.send
  },
  onCheckForUpdate: (callback: CheckForUpdateCallback) => ipcRenderer.on('check-for-updates', (_, value) => callback(value))
})
