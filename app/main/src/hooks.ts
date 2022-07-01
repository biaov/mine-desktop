import { app, screen, Point, shell, IpcMainInvokeEvent, BrowserWindow } from 'electron'
import { exec } from 'child_process'
import packageJson from '../../../package.json'
import { useActionsReturn } from './interfaces'

// 主进程操作
export const useActions = (): useActionsReturn => {
  const window = BrowserWindow.getFocusedWindow() as BrowserWindow
  const startCursorPoint: Point = { x: 0, y: 0 }
  const startWindowPoint: Point = { x: 0, y: 0 }
  const { name, version } = packageJson

  // 打开网页
  const openAction = (e: IpcMainInvokeEvent, url: string) => {
    shell.openExternal(url)
  }

  // 最小化
  const minimizeAction = () => {
    window.minimize()
  }

  // 最大化
  const maximizeAction = () => {
    window.isMaximized() ? window.unmaximize() : window.maximize()
  }

  // 退出
  const quitAction = () => {
    app.quit()
  }

  // 移动开始点
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

  // 移动
  const moveAction = () => {
    const { x: sx, y: sy } = startCursorPoint
    const { x: wx, y: wy } = startWindowPoint
    const { x, y } = screen.getCursorScreenPoint()
    const cx = wx + x - sx
    const cy = wy + y - sy

    window.setPosition(cx, cy, true)
  }

  // 检查更新
  const checkUpdateAction = () => {
    // app.getVersion()
  }

  // 关于
  const aboutAction = () => {
    return { name, version }
  }

  // 锁屏
  const lockScreenAction = () => {
    exec('rundll32 user32.dll,LockWorkStation')
  }

  // 关机
  const shutdownAction = () => {
    exec('shutdown /s /t 0')
  }

  // 重启
  const restartAction = () => {
    exec('shutdown /r /t 0')
  }

  // 定时关机
  const timedShutdownAction = (e: IpcMainInvokeEvent, time: number) => {
    exec(`shutdown /s /t ${time}`)
  }

  // 取消定时关机
  const cancelTimedShutdownAction = (e: IpcMainInvokeEvent, time: number) => {
    exec(`shutdown -a`)
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
    cancelTimedShutdownAction
  }
}
