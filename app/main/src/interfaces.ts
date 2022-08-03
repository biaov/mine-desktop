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
export interface UseActionsReturn {
  [key: string]: any
}

// aboutAction Return
export interface AboutActionReturn {
  name: string
  version: string
}
