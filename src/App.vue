<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'
import { baseUrl, defaultSeo } from '@/config/seo'
import ContactModal from '@/modals/ContactModal.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import SiteHeader from '@/components/site/SiteHeader.vue'

const route = useRoute()
const showModal = ref(false)

type RouteSeo = {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogUrl?: string
  ogType?: 'website' | 'article'
  ogLocale?: string
  ogSiteName?: string
  twitterCard?: 'summary_large_image' | 'summary' | 'app' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  robots?: string
  canonical?: string
}

const homeSeo: RouteSeo = {
  title: defaultSeo.title,
  description: defaultSeo.description,
  ogTitle: defaultSeo.title,
  ogDescription: defaultSeo.description,
  ogImage: defaultSeo.ogImage,
  ogImageWidth: defaultSeo.ogImageWidth,
  ogImageHeight: defaultSeo.ogImageHeight,
  ogUrl: `${baseUrl}/`,
  ogType: 'website',
  ogLocale: defaultSeo.ogLocale,
  ogSiteName: defaultSeo.siteName,
  twitterCard: defaultSeo.twitterCard,
  twitterTitle: defaultSeo.title,
  twitterDescription: defaultSeo.description,
  twitterImage: defaultSeo.ogImage,
  canonical: `${baseUrl}/`,
}

const activeSeo = computed<RouteSeo>(() => {
  const isRoot = route.path === '/' || route.path === ''
  return isRoot ? homeSeo : (route.meta.seo as RouteSeo | undefined) ?? {}
})

useSeoMeta({
  title: computed(() => activeSeo.value.title ?? defaultSeo.title),
  description: computed(() => activeSeo.value.description ?? defaultSeo.description),
  ogTitle: computed(() => activeSeo.value.ogTitle ?? activeSeo.value.title ?? defaultSeo.title),
  ogDescription: computed(() => activeSeo.value.ogDescription ?? activeSeo.value.description ?? defaultSeo.description),
  ogImage: computed(() => activeSeo.value.ogImage ?? defaultSeo.ogImage),
  ogImageWidth: computed(() => activeSeo.value.ogImageWidth ?? defaultSeo.ogImageWidth),
  ogImageHeight: computed(() => activeSeo.value.ogImageHeight ?? defaultSeo.ogImageHeight),
  ogUrl: computed(() => activeSeo.value.ogUrl ?? `${baseUrl}/`),
  ogType: computed(() => activeSeo.value.ogType ?? 'website'),
  ogLocale: computed(() => activeSeo.value.ogLocale ?? defaultSeo.ogLocale),
  ogSiteName: computed(() => activeSeo.value.ogSiteName ?? defaultSeo.siteName),
  twitterCard: computed(() => activeSeo.value.twitterCard ?? defaultSeo.twitterCard),
  twitterTitle: computed(() => activeSeo.value.twitterTitle ?? activeSeo.value.title ?? defaultSeo.title),
  twitterDescription: computed(
    () => activeSeo.value.twitterDescription ?? activeSeo.value.description ?? defaultSeo.description,
  ),
  twitterImage: computed(() => activeSeo.value.twitterImage ?? activeSeo.value.ogImage ?? defaultSeo.ogImage),
  robots: computed(() => activeSeo.value.robots),
})

useHead({
  link: computed(() => {
    const canonical = activeSeo.value.canonical ?? `${baseUrl}/`
    return canonical ? [{ rel: 'canonical', href: canonical }] : []
  }),
})

const openModal = () => {
  showModal.value = true
}

const handleOpenContactModal = () => {
  openModal()
}

onMounted(() => {
  window.addEventListener('open-contact-modal', handleOpenContactModal)
})

onUnmounted(() => {
  window.removeEventListener('open-contact-modal', handleOpenContactModal)
})
</script>

<template>
  <a href="#main-content" class="skip-to-content">
    Skip to main content
  </a>

  <SiteHeader @contact="openModal" />

  <main id="main-content" class="site-main" :class="{ 'is-muted': showModal }" role="main">
    <router-view />
  </main>

  <SiteFooter @contact="openModal" />
  <ContactModal v-model:visible="showModal" side="right" />
</template>
