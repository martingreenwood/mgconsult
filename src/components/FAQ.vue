<template>
  <section class="faq-section bg-white dark:bg-dark-bg" aria-labelledby="faq-heading">
    <div class="flex flex-col gap-12 max-w-4xl mx-auto">
      <div class="text-center">
        <h2 id="faq-heading" class="text-3xl md:text-4xl coco mb-4 text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p class="text-xl font-light text-gray-600 dark:text-gray-200">
          Common questions about working together and my development services
        </p>
      </div>

      <div class="faq-list space-y-4" role="list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item border border-slate-200 dark:border-dark-border rounded-lg overflow-hidden hover:border-slate-300 dark:hover:border-dark-elevated transition-colors"
          role="listitem"
        >
          <button
            @click="toggleFAQ(index)"
            class="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-elevated transition-colors"
            :aria-expanded="activeFAQ === index"
            :aria-controls="`faq-answer-${index}`"
            :id="`faq-question-${index}`"
          >
            <span class="text-lg font-medium text-slate-900 dark:text-white coco pr-4">
              {{ faq.question }}
            </span>
            <span
              class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-slate-600 dark:text-gray-200 transition-transform duration-200"
              :class="{ 'rotate-180': activeFAQ === index }"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>

          <div
            :id="`faq-answer-${index}`"
            class="faq-answer overflow-hidden transition-all duration-300 ease-in-out"
            :class="{ 'is-open': activeFAQ === index }"
            role="region"
            :aria-labelledby="`faq-question-${index}`"
          >
            <div class="px-6 pb-5 pt-2 text-slate-600 dark:text-gray-200 font-light leading-relaxed space-y-3">
              <p v-for="(paragraph, pIndex) in faq.answer" :key="pIndex">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Still have questions CTA -->
      <div class="text-center pt-8 border-t border-slate-200 dark:border-dark-border">
        <p class="text-slate-600 dark:text-gray-200 mb-4">Still have questions?</p>
        <BaseButton
          variant="primary"
          size="md"
          @click="openContact"
          aria-label="Book a call to discuss your questions"
        >
          Book a Call
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

interface FAQ {
  question: string
  answer: string[]
}

const activeFAQ = ref<number | null>(0) // First item open by default

const faqs: FAQ[] = [
  {
    question: "What types of projects do you typically work on?",
    answer: [
      "I specialize in custom digital systems for hospitality, events, and experience-led businesses. This includes booking engines, CRM integrations, digital signage, data dashboards, and bespoke web applications.",
      "Most projects involve Laravel and Vue.js, with integrations to systems like Spektrix, various PMS/CRM platforms, and payment gateways."
    ]
  },
  {
    question: "How do you charge for your services?",
    answer: [
      "I typically work on a day-rate or fixed-price basis depending on the project scope. For ongoing work, I offer retainer arrangements.",
      "After our initial consultation, I'll provide a clear quote with no hidden costs. Small discovery phases can help us scope larger projects accurately."
    ]
  },
  {
    question: "How long does a typical project take?",
    answer: [
      "Project timelines vary significantly based on complexity. A simple API integration might take a few days, while a full booking engine could take several weeks.",
      "I'll give you a realistic timeline during our discovery phase, and I keep you updated throughout with regular check-ins and progress updates."
    ]
  },
  {
    question: "Do you work with existing codebases or only new projects?",
    answer: [
      "I work with both! I'm experienced in rescuing troubled projects, refactoring legacy code, and adding features to existing systems.",
      "Whether you need someone to fix what's broken, enhance what's working, or build something new from scratch, I can help."
    ]
  },
  {
    question: "What's your approach to communication during a project?",
    answer: [
      "I believe in transparent, regular communication. Depending on the project, this typically means weekly check-ins, progress updates, and quick responses to questions.",
      "You'll always know what's happening, what's next, and if anything changes. No surprises, no jargon—just clear updates."
    ]
  },
  {
    question: "Do you offer ongoing support after a project is complete?",
    answer: [
      "Yes! Most clients benefit from ongoing support, whether it's monthly retainer hours for updates and fixes, or ad-hoc support as needed.",
      "I can also provide documentation and training so your team can manage day-to-day tasks independently if preferred."
    ]
  },
  {
    question: "Can you work with my existing team or agency?",
    answer: [
      "Absolutely. I often collaborate with in-house teams, design agencies, and other developers. I'm happy to work alongside your existing setup.",
      "Whether you need extra hands for a busy period, specialist knowledge for a specific integration, or long-term partnership, I'm flexible."
    ]
  },
  {
    question: "What if my requirements change mid-project?",
    answer: [
      "Requirements change—that's normal! I build in flexibility where possible and maintain open communication about scope.",
      "If changes affect timeline or budget, I'll flag it early so we can discuss options together. No gotchas, just honest conversation about trade-offs."
    ]
  }
]

const toggleFAQ = (index: number) => {
  activeFAQ.value = activeFAQ.value === index ? null : index
}

const openContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}
</script>

<style scoped>
.faq-answer {
  max-height: 0;
}

.faq-answer.is-open {
  max-height: 500px;
}

.coco {
  font-family: "Cocogoose Classic", Impact, "Arial Black", sans-serif;
}
</style>
