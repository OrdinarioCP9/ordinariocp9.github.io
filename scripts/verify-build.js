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
    console.log('\n🔍 VERIFICACIÓN DE BUILD');
    console.log('========================\n');

    // Verificar que existe la carpeta dist
    if (!fs.existsSync(distDir)) {
      console.error('❌ ERROR: La carpeta dist no existe. Ejecuta npm run build primero.');
      process.exit(1);
    }

    // Verificar index.html
    const indexPath = path.join(distDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('✅ index.html existe');
      
      // Leer contenido para verificar scripts
      const indexContent = await fs.readFile(indexPath, 'utf8');
      
      if (indexContent.includes('<script')) {
        console.log('✅ index.html contiene scripts');
        console.log('\nExtracto de los scripts encontrados:');
        
        // Extraer y mostrar líneas de script
        const scriptLines = indexContent
          .split('\n')
          .filter(line => line.includes('<script'))
          .map(line => '   ' + line.trim());
          
        console.log(scriptLines.join('\n'));
      } else {
        console.error('❌ ERROR: No se encontraron scripts en index.html');
        console.error('   La aplicación no funcionará correctamente en producción.');
        process.exit(1);
      }
    } else {
      console.error('❌ ERROR: index.html no existe en la carpeta dist.');
      process.exit(1);
    }

    // Verificar archivos auxiliares
    const files = ['404.html', '.nojekyll', '_redirects'];
    for (const file of files) {
      if (fs.existsSync(path.join(distDir, file))) {
        console.log(`✅ ${file} existe`);
      } else {
        console.warn(`⚠️ Advertencia: ${file} no existe`);
      }
    }

    console.log('\n✅ VERIFICACIÓN COMPLETADA EXITOSAMENTE');
    console.log('La compilación parece correcta y debería funcionar en producción.');
  } catch (err) {
    console.error('\n❌ ERROR durante la verificación:', err);
    process.exit(1);
  }
}

// Ejecutar la función
verifyBuild();
