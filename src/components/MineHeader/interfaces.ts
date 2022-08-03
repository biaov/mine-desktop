import { Ref } from 'vue'

// 列表
export interface ListItem {
  label?: string
  value: string
  shortcut?: string
  children?: ListItem[]
  disabled?: boolean
  state?: boolean
  iconName?: string
  action?: () => void
  title?: string
}

// 共享数据
export interface ShareData {
  menuList: Ref<ListItem[]>
  onClearAll: (list?: ListItem[]) => void
  onHideDropdown: (callback: () => void) => void
}

// 下拉配置
export interface DropdownConfig {
  visible: boolean
  x: string | number
  y: string | number
}

// useContextmenu 返回数据
export interface ContextmenuReturn {
  dropdownList: Ref<ListItem[]>
  dropdownConfig: Ref<DropdownConfig>
  onDropdownItem: (item: ListItem) => void
  onContextmenu: (e: MouseEvent) => void
}

export interface MoveReturn {
  onMousedown: (e: MouseEvent) => void
}

// package.json
export interface PackageJson {
  name: string
  version: string
}

// okButtonProps
export interface OkButtonProps {
  type: string
  danger?: boolean
}

// modal
export interface Modal {
  visible: boolean
  title: string
  cancelText: string
  type: string
  okButtonProps: OkButtonProps
  okText: string
  content: string
}
