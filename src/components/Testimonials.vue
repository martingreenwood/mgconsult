<template>
  <section class="testimonials-section bg-gradient-to-br from-slate-50 to-stone-50 dark:from-dark-bg dark:to-dark-surface" aria-labelledby="testimonials-heading">
    <div class="flex flex-col gap-12 max-w-6xl mx-auto">
      <div class="text-center">
        <h2 id="testimonials-heading" class="text-3xl md:text-4xl coco mb-4 text-slate-900 dark:text-white">
          What Clients Say
        </h2>
        <p class="text-xl font-light text-gray-600 dark:text-gray-200">
          Feedback from businesses I've worked with
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card bg-white dark:bg-dark-surface rounded-lg p-8 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 transition-shadow duration-300 flex flex-col"
          role="listitem"
        >
          <!-- Quote Icon -->
          <div class="mb-4">
            <svg class="w-10 h-10 text-slate-200 dark:text-dark-elevated" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <!-- Quote Text -->
          <blockquote class="flex-1 mb-6">
            <p class="text-slate-700 dark:text-gray-200 leading-relaxed font-light italic">
              "{{ testimonial.quote }}"
            </p>
          </blockquote>

          <!-- Author Info -->
          <div class="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-dark-border">
            <div class="flex-1">
              <div class="font-medium text-slate-900 dark:text-white coco text-sm">
                {{ testimonial.author }}
              </div>
              <div class="text-sm text-slate-500 dark:text-gray-300 font-light">
                {{ testimonial.role }}<span v-if="testimonial.company">, {{ testimonial.company }}</span>
              </div>
            </div>

            <!-- Star Rating (Optional) -->
            <div v-if="testimonial.rating" class="flex gap-0.5" :aria-label="`${testimonial.rating} out of 5 stars`">
              <svg
                v-for="star in 5"
                :key="star"
                class="w-4 h-4"
                :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-slate-200 dark:text-dark-elevated'"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center pt-4">
        <p class="text-slate-600 dark:text-gray-200 mb-4">Ready to work together?</p>
        <BaseButton
          variant="primary"
          size="md"
          @click="openContact"
          aria-label="Book a consultation call"
        >
          Let's Talk
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
  rating?: number
}

// TODO: Replace with real testimonials
const testimonials: Testimonial[] = [
  {
    quote: "Outstanding work on our booking integration. Martin took a complex system and made it work seamlessly with our website. Highly recommend for hospitality tech projects.",
    author: "Sarah Johnson",
    role: "Operations Director",
    company: "Luxury Hotel Group",
    rating: 5
  },
  {
    quote: "We needed someone who understood both the technical side and the operational challenges. Martin delivered exactly what we needed and explained everything clearly.",
    author: "James Wilson",
    role: "Technical Manager",
    company: "Events Venue",
    rating: 5
  },
  {
    quote: "Rescued our troubled integration project and turned it into something we're proud of. Professional, responsive, and really knows his stuff.",
    author: "Emma Thompson",
    role: "Digital Lead",
    company: "Heritage Site",
    rating: 5
  },
  {
    quote: "Built our custom dashboard from scratch. The attention to detail and understanding of what we actually needed made all the difference.",
    author: "Michael Brown",
    role: "Managing Director",
    company: "Spa & Wellness",
    rating: 5
  },
  {
    quote: "Clear communication, realistic timelines, and quality work. Couldn't ask for more. Will definitely work together again.",
    author: "Lisa Anderson",
    role: "Product Owner",
    company: "Booking Platform",
    rating: 5
  },
  {
    quote: "Martin's expertise in Spektrix integration saved us months of headaches. If you need someone who actually gets it, this is your developer.",
    author: "David Clarke",
    role: "IT Director",
    company: "Theatre Group",
    rating: 5
  }
]

const openContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}
</script>

<style scoped>
.coco {
  font-family: "Cocogoose Classic", Impact, "Arial Black", sans-serif;
}

.testimonial-card {
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
}
</style>
