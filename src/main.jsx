import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

async function init() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
    })
  }

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
