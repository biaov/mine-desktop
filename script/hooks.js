const { writeFileSync, copyFileSync, readdirSync, mkdirSync } = require('fs')
const { resolve, join } = require('path')
const package = require('../package.json')

exports.rewritePackage = () => {
  package.dependencies = {}

  writeFileSync(resolve(__dirname, `../package.json`), JSON.stringify(package, null, 2)) // 写入最新的
}

// 复制资源
exports.copyAssets = () => {
  const inputDir = resolve(__dirname, `../app/main/src/assets`)
  const outputDir = resolve(__dirname, `../dist/resources/app/main/assets`)
  const dirs = readdirSync(inputDir)
  mkdirSync(outputDir)
  dirs.forEach(file => {
    copyFileSync(join(inputDir, file), join(outputDir, file))
  })
}
