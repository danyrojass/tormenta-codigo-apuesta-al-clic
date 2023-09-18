import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client', // Directorio de salida para los archivos optimizados del lado del cliente
    emptyOutDir: true,     // Borra el directorio de salida antes de generar nuevos archivos
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Cambia esto a la URL de tu servidor Express.js
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
