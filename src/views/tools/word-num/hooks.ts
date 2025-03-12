import { useRenderer } from '@/composables/useBridge'
import type { UseKeypadShareParam } from './types'

/**
 * 速度操作
 */
export const useSpeed = () => {
  /**
   * 默认速度
   */
  const defaultSpeed = 1000
  /**
   * 最小速度
   */
  const minSpeed = 100
  /**
   * 速度输入
   */
  const speed = ref(defaultSpeed)

  /**
   * 速度输入框
   */
  const onChange = () => {
    if (speed.value) {
      const newVal = parseFloat(`${speed.value}`)
      speed.value = Number.isNaN(newVal) ? defaultSpeed : newVal
    }
  }

  /**
   * 失去焦点
   */
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

  /**
   * 键盘输入
   */
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

  /**
   * 失去焦点
   */
  const onWordBlur = () => {
    ipcRenderer.invoke('wordNum', { type: 'end' })
  }

  return { onKeyup, onWordBlur }
}

/**
 * alert 提示
 */
export const useAlert = () => {
  /**
   * 列表数据
   */
  const alertList = ref([
    { message: '注意：当你开始的时候，请不要切换窗口，不然会自动停止，这是为了避免造成不好的影响。', type: 'warning' },
    { message: '提示：请切换到你要刷字数的输入法，在以下文本输入框输入，按键 s 表示开始，按键 e 表示停止。', type: 'info' },
    { message: '速度输入框：正整数，数值越大，速度越小，最小值为 100，当你改变速度时，得重新按键开始，才会生效。', type: 'info' }
  ])

  return { alertList }
}
