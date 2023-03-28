import axios, { AxiosRequestConfig, Canceler } from 'axios'
import { baseURL } from '@/config'
import { message } from 'ant-design-vue'

const pendingAjax: string[] = [] // 等待请求
const { CancelToken } = axios
const cacelKey = 'requesting' // 请求 key

// 移除等待请求
const removePendingAjax = (config: AxiosRequestConfig<any>, cancel?: Canceler) => {
  const params = typeof config.params === 'string' ? config.params : JSON.stringify(config.params)
  const data = typeof config.data === 'string' ? config.data : JSON.stringify(config.data)
  const url = (config.url as string) + config.method + params + data
  const index = pendingAjax.findIndex(item => item === url)
  // 是否已存在
  if (index > -1) {
    cancel ? cancel(cacelKey) : pendingAjax.splice(index, 1)
  } else {
    cancel && pendingAjax.push(url)
  }
}

// 创建 axios 实例
export const service = axios.create({
  baseURL,
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// request 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加取消 key
    config.cancelToken = new CancelToken(cancel => {
      removePendingAjax(config, cancel)
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone 响应拦截器
service.interceptors.response.use(
  response => {
    removePendingAjax(response.config)
    return response.data
  },
  ({ response, message: msg }) => {
    if (msg === cacelKey) return Promise.reject(msg)
    const { status, config, data } = response
    removePendingAjax(config)
    switch (status) {
      case 401:
        break
      case 400:
      case 422:
        message.error(data)
        break
    }
    return Promise.reject(response)
  }
)
