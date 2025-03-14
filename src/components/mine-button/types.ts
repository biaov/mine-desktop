/**
 * 传参
 */
export interface Props {
  type: string
  antIcon?: string
  icon?: string
  tips?: string
}

/**
 * 事件
 */
export interface Emits {
  (event: 'click'): void
}
