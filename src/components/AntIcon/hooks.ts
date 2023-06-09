import { createVNode, computed } from 'vue'
import * as icons from '@ant-design/icons-vue'
import type { Props } from './types'

/**
 * 图标
 */
export const useIcon = (props: Readonly<Required<Props>>) => {
  const curIcon = computed(() => createVNode((icons as any)[props.name], { class: ['cur-icon', props.type] }))

  return { curIcon }
}
