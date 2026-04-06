import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )
}

export default App
