import { IpcMain } from 'electron'

// handleChannels item
export interface HandleChannelItem {
  type?: string
  channel: string
}

// IpcMain
export type CurIpcMain = Record<string, any> & IpcMain

// aboutAction Return
export interface AboutActionReturn {
  name: string
  version: string
}
