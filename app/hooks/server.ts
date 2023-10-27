import { resolve } from 'path'
import { isDevelopment } from '~/config/env'
import type { CreateServeParam } from '~/types'

/**
 * 创建服务
 */
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
    pageUrl = new URL(resolve(__dirname, '../vue/index.html'), `file://${__dirname}`).toString()
  }
  window.loadURL(pageUrl + path)
}
