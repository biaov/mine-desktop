const { build, createLogger } = require('vite')

const sharedConfig = { logLevel: 'info' }
exports.sharedConfig = sharedConfig

exports.createCompile = ({ configFile, mode = 'production' }) =>
  build({
    ...sharedConfig,
    configFile,
    mode
  })

const logger = createLogger('warn', {
  prefix: '[ 日志 ]'
})

exports.log = (error, stdout) => {
  if (!(error && error.toString().trim())) return
  logger.warn(error.toString(), { timestamp: true })
  stdout && logger.warn(stdout, { timestamp: true })
}
