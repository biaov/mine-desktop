/**
 * 打包前钩子
 * https://www.electron.build/configuration/configuration#beforepack
 * 需要保留的依赖
 */
const needfulDepKeys = ['robotjs']

exports.default = async context => {
  /**
   * 获取 dependencies 对象
   */
  const {
    _devMetadata,
    _devMetadata: { dependencies }
  } = context.packager.info

  /**
   * 遍历并筛选 dependencies
   */
  const newDependencies = {}
  Object.entries(dependencies).forEach(([key, value]) => {
    needfulDepKeys.includes[key] && (newDependencies[key] = value)
  })

  _devMetadata.dependencies = newDependencies
  _devMetadata.devDependencies = {}
}
