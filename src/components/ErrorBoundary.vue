<template>
  <div v-if="hasError" class="error-boundary min-h-screen flex items-center justify-center px-6 py-24 bg-red-50">
    <div class="max-w-2xl w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-red-900 coco">
          Something Went Wrong
        </h2>
        <p class="text-lg text-red-700 max-w-md mx-auto">
          We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
        </p>

        <!-- Error Details (Development only) -->
        <div v-if="isDevelopment && errorMessage" class="mt-6 p-4 bg-white rounded-lg text-left max-w-2xl mx-auto">
          <div class="font-mono text-sm text-red-800 break-words">
            <strong>Error:</strong> {{ errorMessage }}
          </div>
          <div v-if="errorStack" class="mt-2 font-mono text-xs text-gray-600 max-h-40 overflow-auto">
            {{ errorStack }}
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button
            @click="retry"
            class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Try Again
          </button>

          <button
            @click="goHome"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-900 border-2 border-red-200 rounded-lg hover:border-red-300 transition-colors duration-200 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Render children if no error -->
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasError = ref(false)
const errorMessage = ref('')
const errorStack = ref('')
const isDevelopment = import.meta.env.DEV

// Capture errors from child components
onErrorCaptured((err, instance, info) => {
  hasError.value = true
  errorMessage.value = err.message
  errorStack.value = err.stack || ''

  // Log error to console in development
  if (isDevelopment) {
    console.error('Error caught by boundary:', err)
    console.error('Component:', instance)
    console.error('Error info:', info)
  }

  // TODO: Send error to logging service (e.g., Sentry)
  // logErrorToService(err, instance, info)

  // Prevent error from propagating
  return false
})

const retry = () => {
  hasError.value = false
  errorMessage.value = ''
  errorStack.value = ''
  // Force component re-render by reloading the page
  window.location.reload()
}

const goHome = () => {
  hasError.value = false
  errorMessage.value = ''
  errorStack.value = ''
  router.push('/')
}
</script>

<style scoped>
.coco {
  font-family: "Cocogoose Classic", Impact, "Arial Black", sans-serif;
}
</style>
