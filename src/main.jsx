import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Verificar que el elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Error: No se encontró el elemento con id "root"');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
