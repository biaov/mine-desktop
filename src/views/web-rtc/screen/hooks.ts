import { useRenderer } from '@/composables/useBridge'

// 屏幕展示
export const useScreen = () => {
  const { ipcRenderer } = useRenderer()
  const onShowScreen = () => {
    try {
      ipcRenderer.invoke('openWindow', { path: 'web-rtc/screen-show' })
    } catch (error) {
      console.log(error, '--error')
    }
  }

  return { onShowScreen }
}
