import { Props, Emits } from './types'

/**
 * 操作项
 */
export const useHandle = (props: Readonly<Props>, emit: Emits) => {
  const onClick = () => {
    emit('click')
  }

  return { onClick }
}
