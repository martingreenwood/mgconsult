<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { fallbackProjects } from '@/content/projects'
import type { ProjectDetail } from '@/services/contentApi'
import { fetchProject } from '@/services/contentApi'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const project = ref<ProjectDetail>()
const isLoading = ref(true)
const notFound = ref(false)

const slug = computed(() => String(route.params.slug ?? ''))

const projectLabels = computed(() => {
  return project.value?.projectTypes && project.value.projectTypes.length > 0
    ? project.value.projectTypes
    : [project.value?.eyebrow ?? 'Project']
})

const websiteLabel = computed(() => {
  if (!project.value?.websiteUrl) return undefined

  return project.value.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
})

const renderedContent = computed(() => renderMarkdown(project.value?.content))

const fallbackProject = (projectSlug: string): ProjectDetail | undefined => {
  const match = fallbackProjects.find((item) => item.url.endsWith(`/projects/${projectSlug}`) || item.id === projectSlug)

  if (!match) return undefined

  return {
    ...match,
    content: undefined,
    date: undefined,
    websiteUrl: undefined,
  }
}

const loadProject = async () => {
  isLoading.value = true
  notFound.value = false

  try {
    project.value = await fetchProject(slug.value)
  } catch {
    project.value = fallbackProject(slug.value)
  }

  if (!project.value) {
    notFound.value = true
  }

  isLoading.value = false
}

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

useSeoMeta({
  title: computed(() => (
    project.value
      ? `${project.value.title} | Project | Martin Greenwood`
      : 'Project | Martin Greenwood'
  )),
  description: computed(() => project.value?.intro ?? 'Selected project from Martin Greenwood.'),
  ogTitle: computed(() => (
    project.value
      ? `${project.value.title} | Project | Martin Greenwood`
      : 'Project | Martin Greenwood'
  )),
  ogDescription: computed(() => project.value?.intro ?? 'Selected project from Martin Greenwood.'),
  ogImage: computed(() => project.value?.image),
  twitterTitle: computed(() => (
    project.value
      ? `${project.value.title} | Project | Martin Greenwood`
      : 'Project | Martin Greenwood'
  )),
  twitterDescription: computed(() => project.value?.intro ?? 'Selected project from Martin Greenwood.'),
  twitterImage: computed(() => project.value?.image),
})

onMounted(loadProject)

watch(slug, loadProject)
</script>

<template>
  <section v-if="isLoading" class="project-detail-status" aria-live="polite">
    <p class="eyebrow">Loading project</p>
  </section>

  <section v-else-if="notFound" class="project-detail-status">
    <p class="eyebrow">Project not found</p>
    <h1>This project is not in the archive yet.</h1>
    <RouterLink class="button button--dark" to="/projects">
      Back to projects
    </RouterLink>
  </section>

  <template v-else-if="project">
    <article class="project-detail">
      <header v-reveal class="project-detail-hero">
        <div class="project-detail-hero__copy">
          <RouterLink class="project-detail__back" to="/projects">
            Back to projects
          </RouterLink>
          <div class="project-detail__terms" aria-label="Project types">
            <span v-for="label in projectLabels" :key="label" class="eyebrow">
              {{ label }}
            </span>
          </div>
          <h1>{{ project.title }}</h1>
          <p>{{ project.intro }}</p>
        </div>

        <div v-if="project.image" class="project-detail-hero__media">
          <img
            v-image-reveal
            :src="project.image"
            :alt="project.title"
            loading="eager"
            decoding="async"
          >
        </div>
      </header>

      <section v-reveal class="project-detail-meta" aria-label="Project information">
        <div>
          <p class="eyebrow">Project</p>
          <p>{{ project.title }}</p>
        </div>
        <div v-if="project.date">
          <p class="eyebrow">Date</p>
          <p>{{ project.date }}</p>
        </div>
        <div>
          <p class="eyebrow">Work</p>
          <p>{{ projectLabels.join(' / ') }}</p>
        </div>
        <div v-if="project.websiteUrl">
          <p class="eyebrow">Website</p>
          <a :href="project.websiteUrl" target="_blank" rel="noreferrer">
            {{ websiteLabel }}
          </a>
        </div>
      </section>

      <section class="project-detail-body section--cream">
        <div v-reveal class="project-detail-body__intro">
          <p class="eyebrow">Overview</p>
        </div>

        <div v-reveal class="project-detail-body__content">
          <div v-if="renderedContent" class="rich-text" v-html="renderedContent"></div>
          <div v-else class="rich-text">
            <p>
              This archive entry is still being written up. The work sits in the MG project library
              as a useful example of connected website, CMS and operational delivery.
            </p>
            <p>
              If you want the detail behind this one, I can talk through the decisions, constraints
              and useful bits that made the project work.
            </p>
          </div>
        </div>
      </section>
    </article>

    <section v-reveal class="final-cta" aria-label="Start a conversation">
      <p class="eyebrow">Next step</p>
      <h2>Got a project that needs the same kind of calm technical ownership?</h2>
      <button class="button button--dark" type="button" @click="emitContact">
        Talk to Martin
      </button>
    </section>
  </template>
</template>
