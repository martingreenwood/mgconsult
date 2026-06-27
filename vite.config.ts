import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const inlineCss = (): Plugin => ({
  name: 'inline-css',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html, { bundle }) {
      if (!bundle) {
        return html
      }

      return Object.entries(bundle).reduce((transformedHtml, [fileName, output]) => {
        if (output.type !== 'asset' || !fileName.endsWith('.css')) {
          return transformedHtml
        }

        const css = typeof output.source === 'string'
          ? output.source
          : new TextDecoder().decode(output.source)
        let wasInlined = false

        const nextHtml = transformedHtml.replace(/<link\b[^>]*>/gi, (tag) => {
          const isStylesheet = /\brel=(["'])stylesheet\1/i.test(tag)
          const referencesAsset = tag.includes(fileName)

          if (!isStylesheet || !referencesAsset) {
            return tag
          }

          wasInlined = true

          return `<style data-vite-css="${fileName}">${css.replace(/<\/style/gi, '<\\/style')}</style>`
        })

        if (wasInlined) {
          delete bundle[fileName]
        }

        return nextHtml
      }, html)
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    inlineCss(),
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
