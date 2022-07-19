const { writeFileSync } = require('fs')
const { resolve } = require('path')
const package = require('../package.json')

exports.rewritePackage = () => {
  package.dependencies = {}

  writeFileSync(resolve(__dirname, `../package.json`), JSON.stringify(package, null, 2)) // 写入最新的
}
