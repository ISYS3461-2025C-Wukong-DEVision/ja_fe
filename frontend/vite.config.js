import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8091, // Đổi số này thành cổng bạn muốn (ví dụ 8081 hoặc 8091)
  }
})
