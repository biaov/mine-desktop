import { ref, onMounted } from 'vue'
import { useRenderer } from '@/composables/useBridge'
import { DesktopCapturerSource } from './types'

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
              maxWidth: screen.width,
              maxHeight: screen.height
            }
          }
        } as any)
        .then(stream => {
          const video = v1Ref.value!
          video.srcObject = stream
          video.onloadedmetadata = video.play
        })
    })
  })

  return { v1Ref }
}
