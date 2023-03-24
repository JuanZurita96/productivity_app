import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './State/Store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
)

/** Aplicacion de productividad
 * Lista de tareas donde puedes crear, modificar y completar las tareas en un tiempo asignado
 * Redux - MaterialUI - Victory - Vite - TypeScript
 */
