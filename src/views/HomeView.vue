<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import RecentProjects from '@/components/RecentProjects.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQ from '@/components/FAQ.vue'

const videoTransform = ref('translateY(0px)')
const activeAccordion = ref<number | null>(0)
let ticking = false

const openContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}

const updateParallax = () => {
  const scrolled = window.pageYOffset
  const videoSection = document.querySelector('.video-parallax-section') as HTMLElement

  if (videoSection) {
    const rect = videoSection.getBoundingClientRect()
    const sectionTop = scrolled + rect.top
    const sectionHeight = rect.height
    const windowHeight = window.innerHeight

    const sectionBottom = sectionTop + sectionHeight
    const viewportTop = scrolled
    const viewportBottom = scrolled + windowHeight

    if (sectionBottom >= viewportTop && sectionTop <= viewportBottom) {
      const scrollStart = sectionTop - windowHeight
      const scrollEnd = sectionBottom
      const scrollRange = scrollEnd - scrollStart
      const scrollProgress = Math.max(0, Math.min(1, (scrolled - scrollStart) / scrollRange))

      const maxMovement = sectionHeight * 0.15
      const yPos = -maxMovement + (scrollProgress * maxMovement * 2)

      videoTransform.value = `translateY(${yPos}px)`
    }
  }

  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax)
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  updateParallax()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section
    class="hero-section bg-white dark:bg-dark-bg max-w-6xl mx-auto min-h-screen flex flex-col gap-8 justify-end"
    aria-label="Hero introduction">
    <h1
      class="text-7xl text-shadow-slate-900 dark:text-shadow-slate-100 max-w-6xl coco text-slate-900 dark:text-white">
      I build custom digital systems that actually <span
        class="text-slate-600 dark:text-slate-300 font-bold">solve</span> business problems.
    </h1>
    <p class="text-xl font-light text-gray-600 dark:text-gray-200 max-w-4xl">
      From broken booking flows to legacy integrations, I help hospitality and experience-led businesses
      streamline operations, simplify tech, and deliver better digital experiences
      — without the agency overhead.
    </p>
    <div class="flex flex-row">
      <BaseButton variant="primary" size="lg" :has-arrow="true" @click="openContact"
        aria-label="Book a consultation call">
        Book a Call
      </BaseButton>
    </div>
  </section>

  <section class="video-parallax-section bg-stone-100 dark:bg-dark-surface h-[75vh] overflow-hidden relative"
    aria-label="Background video showcase">
    <video autoplay loop muted playsinline preload="metadata" aria-hidden="true"
      class="absolute w-full h-[140%] object-cover" style="top: -20%; left: 0;"
      :style="{ transform: videoTransform }">
      <source src="../assets/video/video.mp4" type="video/mp4">
      <p>Your browser does not support the video tag. This is a decorative background video that does not contain
        essential content.</p>
    </video>
  </section>

  <section class="services-section bg-white dark:bg-dark-bg" aria-labelledby="services-heading">
    <div class="flex flex-col gap-24 max-w-6xl mx-auto">
      <h2 id="services-heading" class="sr-only">Services I Provide</h2>
      <p class="text-xl font-light text-gray-600 dark:text-gray-200 max-w-2xl">
        I design, build, and integrate digital systems for guest-centric, experience-driven, and operationally complex
        businesses. Whether it's customer-facing tools or internal dashboards, I deliver clean, scalable solutions
        that make life easier for teams and their users.
      </p>

      <div class="masonry-container" role="list">
        <div class="card" role="listitem">
          <img src="../assets/img/api-integration.webp"
            alt="Systems integration diagram showing interconnected APIs and services" loading="lazy"
            decoding="async">
          <div class="flex items-center gap-4">
            <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
              Systems Integration
            </h3>
          </div>
          <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
            Connect your booking engine, CRM, ticketing, POS, signage, and CMS into one reliable, futureproof stack.
          </p>
          <ul aria-label="Systems integration services">
            <li>API integrations</li>
            <li>CRM/PMS workflows</li>
            <li>Spektrix, hospitality, and legacy system support</li>
          </ul>
        </div>

        <div class="card" role="listitem">
          <img src="../assets/img/data-dashboards.webp" alt="Data dashboard showing analytics and performance metrics"
            loading="lazy" decoding="async">
          <div class="flex items-center gap-4">
            <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
              Data Dashboards &amp; Visualisation
            </h3>
          </div>
          <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
            Live dashboards, custom reports, and conversion tracking — built for real-world decision-making, not just
            data dumps.
          </p>
          <ul aria-label="Data dashboard services">
            <li>Guest behaviour insights</li>
            <li>Marketing &amp; sales metrics</li>
            <li>Ops dashboards & group performance tracking</li>
          </ul>
        </div>

        <div class="card" role="listitem">
          <img src="../assets/img/digital-signage.webp" alt="Digital signage displays in a modern venue" loading="lazy"
            decoding="async">
          <div class="flex items-center gap-4">
            <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
              Digital Signage &amp; On-Site Displays
            </h3>
          </div>
          <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
            Custom signage systems that pull from live data — built for theatres, hotels, events, and dynamic venue
            screens.
          </p>
          <ul aria-label="Digital signage services">
            <li>Foyer &amp; event signage</li>
            <li>Wayfinding &amp; guest comms</li>
            <li>CMS-linked display tech</li>
          </ul>
        </div>

        <div class="card" role="listitem">
          <img src="../assets/img/web-app-development.webp"
            alt="Modern web application interface on laptop and mobile devices" loading="lazy" decoding="async">
          <div class="flex items-center gap-4">
            <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
              Web &amp; App Development
            </h3>
          </div>
          <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
            Modern Laravel and Vue apps, powerful CMS builds, and fast, accessible frontends — all tailored to your
            users.
          </p>
          <ul aria-label="Web and app development services">
            <li>Vue &amp; Laravel custom builds</li>
            <li>Statamic &amp; WordPress development</li>
            <li>Guest portals, booking flows, staff apps</li>
          </ul>
        </div>

        <div class="card" role="listitem">
          <img src="../assets/img/booking.webp" alt="Booking engine interface showing availability calendar"
            loading="lazy" decoding="async">
          <div class="flex items-center gap-4">
            <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
              Booking Engines &amp; Ticketing
            </h3>
          </div>
          <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
            Integrated booking flows that play nicely with your existing systems, including full Spektrix support for
            venues.
          </p>
          <ul aria-label="Booking engine services">
            <li>Custom booking interfaces</li>
            <li>Real-time availability & logic</li>
            <li>End-to-end ticketing integrations</li>
          </ul>
        </div>

        <div class="card" role="listitem">
          <img src="../assets/img/digital.webp"
            alt="Technical strategy meeting with team reviewing system architecture" loading="lazy" decoding="async">
          <div class="flex items-center gap-4">
            <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
              Technical Strategy &amp; Consulting
            </h3>
          </div>
          <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
            Not sure where to start? I help teams audit what's broken, plan what's next, and ship fast — without
            overengineering.
          </p>
          <ul aria-label="Technical consulting services">
            <li>Discovery &amp; technical audits</li>
            <li>Project rescue & legacy fixes</li>
            <li>Long-term dev partner, if you need one</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <RecentProjects />

  <Testimonials />

  <section class="cta-section bg-neutral-100 dark:bg-dark-surface text-shadow-zinc-800 dark:text-shadow-zinc-200"
    aria-label="Call to action">
    <div class="flex flex-col md:flex-row items-end gap-8 max-w-6xl mx-auto">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl coco text-slate-900 dark:text-white">
          Not sure where your project fits?
        </h2>
        <p class="text-lg font-light text-gray-600 dark:text-gray-200 max-w-4xl">
          Get in touch for a chat.
        </p>
      </div>
      <div class="flex flex-row ml-auto">
        <BaseButton variant="primary" size="lg" :has-arrow="true" @click="openContact"
          aria-label="Book a consultation call">
          Book a Call
        </BaseButton>
      </div>
    </div>
  </section>

  <section class="dark-section bg-zinc-900 dark:bg-zinc-800 text-white" aria-labelledby="approach-heading">
    <div class="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
      <div class="flex flex-col gap-8">
        <h2 id="approach-heading" class="text-2xl max-w-6xl coco text-white">
          Adapt to Change...
        </h2>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          I work with clients to build custom, future proof systems that can adapt to changing business needs and user
          expectations. I rely on imagination and technical prowess to help brands transform, shine, and reinvent
          themselves commercially and culturally.
        </p>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          My biggest value is the client's trust.<br>
          My only achievement is their success.
        </p>
      </div>
      <div class="flex flex-col gap-8">
        <div class="accordion" role="region" aria-label="Service approach details">
          <div class="accordion-item" :class="{ 'is-active': activeAccordion === 0 }">
            <button class="accordion-header" @click="toggleAccordion(0)" :aria-expanded="activeAccordion === 0"
              aria-controls="accordion-panel-0" :id="`accordion-button-0`">
              <span>Design</span>
              <span class="accordion-icon" aria-hidden="true">{{ activeAccordion === 0 ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" :class="{ 'is-open': activeAccordion === 0 }" :id="`accordion-panel-0`"
              role="region" :aria-labelledby="`accordion-button-0`">
              <div class="accordion-content-inner">
                <p>An engineering approach to design, capable of solving business problems in unexpected ways.</p>
                <h4>
                  UI/UX Design
                </h4>
                <ul>
                  <li>Rely on Brand Strategy and vision behind it</li>
                  <li>Build UX that helps the user and compliments the client</li>
                  <li>Build a maintainable design system</li>
                  <li>Create future-proof visuals</li>
                  <li>Design interactions</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item" :class="{ 'is-active': activeAccordion === 1 }">
            <button class="accordion-header" @click="toggleAccordion(1)" :aria-expanded="activeAccordion === 1"
              aria-controls="accordion-panel-1" :id="`accordion-button-1`">
              <span>Development</span>
              <span class="accordion-icon" aria-hidden="true">{{ activeAccordion === 1 ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" :class="{ 'is-open': activeAccordion === 1 }" :id="`accordion-panel-1`"
              role="region" :aria-labelledby="`accordion-button-1`">
              <div class="accordion-content-inner">
                <p>Complex integrated app & web development techniques, including front-end and back-end, that
                  leverage modern frameworks and libraries.</p>
                <h4>
                  Development
                </h4>
                <ul>
                  <li>Build a solid infrastructural back-end base</li>
                  <li>Meticulously implement the front end</li>
                  <li>Extensively test the build</li>
                  <li>Apply DevOps to deploy and optimize</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item" :class="{ 'is-active': activeAccordion === 2 }">
            <button class="accordion-header" @click="toggleAccordion(2)" :aria-expanded="activeAccordion === 2"
              aria-controls="accordion-panel-2" :id="`accordion-button-2`">
              <span>Maintenance</span>
              <span class="accordion-icon" aria-hidden="true">{{ activeAccordion === 2 ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" :class="{ 'is-open': activeAccordion === 2 }" :id="`accordion-panel-2`"
              role="region" :aria-labelledby="`accordion-button-2`">
              <div class="accordion-content-inner">
                <p>A set of post-launch activities to ensure stability, security, and reliability of the custom app
                  and web development services we provided</p>
                <h4>
                  SRE (Site Reliability Engineering)
                </h4>
                <ul>
                  <li>Bring the Pillars team in</li>
                  <li>Run an evaluation report</li>
                  <li>Apply SRE practices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="trust-section bg-white dark:bg-dark-bg" aria-labelledby="trust-heading">
    <div class="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
      <div class="flex flex-col gap-8">
        <h2 id="trust-heading" class="text-2xl max-w-6xl coco text-slate-900 dark:text-white">
          Trust is earned, not given
        </h2>
        <p class="text-xl font-light text-gray-600 dark:text-gray-200 max-w-4xl">
          Every project is a chance to change someone's life. Courtesy of our clients, we impact millions of lives and
          create a better future for everyone.
        </p>
      </div>
      <div class="flex flex-col gap-8">
        <div class="grid grid-cols-2 gap-8 items-center justify-items-center opacity-60" role="list"
          aria-label="Trusted client logos">
          <div class="p-4 bg-stone-100 dark:bg-dark-surface w-full" role="listitem">
            <img src="../assets/trust/be.svg" alt="Barons Eden logo"
              class="h-12 w-auto mx-auto dark:invert transition-all duration-300" loading="lazy">
          </div>
          <div class="p-4 bg-stone-100 dark:bg-dark-surface w-full" role="listitem">
            <img src="../assets/trust/elms.svg" alt="The Elms logo"
              class="h-12 w-auto mx-auto dark:invert transition-all duration-300" loading="lazy">
          </div>
          <div class="p-4 bg-stone-100 dark:bg-dark-surface w-full" role="listitem">
            <img src="../assets/trust/eh.svg" alt="English Heritage logo"
              class="h-12 w-auto mx-auto dark:invert transition-all duration-300" loading="lazy">
          </div>
          <div class="p-4 bg-stone-100 dark:bg-dark-surface w-full" role="listitem">
            <img src="../assets/trust/hch.svg" alt="Hoar Cross Hall logo"
              class="h-12 w-auto mx-auto dark:invert transition-all duration-300" loading="lazy">
          </div>
          <div class="p-4 bg-stone-100 dark:bg-dark-surface w-full" role="listitem">
            <img src="../assets/trust/middle8.svg" alt="Middle8 Hotel logo"
              class="h-16 w-auto mx-auto dark:invert transition-all duration-300" loading="lazy">
          </div>
          <div class="p-4 bg-stone-100 dark:bg-dark-surface w-full" role="listitem">
            <img src="../assets/trust/pob.svg" alt="Palace of Bournemouth logo"
              class="h-16 w-auto mx-auto dark:invert transition-all duration-300" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <FAQ />
</template>
