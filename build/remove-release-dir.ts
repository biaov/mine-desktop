import { existsSync, rmdirSync } from 'fs'
import { resolve } from 'path'
import type { PluginOption } from 'vite'
import packageJson from '../package.json'

/**
 * 移除 dist/release 目录
 */
export const removeReleaseDir = (): PluginOption => ({
  name: 'vite:remove-release-dir',
  buildStart() {
    const outDir = resolve(__dirname, `../dist/release/${packageJson.version}`)
    existsSync(outDir) && rmdirSync(outDir, { recursive: true })
  }
})
