import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner';
import { PageSpeedProvider } from './context/PageSpeedContext.tsx'

createRoot(document.getElementById('root')!).render(
  <PageSpeedProvider>
    <StrictMode>
      <App />
      <Toaster /> 
    </StrictMode>
  </PageSpeedProvider>
  ,
)
