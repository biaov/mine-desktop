/**
 * @file 初始化程序
 */
import { app, BrowserWindow } from 'electron'
import { createWindow } from './window'

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    !BrowserWindow.getAllWindows().length && createWindow()
  })
})

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})
