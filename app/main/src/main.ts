/**
 * @file 初始化程序
 */
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { resolve } from 'path'
import { setupIcp } from './ipc'
import { createServer } from './server'

/**
 * 创建窗口
 */
const createWindow = () => {
  const browserWindowOption: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden',
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableWebSQL: false,
      preload: resolve(__dirname, '../preload/index.cjs') // 预加载程序
    }
  }
  const window = new BrowserWindow(browserWindowOption)

  window.setMenuBarVisibility(false)
  createServer(window)
  setupIcp()
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    !BrowserWindow.getAllWindows().length && createWindow()
  })
})

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})
