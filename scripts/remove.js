const { rmdirSync, existsSync, readdirSync, statSync, unlinkSync } = require('fs')
const { resolve } = require('path')

const removeDir = path => {
  if (!existsSync(path)) return
  readdirSync(path).forEach(file => {
    const curPath = `${path}/${file}`
    if (statSync(curPath).isDirectory()) {
      removeDir(curPath)
    } else {
      unlinkSync(curPath)
    }
  })
  rmdirSync(path)
}
removeDir(resolve(__dirname, '../dist'))
