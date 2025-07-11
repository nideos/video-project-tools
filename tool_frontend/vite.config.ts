import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 允許所有主機訪問，包括 ngrok 域名
    host: true,
    strictPort: true,
    // 允許所有主機
    cors: true,
    allowedHosts: ['c53048b0da57.ngrok-free.app'],
    hmr: {
      // 允許所有主機的 HMR 連接
      clientPort: 443
    }
  }
})
