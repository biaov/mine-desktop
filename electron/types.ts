import type { BrowserWindow, IpcMainInvokeEvent } from 'electron'

/**
 * handleChannels item
 */
export interface HandleChannelItem {
  type?: string
  channel: string
}

/**
 * IpcMain key
 */
export type IpcMainKey = 'handle' | 'on'

/**
 * aboutAction Return
 */
export interface AboutActionReturn {
  name: string
  version: string
}

/**
 * 返回函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FnReturn<T = any> = (...arg: T[]) => T

/**
 * 参数
 */
export interface OpenWindowActionParam {
  path?: string
}

/**
 * CreateServeAction 参数
 */
export interface CreateServeParam {
  window: BrowserWindow
  path?: string
}

/**
 * wordNumAction 参数
 */
export interface WordNumActionParam {
  type: string
  speed?: number
}

/**
 * visibleDesktopAction 参数
 */
export interface VisibleDesktopParam {
  type: 'show' | 'hide'
}

/**
 * openAppAction 类型
 */
export namespace OpenAppAction {
  export interface Option {
    name: string
    path: string
  }
}

/**
 * ActionEvent
 */
export interface ActionEvent<T = never, R = void> {
  (e: IpcMainInvokeEvent, option: T): R
}

/**
 * 检查更新回调函数
 */
export interface CheckForUpdateCallback {
  (value: { type: string; data?: unknown }): void
}
