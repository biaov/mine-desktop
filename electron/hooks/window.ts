/**
 * @file 窗口
 */
import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron'
import { resolve } from 'path'
import { handleChannels } from '~/config'
import type { CurIpcMain } from '~/types'
import { createServer } from './server'
import { useActions } from './actions'
import { useCheckForUpdates } from './check-for-updates'

/**
 * icp 程序
 */
export const setupIcp = () => {
  const actions = useActions()

  handleChannels.forEach(item => {
    const curIpcMain = ipcMain as CurIpcMain
    curIpcMain[item.type || 'handle'](item.channel, actions[`${item.channel}Action`])
  })
}

/**
 * 创建窗口
 */
export const createWindow = (path?: string) => {
  const browserWindowOption: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden',
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableWebSQL: false,
      /**
       * 预加载程序
       */
      preload: resolve(__dirname, 'preload.js')
    },
    icon: resolve(__dirname, '../assets/logo.png')
  }
  const window = new BrowserWindow(browserWindowOption)

  window.setMenuBarVisibility(false)
  /**
   * 设置任务栏图标
   */
  const exePath = app.getPath('exe')

  window.setAppDetails({
    appId: 'mine.desktop.app',
    appIconPath: resolve(__dirname, '../assets/favicon.ico'),
    appIconIndex: 0,
    relaunchDisplayName: 'MINE DESKTOP',
    relaunchCommand: `"${exePath}"`
  })
  createServer({ window, path })
  setupIcp()
  useCheckForUpdates()
}

/**
 * 获取当前 windows
 */
export const getWindow = () => BrowserWindow.getFocusedWindow() as BrowserWindow
