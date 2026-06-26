<script setup lang="ts">
import { reactive, ref } from 'vue'
import { submitContactForm } from '@/services/contactApi'

const emailAddress = 'hello@martingreenwood.com'
const projectTypes = [
  'Website or CMS',
  'Booking journey',
  'Systems integration',
  'Technical consultancy',
  'Ongoing partnership',
]

const form = reactive({
  name: '',
  email: '',
  company: '',
  projectType: projectTypes[0],
  message: '',
  website: '',
})

const isSubmitting = ref(false)
const submitState = ref<'idle' | 'success' | 'error'>('idle')
const responseMessage = ref('')

const openBooking = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.company = ''
  form.projectType = projectTypes[0]
  form.message = ''
  form.website = ''
}

const submitForm = async () => {
  isSubmitting.value = true
  submitState.value = 'idle'
  responseMessage.value = ''

  try {
    await submitContactForm({
      name: form.name,
      email: form.email,
      company: form.company,
      projectType: form.projectType,
      message: form.message,
      website: form.website,
    })

    resetForm()
    submitState.value = 'success'
    responseMessage.value = 'Thanks. Your message has been sent and I’ll reply as soon as I can.'
  } catch (error) {
    submitState.value = 'error'
    responseMessage.value = error instanceof Error
      ? error.message
      : 'Sorry, something went wrong. Please email Martin directly instead.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section v-reveal class="contact-page-hero" aria-labelledby="contact-page-title">
    <div class="contact-page-hero__inner">
      <h1 id="contact-page-title">Contact.</h1>
    </div>
  </section>

  <section v-reveal class="contact-section section--cream" aria-labelledby="contact-section-title">
    <div class="contact-layout">
      <aside class="contact-sidebar">
        <p class="eyebrow">Get in touch</p>
        <h2 id="contact-section-title">Let’s talk websites.</h2>
        <p>
          Send a note if you have a project in mind, a system that needs untangling, or a decision that
          would benefit from a calmer technical second opinion.
        </p>

        <div class="contact-actions" aria-label="Contact options">
          <a class="button button--dark" :href="`mailto:${emailAddress}`">
            Email Martin
          </a>
          <button class="button button--line" type="button" @click="openBooking">
            Book a call
          </button>
        </div>

        <dl class="contact-details">
          <div>
            <dt>Email</dt>
            <dd><a :href="`mailto:${emailAddress}`">{{ emailAddress }}</a></dd>
          </div>
          <div>
            <dt>Best fit</dt>
            <dd>Websites, CMS platforms, booking journeys, integrations and internal tools.</dd>
          </div>
          <div>
            <dt>Company</dt>
            <dd>Martin Greenwood, trading through Neurospicy Studio Ltd.</dd>
          </div>
        </dl>
      </aside>

      <div class="contact-form-panel">
        <div class="contact-form-panel__intro">
          <p class="eyebrow">Or leave a message</p>
          <h2>Share the useful context.</h2>
          <p>
            A few details upfront make the first reply much more useful: what needs to change,
            what already exists, and where the friction is showing up.
          </p>
        </div>

        <form class="contact-form" @submit.prevent="submitForm">
          <p v-if="responseMessage" class="contact-form-status" :class="`is-${submitState}`" role="status">
            {{ responseMessage }}
          </p>

          <div class="contact-form__grid">
            <label>
              <span>Name</span>
              <input v-model="form.name" name="name" autocomplete="name" required>
            </label>

            <label>
              <span>Email</span>
              <input v-model="form.email" name="email" type="email" autocomplete="email" required>
            </label>
          </div>

          <label>
            <span>Company / organisation</span>
            <input v-model="form.company" name="company" autocomplete="organization">
          </label>

          <label>
            <span>What do you need help with?</span>
            <select v-model="form.projectType" name="projectType" required>
              <option v-for="type in projectTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </label>

          <label>
            <span>Message</span>
            <textarea
              v-model="form.message"
              name="message"
              rows="8"
              required
              placeholder="A short version is fine. What exists now, what needs to change, and what would make this useful?"
            />
          </label>

          <label class="contact-form__honeypot" aria-hidden="true">
            <span>Website</span>
            <input v-model="form.website" name="website" tabindex="-1" autocomplete="off">
          </label>

          <button class="button button--dark" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send message' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
