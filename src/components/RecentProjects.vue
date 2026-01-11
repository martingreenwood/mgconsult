<script setup lang="ts">
interface Project {
  id: number
  title: string
  client: string
  description: string
  image: string
  tags: string[]
  link?: string
}

// Helper function to get image URL
const getImageUrl = (name: string) => {
  return new URL(`../assets/projects/${name}`, import.meta.url).href
}

const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Spa Booking Experience",
    client: "Barons Eden",
    description: "Complete booking system integration with real-time availability, guest portal, and seamless spa experience management.",
    image: getImageUrl('hoar-cross-hall.jpg'),
    tags: ["Booking Integration", "Guest Portal", "Real-time Data"]
  },
  {
    id: 2,
    title: "Countryside Retreat",
    client: "The Elms",
    description: "Custom CMS and event booking flow for historic venue with integrated payment processing and guest communications.",
    image: getImageUrl('the-elms.jpg'),
    tags: ["Event Management", "Payment Integration", "CMS"]
  },
  {
    id: 3,
    title: "Boutique Hotel",
    client: "Villa Hotels",
    description: "Modern booking engine with dynamic pricing, guest preferences, and comprehensive PMS integration.",
    image: getImageUrl('villa-hotels.jpg'),
    tags: ["Dynamic Pricing", "PMS Integration", "Analytics"]
  },
  {
    id: 4,
    title: "Luxury Hotel & Spa",
    client: "The Vineyard",
    description: "Custom booking engine with group booking, e-commerce, and spa experience management.",
    image: getImageUrl('the-vineyard.jpg'),
    tags: ["Group Booking", "E-commerce", "Experience Management"]
  }
]
</script>

<template>
  <section class="projects-section dark-section bg-zinc-800 dark:bg-zinc-900">
    <div class="flex flex-col gap-24 max-w-6xl mx-auto">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl max-w-6xl coco text-white">
          Recent Projects
        </h2>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          A selection of recent work across hospitality, events, and experience-driven businesses.
          Each project solved real operational challenges while delivering better user experiences.
        </p>
      </div>

      <div class="masonry-container">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="card !pt-0"
        >
          <img :src="project.image" :alt="project.title" loading="lazy" decoding="async">
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
