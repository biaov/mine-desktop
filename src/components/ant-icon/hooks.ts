import * as icons from '@ant-design/icons-vue'
import type { Props } from './types'

/**
 * 图标
 */
export const useIcon = (prop: Readonly<Props>) => {
  const curIcon = computed(() => createVNode(icons[prop.name as keyof typeof icons], { class: ['cur-icon', prop.type] }))

  return { curIcon }
}
