import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // El puerto donde corre el frontend
    proxy: {
      // Cualquier petición que empiece con /api o /auth
      // será redirigida al backend
      '/api': {
        target: 'http://localhost:8080', // El backend
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:8080', // El backend
        changeOrigin: true,
      }
    }
  }
});