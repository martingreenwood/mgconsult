<script setup lang="ts">
import hoarCrossHallImage from '@/assets/projects/hoar-cross-hall-card.webp'
import theElmsImage from '@/assets/projects/the-elms-card.webp'
import theVineyardImage from '@/assets/projects/the-vineyard-card.webp'
import villaHotelsImage from '@/assets/projects/villa-hotels-card.webp'

interface Project {
  id: number
  title: string
  client: string
  description: string
  image: string
  width: number
  height: number
  tags: string[]
  link?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Real-Time Availability Workflow",
    client: "Barons Eden",
    description: "Booking system integration with live availability, customer portal journeys, and operational tools for managing high-value experiences.",
    image: hoarCrossHallImage,
    width: 1200,
    height: 800,
    tags: ["Availability Logic", "Customer Portal", "Real-time Data"]
  },
  {
    id: 2,
    title: "CMS & Event Booking Flow",
    client: "The Elms",
    description: "Custom CMS and event booking flow with integrated payments, content workflows, and customer communications for a busy historic venue.",
    image: theElmsImage,
    width: 1200,
    height: 799,
    tags: ["Event Workflows", "Payment Integration", "CMS"]
  },
  {
    id: 3,
    title: "Pricing & Operations Integration",
    client: "Villa Hotels",
    description: "Modern booking engine work connecting dynamic pricing, customer preferences, reporting needs, and back-office platform integration.",
    image: villaHotelsImage,
    width: 1200,
    height: 900,
    tags: ["Dynamic Pricing", "Platform Integration", "Analytics"]
  },
  {
    id: 4,
    title: "Group Booking & Commerce Flow",
    client: "The Vineyard",
    description: "Custom booking and commerce flows for group reservations, online sales, and operational management across multiple customer journeys.",
    image: theVineyardImage,
    width: 1200,
    height: 800,
    tags: ["Group Booking", "E-commerce", "Workflow Design"]
  }
]
</script>

<template>
  <section class="projects-section dark-section bg-zinc-800 dark:bg-zinc-900" aria-labelledby="projects-heading">
    <div class="flex flex-col gap-24 max-w-6xl mx-auto">
      <div class="flex flex-col gap-4">
        <h2 id="projects-heading" class="text-2xl max-w-6xl coco text-white">
          Recent Projects
        </h2>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          Selected examples from hospitality, venues, and experience-led work, reframed around the operational problems
          they solved: availability, payments, content workflows, reporting, and connected customer journeys.
        </p>
      </div>

      <div class="masonry-container">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="card !pt-0"
        >
          <img
            :src="project.image"
            :alt="project.title"
            :width="project.width"
            :height="project.height"
            loading="lazy"
            decoding="async"
          >
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-white">
                {{ project.title }}
              </h3>
            </div>
            <div class="text-sm font-light text-neutral-50 dark:text-neutral-200">
              {{ project.client }}
            </div>
            <p class="block leading-normal font-light text-gray-100 dark:text-gray-200">
              {{ project.description }}
            </p>
          </div>

          <ul class="!bg-neutral-900 dark:!bg-neutral-800 !border-neutral-900 dark:!border-neutral-700">
            <li class="!text-neutral-50 dark:!text-neutral-100" v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
