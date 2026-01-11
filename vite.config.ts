import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Source maps for production debugging (set to false to disable)
    sourcemap: false,

    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 600,

    // Rollup options for optimized bundling
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // You can add more chunks as your app grows
        },

        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.')
          let extType = info?.[info.length - 1]

          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name ?? '')) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name ?? '')) {
            extType = 'fonts'
          }

          return `assets/${extType}/[name]-[hash][extname]`
        },

        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },

    // Asset inline limit (smaller assets will be inlined as base64)
    assetsInlineLimit: 4096, // 4kb

    // Minification (esbuild is faster than terser)
    minify: 'esbuild',

    // Target modern browsers for smaller bundles
    target: 'es2015',
  },

  // esbuild options (used for both development and production)
  esbuild: {
    // Drop console and debugger in production
    drop: ['console', 'debugger'],
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
  },
})
