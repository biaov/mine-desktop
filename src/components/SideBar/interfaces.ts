import { Ref } from 'vue'

// meta 类型
export interface SidebarMeta {
  title: string
  antIcon?: string
}

interface Redirect {
  name?: string
}

// 导航子类型
export interface SidebarChildItem {
  name?: string
  path: string
  meta: SidebarMeta
  hidden?: boolean
  children?: SidebarChildItem[]
  redirect?: string | Redirect
}

// defineExpose
export interface SideBarExpose {
  sidebarStyle: string
}
// props
export interface Props {
  collapsed: boolean
}

// emits
export interface Emits {
  (event: 'update:collapsed', collapsed: boolean): void
}
