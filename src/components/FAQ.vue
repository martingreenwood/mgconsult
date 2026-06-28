<script setup lang="ts">
import { ref } from 'vue'

type FAQ = {
  question: string
  answer: string[]
}

const activeFAQ = ref<number | null>(0)

const faqs: FAQ[] = [
  {
    question: 'What kind of businesses are the best fit?',
    answer: [
      'The best fit is a business with important digital systems already in motion: booking flows, payments, CRMs, dashboards, CMS platforms, internal tools, or specialist software that no longer fits cleanly around the operation.',
      'I am useful when the work needs commercial understanding and hands-on delivery, especially where the system is inherited, integrated, business-critical, or awkward to explain in a normal ticket.',
    ],
  },
  {
    question: 'Do you only work in hospitality and venues?',
    answer: [
      'No. Hospitality, venues, heritage, and experience-led businesses have given me strong pattern recognition around complex operations, but the way I work is not tied to one sector.',
      'The useful skill is learning how a business actually runs, finding the awkward handoffs, and building reliable systems around real constraints.',
    ],
  },
  {
    question: 'How is pricing discussed?',
    answer: [
      'Pricing is discussed privately after an initial call, once I understand the system, the level of responsibility, the urgency, and the amount of ongoing time that would actually help.',
      'I will be direct about whether a retainer, a small discovery phase, or a narrower delivery piece is the right next step.',
    ],
  },
  {
    question: 'Can you work with our existing team or agency?',
    answer: [
      'Yes. I often fit best as a senior pair of hands alongside an existing setup: supporting technical leads, helping founders and operators make decisions, or giving agencies extra depth on awkward systems work.',
      'I can work directly in the codebase, review architecture, take ownership of integrations, explain tradeoffs to non-technical stakeholders, and keep communication plain.',
    ],
  },
  {
    question: 'Do you take on one-off projects?',
    answer: [
      'Sometimes, especially if the scope is clearly bounded or the work is a sensible first step toward longer-term support.',
      'The site is positioned around ongoing partnership because the most valuable work usually comes from understanding the system over time, not dropping in for isolated tasks with no context.',
    ],
  },
  {
    question: 'What happens on the first call?',
    answer: [
      'The call is a short practical conversation about what is happening, why it matters, who is affected, and what kind of support would create useful movement.',
      'We will usually leave with a clear view of whether there is a fit, what I would need to see next, and whether the first intervention should be diagnosis, stabilisation, planning, or delivery.',
    ],
  },
]

const toggleFAQ = (index: number) => {
  activeFAQ.value = activeFAQ.value === index ? null : index
}

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}
</script>

<template>
  <section v-reveal class="faq-section" aria-labelledby="faq-heading">
    <div class="faq-layout">
      <div class="faq-intro">
        <p class="eyebrow">Quick answers</p>
        <h2 id="faq-heading">FAQs</h2>
        <p>
          If you have any other initial questions, feel free to contact Martin anytime.
        </p>
        <button class="button button--line" type="button" @click="emitContact">
          Contact
        </button>
      </div>

      <ul class="faq-list">
        <li
          v-for="(faq, index) in faqs"
          :key="faq.question"
          class="faq-item"
          :class="{ 'is-open': activeFAQ === index }"
          :style="{ '--reveal-delay': `${index * 60}ms` }"
          v-reveal
        >
          <button
            class="faq-question"
            type="button"
            :aria-expanded="activeFAQ === index"
            :aria-controls="`faq-answer-${index}`"
            :id="`faq-question-${index}`"
            @click="toggleFAQ(index)"
          >
            <span class="faq-question-text">{{ faq.question }}</span>
            <span class="faq-icon" :class="{ 'rotate-180': activeFAQ === index }" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>

          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            :class="{ 'is-open': activeFAQ === index }"
            role="region"
            :aria-labelledby="`faq-question-${index}`"
          >
            <div class="faq-answer-inner">
              <p v-for="paragraph in faq.answer" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
