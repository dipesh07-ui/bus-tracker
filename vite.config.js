import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/bus-tracker/',
  plugins: [react()],
  build: {
    // Optimize for production
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          maps: ['leaflet', 'react-leaflet'],
          animation: ['framer-motion'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'leaflet', 'react-leaflet', 'framer-motion'],
  },
  // Server configuration for development
  server: {
    port: 5173,
    host: true,
  },
})
