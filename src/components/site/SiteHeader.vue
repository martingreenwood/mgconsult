<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SiteLogo from '@/components/site/SiteLogo.vue'
import { services } from '@/content/services'

const isOpen = ref(false)
const isServicesOpen = ref(false)
const bannerRef = ref<HTMLElement | null>(null)
const primaryLogoRef = ref<HTMLElement | null>(null)
const bannerOffset = ref(0)
const primaryLogoOpacity = ref(0)
const isBannerHidden = computed(() => bannerOffset.value > 0)
const route = useRoute()

const leftNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
]

const rightNav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

const currentPath = computed(() => route.path)

const isActivePath = (href: string) => {
  if (href === '/') return currentPath.value === '/'
  return currentPath.value === href || currentPath.value.startsWith(`${href}/`)
}

const isServicesActive = computed(() => (
  currentPath.value.startsWith('/service')
  || (currentPath.value === '/' && route.hash === '#services')
))

const isServiceActive = (slug: string) => currentPath.value === `/service/${slug}`

const closeMenu = () => {
  isOpen.value = false
  isServicesOpen.value = false
}

const toggleServices = () => {
  isServicesOpen.value = !isServicesOpen.value
}

const closeServices = () => {
  isServicesOpen.value = false
}

let ticking = false
const bannerScrollRatio = 0.58

const updateBannerVisibility = () => {
  const bannerHeight = bannerRef.value?.offsetHeight ?? 0
  const maxOffset = bannerHeight + 24
  const nextOffset = Math.min(window.scrollY * bannerScrollRatio, maxOffset)

  bannerOffset.value = nextOffset

  const primaryLogoRect = primaryLogoRef.value?.getBoundingClientRect()

  if (!primaryLogoRect || bannerHeight === 0) {
    primaryLogoOpacity.value = 0
  } else {
    const bannerBottom = bannerHeight - nextOffset
    const fadeStart = primaryLogoRect.top + primaryLogoRect.height
    const fadeDistance = primaryLogoRect.height
    const progress = (fadeStart - bannerBottom) / fadeDistance

    primaryLogoOpacity.value = Math.min(Math.max(progress, 0), 1)
  }

  ticking = false
}

const handleScroll = () => {
  if (ticking) return

  window.requestAnimationFrame(updateBannerVisibility)
  ticking = true
}

onMounted(() => {
  updateBannerVisibility()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <header class="site-header" role="banner">
    <nav class="site-nav" aria-label="Main navigation">
      <div class="site-nav__group site-nav__group--left">
        <a
          :href="leftNav[0].href"
          :class="{ 'is-active': isActivePath(leftNav[0].href) }"
          :aria-current="isActivePath(leftNav[0].href) ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ leftNav[0].label }}
        </a>

        <div class="site-nav__item site-nav__item--services" @mouseleave="closeServices">
          <button
            type="button"
            class="site-nav__services-trigger"
            :class="{ 'is-active': isServicesActive }"
            aria-haspopup="true"
            :aria-expanded="isServicesOpen"
            aria-controls="services-menu"
            @click="toggleServices"
          >
            Services
          </button>
          <div
            id="services-menu"
            class="site-nav__submenu"
            :class="{ 'is-open': isServicesOpen }"
            aria-label="Service pages"
          >
            <a
              v-for="service in services"
              :key="service.slug"
              :href="`/service/${service.slug}`"
              :class="{ 'is-active': isServiceActive(service.slug) }"
              :aria-current="isServiceActive(service.slug) ? 'page' : undefined"
              @click="closeMenu"
            >
              <span>{{ service.shortTitle }}</span>
              <small>{{ service.summary }}</small>
            </a>
            <a
              class="site-nav__submenu-overview"
              href="/#services"
              :class="{ 'is-active': currentPath === '/' && route.hash === '#services' }"
              @click="closeMenu"
            >
              <span>View all services</span>
            </a>
          </div>
        </div>

        <a
          :href="leftNav[1].href"
          :class="{ 'is-active': isActivePath(leftNav[1].href) }"
          :aria-current="isActivePath(leftNav[1].href) ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ leftNav[1].label }}
        </a>
      </div>

      <div
        ref="bannerRef"
        class="site_logo_banner"
        :class="{ 'is-hidden': isBannerHidden }"
        :style="{ '--banner-offset': `${bannerOffset}px` }"
        aria-hidden="true"
        inert
      >
        <SiteLogo />
      </div>

      <div
        ref="primaryLogoRef"
        class="site-nav__logo"
        :class="{ 'is-visible': primaryLogoOpacity > 0.98 }"
        :style="{ '--primary-logo-opacity': primaryLogoOpacity }"
      >
        <SiteLogo />
      </div>

      <div class="site-nav__group site-nav__group--right">
        <a
          v-for="item in rightNav"
          :key="item.label"
          :href="item.href"
          :class="{ 'is-active': isActivePath(item.href) }"
          :aria-current="isActivePath(item.href) ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>

      <button
        class="site-nav__toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="mobile-nav"
        @click="isOpen = !isOpen"
      >
        Menu
      </button>
    </nav>

    <div id="mobile-nav" class="site-mobile-nav" :class="{ 'is-open': isOpen }">
      <a
        :href="leftNav[0].href"
        :class="{ 'is-active': isActivePath(leftNav[0].href) }"
        :aria-current="isActivePath(leftNav[0].href) ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ leftNav[0].label }}
      </a>
      <a href="/#services" :class="{ 'is-active': isServicesActive }" @click="closeMenu">
        Services
      </a>
      <a
        v-for="service in services"
        :key="service.slug"
        class="site-mobile-nav__child"
        :href="`/service/${service.slug}`"
        :class="{ 'is-active': isServiceActive(service.slug) }"
        :aria-current="isServiceActive(service.slug) ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ service.shortTitle }}
      </a>
      <a
        :href="leftNav[1].href"
        :class="{ 'is-active': isActivePath(leftNav[1].href) }"
        :aria-current="isActivePath(leftNav[1].href) ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ leftNav[1].label }}
      </a>
      <a
        v-for="item in rightNav"
        :key="item.label"
        :href="item.href"
        :class="{ 'is-active': isActivePath(item.href) }"
        :aria-current="isActivePath(item.href) ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
