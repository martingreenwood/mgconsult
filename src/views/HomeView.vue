<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ContentCard } from '@/services/contentApi'
import { fetchContentCards } from '@/services/contentApi'
import hoarCrossImage from '@/assets/projects/hoar-cross-hall-card.webp'
import theElmsImage from '@/assets/projects/the-elms-card.webp'
import vineyardImage from '@/assets/projects/the-vineyard-card.webp'
import bookingImage from '@/assets/img/booking.webp'
import integrationImage from '@/assets/img/api-integration-card.webp'
import dashboardImage from '@/assets/img/data-dashboards.webp'

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

const services = [
  {
    title: 'Digital consultancy',
    text: 'Shape practical technical direction, prioritise the right work, and turn vague digital pressure into a plan the business can actually use.',
    tags: ['Discovery', 'Roadmaps', 'Technical direction'],
  },
  {
    title: 'Websites and CMS',
    text: 'Design and build performant marketing sites, headless content systems and Laravel-backed digital products with clear editorial control.',
    tags: ['Vue', 'Laravel', 'Statamic'],
  },
  {
    title: 'Systems and integrations',
    text: 'Connect booking engines, CRMs, payment flows, dashboards and internal tools so the operational work feels less handmade.',
    tags: ['APIs', 'Automation', 'Reporting'],
  },
]

const fallbackProjects: ContentCard[] = [
  {
    id: 'hoar-cross-hall',
    title: 'Hoar Cross Hall',
    intro: 'Operational improvements around hospitality workflows, booking journeys and internal systems.',
    url: '/projects/hoar-cross-hall',
    image: hoarCrossImage,
    eyebrow: 'Hospitality systems',
  },
  {
    id: 'the-elms',
    title: 'The Elms',
    intro: 'Useful digital infrastructure for experience-led teams with live customer journeys.',
    url: '/projects/the-elms',
    image: theElmsImage,
    eyebrow: 'Experience-led hotel',
  },
  {
    id: 'the-vineyard',
    title: 'The Vineyard',
    intro: 'Technical partnership across web, operational tooling and connected commercial workflows.',
    url: '/projects/the-vineyard',
    image: vineyardImage,
    eyebrow: 'Luxury hospitality',
  },
]

const fallbackInsights: ContentCard[] = [
  {
    id: 'headless-content',
    title: 'When a headless CMS is worth the extra moving parts',
    intro: 'A practical note on content architecture, editorial control and avoiding unnecessary complexity.',
    url: '/insights/headless-content',
    image: dashboardImage,
    eyebrow: 'Content systems',
  },
  {
    id: 'booking-flows',
    title: 'The hidden complexity inside simple booking flows',
    intro: 'Availability, entitlement, payment and operational rules need more care than the UI suggests.',
    url: '/insights/booking-flows',
    image: bookingImage,
    eyebrow: 'Booking logic',
  },
  {
    id: 'api-glue',
    title: 'Good API glue is boring in exactly the right way',
    intro: 'Why integration work should prioritise observability, recovery and clear ownership.',
    url: '/insights/api-glue',
    image: integrationImage,
    eyebrow: 'Integrations',
  },
]

const projects = ref<ContentCard[]>(fallbackProjects)
const insights = ref<ContentCard[]>(fallbackInsights)

onMounted(async () => {
  const [cmsProjects, cmsInsights] = await Promise.allSettled([
    fetchContentCards('projects', 3),
    fetchContentCards('insights', 3),
  ])

  if (cmsProjects.status === 'fulfilled' && cmsProjects.value.length > 0) {
    projects.value = cmsProjects.value
  }

  if (cmsInsights.status === 'fulfilled' && cmsInsights.value.length > 0) {
    insights.value = cmsInsights.value
  }
})
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__copy">
      <h1 id="home-hero-title">
          Your website development and integration partner
      </h1>
      <p>
        I add value to businesses by make their digital setup feel less accidental: sharper websites,
        better CMS foundations, reliable integrations and practical technical direction.
      </p>
      <div class="home-hero__actions">
        <button class="button button--dark" type="button" @click="emitContact">
          Start a project
        </button>
        <a class="button button--line" href="/#projects">
          See recent work
        </a>
      </div>
    </div>

  </section>

  <section id="services" class="section section--cream" aria-labelledby="services-title">
    <div class="section-heading">
      <p class="eyebrow">Services</p>
      <h2 id="services-title">Senior help across the awkward middle of strategy and delivery.</h2>
    </div>

    <div class="service-grid">
      <article v-for="service in services" :key="service.title" class="service-card">
        <h3>{{ service.title }}</h3>
        <p>{{ service.text }}</p>
        <div class="tag-row">
          <span v-for="tag in service.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>

  <section id="projects" class="section section--ink" aria-labelledby="projects-title">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">Projects</p>
        <h2 id="projects-title">Selected work, pulled from the headless CMS when available.</h2>
      </div>
      <a class="text-link" href="/projects">All projects</a>
    </div>

    <div class="feature-grid">
      <a v-for="project in projects" :key="project.id" class="feature-card" :href="project.url">
        <img v-if="project.image" :src="project.image" :alt="project.title" loading="lazy" decoding="async">
        <div>
          <p class="eyebrow">{{ project.eyebrow }}</p>
          <h3>{{ project.title }}</h3>
          <p>{{ project.intro }}</p>
        </div>
      </a>
    </div>
  </section>

  <section id="about" class="about-section" aria-labelledby="about-title">
    <div class="about-section__statement">
      <p class="eyebrow">About</p>
      <h2 id="about-title">A senior digital partner for teams that need clearer thinking and working software.</h2>
    </div>
    <div class="about-section__copy">
      <p>
        MG is the consulting practice of Martin Greenwood. The work sits where commercial websites,
        content operations, booking journeys, internal systems and API glue start depending on each other.
      </p>
      <p>
        The value is not just writing code. It is understanding the moving parts, deciding what matters,
        and then making the next useful thing real without adding agency theatre.
      </p>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="insights-title">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">Insights</p>
        <h2 id="insights-title">Notes on websites, systems and the operational reality around them.</h2>
      </div>
      <a class="text-link" href="/insights">All insights</a>
    </div>

    <div class="insight-list">
      <a v-for="insight in insights" :key="insight.id" class="insight-row" :href="insight.url">
        <img v-if="insight.image" :src="insight.image" :alt="insight.title" loading="lazy" decoding="async">
        <div>
          <p class="eyebrow">{{ insight.eyebrow }}</p>
          <h3>{{ insight.title }}</h3>
          <p>{{ insight.intro }}</p>
        </div>
      </a>
    </div>
  </section>

  <section class="final-cta" aria-label="Start a conversation">
    <p class="eyebrow">Next step</p>
    <h2>Got a website, workflow or integration that needs a grown-up in the room?</h2>
    <button class="button button--dark" type="button" @click="emitContact">
      Talk to Martin
    </button>
  </section>
</template>
