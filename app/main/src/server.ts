import { isDevelopment } from './env'
import { CreateServeParam } from './types'

export const createServer = ({ window, path = '' }: CreateServeParam) => {
  /**
   * 页面路径
   */
  let pageUrl: string
  path && (path = `#/${path}`)

  if (isDevelopment) {
    /**
     * 开发
     */
    pageUrl = 'http://localhost:3400'
    window.webContents.openDevTools()
  } else {
    /**
     * 打包
     */
    pageUrl = new URL('../../resources/vue/index.html', `file://${__dirname}`).toString()
  }
  window.loadURL(pageUrl + path)
}
