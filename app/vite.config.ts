import { UserConfig } from 'vite'
import { resolve } from 'path'

const config: UserConfig = {
  root: __dirname,
  resolve: {
    alias: {
      '@': './src'
    }
  },
  build: {
    target: 'esnext',
    outDir: resolve(__dirname, '../dist/resources/app'),
    assetsDir: './',
    lib: {
      entry: '',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron', 'path', 'child_process', 'fs', 'robotjs'],
      output: {
        entryFileNames: '[name].cjs'
      }
    },
    ssr: false,
    ssrManifest: false,
    emptyOutDir: true
  }
}

export default config
