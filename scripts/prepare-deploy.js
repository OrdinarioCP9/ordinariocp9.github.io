import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Función principal
async function prepareForDeploy() {
  try {
    console.log('Preparando archivos para despliegue...');

    // Copiar index.html a 404.html
    await fs.copy(
      path.join(distDir, 'index.html'),
      path.join(distDir, '404.html')
    );
    console.log('✅ Archivo 404.html creado');

    // Crear archivo .nojekyll
    await fs.writeFile(path.join(distDir, '.nojekyll'), '');
    console.log('✅ Archivo .nojekyll creado');

    console.log('Preparación completada con éxito');
  } catch (err) {
    console.error('❌ Error durante la preparación del despliegue:', err);
    process.exit(1);
  }
}

// Ejecutar la función
prepareForDeploy();
