import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      "asomatous-lorri-conciliatorily.ngrok-free.dev"
    ]
  },
  plugins: [react()],
})
