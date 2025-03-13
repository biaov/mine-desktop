/**
 * listData item
 */
export interface ListItem {
  type: string
  danger?: boolean
  label: string
  value: string
  icon?: string
  antIcon?: string
  tips?: string
  action?: () => void
}

/**
 * okButtonProps
 */
export interface OkButtonProps {
  type: string
  danger?: boolean
}

/**
 * modal
 */
export interface Modal {
  visible: boolean
  selectValue: string
  title: string
  cancelText: string
  okButtonProps: OkButtonProps
  okText: string
  content: string
  time: number | null
}
