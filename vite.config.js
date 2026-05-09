import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] },
      manifest: {
        name: 'AthleteEats',
        short_name: 'AthleteEats',
        theme_color: '#FF4D00',
        background_color: '#080808',
        icons: [{ src: '/hero.png', sizes: '192x192', type: 'image/png' }]
      }
    })
  ],
})