import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['acw.gixia.org', 'localhost'],
    https: false // Nginx handles HTTPS termination
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['acw.gixia.org', 'localhost'],
    https: false // Nginx handles HTTPS termination
  }
})