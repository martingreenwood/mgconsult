import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  // Log error details
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Error info:', info)

  // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
  // Example: Sentry.captureException(err)

  // Show user-friendly error message
  if (import.meta.env.PROD) {
    // In production, show a friendly message
    alert('An unexpected error occurred. Please refresh the page and try again.')
  }
}

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)

  // TODO: Send to error tracking service
  // Example: Sentry.captureException(event.reason)

  // Prevent default browser behavior
  event.preventDefault()
})

app.use(createHead())
app.use(createPinia())
app.use(router)

app.mount('#app')
