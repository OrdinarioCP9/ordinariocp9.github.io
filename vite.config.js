import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determina la base URL según el entorno
const base = process.env.GITHUB_ACTIONS ? '/OrdinarioCP9.github.io/' : '/';

export default defineConfig({
  plugins: [react()],
  base: base, // Base dinámica
  build: {
    outDir: 'dist',
    // Asegurarse de que los scripts se generen como .js y no .jsx
    rollupOptions: {
      output: {
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
  },
  // Configurar tipos MIME correctamente
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      }
    }
  }
});
