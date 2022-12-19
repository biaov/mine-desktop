import { ref } from 'vue'
import { useRenderer } from '@/composables/useBridge'
import { UseKeypadShareParam } from './types'

/**
 * 速度操作
 */
export const useSpeed = () => {
  const defaultSpeed = 1000 // 默认速度
  const minSpeed = 100 // 最小速度
  const speed = ref(defaultSpeed) // 速度输入

  // 速度输入框
  const onChange = () => {
    if (speed.value) {
      const newVal = parseFloat(`${speed.value}`)
      speed.value = Number.isNaN(newVal) ? defaultSpeed : newVal
    }
  }

  // 失去焦点
  const onBlur = () => {
    speed.value < minSpeed && (speed.value = defaultSpeed)
  }

  return { speed, onChange, onBlur }
}

/**
 * 键盘操作
 */
export const useKeypad = ({ speed }: UseKeypadShareParam) => {
  const { ipcRenderer } = useRenderer()

  // 键盘输入
  const onKeyup = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyS':
        ipcRenderer.invoke('wordNum', { type: 'start', speed: speed.value })
        break
      case 'KeyE':
        ipcRenderer.invoke('wordNum', { type: 'end' })
        break
      default:
        break
    }
  }

  // 失去焦点
  const onWordBlur = () => {
    ipcRenderer.invoke('wordNum', { type: 'end' })
  }

  return { onKeyup, onWordBlur }
}
