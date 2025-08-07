<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ContactModal from '@/modals/ContactModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import FloatingContactButton from '@/components/FloatingContactButton.vue'
import RecentProjects from '@/components/RecentProjects.vue'

const videoTransform = ref('translateY(0px)')
const logoColor = ref('#000') // Default to black
const showModal = ref(false)
const showLeftModal = ref(false)
let ticking = false

const openModal = () => {
  showModal.value = true
}

const openLeftModal = () => {
  showLeftModal.value = true
}

// Accordion state
const activeAccordion = ref<number | null>(0)

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}

const updateLogoColor = () => {
  const scrolled = window.pageYOffset
  const headerHeight = 80 // Approximate header height

  // Define sections with their background colors (now all inside the main)
  const sections = [
    { selector: '.hero-section', color: '#000' }, // Hero section - light background - dark logo
    { selector: '.video-parallax-section', color: '#000' }, // Light background - dark logo
    { selector: '.services-section', color: '#000' }, // Light background - dark logo
    { selector: '.cta-section', color: '#000' }, // Light background - dark logo
    { selector: '.dark-section', color: '#fff' }, // Dark background - white logo
    { selector: '.trust-section', color: '#000' }, // Light background - dark logo
    { selector: 'footer', color: '#fff' } // Dark background - white logo
  ]

  // Find which section is currently behind the header
  for (const section of sections) {
    const element = document.querySelector(section.selector) as HTMLElement
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = scrolled + rect.top
      const elementBottom = elementTop + rect.height

      // Check if header is over this section
      if (scrolled + headerHeight >= elementTop && scrolled <= elementBottom) {
        logoColor.value = section.color
        break
      }
    }
  }
}

const updateParallax = () => {
  const scrolled = window.pageYOffset
  const videoSection = document.querySelector('.video-parallax-section') as HTMLElement

  if (videoSection) {
    const rect = videoSection.getBoundingClientRect()
    const sectionTop = scrolled + rect.top
    const sectionHeight = rect.height
    const windowHeight = window.innerHeight

    // Calculate when the section is in view
    const sectionBottom = sectionTop + sectionHeight
    const viewportTop = scrolled
    const viewportBottom = scrolled + windowHeight

    // Only apply parallax when section is in viewport
    if (sectionBottom >= viewportTop && sectionTop <= viewportBottom) {
      // Calculate how much of the section is visible and scroll progress
      const scrollStart = sectionTop - windowHeight
      const scrollEnd = sectionBottom
      const scrollRange = scrollEnd - scrollStart
      const scrollProgress = Math.max(0, Math.min(1, (scrolled - scrollStart) / scrollRange))

      // Video is 130% height, so we have 30% extra (15% on each side)
      // Map scroll progress to video movement range
      const maxMovement = sectionHeight * 0.15 // 15% of section height
      const yPos = -maxMovement + (scrollProgress * maxMovement * 2)

      videoTransform.value = `translateY(${yPos}px)`
    }
  }

  // Update logo color
  updateLogoColor()

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
  updateParallax() // Initial call
  updateLogoColor() // Initial logo color
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!--Header -->
  <header :class="{ 'blur-sm': showModal || showLeftModal }">
    <nav class="fixed left-6 top-6 right-6 z-99 gap-2 flex justify-between items-center">

      <!-- Logo -->
      <div class="flex items-center justify-center flex-initial">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 39" class="w-16 h-auto transition-colors duration-300 ease-in-out">
          <path :fill="logoColor" d="M78.787 17.78c.422.122.633.404.633.843v2.162c0 .44-.211.72-.633.844-1.6.264-2.549 1.125-2.549 2.32 0 .633.053 1.863.14 3.71.106 1.827.16 3.11.16 3.831 0 2.268-.669 4.043-2.022 5.291-1.336 1.248-3.182 1.846-5.538 1.793-.369 0-.58-.14-.597-.422l-.352-3.093c-.035-.457.194-.686.668-.686 1.846 0 2.971-1.125 2.971-2.953 0-.37-.053-1.6-.158-3.727-.106-2.127-.158-3.603-.158-4.447 0-1.705.826-2.9 2.496-3.55-1.67-.651-2.496-1.829-2.496-3.534 0-.844.052-2.32.158-4.447.105-2.127.158-3.358.158-3.727 0-1.828-1.125-2.953-2.97-2.953-.475 0-.704-.228-.669-.685l.352-3.094c.017-.281.228-.422.597-.422 2.356-.053 4.202.545 5.538 1.793 1.353 1.248 2.021 3.023 2.021 5.291 0 .72-.053 2.004-.158 3.85-.088 1.828-.14 3.058-.14 3.691 0 1.195.948 2.057 2.548 2.32Zm-18.844 6.908v-3.586c0-.616.457-1.073 1.073-1.073h5.59c.58 0 1.054.492 1.054 1.073v8.35c0 .421-.246.896-.58 1.089-.967.58-2.25 1.055-3.85 1.459-1.6.404-3.093.598-4.464.598-2.496 0-4.782-.598-6.856-1.776a13.345 13.345 0 0 1-4.922-4.869c-1.195-2.056-1.793-4.306-1.793-6.767 0-2.461.598-4.711 1.793-6.768a13.25 13.25 0 0 1 4.905-4.852c2.074-1.177 4.359-1.775 6.855-1.775 1.283 0 2.672.229 4.13.703 1.46.457 2.62 1.02 3.481 1.705.282.229.44.545.44.88 0 .192-.053.386-.176.58l-3.2 4.798a.899.899 0 0 1-.773.44 1.05 1.05 0 0 1-.685-.264c-.37-.317-.88-.58-1.494-.791-.615-.229-1.178-.334-1.705-.334-3.182-.053-5.889 2.566-5.819 5.678-.07 3.11 2.637 5.73 5.819 5.677.228 0 .773-.088 1.177-.175ZM42.98 32h-5.818c-.685 0-1.002-.316-1.072-1.037l-1.248-11.531-2.479 11.724c-.21.791-.492 1.055-1.177 1.055h-5.819c-.65 0-.949-.229-1.16-1.055l-2.479-11.69-1.248 11.497c-.07.72-.404 1.037-1.09 1.037h-5.8c-.756 0-1.195-.37-1.108-1.09l3.006-23.537c.088-.703.457-1.055 1.09-1.055h7.436c.685 0 1.09.352 1.248 1.037l3.023 13.834 3.006-13.834c.158-.685.58-1.037 1.266-1.037h7.435c.633 0 .985.352 1.073 1.055L44.07 30.91c.088.72-.334 1.09-1.09 1.09Zm-31.517 2.373c.475 0 .703.229.668.686l-.352 3.093c-.017.282-.228.422-.597.422-2.356.053-4.202-.545-5.555-1.793-1.336-1.248-2.004-3.023-2.004-5.29 0-.721.053-2.005.14-3.833.106-1.846.159-3.076.159-3.709 0-1.195-.95-2.056-2.549-2.32-.422-.123-.633-.404-.633-.844v-2.162c0-.44.211-.72.633-.844 1.6-.263 2.549-1.125 2.549-2.32 0-.633-.053-1.863-.158-3.691-.088-1.846-.14-3.13-.14-3.85-.001-2.268.667-4.043 2.003-5.291C6.98 1.379 8.827.781 11.182.834c.369 0 .58.14.597.422l.352 3.094c.035.457-.194.685-.668.685-1.846 0-2.97 1.125-2.97 2.953 0 .37.052 1.6.157 3.727.106 2.127.159 3.603.159 4.447 0 1.705-.827 2.883-2.496 3.533 1.67.65 2.496 1.846 2.496 3.551 0 .844-.053 2.32-.159 4.447-.105 2.127-.158 3.358-.158 3.727 0 1.828 1.125 2.953 2.97 2.953Z"/>
        </svg>
      </div>
    </nav>
  </header>

  <!-- Main -->
  <main class="w-screen min-h-screen" :class="{ 'blur-sm': showModal || showLeftModal }">

    <section class="hero-section max-w-6xl mx-auto min-h-screen flex flex-col gap-8 justify-end">
      <h1 class="text-7xl text-shadow-slate-900 max-w-6xl coco">
          I build custom digital systems that actually <span class="text-slate-600 font-bold">solve</span> business problems.
      </h1>
      <p class="text-xl font-light text-gray-600 max-w-4xl">
        From broken booking flows to legacy integrations, I help hospitality and experience-led businesses
        streamline operations, simplify tech, and deliver better digital experiences
        — without the agency overhead.
      </p>
      <div class="flex flex-row">
        <BaseButton
          variant="primary"
          size="lg"
          :has-arrow="true"
          @click="openModal"
        >
          Book a Call
        </BaseButton>
      </div>
    </section>

    <section class="video-parallax-section bg-stone-100 h-[75vh] overflow-hidden relative">
      <video
        autoplay
        loop
        muted
        playsinline
        class="absolute w-full h-[140%] object-cover"
        style="top: -20%; left: 0;"
        :style="{ transform: videoTransform }"
      >
        <source src="./assets/video/video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </section>

    <!-- services -->
    <section class="services-section">
      <div class="flex flex-col gap-24 max-w-6xl mx-auto">
        <p class="text-xl font-light text-gray-600 max-w-2xl">
          I design, build, and integrate digital systems for guest-centric, experience-driven, and operationally complex businesses. Whether it’s customer-facing tools or internal dashboards, I deliver clean, scalable solutions that make life easier for teams and their users.
        </p>

        <div class="masonry-container">
          <div class="card">
            <img src="./assets/img/api-integration.webp" alt="">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 coco">
                Systems Integration
              </h3>
            </div>
            <p class="block text-slate-600 leading-normal font-light">
              Connect your booking engine, CRM, ticketing, POS, signage, and CMS into one reliable, futureproof stack.
            </p>
            <ul>
              <li>API integrations</li>
              <li>CRM/PMS workflows</li>
              <li>Spektrix, hospitality, and legacy system support</li>
            </ul>
          </div>

          <div class="card">
            <img src="./assets/img/data-dashboards.webp" alt="">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 coco">
                Data Dashboards &amp; Visualisation
              </h3>
            </div>
            <p class="block text-slate-600 leading-normal font-light">
              Live dashboards, custom reports, and conversion tracking — built for real-world decision-making, not just data dumps.
            </p>
            <ul>
              <li>Guest behaviour insights</li>
              <li>Marketing &amp; sales metrics</li>
              <li>Ops dashboards & group performance tracking</li>
            </ul>
          </div>

          <div class="card">
            <img src="./assets/img/digital-signage.webp" alt="">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 coco">
                Digital Signage &amp; On-Site Displays
              </h3>
            </div>
            <p class="block text-slate-600 leading-normal font-light">
              Custom signage systems that pull from live data — built for theatres, hotels, events, and dynamic venue screens.
            </p>
            <ul>
              <li>Foyer &amp; event signage</li>
              <li>Wayfinding &amp; guest comms</li>
              <li>CMS-linked display tech</li>
            </ul>
          </div>

          <div class="card">
            <img src="./assets/img/web-app-development.webp" alt="">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 coco">
                Web &amp; App Development
              </h3>
            </div>
            <p class="block text-slate-600 leading-normal font-light">
              Modern Laravel and Vue apps, powerful CMS builds, and fast, accessible frontends — all tailored to your users.
            </p>
            <ul>
              <li>Vue &amp; Laravel custom builds</li>
              <li>Statamic &amp; WordPress development</li>
              <li>Guest portals, booking flows, staff apps</li>
            </ul>
          </div>

          <div class="card">
            <img src="./assets/img/booking.webp" alt="">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 coco">
                Booking Engines &amp; Ticketing
              </h3>
            </div>
            <p class="block text-slate-600 leading-normal font-light">
              Integrated booking flows that play nicely with your existing systems, including full Spektrix support for venues.
            </p>
            <ul>
              <li>Custom booking interfaces</li>
              <li>Real-time availability & logic</li>
              <li>End-to-end ticketing integrations</li>
            </ul>
          </div>

          <div class="card">
            <img src="./assets/img/digital.webp" alt="">
            <div class="flex items-center gap-4">
              <h3 class="text-xl text-shadow-slate-900 coco">
                Technical Strategy &amp; Consulting
              </h3>
            </div>
            <p class="block text-slate-600 leading-normal font-light">
              Not sure where to start? I help teams audit what’s broken, plan what’s next, and ship fast — without overengineering.
            </p>
            <ul>
              <li>Discovery &amp; technical audits</li>
              <li>Project rescue & legacy fixes</li>
              <li>Long-term dev partner, if you need one</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Projects -->
    <RecentProjects />

    <!-- CTA -->
    <section class="cta-section bg-neutral-100 text-shadow-zinc-800">
      <div class="flex flex-col md:flex-row items-end gap-8 max-w-6xl mx-auto">
        <div class="flex flex-col gap-1">
          <h2 class="text-3xl coco">
            Not sure where your project fits?
          </h2>
          <p class="text-lg font-light max-w-4xl">
            Get in touch for a chat.
          </p>
        </div>
        <div class="flex flex-row ml-auto">
          <BaseButton
            variant="primary"
            size="lg"
            :has-arrow="true"
            @click="openModal"
          >
            Book a Call
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="dark-section bg-zinc-900 text-white">
      <div class="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
        <div class="flex flex-col gap-8">
          <h2 class="text-2xl max-w-6xl coco">
            Adapt to Change...
          </h2>
          <p class="text-xl font-light  max-w-4xl">
            I work with clients to build custom, future proof systems that can adapt to changing business needs and user expectations. I rely on imagination and technical prowess to help brands transform, shine, and reinvent themselves commercially and culturally.
          </p>
          <p class="text-xl font-light  max-w-4xl">
            My biggest value is the client’s trust.<br>
            My only achievement is their success.
          </p>
        </div>
        <div class="flex flex-col gap-8">
          <div class="accordion">
            <div class="accordion-item" :class="{ 'is-active': activeAccordion === 0 }">
              <button
                class="accordion-header"
                @click="toggleAccordion(0)"
                :aria-expanded="activeAccordion === 0"
              >
                <span>Design</span>
                <span class="accordion-icon">{{ activeAccordion === 0 ? '−' : '+' }}</span>
              </button>
              <div class="accordion-content" :class="{ 'is-open': activeAccordion === 0 }">
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
              <button
                class="accordion-header"
                @click="toggleAccordion(1)"
                :aria-expanded="activeAccordion === 1"
              >
                <span>Development</span>
                <span class="accordion-icon">{{ activeAccordion === 1 ? '−' : '+' }}</span>
              </button>
              <div class="accordion-content" :class="{ 'is-open': activeAccordion === 1 }">
                <div class="accordion-content-inner">
                  <p>Complex integrated app & web development techniques, including front-end and back-end, that leverage modern frameworks and libraries.</p>
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
              <button
                class="accordion-header"
                @click="toggleAccordion(2)"
                :aria-expanded="activeAccordion === 2"
              >
                <span>Maintenance</span>
                <span class="accordion-icon">{{ activeAccordion === 2 ? '−' : '+' }}</span>
              </button>
              <div class="accordion-content" :class="{ 'is-open': activeAccordion === 2 }">
                <div class="accordion-content-inner">
                  <p>A set of post-launch activities to ensure stability, security, and reliability of the custom app and web development services we provided</p>
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

    <section class="trust-section">
      <div class="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
        <div class="flex flex-col gap-8">
          <h2 class="text-2xl max-w-6xl coco">
            Trust is earned, not given
          </h2>
          <p class="text-xl font-light  max-w-4xl">
            Every project is a chance to change someone’s life. Courtesy of our clients, we impact millions of lives and create a better future for everyone.
          </p>
        </div>
        <div class="flex flex-col gap-8">
          <div class="grid grid-cols-2 gap-8 items-center justify-items-center opacity-60">
            <div class="p-4 bg-stone-100 w-full">
              <img src="./assets/trust/be.svg" alt="Barons Eden" class="h-12 w-auto mx-auto">
            </div>
            <div class="p-4 bg-stone-100 w-full">
              <img src="./assets/trust/elms.svg" alt="ELMS" class="h-12 w-auto mx-auto">
            </div>
            <div class="p-4 bg-stone-100 w-full">
              <img src="./assets/trust/eh.svg" alt="English Heritage" class="h-12 w-auto mx-auto">
            </div>
            <div class="p-4 bg-stone-100 w-full">
              <img src="./assets/trust/hch.svg" alt="HCH" class="h-12 w-auto mx-auto">
            </div>
            <div class="p-4 bg-stone-100 w-full">
              <img src="./assets/trust/middle8.svg" alt="Middle8" class="h-16 w-auto mx-auto">
            </div>
            <div class="p-4 bg-stone-100 w-full">
              <img src="./assets/trust/pob.svg" alt="POB" class="h-16 w-auto mx-auto">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-6 md:mb-0 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 39" class="w-16 h-auto fill-neutral-100">
                <path fill="currentColor" d="M78.787 17.78c.422.122.633.404.633.843v2.162c0 .44-.211.72-.633.844-1.6.264-2.549 1.125-2.549 2.32 0 .633.053 1.863.14 3.71.106 1.827.16 3.11.16 3.831 0 2.268-.669 4.043-2.022 5.291-1.336 1.248-3.182 1.846-5.538 1.793-.369 0-.58-.14-.597-.422l-.352-3.093c-.035-.457.194-.686.668-.686 1.846 0 2.971-1.125 2.971-2.953 0-.37-.053-1.6-.158-3.727-.106-2.127-.158-3.603-.158-4.447 0-1.705.826-2.9 2.496-3.55-1.67-.651-2.496-1.829-2.496-3.534 0-.844.052-2.32.158-4.447.105-2.127.158-3.358.158-3.727 0-1.828-1.125-2.953-2.97-2.953-.475 0-.704-.228-.669-.685l.352-3.094c.017-.281.228-.422.597-.422 2.356-.053 4.202.545 5.538 1.793 1.353 1.248 2.021 3.023 2.021 5.291 0 .72-.053 2.004-.158 3.85-.088 1.828-.14 3.058-.14 3.691 0 1.195.948 2.057 2.548 2.32Zm-18.844 6.908v-3.586c0-.616.457-1.073 1.073-1.073h5.59c.58 0 1.054.492 1.054 1.073v8.35c0 .421-.246.896-.58 1.089-.967.58-2.25 1.055-3.85 1.459-1.6.404-3.093.598-4.464.598-2.496 0-4.782-.598-6.856-1.776a13.345 13.345 0 0 1-4.922-4.869c-1.195-2.056-1.793-4.306-1.793-6.767 0-2.461.598-4.711 1.793-6.768a13.25 13.25 0 0 1 4.905-4.852c2.074-1.177 4.359-1.775 6.855-1.775 1.283 0 2.672.229 4.13.703 1.46.457 2.62 1.02 3.481 1.705.282.229.44.545.44.88 0 .192-.053.386-.176.58l-3.2 4.798a.899.899 0 0 1-.773.44 1.05 1.05 0 0 1-.685-.264c-.37-.317-.88-.58-1.494-.791-.615-.229-1.178-.334-1.705-.334-3.182-.053-5.889 2.566-5.819 5.678-.07 3.11 2.637 5.73 5.819 5.677.228 0 .773-.088 1.177-.175ZM42.98 32h-5.818c-.685 0-1.002-.316-1.072-1.037l-1.248-11.531-2.479 11.724c-.21.791-.492 1.055-1.177 1.055h-5.819c-.65 0-.949-.229-1.16-1.055l-2.479-11.69-1.248 11.497c-.07.72-.404 1.037-1.09 1.037h-5.8c-.756 0-1.195-.37-1.108-1.09l3.006-23.537c.088-.703.457-1.055 1.09-1.055h7.436c.685 0 1.09.352 1.248 1.037l3.023 13.834 3.006-13.834c.158-.685.58-1.037 1.266-1.037h7.435c.633 0 .985.352 1.073 1.055L44.07 30.91c.088.72-.334 1.09-1.09 1.09Zm-31.517 2.373c.475 0 .703.229.668.686l-.352 3.093c-.017.282-.228.422-.597.422-2.356.053-4.202-.545-5.555-1.793-1.336-1.248-2.004-3.023-2.004-5.29 0-.721.053-2.005.14-3.833.106-1.846.159-3.076.159-3.709 0-1.195-.95-2.056-2.549-2.32-.422-.123-.633-.404-.633-.844v-2.162c0-.44.211-.72.633-.844 1.6-.263 2.549-1.125 2.549-2.32 0-.633-.053-1.863-.158-3.691-.088-1.846-.14-3.13-.14-3.85-.001-2.268.667-4.043 2.003-5.291C6.98 1.379 8.827.781 11.182.834c.369 0 .58.14.597.422l.352 3.094c.035.457-.194.685-.668.685-1.846 0-2.97 1.125-2.97 2.953 0 .37.052 1.6.157 3.727.106 2.127.159 3.603.159 4.447 0 1.705-.827 2.883-2.496 3.533 1.67.65 2.496 1.846 2.496 3.551 0 .844-.053 2.32-.159 4.447-.105 2.127-.158 3.358-.158 3.727 0 1.828 1.125 2.953 2.97 2.953Z"/>
              </svg>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-xs">
          <p>&copy; 2025 Neurospicy Studio Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </main>

  <!-- Floating Contact Button -->
  <FloatingContactButton @click="openModal" :logo-color="logoColor" />

  <!-- Contact Modals -->
  <ContactModal v-model:visible="showModal" side="right"  />
  <ContactModal v-model:visible="showLeftModal" side="left" />
</template>
