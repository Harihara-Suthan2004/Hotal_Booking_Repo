import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MenueContextProvider from './Context/MenueContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenueContextProvider>
    <App />
    </MenueContextProvider>
  </StrictMode>,
)
