const { createViteServer, createElectronServer } = require('./server')

!(async () => {
  try {
    const viteDevServer = await createViteServer()
    await viteDevServer.listen()
    await createElectronServer()
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
