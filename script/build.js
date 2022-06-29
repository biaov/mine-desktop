const { exec } = require('child_process')
const { createCompile, log } = require('./create')
const { resetPath } = require('./path')

!(async () => {
  const viteConfigPaths = ['preload', 'main'].map(path => resetPath(`@/electron/${path}/vite.config.ts`))
  try {
    const tasks = viteConfigPaths.map(async configFile => await createCompile({ configFile }))
    await Promise.all(tasks)
  } catch (e) {
    console.log(e)
    process.exit(1)
  } finally {
    exec('electron-builder -c electron-builder.json', log)
  }
})()
