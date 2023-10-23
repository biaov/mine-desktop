const { createViteServer, createElectronServer } = require('./server')
const { copyAssets } = require('./hooks')

!(async () => {
  try {
    const viteDevServer = await createViteServer()
    await viteDevServer.listen()
    await createElectronServer()
    copyAssets()
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
