import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/OrdinarioCP9.github.io/', // Esto debe coincidir con el nombre de tu repositorio
  build: {
    outDir: 'dist',
  },
  server: {
    open: true
  }
});
