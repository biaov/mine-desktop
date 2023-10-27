import { defineConfig, UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

export const config: UserConfig = {
  base: './',
  plugins: [eslint(), vue()],
  resolve: {
    /**
     * 路径别名
     */
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './app')
    }
  },
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
    port: 3400
  },
  build: {
    outDir: './dist/resources/vue',
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
}

export default defineConfig(config)
