import { defineConfig } from 'vite'
import type { InlineConfig } from 'vite'
import { resolve } from 'path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

const sameViteConfig: InlineConfig = {
  resolve: {
    /**
     * 路径别名
     */
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './electron')
    }
  }
}

const electronBuild: InlineConfig = {
  build: {
    outDir: 'dist/resources/electron'
  }
}

export default defineConfig({
  ...sameViteConfig,
  base: './',
  plugins: [
    eslint({
      lintOnStart: true,
      exclude: ['node_modules']
    }),
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          ...sameViteConfig,
          ...electronBuild
        }
      },
      preload: {
        input: resolve(__dirname, 'electron/preload.ts'),
        vite: electronBuild
      },
      renderer: {}
    })
  ],
  css: {
    /**
     * 配置预编译器
     */
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import '@/styles/variables.less';`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3400,
    proxy: {}
  },
  build: {
    outDir: 'dist/resources/vue',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'ant-design-vue': ['ant-design-vue', '@ant-design/icons-vue']
        }
      }
    },
    chunkSizeWarningLimit: 600,
    commonjsOptions: {
      ignoreTryCatch: false
    }
  }
})
