<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findServiceBySlug, services } from '@/content/services'

const route = useRoute()

const service = computed(() => findServiceBySlug(
  (route.meta.serviceSlug as string | undefined) ?? route.params.slug,
))

const relatedServices = computed(() => {
  if (!service.value) return services
  return services.filter((item) => item.slug !== service.value?.slug)
})

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}
</script>

<template>
  <template v-if="service">
    <section v-reveal class="service-hero" :aria-labelledby="`service-${service.slug}-title`">
      <div class="service-hero__copy">
        <p class="eyebrow">Service / {{ service.shortTitle }}</p>
        <h1 :id="`service-${service.slug}-title`">
          {{ service.title }}
        </h1>
        <p>{{ service.intro }}</p>
        <div class="home-hero__actions">
          <button class="button button--dark" type="button" @click="emitContact">
            Talk about this
          </button>
          <a class="button button--line" href="/#services">
            Back to services
          </a>
        </div>
      </div>

      <div class="service-hero__media">
        <img v-image-reveal :src="service.image" :alt="`${service.title} service illustration`" width="900" height="640" loading="eager" decoding="async">
      </div>
    </section>

    <section v-reveal class="section section--cream service-detail" aria-labelledby="service-outcomes-title">
      <div class="section-heading">
        <p class="eyebrow">What changes</p>
        <h2 id="service-outcomes-title">The work should leave the business clearer, not just busier.</h2>
      </div>

      <div class="service-detail__grid">
        <article class="service-detail__panel">
          <h3>Useful outcomes</h3>
          <ul class="service-proof-list">
            <li v-for="(outcome, index) in service.outcomes" :key="outcome">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              {{ outcome }}
            </li>
          </ul>
        </article>

        <article class="service-detail__panel service-detail__panel--ink">
          <h3>Typical work</h3>
          <ul class="service-work-list">
            <li v-for="(item, index) in service.work" :key="item">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section v-reveal class="about-section service-note" aria-labelledby="service-note-title">
      <div class="about-section__statement">
        <p class="eyebrow">How I approach it</p>
        <h2 id="service-note-title">{{ service.proof }}</h2>
      </div>
      <div class="about-section__copy">
        <p>
          I keep the work close to the commercial reason it exists. That means understanding the workflow,
          making the technical trade-offs visible, and shipping changes that people can actually use.
        </p>
        <p>
          The same pattern runs through the whole MG service offer: clear direction, senior implementation,
          and enough context to avoid creating a new mess while fixing the old one.
        </p>
      </div>
    </section>

    <section v-reveal class="section section--paper" aria-labelledby="related-services-title">
      <div class="section-heading section-heading--split">
        <div>
          <p class="eyebrow">Related services</p>
          <h2 id="related-services-title">The work often overlaps with these areas too.</h2>
        </div>
        <a class="text-link" href="/#services">All services</a>
      </div>

      <div class="service-grid service-grid--related">
        <a
          v-for="(related, index) in relatedServices"
          :key="related.slug"
          class="service-card recent-project-card homepage-card homepage-card--service"
          :href="`/service/${related.slug}`"
          :style="{ '--reveal-delay': `${index * 80}ms` }"
          v-reveal
        >
          <img
            v-image-reveal
            class="recent-project-card__image"
            :src="related.image"
            :alt="`${related.title} service illustration`"
            loading="lazy"
            decoding="async"
          >
          <div class="recent-project-card__copy">
            <p class="eyebrow">{{ related.shortTitle }}</p>
            <h3>{{ related.title }}</h3>
            <p>{{ related.summary }}</p>
            <div class="tag-row">
              <span v-for="tag in related.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>

    <section v-reveal class="final-cta" aria-label="Start a conversation">
      <p class="eyebrow">Next step</p>
      <h2>Want to see whether this is the right shape of help?</h2>
      <button class="button button--dark" type="button" @click="emitContact">
        Talk to Martin
      </button>
    </section>
  </template>
</template>
