import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    server: {
      cors: true,
      open: true,
      origin: 'http://localhost:8080',
      host: 'localhost',
      port: '8080',
      proxy: {
        '/fin': 'http://localhost:8080',
        '/api': {
          target: 'http://193.32.177.49',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    define: {
      'process.env': env
    },
    plugins: [react()],
  }
})