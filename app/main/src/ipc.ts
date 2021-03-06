import { ipcMain, app } from 'electron'
import packageJson from '../../../package.json'
import { HandleChannelItem, CurIpcMain } from './interfaces'
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
    }
  ]

  handleChannels.forEach(item => {
    const curIpcMain = ipcMain as CurIpcMain
    curIpcMain[item.type || 'handle'](item.channel, actions[`${item.channel}Action`])
  })
}
