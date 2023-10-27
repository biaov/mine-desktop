import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import routes from '@/router/routes'
import { RouteItem } from '@/router/types'
import type { Props, Emits } from './types'

export const useMenu = (props: Readonly<Required<Props>>, emit: Emits) => {
  const router = useRouter()
  const listData = ref(routes)
  /**
   * 是否收缩
   */
  const isCollapsed = ref(props.collapsed)
  const sidebarStyle = computed(() => `--sidebar-width:${isCollapsed.value ? 80 : 200}px;`)
  const onCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
    emit('update:collapsed', isCollapsed.value)
  }

  const onMenuItem = (item: RouteItem) => {
    router.push({ name: item.name })
  }

  return { listData, isCollapsed, sidebarStyle, onCollapsed, onMenuItem }
}

export const useMenuOpen = () => {
  const { name } = useRoute()
  const openKeys = ref<string[]>([])
  const selectedKeys = ref<string[]>([name as string])

  const findRoute = (list: RouteItem[]): number => list.findIndex(item => (item.children ? findRoute(item.children) >= 0 : item.name === name))
  openKeys.value.push(`${findRoute(routes)}`)

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => !openKeys.value.includes(key)) as string
    openKeys.value = latestOpenKey ? [latestOpenKey] : []
  }

  return { openKeys, selectedKeys, onOpenChange }
}
