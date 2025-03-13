const { existsSync, rmSync } = require('fs')
const { join } = require('path')
const packageJson = require('../package.json')

exports.default = () => {
  const outDir = join(process.cwd(), `dist/release/${packageJson.version}`)
  existsSync(outDir) && rmSync(outDir, { recursive: true, force: true })
}
