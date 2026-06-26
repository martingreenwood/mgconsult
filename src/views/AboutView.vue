<script setup lang="ts">
import martinGreenwoodImage from '@/assets/img/martin-greenwood.webp'

const timeline = [
  {
    period: 'Now',
    title: 'Independent digital consultancy',
    text: 'Helping businesses improve websites, CMS foundations, integrations, operational tooling and the decisions around them.',
  },
  {
    period: 'Recent work',
    title: 'Hospitality, venues and experience-led businesses',
    text: 'Deep work around booking journeys, content operations, payment flows, data handoffs and internal systems that support live customer experiences.',
  },
  {
    period: 'Core stack',
    title: 'Laravel, Vue, Statamic and API-led systems',
    text: 'Hands-on delivery across front-end interfaces, Laravel applications, headless CMS builds, middleware and practical reporting.',
  },
  {
    period: 'How I work',
    title: 'Senior thinking without agency theatre',
    text: 'Clear diagnosis, honest trade-offs, calm implementation and enough context to make technical decisions that fit the business.',
  },
]

const principles = [
  'Start with the business workflow, not the preferred technology.',
  'Make technical trade-offs visible enough for non-technical people to trust.',
  'Keep systems maintainable for the people who inherit them.',
  'Ship useful improvements before chasing perfect rewrites.',
]

const emitContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}
</script>

<template>
  <section v-reveal class="about-page-hero" aria-labelledby="about-page-title">
    <div class="about-page-hero__copy">
      <p class="eyebrow">About Martin Greenwood</p>
      <h1 id="about-page-title">A technical partner for businesses with digital systems that matter.</h1>
      <p>
        I work with teams who need their websites, content platforms, booking flows, integrations and internal tools
        to feel less fragile and more intentional.
      </p>
    </div>

    <div class="about-page-portrait">
      <img v-image-reveal :src="martinGreenwoodImage" alt="Martin Greenwood" width="760" height="950" loading="eager" decoding="async">
    </div>
  </section>

  <section v-reveal class="about-page-story" aria-labelledby="about-story-title">
    <div class="about-page-story__intro">
      <p class="eyebrow">What MG is for</p>
      <h2 id="about-story-title">Clearer direction, cleaner delivery, and fewer accidental systems.</h2>
    </div>

    <div class="about-page-story__copy">
      <p>
        MG is the consulting practice of Martin Greenwood. The work sits where commercial websites, CMS platforms,
        integrations, customer journeys and day-to-day operations start depending on each other.
      </p>
      <p>
        I am most useful when the work needs both technical depth and commercial judgement: inherited systems,
        awkward integrations, headless content builds, booking logic, dashboards, and the moments where a business
        needs someone senior to make the next step clearer.
      </p>
      <p>
        The aim is not to make technology feel impressive. It is to make the business easier to run, easier to explain,
        and easier to improve.
      </p>
    </div>
  </section>

  <section v-reveal class="section section--cream" aria-labelledby="about-principles-title">
    <div class="section-heading">
      <p class="eyebrow">Working principles</p>
      <h2 id="about-principles-title">The way the work gets done matters as much as the code.</h2>
    </div>

    <div class="about-principles">
      <article
        v-for="(principle, index) in principles"
        :key="principle"
        :style="{ '--reveal-delay': `${index * 70}ms` }"
        v-reveal
      >
        <span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
        <p>{{ principle }}</p>
      </article>
    </div>
  </section>

  <section v-reveal class="about-timeline" aria-labelledby="about-timeline-title">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">Experience</p>
        <h2 id="about-timeline-title">The useful pattern is part strategy, part delivery.</h2>
      </div>
      <a class="text-link" href="/projects">View projects</a>
    </div>

    <div class="about-timeline__list">
      <article
        v-for="(item, index) in timeline"
        :key="item.period"
        class="about-timeline__item"
        :style="{ '--reveal-delay': `${index * 70}ms` }"
        v-reveal
      >
        <p class="eyebrow">{{ item.period }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>

  <section v-reveal class="final-cta" aria-label="Start a conversation">
    <p class="eyebrow">Next step</p>
    <h2>Need a senior pair of eyes on a digital system that matters?</h2>
    <button class="button button--dark" type="button" @click="emitContact">
      Talk to Martin
    </button>
  </section>
</template>
