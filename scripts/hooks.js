const { copyFileSync, readdirSync, mkdirSync, existsSync, rmSync } = require('fs')
const { resolve, join } = require('path')

/**
 * 复制资源
 */
exports.copyAssets = () => {
  const inputDir = resolve(__dirname, `../app/assets`)
  const outputDir = resolve(__dirname, `../dist/resources/assets`)
  const dirs = readdirSync(inputDir)
  existsSync(outputDir) && rmSync(outputDir, { recursive: true, force: true })
  mkdirSync(outputDir)
  dirs.forEach(file => {
    copyFileSync(join(inputDir, file), join(outputDir, file))
  })
}
