<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'
import { baseUrl, defaultSeo } from '@/config/seo'
import ContactModal from '@/modals/ContactModal.vue'
import FloatingContactButton from '@/components/FloatingContactButton.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { isDark, initTheme } = useTheme()

const logoColor = ref(isDark.value ? '#fff' : '#000')
const showModal = ref(false)
const showLeftModal = ref(false)
let ticking = false

const openModal = () => {
  showModal.value = true
}

const openLeftModal = () => {
  showLeftModal.value = true
}

// Apply SEO from route meta (router-driven, single source of truth).
// When path is root, always use home meta so the catch-all never overwrites it.
type RouteSeo = Record<string, unknown> & { canonical?: string }
const seoFromRoute = computed(() => {
  const path = route.path
  const isRoot = path === '/' || path === ''

  if (isRoot) {
    return {
      ...defaultSeo,
      title: defaultSeo.title,
      description: defaultSeo.description,
      ogTitle: defaultSeo.title,
      ogDescription: defaultSeo.description,
      ogUrl: `${baseUrl}/`,
      twitterTitle: defaultSeo.title,
      twitterDescription: defaultSeo.description,
      canonical: `${baseUrl}/`,
    }
  }

  const seo = (route.meta.seo ?? {}) as RouteSeo
  const { canonical: _canonical, ...rest } = seo
  return { ...defaultSeo, ...rest }
})
useSeoMeta(seoFromRoute)
useHead({
  link: computed(() => {
    const path = route.path
    const isRoot = path === '/' || path === ''
    const canonical = isRoot
      ? `${baseUrl}/`
      : (route.meta.seo as RouteSeo | undefined)?.canonical
    return canonical ? [{ rel: 'canonical', href: canonical }] : []
  }),
})

const updateLogoColor = () => {
  // When not on home, sections don't exist; use default
  if (route.name !== 'home') {
    logoColor.value = isDark.value ? '#fff' : '#000'
    ticking = false
    return
  }

  const scrolled = window.pageYOffset
  const headerHeight = 80

  if (isDark.value) {
    logoColor.value = '#fff'
    ticking = false
    return
  }

  const sections = [
    { selector: '.hero-section', color: '#000' },
    { selector: '.video-parallax-section', color: '#000' },
    { selector: '.services-section', color: '#000' },
    { selector: '.testimonials-section', color: '#000' },
    { selector: '.cta-section', color: '#000' },
    { selector: '.dark-section', color: '#fff' },
    { selector: '.trust-section', color: '#000' },
    { selector: '.faq-section', color: '#000' },
    { selector: 'footer', color: '#fff' }
  ]

  for (const section of sections) {
    const element = document.querySelector(section.selector) as HTMLElement
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = scrolled + rect.top
      const elementBottom = elementTop + rect.height

      if (scrolled + headerHeight >= elementTop && scrolled <= elementBottom) {
        logoColor.value = section.color
        break
      }
    }
  }

  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateLogoColor)
    ticking = true
  }
}

const handleOpenContactModal = () => {
  openModal()
}

watch(isDark, () => {
  updateLogoColor()
})

watch(
  () => route.name,
  () => {
    updateLogoColor()
  }
)

onMounted(async () => {
  initTheme()
  await nextTick()
  logoColor.value = isDark.value ? '#fff' : '#000'
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('open-contact-modal', handleOpenContactModal)
  updateLogoColor()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('open-contact-modal', handleOpenContactModal)
})
</script>

<template>
  <!-- Skip to main content link for accessibility -->
  <a href="#main-content" class="skip-to-content">
    Skip to main content
  </a>

  <header :class="{ 'blur-sm': showModal || showLeftModal }" role="banner">
    <nav class="fixed left-6 top-6 right-6 z-99 gap-2 flex justify-between items-center" aria-label="Main navigation">

      <!-- Logo -->
      <div class="flex items-center justify-center flex-initial">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 39"
          class="w-16 h-auto transition-colors duration-300 ease-in-out" role="img" aria-label="Martin Greenwood logo">
          <path :fill="logoColor"
            d="M78.787 17.78c.422.122.633.404.633.843v2.162c0 .44-.211.72-.633.844-1.6.264-2.549 1.125-2.549 2.32 0 .633.053 1.863.14 3.71.106 1.827.16 3.11.16 3.831 0 2.268-.669 4.043-2.022 5.291-1.336 1.248-3.182 1.846-5.538 1.793-.369 0-.58-.14-.597-.422l-.352-3.093c-.035-.457.194-.686.668-.686 1.846 0 2.971-1.125 2.971-2.953 0-.37-.053-1.6-.158-3.727-.106-2.127-.158-3.603-.158-4.447 0-1.705.826-2.9 2.496-3.55-1.67-.651-2.496-1.829-2.496-3.534 0-.844.052-2.32.158-4.447.105-2.127.158-3.358.158-3.727 0-1.828-1.125-2.953-2.97-2.953-.475 0-.704-.228-.669-.685l.352-3.094c.017-.281.228-.422.597-.422 2.356-.053 4.202.545 5.538 1.793 1.353 1.248 2.021 3.023 2.021 5.291 0 .72-.053 2.004-.158 3.85-.088 1.828-.14 3.058-.14 3.691 0 1.195.948 2.057 2.548 2.32Zm-18.844 6.908v-3.586c0-.616.457-1.073 1.073-1.073h5.59c.58 0 1.054.492 1.054 1.073v8.35c0 .421-.246.896-.58 1.089-.967.58-2.25 1.055-3.85 1.459-1.6.404-3.093.598-4.464.598-2.496 0-4.782-.598-6.856-1.776a13.345 13.345 0 0 1-4.922-4.869c-1.195-2.056-1.793-4.306-1.793-6.767 0-2.461.598-4.711 1.793-6.768a13.25 13.25 0 0 1 4.905-4.852c2.074-1.177 4.359-1.775 6.855-1.775 1.283 0 2.672.229 4.13.703 1.46.457 2.62 1.02 3.481 1.705.282.229.44.545.44.88 0 .192-.053.386-.176.58l-3.2 4.798a.899.899 0 0 1-.773.44 1.05 1.05 0 0 1-.685-.264c-.37-.317-.88-.58-1.494-.791-.615-.229-1.178-.334-1.705-.334-3.182-.053-5.889 2.566-5.819 5.678-.07 3.11 2.637 5.73 5.819 5.677.228 0 .773-.088 1.177-.175ZM42.98 32h-5.818c-.685 0-1.002-.316-1.072-1.037l-1.248-11.531-2.479 11.724c-.21.791-.492 1.055-1.177 1.055h-5.819c-.65 0-.949-.229-1.16-1.055l-2.479-11.69-1.248 11.497c-.07.72-.404 1.037-1.09 1.037h-5.8c-.756 0-1.195-.37-1.108-1.09l3.006-23.537c.088-.703.457-1.055 1.09-1.055h7.436c.685 0 1.09.352 1.248 1.037l3.023 13.834 3.006-13.834c.158-.685.58-1.037 1.266-1.037h7.435c.633 0 .985.352 1.073 1.055L44.07 30.91c.088.72-.334 1.09-1.09 1.09Zm-31.517 2.373c.475 0 .703.229.668.686l-.352 3.093c-.017.282-.228.422-.597.422-2.356.053-4.202-.545-5.555-1.793-1.336-1.248-2.004-3.023-2.004-5.29 0-.721.053-2.005.14-3.833.106-1.846.159-3.076.159-3.709 0-1.195-.95-2.056-2.549-2.32-.422-.123-.633-.404-.633-.844v-2.162c0-.44.211-.72.633-.844 1.6-.263 2.549-1.125 2.549-2.32 0-.633-.053-1.863-.158-3.691-.088-1.846-.14-3.13-.14-3.85-.001-2.268.667-4.043 2.003-5.291C6.98 1.379 8.827.781 11.182.834c.369 0 .58.14.597.422l.352 3.094c.035.457-.194.685-.668.685-1.846 0-2.97 1.125-2.97 2.953 0 .37.052 1.6.157 3.727.106 2.127.159 3.603.159 4.447 0 1.705-.827 2.883-2.496 3.533 1.67.65 2.496 1.846 2.496 3.551 0 .844-.053 2.32-.159 4.447-.105 2.127-.158 3.358-.158 3.727 0 1.828 1.125 2.953 2.97 2.953Z" />
        </svg>
      </div>
    </nav>
  </header>

  <main id="main-content" class="w-screen min-h-screen" :class="{ 'blur-sm': showModal || showLeftModal }" role="main">
    <router-view />
    <footer class="bg-gray-800 dark:bg-gray-900" role="contentinfo">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-6 md:mb-0 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 39"
              class="w-16 h-auto fill-neutral-100 dark:fill-neutral-200" role="img" aria-label="Martin Greenwood logo">
              <path fill="currentColor"
                d="M78.787 17.78c.422.122.633.404.633.843v2.162c0 .44-.211.72-.633.844-1.6.264-2.549 1.125-2.549 2.32 0 .633.053 1.863.14 3.71.106 1.827.16 3.11.16 3.831 0 2.268-.669 4.043-2.022 5.291-1.336 1.248-3.182 1.846-5.538 1.793-.369 0-.58-.14-.597-.422l-.352-3.093c-.035-.457.194-.686.668-.686 1.846 0 2.971-1.125 2.971-2.953 0-.37-.053-1.6-.158-3.727-.106-2.127-.158-3.603-.158-4.447 0-1.705.826-2.9 2.496-3.55-1.67-.651-2.496-1.829-2.496-3.534 0-.844.052-2.32.158-4.447.105-2.127.158-3.358.158-3.727 0-1.828-1.125-2.953-2.97-2.953-.475 0-.704-.228-.669-.685l.352-3.094c.017-.281.228-.422.597-.422 2.356-.053 4.202.545 5.538 1.793 1.353 1.248 2.021 3.023 2.021 5.291 0 .72-.053 2.004-.158 3.85-.088 1.828-.14 3.058-.14 3.691 0 1.195.948 2.057 2.548 2.32Zm-18.844 6.908v-3.586c0-.616.457-1.073 1.073-1.073h5.59c.58 0 1.054.492 1.054 1.073v8.35c0 .421-.246.896-.58 1.089-.967.58-2.25 1.055-3.85 1.459-1.6.404-3.093.598-4.464.598-2.496 0-4.782-.598-6.856-1.776a13.345 13.345 0 0 1-4.922-4.869c-1.195-2.056-1.793-4.306-1.793-6.767 0-2.461.598-4.711 1.793-6.768a13.25 13.25 0 0 1 4.905-4.852c2.074-1.177 4.359-1.775 6.855-1.775 1.283 0 2.672.229 4.13.703 1.46.457 2.62 1.02 3.481 1.705.282.229.44.545.44.88 0 .192-.053.386-.176.58l-3.2 4.798a.899.899 0 0 1-.773.44 1.05 1.05 0 0 1-.685-.264c-.37-.317-.88-.58-1.494-.791-.615-.229-1.178-.334-1.705-.334-3.182-.053-5.889 2.566-5.819 5.678-.07 3.11 2.637 5.73 5.819 5.677.228 0 .773-.088 1.177-.175ZM42.98 32h-5.818c-.685 0-1.002-.316-1.072-1.037l-1.248-11.531-2.479 11.724c-.21.791-.492 1.055-1.177 1.055h-5.819c-.65 0-.949-.229-1.16-1.055l-2.479-11.69-1.248 11.497c-.07.72-.404 1.037-1.09 1.037h-5.8c-.756 0-1.195-.37-1.108-1.09l3.006-23.537c.088-.703.457-1.055 1.09-1.055h7.436c.685 0 1.09.352 1.248 1.037l3.023 13.834 3.006-13.834c.158-.685.58-1.037 1.266-1.037h7.435c.633 0 .985.352 1.073 1.055L44.07 30.91c.088.72-.334 1.09-1.09 1.09Zm-31.517 2.373c.475 0 .703.229.668.686l-.352 3.093c-.017.282-.228.422-.597.422-2.356.053-4.202-.545-5.555-1.793-1.336-1.248-2.004-3.023-2.004-5.29 0-.721.053-2.005.14-3.833.106-1.846.159-3.076.159-3.709 0-1.195-.95-2.056-2.549-2.32-.422-.123-.633-.404-.633-.844v-2.162c0-.44.211-.72.633-.844 1.6-.263 2.549-1.125 2.549-2.32 0-.633-.053-1.863-.158-3.691-.088-1.846-.14-3.13-.14-3.85-.001-2.268.667-4.043 2.003-5.291C6.98 1.379 8.827.781 11.182.834c.369 0 .58.14.597.422l.352 3.094c.035.457-.194.685-.668.685-1.846 0-2.97 1.125-2.97 2.953 0 .37.052 1.6.157 3.727.106 2.127.159 3.603.159 4.447 0 1.705-.827 2.883-2.496 3.533 1.67.65 2.496 1.846 2.496 3.551 0 .844-.053 2.32-.159 4.447-.105 2.127-.158 3.358-.158 3.727 0 1.828 1.125 2.953 2.97 2.953Z" />
            </svg>
          </div>
        </div>
        <div
          class="border-t border-gray-700 dark:border-gray-800 mt-8 pt-6 text-center text-gray-400 dark:text-gray-500 text-xs">
          <p>&copy; 2025 Neurospicy Studio Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </main>

  <FloatingContactButton @click="openModal" :logo-color="logoColor" />

  <ScrollToTop :is-blurred="showModal || showLeftModal" />

  <ContactModal v-model:visible="showModal" side="right" />
</template>
