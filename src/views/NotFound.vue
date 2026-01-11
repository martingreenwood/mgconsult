<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-slate-50 to-stone-100 dark:from-dark-bg dark:to-dark-surface">
    <div class="max-w-2xl w-full text-center">
      <!-- 404 Number -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-slate-200 dark:text-dark-elevated coco select-none" aria-hidden="true">404</h1>
      </div>

      <!-- Error Message -->
      <div class="space-y-6">
        <h2 class="text-4xl font-bold text-slate-900 dark:text-white coco">
          Page Not Found
        </h2>
        <p class="text-xl text-slate-600 dark:text-gray-200 max-w-md mx-auto font-light">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <!-- Suggestions -->
        <div class="pt-8 space-y-4">
          <p class="text-sm text-slate-500 dark:text-gray-300 font-medium uppercase tracking-wider">
            You might want to:
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link
              to="/"
              class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-200 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Go to Homepage
            </router-link>

            <button
              @click="goBack"
              class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-surface text-slate-900 dark:text-white border-2 border-slate-200 dark:border-dark-border rounded-lg hover:border-slate-300 dark:hover:border-dark-elevated transition-colors duration-200 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Go Back
            </button>
          </div>
        </div>

        <!-- Helpful Links -->
        <div class="pt-12 border-t border-slate-200 dark:border-dark-border mt-12">
          <p class="text-sm text-slate-500 dark:text-gray-300 mb-4">Looking for something specific?</p>
          <div class="flex flex-wrap gap-3 justify-center">
            <a href="/#services-heading" class="text-sm text-slate-600 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white underline decoration-dotted underline-offset-4">
              Services
            </a>
            <a href="/#main-content" class="text-sm text-slate-600 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white underline decoration-dotted underline-offset-4">
              Recent Projects
            </a>
            <button @click="openContact" class="text-sm text-slate-600 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white underline decoration-dotted underline-offset-4">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // Go back in history, or to home if no history
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const openContact = () => {
  // Navigate to home and trigger contact modal
  router.push('/')
  // Small delay to ensure we're on home page
  setTimeout(() => {
    // Dispatch custom event to open contact modal
    window.dispatchEvent(new CustomEvent('open-contact-modal'))
  }, 100)
}
</script>

<style scoped>
/* Ensure the coco font is used for headings */
.coco {
  font-family: "Cocogoose Classic", Impact, "Arial Black", sans-serif;
}
</style>
