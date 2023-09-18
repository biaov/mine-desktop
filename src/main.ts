import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import components from './components'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

Object.entries(components).forEach(([name, value]) => {
  app.component(name, value)
})

app.use(router)
app.use(Antd)
app.mount('#mine-desktop')
