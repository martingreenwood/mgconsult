<template>
  <Transition name="fade">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg hover:bg-slate-800 dark:hover:bg-slate-200 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Scroll to top"
      :class="{ 'blur-sm': isBlurred }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transform group-hover:-translate-y-0.5 transition-transform duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  isBlurred?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isBlurred: false
})

const isVisible = ref(false)
let ticking = false

const checkScroll = () => {
  // Show button after scrolling down 300px
  isVisible.value = window.pageYOffset > 300
  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(checkScroll)
    ticking = true
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  checkScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
</style>
