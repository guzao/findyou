import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9988',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    }
  },
})
