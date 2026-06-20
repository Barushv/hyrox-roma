import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
import './index.css'

// Registro del service worker — autoUpdate aplica la nueva versión sin interacción
registerSW({ immediate: true })

async function init() {
  const base = import.meta.env.BASE_URL
  const res = await fetch(`${base}hyrox_plan_data.json`)
  const planData = await res.json()

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App planData={planData} />
    </React.StrictMode>,
  )
}

init()
