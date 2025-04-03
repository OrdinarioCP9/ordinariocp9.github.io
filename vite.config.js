import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs-extra';
import path from 'path';

// Determina la base URL según el entorno
const base = process.env.GITHUB_ACTIONS ? '/OrdinarioCP9.github.io/' : '/';

export default defineConfig({
  plugins: [
    react(),
    // Plugin personalizado para copiar el index.html al 404.html durante la construcción
    {
      name: 'copy-index-html',
      closeBundle: async () => {
        const indexPath = path.resolve(__dirname, 'dist/index.html');
        const notFoundPath = path.resolve(__dirname, 'dist/404.html');
        const noJekyllPath = path.resolve(__dirname, 'dist/.nojekyll');
        
        // Copiar index.html a 404.html
        if (fs.existsSync(indexPath)) {
          await fs.copy(indexPath, notFoundPath);
          console.log('✅ 404.html creado automáticamente');
        }
        
        // Crear archivo .nojekyll
        await fs.writeFile(noJekyllPath, '');
        console.log('✅ .nojekyll creado automáticamente');
      }
    }
  ],
  base: base,
  build: {
    outDir: 'dist',
    // Esta configuración es crucial para resolver el problema MIME
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      // Importante: asegurarte que está configurado correctamente para módulos
      input: {
        main: path.resolve(__dirname, 'index.html')
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
