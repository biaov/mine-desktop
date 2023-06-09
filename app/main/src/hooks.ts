import { app, screen, Point, shell, IpcMainInvokeEvent, BrowserWindow, dialog, OpenDialogOptions, desktopCapturer, DesktopCapturerSource, clipboard } from 'electron'
import { exec } from 'child_process'
import { copyFileSync, writeFileSync, rmSync } from 'fs'
import { resolve } from 'path'
import robot from 'robotjs'
import packageJson from '../../../package.json'
import { AboutActionReturn, FnReturn, OpenWindowActionParam, WordNumActionParam, VisibleDesktopParam } from './types'
import { isUnDevelopment } from './env'
import { createWindow } from './window'

/**
 * 主进程操作
 * @returns { Record<string, FnReturn> } 操作 API
 */
export const useActions = (): Record<string, FnReturn> => {
  const startCursorPoint: Point = { x: 0, y: 0 }
  const startWindowPoint: Point = { x: 0, y: 0 }
  const { name, version } = packageJson

  /**
   * 获取窗口
   */
  const getWindow = () => BrowserWindow.getFocusedWindow() as BrowserWindow

  /**
   * 打开网页
   */
  const openAction = (e: IpcMainInvokeEvent, url: string) => {
    shell.openExternal(url)
  }

  /**
   * 最小化
   */
  const minimizeAction = () => {
    const window = getWindow()
    window.minimize()
  }

  /**
   * 最大化
   */
  const maximizeAction = () => {
    const window = getWindow()
    window.isMaximized() ? window.unmaximize() : window.maximize()
  }

  /**
   * 退出
   */
  const quitAction = () => {
    const window = getWindow()
    window.close()
  }

  /**
   * 移动开始点
   */
  const startAction = () => {
    const window = getWindow()

    /**
     * 窗口坐标
     */
    const windowPoint = window.getPosition()
    startWindowPoint.x = windowPoint[0]
    startWindowPoint.y = windowPoint[1]

    /**
     * 鼠标坐标
     */
    const { x, y } = screen.getCursorScreenPoint()
    startCursorPoint.x = x
    startCursorPoint.y = y
  }

  /**
   * 移动
   */
  const moveAction = () => {
    const window = getWindow()
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
   *  关于
   */
  const aboutAction = (): AboutActionReturn => ({ name, version })

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
   */
  const diskAction = (e: IpcMainInvokeEvent, path: string) => {
    const rootPath = `${path.slice(0, 2)}/`
    copyFileSync(path, `${rootPath}custom-disk.ico`)
    writeFileSync(`${rootPath}disk.inf`, `[autorun]icon=custom-disk.ico`)
  }

  /**
   * 重置磁盘图标
   */
  const diskResetAction = (e: IpcMainInvokeEvent, path: string) => {
    const rootPath = `${path.slice(0, 2)}/`
    rmSync(`${rootPath}custom-disk.ico`)
    rmSync(`${rootPath}disk.inf`)
    isUnDevelopment && rmSync(`${rootPath}autoinf.inf`)
  }

  /**
   * 激活系统
   */
  const activateSystemAction = () => {
    exec(`start ${resolve(__dirname, './assets/activateSystem.bat')}`)
  }

  /**
   * 远程控制
   */
  const capturerAction = async (): Promise<DesktopCapturerSource[]> => await desktopCapturer.getSources({ types: ['window', 'screen'] })

  /**
   * 打开子窗口
   */
  const openWindowAction = (e: IpcMainInvokeEvent, { path }: OpenWindowActionParam) => {
    createWindow(path)
  }

  let wordNumStatus = true

  /**
   * 开始刷数量
   */
  const startBrushNum = (speed = 1000) => {
    setTimeout(() => {
      robot.keyTap('a')
      robot.keyTap('2')
      wordNumStatus && startBrushNum(speed)
    }, speed)
  }

  /**
   * 键盘输入字数
   */
  const wordNumAction = (e: IpcMainInvokeEvent, { type, speed = 1000 }: WordNumActionParam) => {
    switch (type) {
      case 'start':
        wordNumStatus = true
        startBrushNum(speed)
        break
      case 'end':
        wordNumStatus = false
        break
    }
  }

  /**
   * 显示隐藏桌面
   */
  const visibleDesktopAction = (e: IpcMainInvokeEvent, { type }: VisibleDesktopParam) => {
    switch (type) {
      case 'show':
        exec(`explorer`)
        break
      case 'hide':
        exec(`taskkill /f /im explorer.exe`)
        break
    }
  }

  /**
   * 复制到剪切板
   */
  const copyAction = (e: IpcMainInvokeEvent, content: string) => {
    clipboard.writeText(content, 'clipboard')
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
    diskResetAction,
    activateSystemAction,
    capturerAction,
    openWindowAction,
    wordNumAction,
    visibleDesktopAction,
    copyAction
  }
}
