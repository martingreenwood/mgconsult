<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import FitCallButton from '@/components/FitCallButton.vue'
import HeroSystemMap from '@/components/HeroSystemMap.vue'
import RecentProjects from '@/components/RecentProjects.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQ from '@/components/FAQ.vue'
import { openTallyMessage } from '@/utils/tally'

const activeAccordion = ref<number | null>(0)

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}
</script>

<template>
  <section
    class="hero-section max-w-6xl mx-auto min-h-screen flex flex-col justify-center"
    aria-label="Hero introduction">
    <HeroSystemMap />
    <div class="hero-copy">
      <p class="hero-kicker">Independent senior technical partner for operational systems</p>
      <h1
        class="text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
        Senior technical support for the systems your business runs on.
      </h1>
      <p class="hero-body">
        I work across PHP frameworks, CMS platforms, integrations, booking and payment flows, dashboards, internal
        tools, and inherited code, helping commercial leaders, technical leads, and agencies keep important systems
        calm, reliable, and moving.
      </p>
      <div class="hero-signals" aria-label="Consultancy engagement signals">
        <span>Monthly partner</span>
        <span>Hands-on delivery</span>
        <span>PHP &amp; CMS fluent</span>
        <span>No agency overhead</span>
      </div>
    </div>
    <div class="hero-actions">
      <FitCallButton />
      <BaseButton
        variant="secondary"
        size="lg"
        @click="openTallyMessage('hero')"
        aria-label="Send a project message"
      >
        Send a Message
      </BaseButton>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="showcase-heading">
    <div class="showcase-media" aria-hidden="true">
      <img src="../assets/projects/hoar-cross-hall-card.webp" alt="" width="1200" height="800" loading="lazy" decoding="async">
      <img src="../assets/projects/the-elms-card.webp" alt="" width="1200" height="799" loading="lazy" decoding="async">
      <img src="../assets/projects/the-vineyard-card.webp" alt="" width="1200" height="800" loading="lazy" decoding="async">
      <img src="../assets/projects/villa-hotels-card.webp" alt="" width="1200" height="900" loading="lazy" decoding="async">
    </div>
    <div class="showcase-overlay"></div>
    <div class="showcase-content max-w-6xl mx-auto">
      <div class="showcase-copy">
        <p class="showcase-kicker">Retainer partner signal</p>
        <h2 id="showcase-heading">Useful when the system is already live, already important, and no longer simple.</h2>
        <p>
          I help teams keep critical workflows moving while improving the underlying architecture: customer journeys,
          admin tools, payments, reporting, signage, CRMs, CMS platforms, and the odd legacy corner everyone is nervous
          to touch.
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
        <p class="services-kicker">When to bring me in</p>
        <h2 id="services-heading">Senior technical support for the work that cannot sit in a generic ticket queue.</h2>
        <p>
          The strongest fit is an ongoing monthly partnership: enough context to make good decisions, enough momentum
          to ship improvements, and enough seniority to handle the awkward parts without turning every decision into a
          committee.
        </p>
      </div>

      <div class="services-masonry" role="list">
        <div class="services-column">
          <div class="card service-card" role="listitem">
            <img src="../assets/img/data-dashboards.webp"
              alt="Operational dashboards showing live reporting and system health" loading="lazy"
              decoding="async" width="1305" height="683">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
                Rescue a system that has become risky
              </h3>
            </div>
            <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
              Trace brittle flows, stabilise the dangerous parts, and give the team a clear path from firefighting to
              controlled improvement.
            </p>
            <ul aria-label="Systems integration services">
              <li>Inherited code and technical debt</li>
              <li>Broken integrations and data sync</li>
              <li>Practical recovery plans</li>
            </ul>
          </div>

          <div class="card service-card" role="listitem">
            <img src="../assets/img/digital-signage.webp" alt="Digital signage displays in a modern venue" loading="lazy"
              decoding="async" width="1232" height="1200">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
                Improve legacy workflows without a risky rebuild
              </h3>
            </div>
            <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
              Add the missing layer around older tools, protect what still works, and modernise the parts that slow
              people down every week.
            </p>
            <ul aria-label="Digital signage services">
              <li>Admin tools around existing platforms</li>
              <li>Safer migration and replacement paths</li>
              <li>Clearer handoffs between teams</li>
            </ul>
          </div>

          <div class="card service-card" role="listitem">
            <img src="../assets/img/booking.webp" alt="Booking engine interface showing availability calendar"
              loading="lazy" decoding="async" width="1574" height="884">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
                Untangle booking, payment and availability rules
              </h3>
            </div>
            <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
              Turn awkward commercial rules into customer-facing flows and admin tools that feel simple because the
              complexity is handled properly behind the scenes.
            </p>
            <ul aria-label="Booking engine services">
              <li>Availability, pricing and entitlement logic</li>
              <li>Ticketing, scheduling and payments</li>
              <li>Customer journeys backed by admin control</li>
            </ul>
          </div>
        </div>

        <div class="services-column services-column-offset">
          <div class="card service-card" role="listitem">
            <img src="../assets/img/api-integration-card.webp"
              alt="Systems integration diagram showing interconnected APIs and services" loading="lazy"
              decoding="async" width="1200" height="840">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
                Connect the tools the business depends on
              </h3>
            </div>
            <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
              Plan and build the reliable glue between CRMs, booking platforms, payments, CMSs, reporting tools, and
              specialist operational software.
            </p>
            <ul aria-label="Data dashboard services">
              <li>API integrations and middleware</li>
              <li>Workflow automation and alerts</li>
              <li>Operational data you can trust</li>
            </ul>
          </div>

          <div class="card service-card" role="listitem">
            <img src="../assets/img/web-app-development.webp"
              alt="Modern web application interface on laptop and mobile devices" loading="lazy" decoding="async" width="820" height="460">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
                Ship Laravel &amp; Vue work with senior ownership
              </h3>
            </div>
            <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
              Design, build, review, and improve production systems without handing the problem to a junior delivery
              pipeline.
            </p>
            <ul aria-label="Laravel and Vue technical partner services">
              <li>Laravel, Vue, TypeScript and CMS work</li>
              <li>Portals, staff tools and customer journeys</li>
              <li>Maintainable delivery with useful docs</li>
            </ul>
          </div>

          <div class="card service-card" role="listitem">
            <img src="../assets/img/digital.webp"
              alt="Technical strategy meeting with team reviewing system architecture" loading="lazy" decoding="async" width="740" height="740">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 dark:text-shadow-slate-100 coco text-slate-900 dark:text-white">
                Give technical direction without losing delivery
              </h3>
            </div>
            <p class="block text-slate-600 dark:text-gray-300 leading-normal font-light">
              Work with founders, operators, technical leads, or agencies to prioritise the right work, explain tradeoffs,
              and then get useful changes shipped.
            </p>
            <ul aria-label="Technical consulting services">
              <li>Roadmaps and technical decision support</li>
              <li>Architecture and codebase reviews</li>
              <li>Ongoing monthly partnership</li>
            </ul>
          </div>
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
          Need a senior pair of hands on a system that matters?
        </h2>
        <p class="text-lg font-light text-gray-600 dark:text-gray-200 max-w-4xl">
          A short first call is usually enough to decide whether I am the right monthly partner, what the first useful
          intervention should be, and who needs to be involved.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 md:ml-auto">
        <FitCallButton />
        <BaseButton
          variant="secondary"
          size="lg"
          @click="openTallyMessage('cta')"
          aria-label="Send a project message"
        >
          Send a Message
        </BaseButton>
      </div>
    </div>
  </section>

  <section class="dark-section bg-zinc-900 dark:bg-zinc-800 text-white" aria-labelledby="approach-heading">
    <div class="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
      <div class="flex flex-col gap-8">
        <h2 id="approach-heading" class="text-2xl max-w-6xl coco text-white">
          Built for ongoing partnership, not hand-wavy advice.
        </h2>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          I learn how the business actually runs, then stay close enough to the work to make technical decisions with
          context. That means fewer speculative rewrites, clearer priorities, and improvements that survive contact
          with real operations.
        </p>
        <p class="text-xl font-light text-gray-100 dark:text-gray-200 max-w-4xl">
          Deep hospitality and venue experience gives me useful pattern recognition, but the method travels: understand
          the domain, simplify the moving parts, and keep shipping dependable systems.
        </p>
      </div>
      <div class="flex flex-col gap-8">
        <div class="accordion" role="region" aria-label="Service approach details">
          <div class="accordion-item" :class="{ 'is-active': activeAccordion === 0 }">
            <button class="accordion-header" @click="toggleAccordion(0)" :aria-expanded="activeAccordion === 0"
              aria-controls="accordion-panel-0" :id="`accordion-button-0`">
              <span>Diagnose</span>
              <span class="accordion-icon" aria-hidden="true">{{ activeAccordion === 0 ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" :class="{ 'is-open': activeAccordion === 0 }" :id="`accordion-panel-0`"
              role="region" :aria-labelledby="`accordion-button-0`">
              <div class="accordion-content-inner">
                <p>Start with the operational pressure, not the preferred technology.</p>
                <h4>
                  Fit, risk and priority
                </h4>
                <ul>
                  <li>Map the live workflow and business rules</li>
                  <li>Find the brittle technical and human handoffs</li>
                  <li>Separate urgent fixes from strategic improvements</li>
                  <li>Agree the first useful intervention</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item" :class="{ 'is-active': activeAccordion === 1 }">
            <button class="accordion-header" @click="toggleAccordion(1)" :aria-expanded="activeAccordion === 1"
              aria-controls="accordion-panel-1" :id="`accordion-button-1`">
              <span>Deliver</span>
              <span class="accordion-icon" aria-hidden="true">{{ activeAccordion === 1 ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" :class="{ 'is-open': activeAccordion === 1 }" :id="`accordion-panel-1`"
              role="region" :aria-labelledby="`accordion-button-1`">
              <div class="accordion-content-inner">
                <p>Stay close to the build so advice turns into working software.</p>
                <h4>
                  Hands-on implementation
                </h4>
                <ul>
                  <li>Laravel and Vue application work</li>
                  <li>Integrations, dashboards and admin tools</li>
                  <li>Code review, testing and deployment support</li>
                  <li>Plain-English updates for stakeholders</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item" :class="{ 'is-active': activeAccordion === 2 }">
            <button class="accordion-header" @click="toggleAccordion(2)" :aria-expanded="activeAccordion === 2"
              aria-controls="accordion-panel-2" :id="`accordion-button-2`">
              <span>Partner</span>
              <span class="accordion-icon" aria-hidden="true">{{ activeAccordion === 2 ? '−' : '+' }}</span>
            </button>
            <div class="accordion-content" :class="{ 'is-open': activeAccordion === 2 }" :id="`accordion-panel-2`"
              role="region" :aria-labelledby="`accordion-button-2`">
              <div class="accordion-content-inner">
                <p>Retainers work because the technical context is not reset every time a new problem appears.</p>
                <h4>
                  Ongoing technical ownership
                </h4>
                <ul>
                  <li>Regular improvement and maintenance cycles</li>
                  <li>Support for internal teams and agency partners</li>
                  <li>Roadmap decisions grounded in the real codebase</li>
                  <li>Calmer response when priorities change</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="trust-section bg-white dark:bg-dark-bg" aria-labelledby="trust-heading">
    <div class="trust-layout max-w-6xl mx-auto">
      <div class="trust-copy">
        <p class="trust-kicker">Trusted by teams with real operational pressure</p>
        <h2 id="trust-heading" class="coco text-slate-900 dark:text-white">
          Trusted around operationally important systems
        </h2>
        <p>
          These organisations reflect deep experience in hospitality, venues, heritage, and experience-led businesses:
          useful proof when you need someone who can understand commercial detail as well as technical delivery.
        </p>
        <div class="trust-proof-points" aria-label="Client trust signals">
          <span>Live customer journeys</span>
          <span>Existing teams and agencies</span>
          <span>Revenue-linked workflows</span>
        </div>
      </div>

      <div class="trust-logo-panel">
        <div class="trust-logo-panel-header">
          <span>Selected client and partner systems</span>
          <span>Hospitality / venues / heritage</span>
        </div>
        <div class="trust-logo-grid" role="list" aria-label="Trusted client logos">
          <div class="trust-logo-tile trust-logo-tile-wide" role="listitem">
            <img src="../assets/trust/future.svg" alt="Future logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="48">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/journey.svg" alt="Journey logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="48">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/be.svg" alt="Barons Eden logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="48">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/elms.svg" alt="The Elms logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="48">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/eh.svg" alt="English Heritage logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="48">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/hch.svg" alt="Hoar Cross Hall logo"
              class="trust-logo h-12 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="48">
          </div>
          <div class="trust-logo-tile" role="listitem">
            <img src="../assets/trust/middle8.svg" alt="Middle Eight logo"
              class="trust-logo trust-logo-mark h-16 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="64">
          </div>
          <div class="trust-logo-tile trust-logo-tile-wide" role="listitem">
            <img src="../assets/trust/pob.svg" alt="Pride of Britain logo"
              class="trust-logo h-16 w-auto mx-auto transition-all duration-300" loading="lazy" decoding="async" width="180" height="64">
          </div>
        </div>
        <p class="trust-logo-note">
          The useful pattern is the same: understand the moving parts, keep the live system steady, and make the next
          technical step easier to trust.
        </p>
      </div>
    </div>
  </section>

  <FAQ />
</template>
