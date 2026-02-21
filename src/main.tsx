import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Main.tsx: Iniciando arranque de React...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('No se encontró el elemento root en el DOM');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('Main.tsx: Renderizado inicial lanzado con éxito');
} catch (error) {
  console.error('CRASH EN EL ARRANQUE:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; color: red;">
      <h1>CRASH EN EL ARRANQUE</h1>
      <pre>${error instanceof Error ? error.stack : error}</pre>
    </div>
  `;
}

