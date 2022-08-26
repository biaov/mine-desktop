import { SidebarChildItem } from '@/components/SideBar/types'

export type Lazy<T> = () => Promise<T> // 懒加载
export type LazyVue = Lazy<Record<string, any>>

// routes item
export interface RouteItem extends SidebarChildItem {
  component?: LazyVue
  hidden?: boolean
}
