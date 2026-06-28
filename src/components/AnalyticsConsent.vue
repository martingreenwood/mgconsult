<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from '@/services/analyticsConsent'

const isOpen = ref(getAnalyticsConsent() === null)
const currentConsent = ref<AnalyticsConsent | null>(getAnalyticsConsent())

const choose = (status: AnalyticsConsent) => {
  const shouldReload = status === 'denied' && currentConsent.value === 'granted'

  setAnalyticsConsent(status)
  currentConsent.value = status
  isOpen.value = false

  if (shouldReload) {
    window.location.reload()
  }
}

const openSettings = () => {
  currentConsent.value = getAnalyticsConsent()
  isOpen.value = true
}

onMounted(() => {
  window.addEventListener('open-analytics-settings', openSettings)
})

onUnmounted(() => {
  window.removeEventListener('open-analytics-settings', openSettings)
})
</script>

<template>
  <Transition name="analytics-consent">
    <aside
      v-if="isOpen"
      class="analytics-consent"
      role="dialog"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
    >
      <div class="analytics-consent__copy">
        <p class="eyebrow">Your privacy</p>
        <h2 id="analytics-consent-title">A small analytics choice</h2>
        <p id="analytics-consent-description">
          I use Google Analytics to understand which pages are useful. Analytics is off unless
          you accept, and it is never used for advertising.
        </p>
        <p class="analytics-consent__detail">
          Accepting lets Google set analytics cookies and receive page, device and approximate
          location information. Google Signals and advertising personalisation are disabled.
          Rejecting does not affect the site. Your choice is remembered for six months and can
          be changed from the footer.
        </p>
        <p v-if="currentConsent" class="analytics-consent__status" aria-live="polite">
          Current choice: {{ currentConsent === 'granted' ? 'analytics accepted' : 'analytics rejected' }}.
        </p>
      </div>

      <div class="analytics-consent__actions">
        <button type="button" class="button button--line" @click="choose('denied')">
          Reject analytics
        </button>
        <button type="button" class="button button--dark" @click="choose('granted')">
          Accept analytics
        </button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.analytics-consent {
  position: fixed;
  right: var(--space-lg);
  bottom: var(--space-lg);
  left: var(--space-lg);
  z-index: 1000;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: var(--space-xl);
  max-width: 64rem;
  margin: 0 auto;
  padding: clamp(var(--space-lg), 3vw, var(--space-2xl));
  border: 1px solid var(--ink);
  border-radius: 8px;
  background: var(--paper);
  box-shadow: 0 24px 70px oklch(14.1% 0.005 285.823 / 0.22);
}

.analytics-consent__copy {
  display: grid;
  gap: var(--space-sm);
  max-width: 46rem;
}

.analytics-consent h2 {
  font-size: clamp(1.65rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.05;
}

.analytics-consent__copy > p:not(.eyebrow, .analytics-consent__status) {
  color: var(--ink-soft);
}

.analytics-consent__detail {
  font-size: 0.88rem;
}

.analytics-consent__status {
  font-size: 0.85rem;
  font-weight: 700;
}

.analytics-consent__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.analytics-consent-enter-active,
.analytics-consent-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.analytics-consent-enter-from,
.analytics-consent-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

@media (max-width: 720px) {
  .analytics-consent {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .analytics-consent__actions {
    justify-content: stretch;
  }

  .analytics-consent__actions .button {
    flex: 1 1 10rem;
  }
}
</style>
