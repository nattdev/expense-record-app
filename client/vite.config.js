import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/

const pwaOptions = {
  registerType: 'autoUpdate',
  includeAssets: ['apple-touch-icon.png'],
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg}'],
  },
  manifest: {
    name: 'Expense Record App',
    short_name: 'ExpenseRecord',
    description: 'A web application to register expenses',
    theme_color: '#ffffff',
    start_url: "/index.html",
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
}

export default defineConfig({
  plugins: [react(),
  VitePWA(pwaOptions)
  ]
})
