import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.js'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/hook/useAuth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>,
)
