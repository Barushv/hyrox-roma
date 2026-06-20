import { useState, useEffect } from 'react'

export function useServiceWorker() {
  const [waitingWorker, setWaitingWorker] = useState(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    const base = import.meta.env.BASE_URL

    navigator.serviceWorker.register(`${base}sw.js`).then((registration) => {
      // Ya hay un SW esperando (recarga con pestaña abierta)
      if (registration.waiting) {
        setWaitingWorker(registration.waiting)
        setUpdateAvailable(true)
      }

      // Se encontró una nueva versión del SW
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (!newWorker) return
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker)
            setUpdateAvailable(true)
          }
        })
      })
    })

    // Cuando el SW se activa (después de skipWaiting), recargamos
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true
        window.location.reload()
      }
    })
  }, [])

  function applyUpdate() {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  return { updateAvailable, applyUpdate }
}
