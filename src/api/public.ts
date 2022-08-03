import service from '@/utils/request'

// 获取最新的版本号
export const newVersionApi = () => service.get('package.json?v=1')
