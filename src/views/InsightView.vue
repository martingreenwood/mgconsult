<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { fallbackInsights } from '@/content/insights'
import type { InsightDetail } from '@/services/contentApi'
import { fetchInsight } from '@/services/contentApi'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const insight = ref<InsightDetail>()
const isLoading = ref(true)
const notFound = ref(false)

const slug = computed(() => String(route.params.slug ?? ''))
const renderedContent = computed(() => renderMarkdown(insight.value?.content))

const fallbackInsight = (insightSlug: string): InsightDetail | undefined => {
  const match = fallbackInsights.find((item) => (
    item.url.endsWith(`/insights/${insightSlug}`) || item.id === insightSlug
  ))

  if (!match) return undefined

  return {
    ...match,
    content: undefined,
    date: match.eyebrow,
  }
}

const loadInsight = async () => {
  isLoading.value = true
  notFound.value = false

  try {
    insight.value = await fetchInsight(slug.value)
  } catch {
    insight.value = fallbackInsight(slug.value)
  }

  if (!insight.value) {
    notFound.value = true
  }

  isLoading.value = false
}

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

useSeoMeta({
  title: computed(() => (
    insight.value
      ? `${insight.value.title} | Insight | Martin Greenwood`
      : 'Insight | Martin Greenwood'
  )),
  description: computed(() => insight.value?.intro ?? 'A practical note from Martin Greenwood.'),
  ogTitle: computed(() => (
    insight.value
      ? `${insight.value.title} | Insight | Martin Greenwood`
      : 'Insight | Martin Greenwood'
  )),
  ogDescription: computed(() => insight.value?.intro ?? 'A practical note from Martin Greenwood.'),
  ogImage: computed(() => insight.value?.image),
  twitterTitle: computed(() => (
    insight.value
      ? `${insight.value.title} | Insight | Martin Greenwood`
      : 'Insight | Martin Greenwood'
  )),
  twitterDescription: computed(() => insight.value?.intro ?? 'A practical note from Martin Greenwood.'),
  twitterImage: computed(() => insight.value?.image),
})

onMounted(loadInsight)

watch(slug, loadInsight)
</script>

<template>
  <section v-if="isLoading" class="project-detail-status" aria-live="polite">
    <p class="eyebrow">Loading insight</p>
  </section>

  <section v-else-if="notFound" class="project-detail-status">
    <p class="eyebrow">Insight not found</p>
    <h1>This note is not in the journal yet.</h1>
    <RouterLink class="button button--dark" to="/insights">
      Back to insights
    </RouterLink>
  </section>

  <template v-else-if="insight">
    <article class="insight-detail">
      <header v-reveal class="insight-detail-hero">
        <RouterLink class="project-detail__back" to="/insights">
          Back to insights
        </RouterLink>
        <p class="eyebrow">{{ insight.date ?? insight.eyebrow ?? 'Insight' }}</p>
        <h1>{{ insight.title }}</h1>
        <p>{{ insight.intro }}</p>
      </header>

      <div v-if="insight.image" v-reveal class="insight-detail-media">
        <img
          v-image-reveal
          :src="insight.image"
          :alt="insight.title"
          :width="insight.imageWidth"
          :height="insight.imageHeight"
          loading="eager"
          decoding="async"
        >
      </div>

      <section class="project-detail-body section--cream">
        <div v-reveal class="project-detail-body__content">
          <div v-if="renderedContent" class="rich-text" v-html="renderedContent"></div>
          <div v-else class="rich-text">
            <p>
              This journal entry is still being written up. It will live here once the note has
              enough useful detail to be worth your reading time.
            </p>
          </div>
        </div>
      </section>
    </article>

    <section v-reveal class="final-cta" aria-label="Start a conversation">
      <p class="eyebrow">Next step</p>
      <h2>Got a digital decision that could use a calmer second brain?</h2>
      <button class="button button--dark" type="button" @click="emitContact">
        Talk to Martin
      </button>
    </section>
  </template>
</template>
