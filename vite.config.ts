import { defineConfig } from 'vite'
import type { InlineConfig } from 'vite'
import { resolve } from 'path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import tailwindcss from '@tailwindcss/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'

const sameViteConfig: InlineConfig = {
  resolve: {
    /**
     * 路径别名
     */
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      '~': resolve(import.meta.dirname, './electron')
    }
  }
}

const electronBuild: InlineConfig = {
  build: {
    outDir: 'dist/resources/electron',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
}

export default defineConfig({
  ...sameViteConfig,
  base: './',
  plugins: [
    tailwindcss(),
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
        input: resolve(import.meta.dirname, 'electron/preload.ts'),
        vite: electronBuild
      },
      renderer: {}
    }),
    autoImport({
      imports: ['vue', { vue: ['createApp', 'createVNode'] }, 'vue-router'],
      dirs: ['./src/composables'],
      dts: './types/auto-imports.d.ts',
      eslintrc: { enabled: true, filepath: './types/.eslintrc-auto-import.json', globalsPropValue: true }
    }),
    components({ extensions: ['vue'], include: [/\.vue$/, /\.vue\?vue/], exclude: [/node_modules/, 'types.ts'], dts: './types/components.d.ts' })
  ],
  css: {
    /**
     * 配置预编译器
     */
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import '@/styles/vars.less';`
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
