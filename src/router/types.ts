import { SidebarChildItem } from '@/components/SideBar/types'

/**
 * 懒加载
 */
export type Lazy<T> = () => Promise<T>
export type LazyVue = Lazy<Record<string, any>>

/**
 * routes item
 */
export interface RouteItem extends SidebarChildItem {
  component?: LazyVue
  hidden?: boolean
}
