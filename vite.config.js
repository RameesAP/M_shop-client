import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:5000",
        target: "https://m-shop-server-dd28.onrender.com",
        secure: true,
        changeOrigin: true,
        // credentials: "include",
      },
    },
    port: 3000,
  },
  plugins: [react()],
})
