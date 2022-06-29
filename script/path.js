const { resolve } = require('path')

// 重置路径
exports.resetPath = (filePath, defaultPrefix = '../') => {
  const prefix = filePath.slice(0, 1) === '@' ? defaultPrefix : ''
  return resolve(__dirname, prefix + filePath.slice(1))
}
