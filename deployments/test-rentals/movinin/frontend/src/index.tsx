import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/css/index.css'
import '@/assets/css/react-phone-number-input.css'
import 'leaflet/dist/leaflet.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Debug environment variables
console.log('API_HOST:', import.meta.env.VITE_MI_API_HOST)
console.log('All env vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')))

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 