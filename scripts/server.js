const { createServer } = require('vite')
const electron = require('electron')
const { spawn } = require('child_process')
const { resolve } = require('path')
const { createCompile, sharedConfig, log } = require('./create')
const { copyAssets } = require('./hooks')

/**
 * vite 服务
 */
exports.createViteServer = () =>
  createServer({
    ...sharedConfig,
    configFile: resolve(__dirname, '../vite.config.ts')
  })

/**
 * electron 服务
 */
exports.createElectronServer = async () => {
  /**
   * 编译 app 程序
   */
  const result = await createCompile({
    mode: 'development',
    configFile: resolve(__dirname, '../app/vite.config.ts')
  })
  let isFirst = true
  let spawnProgress
  let beforeKill = false
  result.on('event', e => {
    if (e.code !== 'BUNDLE_END') return
    isFirst && copyAssets()
    isFirst = false

    /**
     * 启动 electron
     * 如果之前存在则杀掉进程
     */
    if (spawnProgress) {
      beforeKill = true
      spawnProgress.kill()
    }
    spawnProgress = spawn(String(electron), ['.', ' -enable-webgl', '--no-sandbox', '--disable-dev-shm-usage'])
    spawnProgress.stdout.on('data', log)
    spawnProgress.stdout.on('close', () => {
      if (beforeKill) {
        beforeKill = false
      } else {
        process.exit(0)
      }
    })
  })
}
