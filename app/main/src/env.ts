/**
 * 开发环境
 */
export const isDevelopment = import.meta.env.MODE === 'development'

/**
 * 非开发环境
 */
export const isUnDevelopment = !isDevelopment
