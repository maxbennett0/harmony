import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../harmony/client',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})
