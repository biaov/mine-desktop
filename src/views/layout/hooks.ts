import { ref } from 'vue'
import type { SideBarExpose } from '@/components/SideBar/types'

export const useLayout = () => {
  const sidebarRef = ref<SideBarExpose>()
  const isCollapsed = ref(false)

  return { sidebarRef, isCollapsed }
}
