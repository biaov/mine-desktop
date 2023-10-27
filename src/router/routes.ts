import type { LazyVue, RouteItem } from './types'

const templateComponent: LazyVue = () => import('../views/layout/template.vue')
const modules = import.meta.glob('../views/**/*.vue')

/**
 * 路由配置
 */
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
      },
      {
        path: 'icon',
        name: 'window-icon',
        meta: {
          title: '更换图标'
        }
      },
      {
        path: 'open-app',
        name: 'icon-JC_011',
        meta: {
          title: '打开软件'
        }
      }
    ]
  },
  {
    path: 'web-rtc',
    meta: {
      title: 'Web RTC',
      antIcon: 'FundProjectionScreenOutlined'
    },
    redirect: { name: 'web-rtc-screen' },
    children: [
      {
        path: 'screen',
        name: 'web-rtc-screen',
        meta: {
          title: '屏幕展示'
        }
      },
      {
        path: 'screen-show',
        name: 'web-rtc-screen-show',
        meta: {
          title: '屏幕展示页',
          customLayout: true
        },
        hidden: true
      }
    ]
  },
  {
    path: 'tools',
    meta: {
      title: '工具',
      antIcon: 'ToolOutlined'
    },
    redirect: { name: 'tools-word-num' },
    children: [
      {
        path: 'word-num',
        name: 'tools-word-num',
        meta: {
          title: '刷字数'
        }
      },
      {
        path: 'short-chain',
        name: 'tools-short-chain',
        meta: {
          title: '生成短链'
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
    } else if (!item.component) {
      const path = (parentPath ? `${parentPath}/` : '') + item.path
      item.component = modules[`../views/${path}/index.vue`] as LazyVue
    }
  })
}
addComponents(routes)

export default routes
