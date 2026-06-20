import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/hyrox-roma/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.js',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        navigateFallback: '/hyrox-roma/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\/hyrox_plan_data\.json$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'plan-data', expiration: { maxEntries: 1 } },
          },
        ],
      },
      manifest: {
        name: 'Hyrox Roma 2025',
        short_name: 'HyroxRoma',
        description: 'Plan de entrenamiento Hyrox Roma — Dobles Mixtos Cat 30–39',
        theme_color: '#185FA5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/hyrox-roma/',
        scope: '/hyrox-roma/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
