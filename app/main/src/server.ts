import { BrowserWindow } from 'electron'
import { isDevelopment } from './env'

export const createServer = (window: BrowserWindow) => {
  let pageUrl: string // 页面路径
  // 开发
  if (isDevelopment) {
    pageUrl = 'http://localhost:3400'
    window.webContents.openDevTools()
  } else {
    pageUrl = new URL('../../resources/vue/index.html', `file://${__dirname}`).toString() // 打包
  }
  window.loadURL(pageUrl)
}
