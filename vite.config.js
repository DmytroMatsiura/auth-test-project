import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['gotoinc-icon.png'],
      manifest: {
        name: 'Vue.js PWA Project',
        short_name: 'Vue.js PWA',
        description: 'A Vue.js PWA project',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'gotoinc-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'gotoinc-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
