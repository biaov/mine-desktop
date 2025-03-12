import type { Emits } from './types'

/**
 * 操作项
 */
export const useHandle = (emit: Emits) => {
  const onClick = () => {
    emit('click')
  }

  return { onClick }
}
