const { readdirSync, rmSync } = require('fs')

exports.default = context => {
  const localeDir = `${context.appOutDir}/locales/`
  const files = readdirSync(localeDir)
  if (!(files && files.length)) return
  files.forEach(name => {
    name !== 'zh-CN.pak' && rmSync(localeDir + name)
  })
}
