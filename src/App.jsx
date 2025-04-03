import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home/Home'

function App() {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    // Log para debugging
    console.log('App montado correctamente');
    
    // Verificar si estamos en un entorno de producción
    if (import.meta.env.PROD) {
      console.log('Ejecutando en entorno de producción');
    }
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Algo salió mal.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {errorInfo && errorInfo.toString()}
        </details>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Home />
    </div>
  )
}

export default App