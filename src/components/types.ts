import { Component } from 'vue'

/**
 * 默认插槽参数
 */
export type DefaultSlotProp = (props: {}) => unknown

/**
 * 默认插槽类型
 */
export interface DefaultSlots {
  default: DefaultSlotProp
}

/**
 * 组件模块
 */
export interface Module {
  default: Component
}
