import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (!window.__reactRoot) {
  window.__reactRoot = createRoot(document.getElementById('root'))
}

window.__reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
