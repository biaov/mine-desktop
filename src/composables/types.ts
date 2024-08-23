/**
 * 检查更新回调函数
 */
interface CheckForUpdateCallback {
  (value: { type: string; data?: unknown }): void
}

/**
 * Electron
 */
export interface GlobalThisElectron extends Window {
  electron: {
    ipcRenderer: import('electron').IpcRenderer
    onCheckForUpdate: (value: CheckForUpdateCallback) => void
  }
}
