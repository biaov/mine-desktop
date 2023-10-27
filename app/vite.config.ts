import { UserConfig } from 'vite'
import { resolve } from 'path'

const config: UserConfig = {
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './')
    }
  },
  build: {
    watch:
      process.env.NODE_ENV === 'development'
        ? {
            clearScreen: false,
            exclude: [/node_modules/],
            buildDelay: 2000
          }
        : null,
    target: 'esnext',
    outDir: resolve(__dirname, '../dist/resources/app'),
    lib: {
      entry: '',
      formats: ['cjs']
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, './main.ts'),
        preload: resolve(__dirname, './preload.ts')
      },
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
