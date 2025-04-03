import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Log para debugging
console.log('Entorno: ', import.meta.env.MODE);
console.log('Base URL: ', import.meta.env.BASE_URL);

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('No se pudo encontrar el elemento root');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
