import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

/* Styles */
import './styles/globals.css'
import './styles/theme.css'
import './styles/layout.css'
import './styles/components.css'

import './fontawesome'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ExpenseProvider } from './context/ExpenseContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
