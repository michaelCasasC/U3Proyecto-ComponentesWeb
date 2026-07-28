import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { registerServiceWorker } from './pwa/registerSW'

function renderApp() {
  const root = document.getElementById('app')
  if (!root) {
    console.warn('Waiting for DOM element #app...')
    setTimeout(renderApp, 50)
    return
  }
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

registerServiceWorker()

renderApp()
