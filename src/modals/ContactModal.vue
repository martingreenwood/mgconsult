<template>
  <!-- Sidebar Modal Overlay -->
  <Transition :name="`sidebar-${side}`">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-stretch" :class="side === 'right' ? 'justify-end' : 'justify-start'">
      <!-- Background Blur -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-lg"
        @click="close"
      ></div>

      <!-- Sidebar Content -->
      <div class="relative w-full sm:max-w-lg h-screen z-10 flex flex-col">
        <div class="sidebar-panel bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
          <!-- Close Button -->
          <button
            class="absolute top-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-200 z-10"
            :class="side === 'right' ? 'right-6' : 'left-6'"
            @click="close"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Content Area -->
          <div class="flex-1 px-8 py-8">
            <!-- Calendly Embed -->
            <div v-if="currentStep !== 'success'" class="space-y-4">
              <!-- Calendly Embed -->
              <div class="calendly-embed-container">
                <iframe
                  src="https://calendly.com/hello-martingreenwood/30min?hide_gdpr_banner=1"
                  width="100%"
                  height="600"
                  class="rounded-lg"
                ></iframe>
              </div>
            </div>

            <!-- Success Step -->
            <div v-else-if="currentStep === 'success'" class="text-center py-8">
              <!-- Success Icon -->
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <!-- Success Message -->
              <h3 class="text-2xl font-bold text-slate-900 mb-3">
                Consultation Booked!
              </h3>
              <p class="text-lg text-slate-600 mb-6">
                Your consultation has been successfully scheduled.
              </p>

              <!-- Booking Details -->
              <div v-if="bookingResult?.event" class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                <h4 class="font-semibold text-green-900 mb-3">Booking Details:</h4>
                <div class="space-y-2 text-sm text-green-800">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ bookingResult.event.event_type.name }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatCalendlyTime(bookingResult.event.start_time) }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{{ bookingResult.invitee.name }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{{ bookingResult.invitee.email }}</span>
                  </div>
                </div>
              </div>

              <!-- Next Steps -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
                <h4 class="font-semibold text-blue-900 mb-2">What's Next?</h4>
                <ul class="text-sm text-blue-800 space-y-1">
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmation email sent to your email</li>
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Calendar invite with meeting details</li>
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Meeting link will be provided</li>
                  <li class="flex flex-row items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Reminder notifications before the call</li>
                </ul>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <BaseButton
                  @click="close"
                  variant="primary"
                  size="lg"
                  class="px-8"
                >
                  Perfect, Thanks!
                </BaseButton>
                <BaseButton
                  @click="resetForm"
                  variant="outline"
                  size="lg"
                  class="px-6"
                >
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
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
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



const close = () => {
  visible.value = false
  resetForm()
}

const resetForm = () => {
  currentStep.value = 'booking'
  bookingResult.value = null
}

// Handle ESC key to close modal
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && visible.value) {
    close()
  }
}

// Handle Calendly events
const handleCalendlyEvent = (event: MessageEvent) => {
  if (event.origin !== 'https://calendly.com') return

  if (event.data.event === 'calendly.event_scheduled') {
    console.log('Calendly booking completed:', event.data)

    // Store booking result
    bookingResult.value = {
      event: event.data.payload.event,
      invitee: event.data.payload.invitee
    }

    // Move to success step
    currentStep.value = 'success'
  }
}

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



// Manage body scroll when modal is open/closed
watch(visible, (isVisible) => {
  if (isVisible) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
}, { immediate: true })

// Add/remove keyboard event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('message', handleCalendlyEvent)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('message', handleCalendlyEvent)
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
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-30px,0);
  }
  70% {
    transform: translate3d(0,-15px,0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out;
}
</style>
