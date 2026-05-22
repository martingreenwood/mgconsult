<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import RecentProjects from '@/components/RecentProjects.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQ from '@/components/FAQ.vue'

const activeAccordion = ref<number | null>(0)

const openContact = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}
</script>

<template>
  <section
    class="hero-section  dark:bg-dark-bg max-w-6xl mx-auto min-h-screen flex flex-col gap-8 justify-end"
    aria-label="Hero introduction">
    <h1
      class="text-7xl text-shadow-slate-900 dark:text-shadow-slate-100 max-w-6xl coco text-slate-900 dark:text-white">
      Custom digital systems for businesses with <span
        class="text-slate-600 dark:text-slate-300 font-bold">complex</span> operations.
    </h1>
    <p class="text-xl font-light text-gray-600 dark:text-gray-200 max-w-4xl">
      I help teams turn messy workflows, disconnected tools, legacy systems, internal apps, booking flows,
      and dashboards into reliable digital systems, without the agency overhead.
    </p>
    <div class="flex flex-row">
      <BaseButton variant="primary" size="lg" :has-arrow="true" @click="openContact"
        aria-label="Book a consultation call">
        Book a Call
      </BaseButton>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="showcase-heading">
    <div class="showcase-media" aria-hidden="true">
      <img src="../assets/projects/hoar-cross-hall.jpg" alt="" loading="eager" decoding="async">
      <img src="../assets/projects/the-elms.jpg" alt="" loading="eager" decoding="async">
      <img src="../assets/projects/the-vineyard.jpg" alt="" loading="eager" decoding="async">
      <img src="../assets/projects/villa-hotels.jpg" alt="" loading="eager" decoding="async">
    </div>
    <div class="showcase-overlay"></div>
    <div class="showcase-content max-w-6xl mx-auto">
      <div class="showcase-copy">
        <p class="showcase-kicker">Project signals</p>
        <h2 id="showcase-heading">Systems that connect customer journeys, internal teams, and the tools behind the scenes.</h2>
        <p>
          Booking flows, CMS builds, portals, dashboards, payments, signage, and legacy platforms, joined up into
          calmer day-to-day operations.
        </p>
      </div>
      <div class="showcase-system-map" aria-label="Example connected system map">
        <span>Website</span>
        <span>Workflow engine</span>
        <span>CRM / operations</span>
        <span>Payments</span>
        <span>Dashboards</span>
        <span>Signage</span>
      </div>
    </div>
  </section>

  <section class="services-section bg-white dark:bg-dark-bg" aria-labelledby="services-heading">
    <div class="flex flex-col gap-14 max-w-6xl mx-auto">
      <div class="services-intro">
        <p class="services-kicker">Services</p>
        <h2 id="services-heading">Practical digital systems, built around the messy bits.</h2>
        <p>
          I design, build, and integrate digital systems for businesses where off-the-shelf software does not quite fit.
          Whether it is customer-facing tools, internal dashboards, or the glue between platforms, I deliver clean,
          scalable solutions that make life easier for teams and their users.
        </p>
      </div>

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
            Connect CRMs, booking tools, ticketing, POS, payments, signage, CMS platforms, and legacy systems into one
            reliable stack.
          </p>
          <ul aria-label="Systems integration services">
            <li>API integrations & data sync</li>
            <li>CRM, operations & workflow automation</li>
            <li>Legacy platform support</li>
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
            <li>Commercial &amp; operational visibility</li>
            <li>Marketing, sales &amp; performance metrics</li>
            <li>Team dashboards &amp; group reporting</li>
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
            Custom display systems that pull from live data, built for venues, workplaces, events, and physical spaces
            that need up-to-date information on screen.
          </p>
          <ul aria-label="Digital signage services">
            <li>Live schedules &amp; event signage</li>
            <li>Wayfinding &amp; customer comms</li>
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
            <li>Portals, booking flows &amp; staff tools</li>
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
            Reservation, scheduling, enrolment, and ticketing flows that play nicely with existing systems, availability
            rules, and payment journeys.
          </p>
          <ul aria-label="Booking engine services">
            <li>Custom booking &amp; scheduling interfaces</li>
            <li>Real-time availability &amp; business logic</li>
            <li>Ticketing, payments &amp; platform integrations</li>
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
            <li>Project rescue &amp; legacy fixes</li>
            <li>Roadmaps, retainers &amp; long-term support</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <RecentProjects />

  <Testimonials />

  <section class="cta-section bg-stone-100 dark:bg-dark-surface border-y border-stone-200 dark:border-dark-border text-shadow-zinc-800 dark:text-shadow-zinc-200"
    aria-label="Call to action">
    <div class="flex flex-col md:flex-row items-end gap-8 max-w-6xl mx-auto">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl coco text-slate-900 dark:text-white">
          Not sure what the fix should be yet?
        </h2>
        <p class="text-lg font-light text-gray-600 dark:text-gray-200 max-w-4xl">
          A practical call is usually enough to map the pressure points and decide what is worth doing next.
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
          Built for the work as it really happens.
        </h2>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          I learn how a business actually runs, then design and build systems around the operational details that
          generic software usually misses. The aim is practical progress: clearer workflows, fewer manual workarounds,
          and technology that can adapt as the business changes.
        </p>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          Deep hospitality and venue experience gives me useful pattern recognition, but the method is sector-agnostic:
          understand the domain, simplify the moving parts, and ship dependable systems.
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
          Trusted with operationally important systems
        </h2>
        <p class="text-xl font-light text-gray-600 dark:text-gray-200 max-w-4xl">
          These clients reflect deep experience in hospitality, venues, heritage, and experience-led organisations,
          useful proof for any business that needs reliable systems behind complex day-to-day work.
        </p>
      </div>
      <div class="flex flex-col gap-8">
        <div class="trust-logo-grid grid grid-cols-2 gap-8 items-center justify-items-center" role="list"
          aria-label="Trusted client logos">
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/be.svg" alt="Barons Eden logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/elms.svg" alt="The Elms logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/eh.svg" alt="English Heritage logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/hch.svg" alt="Hoar Cross Hall logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/middle8.svg" alt="Middle8 Hotel logo"
              class="trust-logo h-16 w-auto mx-auto transition-all duration-300" loading="lazy">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/pob.svg" alt="Palace of Bournemouth logo"
              class="trust-logo h-16 w-auto mx-auto transition-all duration-300" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <FAQ />
</template>
