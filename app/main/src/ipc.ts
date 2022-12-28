import { ipcMain, app } from 'electron'
import { HandleChannelItem, CurIpcMain } from './types'
import { useActions } from './hooks'

// icp 程序
export const setupIcp = () => {
  const actions = useActions()

  const handleChannels: HandleChannelItem[] = [
    {
      channel: 'open'
    },
    {
      channel: 'minimize'
    },
    {
      channel: 'maximize'
    },
    {
      channel: 'quit'
    },
    {
      type: 'on',
      channel: 'start'
    },
    {
      type: 'on',
      channel: 'move'
    },
    {
      channel: 'about'
    },
    {
      channel: 'checkUpdate'
    },
    {
      channel: 'lockScreen'
    },
    {
      channel: 'shutdown'
    },
    {
      channel: 'restart'
    },
    {
      channel: 'timedShutdown'
    },
    {
      channel: 'cancelTimedShutdown'
    },
    {
      channel: 'disk'
    },
    {
      channel: 'diskReset'
    },
    {
      channel: 'selectFile'
    },
    {
      channel: 'selectFolder'
    },
    {
      channel: 'activateSystem'
    },
    {
      channel: 'capturer'
    },
    {
      channel: 'openWindow'
    },
    {
      channel: 'wordNum'
    },
    {
      channel: 'visibleDesktop'
    }
  ]

  handleChannels.forEach(item => {
    const curIpcMain = ipcMain as CurIpcMain
    curIpcMain[item.type || 'handle'](item.channel, actions[`${item.channel}Action`])
  })
}
