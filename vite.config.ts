import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

function resolve(p: string) {
  return path.resolve(__dirname, p)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss()],
  base: '/echarts-example',
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  build: {
    target: 'esnext',
  },
})