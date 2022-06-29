import { createVNode, computed } from 'vue'
import * as icons from '@ant-design/icons-vue'
import { Props } from './interfaces'

// 图标
export const useIcon = (props: Props) => {
  const curIcon = computed(() => createVNode((icons as any)[props.name], { class: ['cur-icon', props.type] }))

  return { curIcon }
}
