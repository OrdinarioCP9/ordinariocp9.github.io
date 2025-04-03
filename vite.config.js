import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determina la base URL según el entorno
const base = process.env.GITHUB_ACTIONS ? '/OrdinarioCP9.github.io/' : '/';

export default defineConfig({
  plugins: [react()],
  base: base, // Base dinámica
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});

// La configuración actual es correcta para GitHub Pages
// Asegúrate de ejecutar `npm run build` antes de desplegar
