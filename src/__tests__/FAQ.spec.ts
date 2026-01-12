import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FAQ from '../components/FAQ.vue'

// Mock BaseButton component
vi.mock('@/components/BaseButton.vue', () => ({
  default: {
    name: 'BaseButton',
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    emits: ['click'],
  },
}))

describe('FAQ.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('FAQ rendering', () => {
    it('renders the FAQ section correctly', () => {
      const wrapper = mount(FAQ)

      expect(wrapper.find('h2#faq-heading').exists()).toBe(true)
      expect(wrapper.text()).toContain('Frequently Asked Questions')
    })

    it('renders all FAQ items', () => {
      const wrapper = mount(FAQ)

      const faqItems = wrapper.findAll('.faq-item')
      expect(faqItems.length).toBeGreaterThan(0)
    })

    it('renders FAQ questions correctly', () => {
      const wrapper = mount(FAQ)

      expect(wrapper.text()).toContain('What types of projects do you typically work on?')
      expect(wrapper.text()).toContain('How do you charge for your services?')
      expect(wrapper.text()).toContain('How long does a typical project take?')
    })
  })

  describe('FAQ toggle functionality', () => {
    it('first FAQ item is open by default', () => {
      const wrapper = mount(FAQ)

      const firstFaqAnswer = wrapper.findAll('.faq-answer')[0]
      expect(firstFaqAnswer.classes()).toContain('is-open')
    })

    it('toggles FAQ item open state correctly on button click', async () => {
      const wrapper = mount(FAQ)

      // First item should be open
      let firstAnswer = wrapper.findAll('.faq-answer')[0]
      expect(firstAnswer.classes()).toContain('is-open')

      // Click the first button to close it
      const firstButton = wrapper.findAll('.faq-item button')[0]
      await firstButton.trigger('click')
      await nextTick()

      // First item should now be closed
      firstAnswer = wrapper.findAll('.faq-answer')[0]
      expect(firstAnswer.classes()).not.toContain('is-open')
    })

    it('opens a closed FAQ item when its button is clicked', async () => {
      const wrapper = mount(FAQ)

      // Second item should be closed initially
      let secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(secondAnswer.classes()).not.toContain('is-open')

      // Click the second button to open it
      const secondButton = wrapper.findAll('.faq-item button')[1]
      await secondButton.trigger('click')
      await nextTick()

      // Second item should now be open
      secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(secondAnswer.classes()).toContain('is-open')
    })

    it('closes currently open FAQ item and opens a new one', async () => {
      const wrapper = mount(FAQ)

      // First item is open by default
      let firstAnswer = wrapper.findAll('.faq-answer')[0]
      let secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(firstAnswer.classes()).toContain('is-open')
      expect(secondAnswer.classes()).not.toContain('is-open')

      // Click the second button
      const secondButton = wrapper.findAll('.faq-item button')[1]
      await secondButton.trigger('click')
      await nextTick()

      // First should be closed, second should be open
      firstAnswer = wrapper.findAll('.faq-answer')[0]
      secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(firstAnswer.classes()).not.toContain('is-open')
      expect(secondAnswer.classes()).toContain('is-open')
    })

    it('toggles the same FAQ item closed when clicked twice', async () => {
      const wrapper = mount(FAQ)

      // Second item should be closed
      let secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(secondAnswer.classes()).not.toContain('is-open')

      // Click to open
      const secondButton = wrapper.findAll('.faq-item button')[1]
      await secondButton.trigger('click')
      await nextTick()

      secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(secondAnswer.classes()).toContain('is-open')

      // Click again to close
      await secondButton.trigger('click')
      await nextTick()

      secondAnswer = wrapper.findAll('.faq-answer')[1]
      expect(secondAnswer.classes()).not.toContain('is-open')
    })
  })

  describe('FAQ accessibility', () => {
    it('sets correct aria-expanded attribute based on open state', async () => {
      const wrapper = mount(FAQ)

      const firstButton = wrapper.findAll('.faq-item button')[0]
      const secondButton = wrapper.findAll('.faq-item button')[1]

      // First is open by default
      expect(firstButton.attributes('aria-expanded')).toBe('true')
      expect(secondButton.attributes('aria-expanded')).toBe('false')

      // Click second to open it
      await secondButton.trigger('click')
      await nextTick()

      expect(firstButton.attributes('aria-expanded')).toBe('false')
      expect(secondButton.attributes('aria-expanded')).toBe('true')
    })

    it('sets correct aria-controls and aria-labelledby attributes', () => {
      const wrapper = mount(FAQ)

      const firstButton = wrapper.findAll('.faq-item button')[0]
      const firstAnswer = wrapper.findAll('.faq-answer')[0]

      expect(firstButton.attributes('aria-controls')).toBe('faq-answer-0')
      expect(firstButton.attributes('id')).toBe('faq-question-0')
      expect(firstAnswer.attributes('id')).toBe('faq-answer-0')
      expect(firstAnswer.attributes('aria-labelledby')).toBe('faq-question-0')
    })

    it('has proper role attributes for list structure', () => {
      const wrapper = mount(FAQ)

      expect(wrapper.find('[role="list"]').exists()).toBe(true)
      expect(wrapper.findAll('[role="listitem"]').length).toBeGreaterThan(0)
    })
  })

  describe('FAQ icon rotation', () => {
    it('rotates chevron icon when FAQ is open', async () => {
      const wrapper = mount(FAQ)

      // First item is open, should have rotation
      const firstIcon = wrapper.findAll('.faq-item button span')[1]
      expect(firstIcon.classes()).toContain('rotate-180')

      // Second item is closed, should not have rotation
      const secondIcon = wrapper.findAll('.faq-item button')[1].findAll('span')[1]
      expect(secondIcon.classes()).not.toContain('rotate-180')
    })

    it('toggles icon rotation when FAQ item is clicked', async () => {
      const wrapper = mount(FAQ)

      const secondButton = wrapper.findAll('.faq-item button')[1]
      const secondIcon = secondButton.findAll('span')[1]

      // Initially not rotated
      expect(secondIcon.classes()).not.toContain('rotate-180')

      // Click to open
      await secondButton.trigger('click')
      await nextTick()

      // Should be rotated
      expect(secondIcon.classes()).toContain('rotate-180')

      // Click to close
      await secondButton.trigger('click')
      await nextTick()

      // Should not be rotated again
      expect(secondIcon.classes()).not.toContain('rotate-180')
    })
  })

  describe('Contact button', () => {
    it('renders "Book a Call" button', () => {
      const wrapper = mount(FAQ)

      expect(wrapper.text()).toContain('Book a Call')
      expect(wrapper.text()).toContain('Still have questions?')
    })

    it('dispatches custom event when contact button is clicked', async () => {
      const wrapper = mount(FAQ, {
        attachTo: document.body,
      })

      // Set up event listener
      let eventDispatched = false
      const eventListener = () => {
        eventDispatched = true
      }
      window.addEventListener('open-contact-modal', eventListener)

      // Find and click the "Book a Call" button
      const button = wrapper.findAll('button').find((btn) => btn.text().includes('Book a Call'))
      expect(button).toBeDefined()
      await button?.trigger('click')
      await nextTick()

      expect(eventDispatched).toBe(true)

      // Cleanup
      window.removeEventListener('open-contact-modal', eventListener)
      wrapper.unmount()
    })
  })

  describe('FAQ content structure', () => {
    it('displays multiple paragraphs in FAQ answers', () => {
      const wrapper = mount(FAQ)

      // Find an answer with multiple paragraphs
      const firstAnswer = wrapper.findAll('.faq-answer')[0]
      const paragraphs = firstAnswer.findAll('p')

      // The first FAQ should have multiple paragraphs
      expect(paragraphs.length).toBeGreaterThan(1)
    })

    it('renders FAQ questions in buttons', () => {
      const wrapper = mount(FAQ)

      const buttons = wrapper.findAll('.faq-item button')

      buttons.forEach((button) => {
        expect(button.text().length).toBeGreaterThan(0)
      })
    })
  })
})
