/**
 * @file 窗口
 */
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { resolve } from 'path'
import { setupIcp } from './ipc'
import { createServer } from './server'

// 创建窗口
export const createWindow = (path?: string) => {
  const browserWindowOption: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden',
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableWebSQL: false,
      preload: resolve(__dirname, '../preload/index.cjs') // 预加载程序
    },
    icon: resolve(__dirname, './assets/logo.png')
  }
  const window = new BrowserWindow(browserWindowOption)

  window.setMenuBarVisibility(false)
  // 设置任务栏图标
  const exePath = app.getPath('exe')

  window.setAppDetails({
    appId: 'mine.desktop.version',
    appIconPath: resolve(__dirname, './assets/favicon.ico'),
    appIconIndex: 0,
    relaunchDisplayName: 'MINE DESKTOP',
    relaunchCommand: `"${exePath}"`
  })
  createServer({ window, path })
  setupIcp()
}
