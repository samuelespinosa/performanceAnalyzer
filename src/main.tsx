import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PageSpeedProvider } from './PageSpeedContext.tsx'

createRoot(document.getElementById('root')!).render(
  <PageSpeedProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PageSpeedProvider>
  ,
)
