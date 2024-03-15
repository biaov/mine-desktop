import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'
import { updatesEnums } from '@/enums/icp'
import { getWindow } from './window'

/**
 * 检查更新
 */
export const useCheckForUpdates = () => {
  const checkForUpdates = () => {
    const { webContents } = getWindow()
    logger.transports.file.level = 'debug'
    autoUpdater.logger = logger
    autoUpdater.disableWebInstaller = true
    autoUpdater.autoDownload = false
    autoUpdater.disableDifferentialDownload = true
    autoUpdater.checkForUpdates()
    let isAutoCheck = true

    autoUpdater.on('error', data => {
      logger.error(['检查更新失败', data])
      webContents.send('check-for-updates', { type: updatesEnums.error, data })
    })

    autoUpdater.on('download-progress', data => {
      logger.info('download-progress')
      logger.info(data)
      webContents.send('check-for-updates', { type: updatesEnums.progress, data })
    })

    // 有可用更新的时候触发
    autoUpdater.on('update-available', data => {
      logger.info('检查到有更新，开始下载新版本')
      logger.info(data)
      webContents.send('check-for-updates', { type: updatesEnums.available, data })
    })

    // 没有可用更新
    autoUpdater.on('update-not-available', () => {
      logger.info('没有可用更新')
      if (isAutoCheck) {
        isAutoCheck = false
      } else {
        webContents.send('check-for-updates', { type: updatesEnums.notAvailable })
      }
    })

    // 更新下载完成
    autoUpdater.on('update-downloaded', res => {
      logger.info('下载完毕！提示安装更新')
      logger.info(res)
      webContents.send('check-for-updates', { type: updatesEnums.downloaded })
    })
  }
  checkForUpdates()

  ipcMain.handle('check-for-updates', (_, type: string) => {
    switch (type) {
      case updatesEnums.check:
        autoUpdater.checkForUpdates()
        break
      case updatesEnums.downloading:
        autoUpdater.downloadUpdate()
        logger.info('退出应用，安装开始！')
        break
      case updatesEnums.quitAndInstall:
        logger.info('退出应用，安装开始！')
        autoUpdater.quitAndInstall()
        break
    }
  })
}
