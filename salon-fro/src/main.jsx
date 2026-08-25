import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx' 
import { SalonProvider } from './Context/SalonContext.jsx'
import { CategoryProvider } from './Context/CategoryContext.jsx'
import { ServiceProvider } from './Context/ServicesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <ServiceProvider>
      <CategoryProvider>
      <SalonProvider>
       <AuthProvider>
        <App />
       </AuthProvider>
       </SalonProvider>
       </CategoryProvider>
       </ServiceProvider>
      </BrowserRouter>
  </StrictMode>
)