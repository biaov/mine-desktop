import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { resolve } from 'path'
import { setupIcp } from './ipc'

// 初始化程序

// 创建窗口
const createWindow = () => {
  const browserWindowOption: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden',
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableWebSQL: false,
      preload: resolve(__dirname, '../preload/index.cjs')
    }
  }
  const window = new BrowserWindow(browserWindowOption)

  window.setMenuBarVisibility(false)

  let pageUrl = new URL('../../resources/vue/index.html', `file://${__dirname}`).toString()
  if (import.meta.env.MODE === 'development') {
    pageUrl = 'http://localhost:3400'
    window.webContents.openDevTools()
  }
  window.loadURL(pageUrl)

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
