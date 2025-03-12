import { useRenderer } from '@/composables/useBridge'
import type { DesktopCapturerSource } from './types'

/**
 * 连接
 */
export const useConnection = () => {
  const { ipcRenderer } = useRenderer()
  const v1Ref = ref<HTMLVideoElement>()
  onMounted(() => {
    ipcRenderer.invoke('capturer').then(([{ id }]: DesktopCapturerSource[]) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          peerIdentity: '666666',
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: id,
              maxWidth: globalThis.screen.width,
              maxHeight: globalThis.screen.height
            }
          }
        } as MediaStreamConstraints)
        .then(stream => {
          const video = v1Ref.value!
          video.srcObject = stream
          video.onloadedmetadata = video.play
        })
    })
  })

  return { v1Ref }
}
