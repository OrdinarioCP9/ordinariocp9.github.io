import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs-extra';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-html-and-create-files',
      // Usar esta opción para que se ejecute al final del proceso de construcción
      enforce: 'post',
      // Usar closeBundle en lugar de buildEnd para garantizar que todos los archivos estén escritos
      async closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        
        // Copiar index.html a 404.html
        await fs.copy(
          resolve(distDir, 'index.html'),
          resolve(distDir, '404.html')
        );
        
        // Crear archivo .nojekyll
        await fs.writeFile(resolve(distDir, '.nojekyll'), '');
        
        // Crear _redirects para Netlify
        await fs.writeFile(resolve(distDir, '_redirects'), '/* /index.html 200');
        
        // Verificar contenido de index.html
        const indexContent = await fs.readFile(resolve(distDir, 'index.html'), 'utf8');
        console.log('\n=== VERIFICACIÓN DE BUILD ===');
        console.log(indexContent.includes('<script') 
          ? '✅ Scripts inyectados correctamente' 
          : '❌ ERROR: No se encontraron scripts en index.html');
      }
    }
  ],
  base: '/OrdinarioCP9.github.io/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild', // Cambiado a esbuild para mayor confiabilidad
    // Eliminamos configuraciones complicadas
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  // Importante para debug
  logLevel: 'info'
});
