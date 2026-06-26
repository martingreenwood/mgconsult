<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fallbackProjects } from '@/content/projects'
import type { ContentCard } from '@/services/contentApi'
import { fetchContentCards } from '@/services/contentApi'

const projects = ref<ContentCard[]>(fallbackProjects)
const activeFilter = ref('All projects')

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

const filters = computed(() => {
  const labels = projects.value
    .flatMap((project) => project.projectTypes ?? [])
    .filter((label): label is string => Boolean(label))

  return ['All projects', ...Array.from(new Set(labels))]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All projects') return projects.value

  return projects.value.filter((project) => project.projectTypes?.includes(activeFilter.value))
})

const projectLabels = (project: ContentCard) => {
  return project.projectTypes && project.projectTypes.length > 0
    ? project.projectTypes
    : [project.eyebrow ?? 'Project']
}

onMounted(async () => {
  const cmsProjects = await Promise.allSettled([
    fetchContentCards('projects', 24),
  ])

  const result = cmsProjects[0]
  if (result.status === 'fulfilled' && result.value.length > 0) {
    projects.value = result.value
  }
})
</script>

<template>
  <section v-reveal class="projects-page-hero" aria-labelledby="projects-page-title">
    <div class="projects-page-hero__inner">
      <h1 id="projects-page-title">Projects.</h1>
    </div>
  </section>

  <section class="project-index section--cream" aria-labelledby="project-index-title">
    <div class="project-index__layout">
      <aside v-reveal class="project-index__sidebar">
        <h2 id="project-index-title">Websites and other digital projects.</h2>
        <p>
          Selected work across hospitality, venues, experience-led brands and operationally important
          systems. Some projects are full builds; others are the calmer technical layer that makes the
          visible customer journey work properly.
        </p>
        <div class="project-filter-panel">
          <p class="eyebrow">Filter projects</p>
          <div class="project-filter" aria-label="Project filters">
            <button
              v-for="filter in filters"
              :key="filter"
              type="button"
              :class="{ 'is-active': activeFilter === filter }"
              @click="activeFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
      </aside>

      <div class="project-index__grid">
        <a
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-index-card"
          :href="project.url"
          :style="{ '--reveal-delay': `${Math.min(index, 5) * 60}ms` }"
          v-reveal
        >
          <div class="project-index-card__media">
            <div class="project-index-card__terms" aria-label="Project types">
              <span v-for="label in projectLabels(project)" :key="label" class="eyebrow">
                {{ label }}
              </span>
            </div>
            <img
              v-if="project.image"
              v-image-reveal
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="project-index-card__body">
            <p class="eyebrow">{{ projectLabels(project).join(' / ') }}</p>
            <h2>{{ project.title }}</h2>
            <p>{{ project.intro }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section v-reveal class="final-cta" aria-label="Start a conversation">
    <p class="eyebrow">Next step</p>
    <h2>Got a project that needs clearer thinking before more code?</h2>
    <button class="button button--dark" type="button" @click="emitContact">
      Talk to Martin
    </button>
  </section>
</template>
