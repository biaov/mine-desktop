import { app, screen, Point, shell, IpcMainInvokeEvent, BrowserWindow, dialog, OpenDialogOptions } from 'electron'
import { exec } from 'child_process'
import packageJson from '../../../package.json'
import { AboutActionReturn } from './types'
import { copyFileSync, writeFileSync, rmSync } from 'fs'
import { isUnDevelopment } from './env'

/**
 * 主进程操作
 * @returns { Record<string, any> } 操作 API
 */
export const useActions = (): Record<string, any> => {
  const window = BrowserWindow.getFocusedWindow() as BrowserWindow
  const startCursorPoint: Point = { x: 0, y: 0 }
  const startWindowPoint: Point = { x: 0, y: 0 }
  const { name, version } = packageJson

  /**
   * 打开网页
   * @param { IpcMainInvokeEvent } e IpcMainInvokeEvent 对象
   * @param { string } url 网址
   */
  const openAction = (e: IpcMainInvokeEvent, url: string) => {
    shell.openExternal(url)
  }

  /**
   * 最小化
   */
  const minimizeAction = () => {
    window.minimize()
  }

  /**
   * 最大化
   */
  const maximizeAction = () => {
    window.isMaximized() ? window.unmaximize() : window.maximize()
  }

  /**
   * 退出
   */
  const quitAction = () => {
    app.quit()
  }

  /**
   * 移动开始点
   */
  const startAction = () => {
    // 窗口坐标
    const windowPoint = window.getPosition()
    startWindowPoint.x = windowPoint[0]
    startWindowPoint.y = windowPoint[1]

    // 鼠标坐标
    const { x, y } = screen.getCursorScreenPoint()
    startCursorPoint.x = x
    startCursorPoint.y = y
  }

  /**
   * 移动
   */
  const moveAction = () => {
    const { x: sx, y: sy } = startCursorPoint
    const { x: wx, y: wy } = startWindowPoint
    const { x, y } = screen.getCursorScreenPoint()
    const cx = wx + x - sx
    const cy = wy + y - sy

    window.setPosition(cx, cy, true)
  }

  /**
   * 检查更新
   */
  const checkUpdateAction = () => app.getVersion()

  /**
   * 关于
   * @returns { AboutActionReturn } 软件信息
   */
  const aboutAction = (): AboutActionReturn => {
    return { name, version }
  }

  /**
   * 锁屏
   */
  const lockScreenAction = () => {
    exec('rundll32 user32.dll,LockWorkStation')
  }

  /**
   * 关机
   */
  const shutdownAction = () => {
    exec('shutdown /s /t 0')
  }

  /**
   * 重启
   */
  const restartAction = () => {
    exec('shutdown /r /t 0')
  }

  /**
   * 定时关机
   * @param { IpcMainInvokeEvent } e IpcMainInvokeEvent 对象
   * @param { number } time 定时时间
   */
  const timedShutdownAction = (e: IpcMainInvokeEvent, time: number) => {
    exec(`shutdown /s /t ${time}`)
  }

  /**
   * 取消定时关机
   */
  const cancelTimedShutdownAction = () => {
    exec(`shutdown -a`)
  }

  /**
   * 选择文件
   * @param { IpcMainInvokeEvent } e IpcMainInvokeEvent 对象
   * @param { OpenDialogOptions } param1 Electron.OpenDialogOptions 对象
   * @returns { Promise<string | undefined> } 文件路径
   */
  const selectFileAction = async (e: IpcMainInvokeEvent, { title, filters }: OpenDialogOptions) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title,
      filters,
      properties: ['openFile']
    })
    if (canceled || !filePaths.length) return
    return filePaths[0]
  }
  /**
   * 选择文件夹
   * @param { IpcMainInvokeEvent } e IpcMainInvokeEvent 对象
   * @param { OpenDialogOptions } param1 Electron.OpenDialogOptions 对象
   * @returns { Promise<string | undefined> } 文件路径
   */
  const selectFolderAction = async (e: IpcMainInvokeEvent, { title }: OpenDialogOptions) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title,
      properties: ['openDirectory']
    })
    if (canceled || !filePaths.length) return
    return filePaths[0]
  }

  /**
   * 磁盘图标
   * @param { IpcMainInvokeEvent } e IpcMainInvokeEvent 对象
   * @param { string } path 路径
   */
  const diskAction = (e: IpcMainInvokeEvent, path: string) => {
    const rootPath = `${path.slice(0, 2)}/`
    copyFileSync(path, `${rootPath}custom-disk.ico`)
    writeFileSync(`${rootPath}disk.inf`, `[autorun]icon=custom-disk.ico`)
  }

  /**
   * 重置磁盘图标
   * @param { IpcMainInvokeEvent } e IpcMainInvokeEvent 对象
   * @param { string } path 路径
   */
  const diskResetAction = (e: IpcMainInvokeEvent, path: string) => {
    const rootPath = `${path.slice(0, 2)}/`
    rmSync(`${rootPath}custom-disk.ico`)
    rmSync(`${rootPath}disk.inf`)
    isUnDevelopment && rmSync(`${rootPath}autoinf.inf`)
  }

  return {
    openAction,
    minimizeAction,
    maximizeAction,
    quitAction,
    startAction,
    moveAction,
    checkUpdateAction,
    aboutAction,
    lockScreenAction,
    shutdownAction,
    restartAction,
    timedShutdownAction,
    cancelTimedShutdownAction,
    selectFileAction,
    selectFolderAction,
    diskAction,
    diskResetAction
  }
}
