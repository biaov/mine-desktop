import { RouteItem } from './interfaces'
import { LazyVue } from './types'

const templateComponent: LazyVue = () => import('../views/layout/template.vue')
const modules = import.meta.glob('../views/**/*.vue')
// 路由配置
const routes: RouteItem[] = [
  {
    path: 'dashboard',
    name: 'dashboard',
    meta: {
      title: '首页',
      antIcon: 'HomeOutlined'
    }
  },
  {
    path: 'window',
    meta: {
      title: 'Window 操作',
      antIcon: 'WindowsOutlined'
    },
    redirect: { name: 'window-common' },
    children: [
      {
        path: 'common',
        name: 'window-common',
        meta: {
          title: '常规操作'
        }
      }
    ]
  }
]

const addComponents = (list: RouteItem[], parentPath?: string) => {
  list.forEach(item => {
    if (item.children) {
      item.component = templateComponent
      addComponents(item.children, item.path)
    } else {
      const path = (parentPath ? `${parentPath}/` : '') + item.path
      item.component = modules[`../views/${path}/index.vue`]
    }
  })
}
addComponents(routes)

export default routes
