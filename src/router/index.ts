import { createRouter, createWebHashHistory, Router } from 'vue-router'
import routes from './routes'

// 路由实例
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'layout'
      }
    },
    {
      path: '/',
      name: 'layout',
      redirect: {
        name: 'dashboard'
      },
      component: () => import(`@/views/layout/index.vue`),
      children: routes as any[]
    }
  ]
})

export default router
