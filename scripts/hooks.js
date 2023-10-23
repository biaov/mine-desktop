const { copyFileSync, readdirSync, mkdirSync } = require('fs')
const { resolve, join } = require('path')

/**
 * 复制资源
 */
exports.copyAssets = () => {
  const inputDir = resolve(__dirname, `../app/main/src/assets`)
  const outputDir = resolve(__dirname, `../dist/resources/app/main/assets`)
  const dirs = readdirSync(inputDir)
  mkdirSync(outputDir)
  dirs.forEach(file => {
    copyFileSync(join(inputDir, file), join(outputDir, file))
  })
}
