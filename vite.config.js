import { fileURLToPath, URL } from 'node:url'


import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return{
  server: {
    proxy: {
      '/api/auth/signin': {
        target: `${env.VITE_BACKEND}`,
        // changeOrigin: true,
        // secure: false,
      },
      '/student' : {
        target: `${env.VITE_BACKEND}`
      },
      '/course': {
        target: `${env.VITE_BACKEND}`,
      },
    }
  },

  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },


 };
});
