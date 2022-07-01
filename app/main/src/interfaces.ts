import { IpcMain } from 'electron'

// handleChannels item
export interface HandleChannelItem {
  type?: string
  channel: string
}

// IpcMain
export interface CurIpcMain extends IpcMain {
  [key: string]: any
}

// useActions return
export interface useActionsReturn {
  [key: string]: any
}
