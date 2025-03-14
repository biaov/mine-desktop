import type { SidebarChildItem } from '@/components/side-bar/types'

/**
 * 懒加载
 */
export type Lazy<T> = () => Promise<T>
export type LazyVue = Lazy<Record<string, unknown>>

/**
 * routes item
 */
export interface RouteItem extends SidebarChildItem {
  component?: LazyVue
  hidden?: boolean
}
