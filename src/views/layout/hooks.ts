import { ref } from 'vue'
import { SideBarExpose } from '@/components/SideBar/interfaces'

export const useLayout = () => {
  const sidebarRef = ref<SideBarExpose>()
  const isCollapsed = ref(false)

  return { sidebarRef, isCollapsed }
}
