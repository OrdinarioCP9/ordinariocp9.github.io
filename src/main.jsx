import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Log para debugging detallado
console.log('Entorno: ', import.meta.env.MODE);
console.log('Base URL: ', import.meta.env.BASE_URL);
console.log('Verificando inicialización de la aplicación...');

// Función para garantizar carga completa
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM completamente cargado');
  
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('No se pudo encontrar el elemento root');
  } else {
    console.log('Elemento root encontrado, inicializando React');
    
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('React inicializado correctamente');
  }
});
