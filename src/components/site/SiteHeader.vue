<script setup lang="ts">
import { ref } from 'vue'
import SiteLogo from '@/components/site/SiteLogo.vue'

const emit = defineEmits<{
  contact: []
}>()

const isOpen = ref(false)

const leftNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
]

const rightNav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/insights' },
]

const closeMenu = () => {
  isOpen.value = false
}

const openContact = () => {
  closeMenu()
  emit('contact')
}
</script>

<template>
  <header class="site-header" role="banner">
    <nav class="site-nav" aria-label="Main navigation">
      <div class="site-nav__group site-nav__group--left">
        <a v-for="item in leftNav" :key="item.label" :href="item.href" @click="closeMenu">
          {{ item.label }}
        </a>
      </div>

      <SiteLogo />

      <div class="site-nav__group site-nav__group--right">
        <a v-for="item in rightNav" :key="item.label" :href="item.href" @click="closeMenu">
          {{ item.label }}
        </a>
        <button type="button" @click="openContact">
          Contact
        </button>
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
      <a v-for="item in [...leftNav, ...rightNav]" :key="item.label" :href="item.href" @click="closeMenu">
        {{ item.label }}
      </a>
      <button type="button" @click="openContact">
        Contact
      </button>
    </div>
  </header>
</template>
