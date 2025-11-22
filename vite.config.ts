import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': '/src/utils',
      '@components': '/src/components',
      '@pages': '/src/pages',
    },
  },
})
