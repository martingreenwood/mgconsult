<script setup lang="ts">
import SiteLogo from '@/components/site/SiteLogo.vue'
import { services } from '@/content/services'

defineEmits<{
  contact: []
  analyticsSettings: []
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="site-footer__inner">
      <div class="site-footer__cta">
        <div>
          <p class="eyebrow">Available for retained technical partnership</p>
          <h2>Bring calm ownership to the digital systems that have to work.</h2>
        </div>
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
          <div>
            <p class="site-footer__link-heading">Explore</p>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/insights">Insights</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <p class="site-footer__link-heading">Services</p>
            <a
              v-for="service in services"
              :key="service.slug"
              :href="`/service/${service.slug}`"
            >
              {{ service.shortTitle }}
            </a>
          </div>
        </nav>
      </div>

      <div class="site-footer__bottom">
        <p>&copy; 2010-{{ currentYear }} Martin Greenwood. Independent digital consultant. Trading through Neurospicy Studio Ltd.</p>
        <button type="button" @click="$emit('analyticsSettings')">
          Analytics settings
        </button>
      </div>
    </div>
  </footer>
</template>
