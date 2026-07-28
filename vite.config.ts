import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (!env.VITE_API_PROXY_TARGET) throw new Error('Falta VITE_API_PROXY_TARGET en el archivo .env')
  return ({
  server: {
    proxy: { '/api': env.VITE_API_PROXY_TARGET },
    watch: { usePolling: env.VITE_USE_POLLING === 'true' }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'icons/*.svg'],
      manifest: {
        name: 'MediCitas',
        short_name: 'MediCitas',
        description: 'Sistema de gestión de citas médicas',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json}']
      },
      devOptions: { enabled: false }
    })
  ]
  })
})
