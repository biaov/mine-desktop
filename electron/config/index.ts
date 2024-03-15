import type { HandleChannelItem } from '../types'

/**
 * icp 程序
 */
export const handleChannels: HandleChannelItem[] = [
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
  },
  {
    channel: 'copy'
  },
  {
    channel: 'openApp'
  }
]
