<template>
  <!-- Sidebar Modal Overlay -->
  <Transition :name="`sidebar-${side}`">
    <div v-if="visible" ref="modalRef" class="fixed inset-0 z-50 flex items-stretch"
      :class="side === 'right' ? 'justify-end' : 'justify-start'" role="dialog" aria-modal="true"
      aria-labelledby="modal-title">
      <!-- Background Blur -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-lg" @click="close" aria-hidden="true"></div>

      <!-- Sidebar Content -->
      <div class="relative w-full sm:max-w-lg h-screen z-10 flex flex-col">
        <div class="sidebar-panel bg-white dark:bg-dark-surface h-full shadow-2xl flex flex-col overflow-y-auto">
          <!-- Close Button -->
          <button ref="closeButtonRef"
            class="absolute top-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-dark-elevated hover:bg-slate-200 dark:hover:bg-dark-border flex items-center justify-center text-slate-600 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white transition-all duration-200 z-10"
            :class="side === 'right' ? 'right-6' : 'left-6'" @click="close" aria-label="Close booking modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Content Area -->
          <div class="flex-1 px-8 py-8">
            <h2 id="modal-title" class="sr-only">Book a Consultation Call</h2>

            <!-- Choom Booking Widget -->
            <div v-if="currentStep !== 'success'" class="space-y-4">
              <!-- Loading State -->
              <div v-if="widgetLoading"
                class="relative h-[600px] flex items-center justify-center bg-gray-50 dark:bg-dark-elevated rounded-lg">
                <div class="text-center">
                  <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-dark-border border-t-slate-900 dark:border-t-white mb-4">
                  </div>
                  <p class="text-slate-600 dark:text-gray-200">Loading booking calendar...</p>
                </div>
              </div>

              <!-- Choom booking widget container (script loads when modal opens) -->
              <div class="rounded-lg min-h-[600px]" :class="{ 'hidden': widgetLoading }">
                <div id="choom-booking-widget" data-event-type-uuid="52327d96-65f9-4d63-802f-e22b9aba13aa"></div>
              </div>
            </div>

            <!-- Success Step -->
            <div v-else-if="currentStep === 'success'" class="text-center py-8" role="status" aria-live="polite">
              <!-- Success Icon -->
              <div
                class="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <!-- Success Message -->
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Consultation Booked!
              </h3>
              <p class="text-lg text-slate-600 dark:text-gray-200 mb-6">
                Your consultation has been successfully scheduled.
              </p>

              <!-- Booking Details -->
              <div v-if="bookingResult?.event"
                class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                <h4 class="font-semibold text-green-900 dark:text-green-400 mb-3">Booking Details:</h4>
                <div class="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ bookingResult.event.event_type.name }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatCalendlyTime(bookingResult.event.start_time) }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{{ bookingResult.invitee.name }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{{ bookingResult.invitee.email }}</span>
                  </div>
                </div>
              </div>

              <!-- Next Steps -->
              <div
                class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
                <h4 class="font-semibold text-blue-900 dark:text-blue-400 mb-2">What's Next?</h4>
                <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmation email sent to your email
                  </li>
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Calendar invite with meeting details
                  </li>
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Meeting link will be provided
                  </li>
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Reminder notifications before the call
                  </li>
                </ul>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <BaseButton @click="close" variant="primary" size="lg" class="px-8">
                  Perfect, Thanks!
                </BaseButton>
                <BaseButton @click="resetForm" variant="outline" size="lg" class="px-6">
                  Book Another
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  side?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  side: 'right'
})

type FormStep = 'booking' | 'success'

const visible = defineModel<boolean>('visible', { default: false })

// Simple state management
const currentStep = ref<FormStep>('booking')
const bookingResult = ref<any>(null)
const modalRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const widgetLoading = ref(true)

const CHOOM_SCRIPT_URL = 'https://choom.app/js/widget.js'

const loadChoomScript = (onLoaded?: () => void) => {
  if (document.querySelector(`script[src="${CHOOM_SCRIPT_URL}"]`)) {
    onLoaded?.()
    return
  }
  const script = document.createElement('script')
  script.src = CHOOM_SCRIPT_URL
  script.async = true
  script.onload = () => onLoaded?.()
  document.head.appendChild(script)
}

const close = () => {
  visible.value = false
  resetForm()
}

const resetForm = () => {
  currentStep.value = 'booking'
  bookingResult.value = null
  widgetLoading.value = true
}

// Focus trap: Get all focusable elements within the modal
const getFocusableElements = (): HTMLElement[] => {
  if (!modalRef.value) return []

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',')

  return Array.from(modalRef.value.querySelectorAll(focusableSelectors))
}

// Handle Tab key for focus trap
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && visible.value) {
    close()
    return
  }

  // Focus trap
  if (event.key === 'Tab' && visible.value) {
    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab: moving backwards
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab: moving forwards
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
}

// Set initial focus when modal opens
const setInitialFocus = async () => {
  await nextTick()
  if (closeButtonRef.value) {
    closeButtonRef.value.focus()
  }
}

// Choom or other booking-complete events can be listened for here if the widget exposes them

// Helper function to format Calendly booking time
const formatCalendlyTime = (timeString: string) => {
  if (!timeString) return ''

  const date = new Date(timeString)
  return date.toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}



// Manage body scroll when modal is open/closed, set focus, and load Choom script
watch(visible, (isVisible) => {
  if (isVisible) {
    document.body.classList.add('modal-open')
    setInitialFocus()
    loadChoomScript(() => {
      widgetLoading.value = false
    })
  } else {
    document.body.classList.remove('modal-open')
  }
}, { immediate: true })

// Add/remove keyboard event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Clean up body class if component is unmounted while modal is open
  document.body.classList.remove('modal-open')
})


</script>

<style scoped>
/* Sidebar slide-in transitions - Right side */
.sidebar-right-enter-active,
.sidebar-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-right-enter-active .sidebar-panel,
.sidebar-right-leave-active .sidebar-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-right-enter-from,
.sidebar-right-leave-to {
  opacity: 0;
}

.sidebar-right-enter-from .sidebar-panel,
.sidebar-right-leave-to .sidebar-panel {
  transform: translateX(100%);
}

/* Sidebar slide-in transitions - Left side */
.sidebar-left-enter-active,
.sidebar-left-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-left-enter-active .sidebar-panel,
.sidebar-left-leave-active .sidebar-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-left-enter-from,
.sidebar-left-leave-to {
  opacity: 0;
}

.sidebar-left-enter-from .sidebar-panel,
.sidebar-left-leave-to .sidebar-panel {
  transform: translateX(-100%);
}



/* Success step animations */
@keyframes bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out;
}
</style>
