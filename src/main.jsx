// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { USE_MOCK_DATA } from './config'
import { refreshBurgers } from './api/burgerApi'

const queryClient = new QueryClient()

// Show mode indicator
console.log(
  `%c🔧 Running in ${USE_MOCK_DATA ? 'MOCK DATA' : 'LIVE API'} mode`,
  `color: ${USE_MOCK_DATA ? '#f59e0b' : '#10b981'}; font-size: 14px; font-weight: bold;`
)

// Wait for burgers to load if in API mode
const init = async () => {
  if (!USE_MOCK_DATA) {
    const rootElement = document.getElementById('root')
    rootElement.innerHTML = `
      <div class="min-h-screen bg-dark-900 flex items-center justify-center">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-burger-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div class="text-white text-xl">Loading burgers...</div>
        </div>
      </div>
    `
    await refreshBurgers()
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <App />
              <Toaster position="top-right" toastOptions={{
                style: { background: '#141414', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
              }} />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

init()