import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#mine-desktop')
