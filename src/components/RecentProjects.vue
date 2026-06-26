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
    title: "Availability Logic Around a Live Operation",
    client: "Barons Eden",
    description: "Integration work around live availability, customer portal journeys, and operational tools where reliability mattered because the flow was already commercially important.",
    image: hoarCrossHallImage,
    width: 1200,
    height: 800,
    tags: ["Business-critical workflow", "Customer portal", "Real-time data"]
  },
  {
    id: 2,
    title: "CMS and Event Booking Without Losing Control",
    client: "The Elms",
    description: "A custom CMS and event booking flow that joined payments, content workflows, and customer communications for a busy venue with real operational rules.",
    image: theElmsImage,
    width: 1200,
    height: 799,
    tags: ["Event workflows", "Payment integration", "Operational CMS"]
  },
  {
    id: 3,
    title: "Pricing and Operations Integration",
    client: "Villa Hotels",
    description: "Booking engine work connecting dynamic pricing, customer preferences, reporting needs, and back-office systems without flattening the business logic.",
    image: villaHotelsImage,
    width: 1200,
    height: 900,
    tags: ["Dynamic pricing", "Platform integration", "Commercial reporting"]
  },
  {
    id: 4,
    title: "Group Booking and Commerce Flow",
    client: "The Vineyard",
    description: "Customer-facing commerce and booking flows backed by operational management for group reservations, online sales, and multiple customer journeys.",
    image: theVineyardImage,
    width: 1200,
    height: 800,
    tags: ["Group booking", "E-commerce", "Workflow design"]
  }
]
</script>

<template>
  <section class="projects-section dark-section bg-zinc-800 dark:bg-zinc-900" aria-labelledby="projects-heading">
    <div class="flex flex-col gap-24 max-w-6xl mx-auto">
      <div class="flex flex-col gap-4">
        <h2 id="projects-heading" class="text-2xl max-w-6xl coco text-white">
          Proof from systems with consequences
        </h2>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          Selected examples from hospitality, venues, and experience-led work where the useful part was not just the
          interface. It was understanding the operational rules, joining the moving pieces, and keeping the business
          confident while the system changed.
        </p>
      </div>

      <div class="masonry-container">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="card !pt-0"
        >
          <img
            v-image-reveal
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
