import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de salida
const distDir = path.resolve(__dirname, 'dist');

// Crear archivo .nojekyll
fs.writeFileSync(path.resolve(distDir, '.nojekyll'), '');
console.log('✅ Archivo .nojekyll creado correctamente');

// Copiar index.html a 404.html
const indexContent = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf8');
fs.writeFileSync(path.resolve(distDir, '404.html'), indexContent);
console.log('✅ Archivo 404.html creado correctamente');

// Verificar que los scripts se hayan inyectado correctamente
if (indexContent.includes('<script')) {
  console.log('✅ Scripts inyectados correctamente en index.html');
} else {
  console.error('❌ ERROR: No se encontraron scripts en index.html');
}

// Verificar la estructura de archivos en dist
console.log('\n=== ESTRUCTURA DE ARCHIVOS EN DIST ===');
const listarArchivos = (dir, nivel = 0) => {
  const archivos = fs.readdirSync(dir);
  archivos.forEach(archivo => {
    const rutaCompleta = path.join(dir, archivo);
    const stats = fs.statSync(rutaCompleta);
    const indentacion = '  '.repeat(nivel);
    
    if (stats.isDirectory()) {
      console.log(`${indentacion}📁 ${archivo}/`);
      listarArchivos(rutaCompleta, nivel + 1);
    } else {
      console.log(`${indentacion}📄 ${archivo}`);
    }
  });
};

listarArchivos(distDir);
console.log('\n✅ Proceso post-build completado correctamente');
