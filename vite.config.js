import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs-extra';

// Determina la base URL
const base = '/OrdinarioCP9.github.io/';

export default defineConfig({
  plugins: [
    react(),
    // Copia 404.html y crea .nojekyll después de la compilación
    {
      name: 'post-build',
      closeBundle: async () => {
        const distDir = resolve(__dirname, 'dist');
        
        // Copiar index.html a 404.html
        await fs.copy(
          resolve(distDir, 'index.html'),
          resolve(distDir, '404.html')
        );
        console.log('✅ 404.html creado correctamente');
        
        // Crear archivo .nojekyll
        await fs.writeFile(resolve(distDir, '.nojekyll'), '');
        console.log('✅ .nojekyll creado correctamente');
        
        // Crear _redirects para Netlify
        await fs.writeFile(resolve(distDir, '_redirects'), '/* /index.html 200');
        console.log('✅ _redirects creado correctamente');
        
        // Verificar que hay scripts en index.html
        const indexHtmlContent = await fs.readFile(resolve(distDir, 'index.html'), 'utf8');
        if (!indexHtmlContent.includes('<script')) {
          console.error('⚠️ ADVERTENCIA: No se encontraron tags <script> en index.html');
        } else {
          console.log('✅ Scripts inyectados correctamente en index.html');
        }
      }
    }
  ],
  base: base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});
