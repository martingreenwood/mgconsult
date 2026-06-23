<script setup lang="ts">
import SiteLogo from '@/components/site/SiteLogo.vue'

defineEmits<{
  contact: []
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="site-footer__inner">
      <div class="site-footer__cta">
        <p class="eyebrow">Available for retained technical partnership</p>
        <h2>Bring calm ownership to the digital systems that have to work.</h2>
        <button type="button" class="button button--light" @click="$emit('contact')">
          Start a conversation
        </button>
      </div>

      <div class="site-footer__main">
        <div class="site-footer__brand">
          <SiteLogo />
          <p>
            Independent digital consultancy for businesses with important websites, integrations,
            booking flows, CMS platforms and operational tools.
          </p>
        </div>

        <nav class="site-footer__links" aria-label="Footer navigation">
          <a href="/">Home</a>
          <a href="/#services">Services</a>
          <a href="/#about">About</a>
          <a href="/projects">Projects</a>
          <a href="/insights">Insights</a>
        </nav>
      </div>

      <div class="site-footer__bottom">
        <p>&copy; {{ currentYear }} Neurospicy Studio Ltd trading as Martin Greenwood.</p>
        <a href="https://martingreenwood.com">martingreenwood.com</a>
      </div>
    </div>
  </footer>
</template>
