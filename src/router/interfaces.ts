import { SidebarChildItem } from '@/components/SideBar/interfaces'
import { LazyVue } from './types'

// routes item
export interface RouteItem extends SidebarChildItem {
  component?: LazyVue
  hidden?: boolean
}
