import { isDevelopment } from './env'
import { CreateServeParam } from './types'

export const createServer = ({ window, path = '' }: CreateServeParam) => {
  let pageUrl: string // 页面路径
  path && (path = `#/${path}`)
  // 开发
  if (isDevelopment) {
    pageUrl = 'http://localhost:3400'
    window.webContents.openDevTools()
  } else {
    pageUrl = new URL('../../resources/vue/index.html', `file://${__dirname}`).toString() // 打包
  }
  window.loadURL(pageUrl + path)
}
