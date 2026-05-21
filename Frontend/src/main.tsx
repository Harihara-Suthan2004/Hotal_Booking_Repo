import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FoodProvider } from './Context/FoodContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FoodProvider>
    <App />
    </FoodProvider>
  </StrictMode>,
)
