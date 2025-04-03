import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs-extra';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    plugins: [
      react(),
      {
        name: 'copy-html-and-create-files',
        enforce: 'post',
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
    base: '/',  // Corregido para repositorios username.github.io
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      minify: 'esbuild',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          // Asegurar que los archivos JSX se procesen correctamente
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    },
    server: {
      port: 3000,
      open: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    logLevel: 'info'
  };
});