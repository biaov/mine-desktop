import { useRenderer } from '@/composables/useBridge'

/**
 * 屏幕展示
 */
export const useScreen = () => {
  const { ipcRenderer } = useRenderer()

  const onShowScreen = () => {
    ipcRenderer.invoke('openWindow', { path: 'web-rtc/screen-show' })
  }

  return { onShowScreen }
}
