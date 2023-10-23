const { exec } = require('child_process')
const { createCompile, log } = require('./create')
const { resolve } = require('path')
const { copyAssets } = require('./hooks')

!(async () => {
  const viteConfigPaths = ['preload', 'main'].map(path => resolve(__dirname, `../app/${path}/vite.config.ts`))
  try {
    const tasks = viteConfigPaths.map(async configFile => await createCompile({ configFile }))
    await Promise.all(tasks)
    copyAssets()
  } catch (e) {
    console.log(e)
    process.exit(1)
  } finally {
    exec('electron-builder -c electron-builder.json', log)
  }
})()
