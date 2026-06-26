<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ContentCard } from '@/services/contentApi'
import { fetchContentCards } from '@/services/contentApi'
import { fallbackInsights } from '@/content/insights'
import { fallbackProjects } from '@/content/projects'
import { services } from '@/content/services'
import FAQ from '@/components/FAQ.vue'
import martinGreenwoodImage from '@/assets/img/martin-greenwood.webp'

const trustLogoModules = import.meta.glob('../assets/trust/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const logoNames: Record<string, string> = {
  be: 'Barons Eden',
  eh: 'Eden Hall',
  elms: 'The Elms',
  future: 'Future',
  hch: 'Hoar Cross Hall',
  journey: 'Journey',
  middle8: 'Middle Eight',
  pob: 'Pride of Britain',
}

const trustLogos = Object.entries(trustLogoModules)
  .map(([path, src]) => {
    const filename = path.split('/').pop()?.replace('.svg', '') ?? 'Partner'

    return {
      name: logoNames[filename] ?? filename.replace(/[-_]/g, ' '),
      src,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

const insights = ref<ContentCard[]>(fallbackInsights)
const recentProjects = ref<ContentCard[]>(fallbackProjects.slice(0, 6))

onMounted(async () => {
  const [cmsProjects, cmsInsights] = await Promise.allSettled([
    fetchContentCards('projects', 24),
    fetchContentCards('insights', 3),
  ])

  if (cmsProjects.status === 'fulfilled' && cmsProjects.value.length > 0) {
    recentProjects.value = cmsProjects.value.slice(0, 6)
  }

  if (cmsInsights.status === 'fulfilled' && cmsInsights.value.length > 0) {
    insights.value = cmsInsights.value
  }
})
</script>

<template>
  <section v-reveal class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__copy">
      <h1 id="home-hero-title">
        Your website development and integration partner
      </h1>
      <p>
        I add value to businesses by making their digital setup feel less accidental: sharper websites,
        better CMS foundations, reliable integrations and practical technical direction.
      </p>
      <div class="home-hero__actions">
        <button class="button button--dark" type="button" @click="emitContact">
          Start a project
        </button>
        <a class="button button--line" href="/projects">
          See recent work
        </a>
      </div>
    </div>

  </section>

  <section v-reveal class="partner-marquee" aria-labelledby="partner-marquee-title">
    <p id="partner-marquee-title" class="eyebrow">Proudly partnering with independent businesses</p>
    <div class="partner-marquee__viewport">
      <div class="partner-marquee__track">
        <div class="partner-marquee__set" role="list" aria-label="Partner logos">
          <div
            v-for="logo in trustLogos"
            :key="logo.name"
            class="partner-marquee__logo"
            role="listitem"
          >
            <img :src="logo.src" :alt="`${logo.name} logo`" loading="lazy" decoding="async">
          </div>
        </div>
        <div class="partner-marquee__set" aria-hidden="true">
          <div
            v-for="logo in trustLogos"
            :key="`duplicate-${logo.name}`"
            class="partner-marquee__logo"
          >
            <img :src="logo.src" alt="" loading="lazy" decoding="async">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="services" v-reveal class="section section--cream" aria-labelledby="services-title">
    <div class="section-heading">
      <p class="eyebrow">Services</p>
      <h2 id="services-title">Strategy, build and integration work that moves together.</h2>
    </div>

    <div class="service-grid homepage-card-grid">
      <a
        v-for="(service, index) in services"
        :key="service.slug"
        class="service-card recent-project-card homepage-card homepage-card--service"
        :style="{ '--reveal-delay': `${index * 80}ms` }"
        :href="`/service/${service.slug}`"
        v-reveal
      >
        <img
          v-image-reveal
          class="recent-project-card__image"
          :src="service.image"
          :alt="`${service.title} service illustration`"
          loading="lazy"
          decoding="async"
        >
        <div class="recent-project-card__copy">
          <p class="eyebrow">{{ service.shortTitle }}</p>
          <h3>{{ service.title }}</h3>
          <p>{{ service.summary }}</p>
          <div class="tag-row">
            <span v-for="tag in service.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>
  </section>

  <section id="projects" v-reveal class="section section--paper recent-projects" aria-labelledby="recent-projects-title">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">Recent projects</p>
        <h2 id="recent-projects-title">A few recent examples from the project archive.</h2>
      </div>
      <a class="button button--line" href="/projects">All projects</a>
    </div>

    <div class="recent-project-grid">
      <a
        v-for="(project, index) in recentProjects"
        :key="project.id"
        class="service-card recent-project-card homepage-card"
        :class="{
          'recent-project-card--lead': index === 0,
          'recent-project-card--wide': index === 5,
        }"
        :style="{ '--reveal-delay': `${index * 70}ms` }"
        :href="project.url"
        v-reveal
      >
        <img
          v-if="project.image"
          v-image-reveal
          class="recent-project-card__image"
          :src="project.image"
          :alt="project.title"
          loading="lazy"
          decoding="async"
        >
        <div v-else class="recent-project-card__image"></div>
        <div class="recent-project-card__copy">
          <p class="eyebrow">{{ project.title ?? 'Project' }}</p>
          <h3>{{ project.intro }}</h3>
        </div>
      </a>
    </div>
  </section>

  <section id="about" v-reveal class="about-section" aria-labelledby="about-title">
    <div class="about-section__headshot">
      <img v-image-reveal :src="martinGreenwoodImage" alt="Martin Greenwood" width="760" height="950" loading="lazy" decoding="async">
    </div>
    <div class="about-section__copy">
      <p class="eyebrow">About</p>
      <h2 id="about-title">Clear technical thinking, hands-on delivery to back it up.</h2>
      <p>
        MG is the consulting practice of Martin Greenwood. The work sits where commercial websites,
        content operations, booking journeys, internal systems and API glue start depending on each other.
      </p>
      <p>
        The value is not just writing code. It is understanding the moving parts, deciding what matters,
        and then making the next useful thing real without adding agency theatre.
      </p>
      <a class="text-link" href="/about">More about Martin <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a>
    </div>
  </section>

  <section v-reveal class="section section--paper" aria-labelledby="insights-title">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">Insights</p>
        <h2 id="insights-title">Notes on better websites, calmer systems and practical digital decisions.</h2>
      </div>
      <a class="button button--line" href="/insights">All insights</a>
    </div>

    <div class="service-grid homepage-card-grid">
      <a
        v-for="(insight, index) in insights"
        :key="insight.id"
        class="service-card recent-project-card homepage-card"
        :style="{ '--reveal-delay': `${index * 80}ms` }"
        :href="insight.url"
        v-reveal
      >
        <img
          v-if="insight.image"
          v-image-reveal
          class="recent-project-card__image"
          :src="insight.image"
          :alt="insight.title"
          loading="lazy"
          decoding="async"
        >
        <div v-else class="recent-project-card__image"></div>
        <div class="recent-project-card__copy">
          <p class="eyebrow">{{ insight.eyebrow }}</p>
          <h3>{{ insight.title }}</h3>
          <p>{{ insight.intro }}</p>
        </div>
      </a>
    </div>
  </section>

  <FAQ />

  <section v-reveal class="final-cta" aria-label="Start a conversation">
    <p class="eyebrow">Next step</p>
    <h2>Got a website, workflow or integration that needs sharper direction?</h2>
    <button class="button button--dark" type="button" @click="emitContact">
      Talk to Martin
    </button>
  </section>
</template>
