<template>
  <section class="faq-section bg-white dark:bg-dark-bg" aria-labelledby="faq-heading">
    <div class="faq-layout max-w-6xl mx-auto">
      <div class="faq-intro">
        <p class="faq-kicker">Suitability, retainers and next steps</p>
        <h2 id="faq-heading" class="coco text-slate-900 dark:text-white">
          Frequently asked questions
        </h2>
        <p>
          Short answers for the questions that usually come up before the first call: whether the work is right, how
          retainers are shaped, and how pricing is handled.
        </p>
        <div class="faq-fit-note">
          Best fit: business-critical systems, inherited complexity, integrations, booking or payment flows, and teams
          that need senior technical ownership without hiring a full agency.
        </div>
      </div>

      <div class="faq-main">
        <div class="faq-list" role="list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            role="listitem"
          >
            <button
              @click="toggleFAQ(index)"
              class="faq-question"
              :aria-expanded="activeFAQ === index"
              :aria-controls="`faq-answer-${index}`"
              :id="`faq-question-${index}`"
            >
              <span class="faq-question-copy">
                <span class="faq-category">{{ faq.category }}</span>
                <span class="faq-question-text coco">{{ faq.question }}</span>
              </span>
              <span
                class="faq-icon"
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
              <div class="faq-answer-inner">
                <p v-for="(paragraph, pIndex) in faq.answer" :key="pIndex">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-cta">
          <div>
            <p class="faq-cta-title">Not sure where to start?</p>
            <p class="faq-cta-copy">
              The first call is deliberately short. Bring the context, the awkward bits, and the commercial pressure; I will
              help you work out whether I am the right person to bring in.
            </p>
          </div>
          <FitCallButton />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FitCallButton from '@/components/FitCallButton.vue'

interface FAQ {
  category: string
  question: string
  answer: string[]
}

const activeFAQ = ref<number | null>(0) // First item open by default

const faqs: FAQ[] = [
  {
    category: "Fit",
    question: "What kind of businesses are the best fit?",
    answer: [
      "The best fit is a business with important digital systems already in motion: booking flows, payments, CRMs, dashboards, CMS platforms, internal tools, or specialist software that no longer fits cleanly around the operation.",
      "I am useful when the work needs commercial understanding and hands-on delivery, especially where the system is inherited, integrated, business-critical, or awkward to explain in a normal ticket."
    ]
  },
  {
    category: "Sectors",
    question: "Do you only work in hospitality and venues?",
    answer: [
      "No. Hospitality, venues, heritage, and experience-led businesses have given me strong pattern recognition around complex operations, but the way I work is not tied to one sector.",
      "The useful skill is learning how a business actually runs, finding the awkward handoffs, and building reliable systems around real constraints. That travels well across PHP frameworks, CMS platforms, and mixed technical stacks."
    ]
  },
  {
    category: "Retainers",
    question: "Do you work on monthly retainers?",
    answer: [
      "Yes. A monthly partnership is usually the strongest shape because it gives me enough context to make better technical decisions and enough continuity to keep improving the system.",
      "A retainer can include technical direction, rescue work, PHP and CMS delivery, Laravel and Vue work, code review, integrations, dashboards, maintenance, and support for your existing team or agency."
    ]
  },
  {
    category: "Pricing",
    question: "How is pricing discussed?",
    answer: [
      "Pricing is discussed privately after an initial call, once I understand the system, the level of responsibility, the urgency, and the amount of ongoing time that would actually help.",
      "I will be direct about whether a retainer, a small discovery phase, or a narrower delivery piece is the right next step. If I am not the right fit, I will say that early."
    ]
  },
  {
    category: "Call",
    question: "What happens on the first call?",
    answer: [
      "The call is a short practical conversation about what is happening, why it matters, who is affected, and what kind of support would create useful movement.",
      "We will usually leave with a clear view of whether there is a fit, what I would need to see next, and whether the first intervention should be diagnosis, stabilisation, planning, or delivery."
    ]
  },
  {
    category: "Teams",
    question: "Can you work with our existing team or agency?",
    answer: [
      "Yes. I often fit best as a senior pair of hands alongside an existing setup: supporting technical leads, helping founders and operators make decisions, or giving agencies extra depth on awkward systems work.",
      "I can work directly in the codebase, review architecture, take ownership of integrations, explain tradeoffs to non-technical stakeholders, and keep communication plain."
    ]
  },
  {
    category: "Scope",
    question: "Do you take on one-off projects?",
    answer: [
      "Sometimes, especially if the scope is clearly bounded or the work is a sensible first step toward longer-term support.",
      "The site is positioned around ongoing partnership because the most valuable work usually comes from understanding the system over time, not dropping in for isolated tasks with no context."
    ]
  },
  {
    category: "Fit",
    question: "When are you not the right fit?",
    answer: [
      "I am probably not the right fit if you need the cheapest implementation resource, a large commodity delivery team, a pure design-only engagement, or a hands-off advisor who never touches the work.",
      "I am a better fit when senior judgement, technical ownership, and practical delivery all matter."
    ]
  },
  {
    category: "Working style",
    question: "What if priorities change during the retainer?",
    answer: [
      "That is normal, and it is one reason retainers work well. Priorities can adjust as new issues, commercial pressure, or technical risks appear.",
      "The important thing is that tradeoffs are visible. I will flag when a change affects timing, risk, budget, or the quality of the underlying system."
    ]
  }
]

const toggleFAQ = (index: number) => {
  activeFAQ.value = activeFAQ.value === index ? null : index
}

</script>

<style>
.faq-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

.faq-intro {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.faq-kicker {
  color: rgb(29 78 216);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dark .faq-kicker {
  color: rgb(147 197 253);
}

#faq-heading {
  font-size: clamp(2.25rem, 4vw, 3.6rem);
  line-height: 1.05;
  max-width: 10ch;
}

.faq-intro > p:not(.faq-kicker) {
  color: rgb(71 85 105);
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.7;
  max-width: 58ch;
}

.dark .faq-intro > p:not(.faq-kicker) {
  color: rgb(226 232 240);
}

.faq-fit-note {
  border: 1px solid rgb(226 232 240);
  border-radius: 0.5rem;
  background: rgb(248 250 252 / 0.88);
  color: rgb(51 65 85);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.6;
  padding: 1rem;
}

.dark .faq-fit-note {
  border-color: rgb(255 255 255 / 0.12);
  background: rgb(255 255 255 / 0.065);
  color: rgb(226 232 240);
}

.faq-main {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  overflow: hidden;
  border: 1px solid rgb(226 232 240);
  border-radius: 0.5rem;
  background: rgb(255 255 255 / 0.92);
  transition: border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.faq-item:hover {
  border-color: rgb(203 213 225);
  box-shadow: 0 16px 45px oklch(35% 0.025 250 / 0.08);
}

.dark .faq-item {
  border-color: rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.055);
}

.dark .faq-item:hover {
  border-color: rgb(255 255 255 / 0.18);
  box-shadow: 0 18px 50px oklch(0% 0 0 / 0.22);
}

.faq-question {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  text-align: left;
}

.faq-question-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.35rem;
}

.faq-category {
  color: rgb(37 99 235);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.dark .faq-category {
  color: rgb(147 197 253);
}

.faq-question-text {
  color: rgb(15 23 42);
  font-size: 1.08rem;
  line-height: 1.3;
}

.dark .faq-question-text {
  color: white;
}

.faq-icon {
  display: flex;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgb(241 245 249);
  color: rgb(51 65 85);
  transition: transform 200ms ease, background-color 180ms ease;
}

.dark .faq-icon {
  background: rgb(255 255 255 / 0.08);
  color: rgb(226 232 240);
}

.faq-answer {
  max-height: 0;
}

.faq-answer.is-open {
  max-height: 560px;
}

.faq-answer-inner {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1.25rem 1.25rem;
  color: rgb(71 85 105);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
}

.dark .faq-answer-inner {
  color: rgb(226 232 240);
}

.faq-cta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  border-top: 1px solid rgb(226 232 240);
  padding-top: 1.5rem;
}

.dark .faq-cta {
  border-color: rgb(255 255 255 / 0.1);
}

.faq-cta-title {
  color: rgb(15 23 42);
  font-size: 1.125rem;
  font-weight: 800;
}

.dark .faq-cta-title {
  color: white;
}

.faq-cta-copy {
  margin-top: 0.35rem;
  max-width: 62ch;
  color: rgb(71 85 105);
  font-size: 0.98rem;
  line-height: 1.65;
}

.dark .faq-cta-copy {
  color: rgb(226 232 240);
}

.coco {
  font-family: "Cocogoose Classic", Impact, "Arial Black", sans-serif;
}

@media (min-width: 768px) {
  .faq-layout {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    align-items: start;
    gap: 3rem;
  }

  .faq-intro {
    position: sticky;
    top: 6rem;
  }

  .faq-cta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
