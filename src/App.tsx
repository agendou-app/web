import { BrowserRouter } from "react-router"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"

import { Toaster } from "@/components/ui/toaster"

import { Routes } from "@/routes"

function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='agendou-app-theme'>
      <AuthProvider>
        <BrowserRouter>
          <Routes />

          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
