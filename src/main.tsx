import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './styles.css'
import App from './App.tsx'

import { ThemeProvider } from './components/providers/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='agendou-app-theme'>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </ThemeProvider>
  </StrictMode>,
)
