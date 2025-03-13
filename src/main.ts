import Antd from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import '@/styles/tailwindcss.css'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#mine-desktop')
