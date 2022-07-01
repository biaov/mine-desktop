import { LibraryOptions, BuildOptions } from 'vite'
import { resolve, join } from 'path'
import config from '../vite.config'

const build = config.build as BuildOptions
const lib = build.lib as LibraryOptions
lib.entry = resolve(__dirname, './src/index.ts')
build.outDir = join(`${build.outDir}/preload`)

export default config
