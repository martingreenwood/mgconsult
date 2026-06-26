<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fallbackInsights } from '@/content/insights'
import type { ContentCard } from '@/services/contentApi'
import { fetchContentCards } from '@/services/contentApi'

const insights = ref<ContentCard[]>(fallbackInsights)

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

onMounted(async () => {
  const cmsInsights = await Promise.allSettled([
    fetchContentCards('insights', 24),
  ])

  const result = cmsInsights[0]
  if (result.status === 'fulfilled' && result.value.length > 0) {
    insights.value = result.value
  }
})
</script>

<template>
  <section v-reveal class="insights-page-hero" aria-labelledby="insights-page-title">
    <div class="insights-page-hero__inner">
      <h1 id="insights-page-title">Insights.</h1>
    </div>
  </section>

  <section class="insights-index section--cream" aria-labelledby="insights-index-title">
    <div class="insights-index__layout">
      <aside v-reveal class="insights-index__sidebar">
        <h2 id="insights-index-title">Just a few thoughts.</h2>
        <p>
          Short, useful thinking from the MG journal: content systems, integration decisions,
          booking journeys and the kind of technical trade-offs that shape real digital work.
        </p>
        <p class="eyebrow">Latest thinking</p>
      </aside>

      <div class="insights-index__grid" aria-label="Insights">
        <a
          v-for="(insight, index) in insights"
          :key="insight.id"
          class="insight-index-card"
          :href="insight.url"
          :style="{ '--reveal-delay': `${Math.min(index, 5) * 60}ms` }"
          v-reveal
        >
          <div class="insight-index-card__media">
            <p class="eyebrow">{{ insight.eyebrow ?? 'Insight' }}</p>
            <img
              v-if="insight.image"
              v-image-reveal
              :src="insight.image"
              :alt="insight.title"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="insight-index-card__body">
            <p class="eyebrow">{{ insight.eyebrow ?? 'Insight' }}</p>
            <h2>{{ insight.title }}</h2>
            <p>{{ insight.intro }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section v-reveal class="final-cta" aria-label="Start a conversation">
    <p class="eyebrow">Next step</p>
    <h2>Got a digital decision that could use a calmer second brain?</h2>
    <button class="button button--dark" type="button" @click="emitContact">
      Talk to Martin
    </button>
  </section>
</template>
