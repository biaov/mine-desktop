import type { SideBarExpose } from '@/components/side-bar/types'

export const useLayout = () => {
  const sidebarRef = ref<SideBarExpose>()
  const isCollapsed = ref(false)

  return { sidebarRef, isCollapsed }
}
