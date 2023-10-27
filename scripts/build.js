const { exec } = require('child_process')
const { createCompile, log } = require('./create')
const { resolve } = require('path')
const { copyAssets } = require('./hooks')

!(async () => {
  try {
    await createCompile({ configFile: resolve(__dirname, '../app/vite.config.ts') })
    copyAssets()
  } catch (e) {
    console.log(e)
    process.exit(1)
  } finally {
    exec('electron-builder -c electron-builder.json', log)
  }
})()
