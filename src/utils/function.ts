import { colorList } from '@/config'

/**
 * 随机颜色
 * @example
 * ```js
 * import { randomColor } from '@/utils/function'
 *
 * randomColor() // #2d8cf0
 * ```
 */
export const randomColor = () => colorList[Math.floor(Math.random() * colorList.length)]

/**
 * 批量随机颜色
 * @example
 * ```js
 * import { randomColors } from '@/utils/function'
 *
 * randomColors() // #2d8cf0
 * ```
 */
export const randomColors = (length: number, colors: string[] = []): string[] => {
  if (colors.length === length) return colors

  const color = randomColor()
  !colors.includes(color) && colors.push(color)

  return randomColors(length, colors)
}

/**
 * 简易深拷贝
 * 当前项目够用
 * 如果需要支持更多类型，推荐使用 `lodash` 的 cloneDeep 方法
 * 或者其它方法
 */
export const cloneDeep = <T>(arg: T): T => JSON.parse(JSON.stringify(arg))

/**
 * 随机 ID
 */
export const randomId = () => `${+new Date()}${Math.random().toString(36).substring(2)}`
