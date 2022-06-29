export type Lazy<T> = () => Promise<T> // 懒加载
export type LazyVue = Lazy<{
  [key: string]: any
}>
