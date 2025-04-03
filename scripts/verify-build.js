import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Función para verificar la construcción
async function verifyBuild() {
  try {
    console.log('🔍 Verificando archivos de la construcción...');

    // Verificar que los archivos principales existen
    const files = await fs.readdir(distDir);
    console.log('📁 Archivos en carpeta dist:', files);

    // Verificar index.html
    if (fs.existsSync(path.join(distDir, 'index.html'))) {
      console.log('✅ index.html existe');
      
      // Leer contenido para verificar scripts
      const indexContent = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
      console.log('📄 Contenido de index.html:');
      console.log(indexContent);
      
      if (indexContent.includes('type="module"')) {
        console.log('✅ index.html contiene scripts de tipo module');
      } else {
        console.warn('⚠️ Advertencia: index.html no contiene scripts de tipo module');
      }
    } else {
      console.error('❌ index.html no existe!');
    }

    // Verificar archivos JS
    const assets = await fs.readdir(path.join(distDir, 'assets'));
    console.log('📁 Archivos en carpeta assets:', assets);
    
    const jsFiles = assets.filter(file => file.endsWith('.js'));
    if (jsFiles.length > 0) {
      console.log('✅ Archivos JS generados:', jsFiles);
    } else {
      console.error('❌ No se encontraron archivos JS en assets!');
    }

    console.log('✅ Verificación completada');
  } catch (err) {
    console.error('❌ Error durante la verificación:', err);
    process.exit(1);
  }
}

// Ejecutar la función
verifyBuild();
