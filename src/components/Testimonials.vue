<template>
  <section class="testimonials-section bg-gradient-to-br from-slate-50 to-stone-50 dark:from-dark-bg dark:to-dark-surface" aria-labelledby="testimonials-heading">
    <div class="flex flex-col gap-12 max-w-6xl mx-auto">
      <div class="text-center">
        <h2 id="testimonials-heading" class="text-3xl md:text-4xl coco mb-4 text-slate-900 dark:text-white">
          What a monthly technical partner is for
        </h2>
        <p class="text-xl font-light text-gray-600 dark:text-gray-200">
          Senior support for decisions and delivery when the work is too important to keep context-switching
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        <div
          v-for="(proofPoint, index) in proofPoints"
          :key="index"
          class="testimonial-card bg-white/95 dark:bg-dark-surface rounded-lg border border-slate-200/80 dark:border-dark-border p-8 shadow-md dark:shadow-none hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-black/20 transition-shadow duration-300 flex flex-col"
          role="listitem"
        >
          <div class="mb-5">
            <div class="text-sm font-medium text-slate-500 dark:text-gray-300 mb-3">
              {{ proofPoint.context }}
            </div>
            <h3 class="text-xl coco text-slate-900 dark:text-white">
              {{ proofPoint.title }}
            </h3>
          </div>

          <p class="text-slate-700 dark:text-gray-200 leading-relaxed font-light flex-1">
            {{ proofPoint.description }}
          </p>

          <div class="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-dark-border">
            <div class="flex-1">
              <div class="font-medium text-slate-900 dark:text-white coco text-sm">
                {{ proofPoint.result }}
              </div>
              <div class="text-sm text-slate-500 dark:text-gray-300 font-light">
                {{ proofPoint.detail }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center pt-4 flex flex-col items-center">
        <p class="text-slate-600 dark:text-gray-200 mb-4">Ready to work together?</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <FitCallButton />
          <BaseButton
            variant="secondary"
            size="md"
            @click="openTallyMessage('proof')"
            aria-label="Send a project message"
          >
            Send a Message
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FitCallButton from '@/components/FitCallButton.vue'
import { openTallyMessage } from '@/utils/tally'

interface ProofPoint {
  context: string
  title: string
  description: string
  result: string
  detail: string
}

const proofPoints: ProofPoint[] = [
  {
    context: "Integration rescue",
    title: "Unstick work that has become too tangled",
    description: "When systems do not talk cleanly, I trace the data, find the brittle points, and turn the work into something the team can trust again.",
    result: "Less operational drag",
    detail: "Clearer handoffs between platforms and people"
  },
  {
    context: "Legacy platforms",
    title: "Make older tools fit modern workflows",
    description: "Many useful businesses run on awkward, inherited, or specialist software. I build the missing layer between those tools and the way the business now works.",
    result: "Existing systems keep earning their place",
    detail: "Without forcing a risky rebuild too early"
  },
  {
    context: "Operational clarity",
    title: "Turn scattered data into useful visibility",
    description: "Dashboards and reports should help teams make decisions, not create another place to check. I focus on the metrics, flows, and exceptions that matter.",
    result: "Better day-to-day decisions",
    detail: "For commercial, marketing, and operations teams"
  },
  {
    context: "Customer journeys",
    title: "Make complex booking and payment flows feel simple",
    description: "Reservations, scheduling, ticketing, enrolment, and payments all have edge cases. I design around the business rules without making the user carry the complexity.",
    result: "Cleaner customer-facing workflows",
    detail: "Backed by practical admin tools"
  },
  {
    context: "Internal tools",
    title: "Build around the way teams actually work",
    description: "A good internal app removes friction instead of adding process theatre. I map the real workflow, then build tools that help people move faster with fewer mistakes.",
    result: "Less admin drag",
    detail: "More reliable repeatable work"
  },
  {
    context: "Technical leadership",
    title: "Support teams without taking the wheel away",
    description: "I can work alongside in-house teams and agencies as the senior pair of hands for planning, review, delivery, and awkward technical decisions.",
    result: "More confident delivery",
    detail: "For founders, operators, tech leads and agencies"
  }
]

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
