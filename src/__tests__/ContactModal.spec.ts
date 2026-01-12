import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import ContactModal from '../modals/ContactModal.vue'

// Mock BaseButton component
vi.mock('@/components/BaseButton.vue', () => ({
  default: {
    name: 'BaseButton',
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    emits: ['click'],
  },
}))

describe('ContactModal.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Visibility toggle', () => {
    it('renders when visible is true', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })

    it('does not render when visible is false', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: false,
          side: 'right',
        },
      })

      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('emits update:visible when close button is clicked', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      const closeButton = wrapper.find('button[aria-label="Close booking modal"]')
      await closeButton.trigger('click')

      expect(wrapper.emitted('update:visible')).toBeTruthy()
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
    })

    it('emits update:visible when background overlay is clicked', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      const overlay = wrapper.find('.bg-black\\/40')
      await overlay.trigger('click')

      expect(wrapper.emitted('update:visible')).toBeTruthy()
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
    })

    it('closes modal when Escape key is pressed', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
        attachTo: document.body,
      })

      await wrapper.trigger('keydown', { key: 'Escape' })
      await nextTick()

      expect(wrapper.emitted('update:visible')).toBeTruthy()
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])

      wrapper.unmount()
    })
  })

  describe('Booking success status', () => {
    it('displays Calendly embed when currentStep is booking', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      await flushPromises()

      expect(wrapper.find('iframe[src*="calendly.com"]').exists()).toBe(true)
      expect(wrapper.find('[role="status"]').exists()).toBe(false)
    })

    it('displays success message when booking is completed', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
        attachTo: document.body,
      })

      await flushPromises()

      // Simulate Calendly booking event
      const calendlyEvent = {
        origin: 'https://calendly.com',
        data: {
          event: 'calendly.event_scheduled',
          payload: {
            event: {
              event_type: {
                name: '30 Minute Meeting',
              },
              start_time: '2026-01-15T10:00:00Z',
            },
            invitee: {
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        },
      }

      window.dispatchEvent(new MessageEvent('message', calendlyEvent))
      await flushPromises()
      await nextTick()

      expect(wrapper.find('[role="status"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('Consultation Booked!')
      expect(wrapper.find('iframe[src*="calendly.com"]').exists()).toBe(false)

      wrapper.unmount()
    })

    it('displays booking details in success step', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
        attachTo: document.body,
      })

      await flushPromises()

      // Simulate Calendly booking event with specific details
      const calendlyEvent = {
        origin: 'https://calendly.com',
        data: {
          event: 'calendly.event_scheduled',
          payload: {
            event: {
              event_type: {
                name: 'Discovery Call',
              },
              start_time: '2026-01-20T14:30:00Z',
            },
            invitee: {
              name: 'Jane Smith',
              email: 'jane@example.com',
            },
          },
        },
      }

      window.dispatchEvent(new MessageEvent('message', calendlyEvent))
      await flushPromises()
      await nextTick()

      expect(wrapper.text()).toContain('Discovery Call')
      expect(wrapper.text()).toContain('Jane Smith')
      expect(wrapper.text()).toContain('jane@example.com')

      wrapper.unmount()
    })

    it('resets form when "Book Another" is clicked', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
        attachTo: document.body,
      })

      await flushPromises()

      // Trigger success step
      const calendlyEvent = {
        origin: 'https://calendly.com',
        data: {
          event: 'calendly.event_scheduled',
          payload: {
            event: {
              event_type: { name: 'Meeting' },
              start_time: '2026-01-15T10:00:00Z',
            },
            invitee: {
              name: 'Test User',
              email: 'test@example.com',
            },
          },
        },
      }

      window.dispatchEvent(new MessageEvent('message', calendlyEvent))
      await flushPromises()
      await nextTick()

      // Verify we're in success step
      expect(wrapper.text()).toContain('Consultation Booked!')

      // Click "Book Another" button
      const bookAnotherButton = wrapper.findAll('button').find((btn) =>
        btn.text().includes('Book Another')
      )
      expect(bookAnotherButton).toBeDefined()
      await bookAnotherButton?.trigger('click')
      await nextTick()

      // Should be back to booking step
      expect(wrapper.find('iframe[src*="calendly.com"]').exists()).toBe(true)
      expect(wrapper.find('[role="status"]').exists()).toBe(false)

      wrapper.unmount()
    })

    it('closes modal when "Perfect, Thanks!" is clicked', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
        attachTo: document.body,
      })

      await flushPromises()

      // Trigger success step
      const calendlyEvent = {
        origin: 'https://calendly.com',
        data: {
          event: 'calendly.event_scheduled',
          payload: {
            event: {
              event_type: { name: 'Meeting' },
              start_time: '2026-01-15T10:00:00Z',
            },
            invitee: {
              name: 'Test User',
              email: 'test@example.com',
            },
          },
        },
      }

      window.dispatchEvent(new MessageEvent('message', calendlyEvent))
      await flushPromises()
      await nextTick()

      // Click "Perfect, Thanks!" button
      const perfectButton = wrapper.findAll('button').find((btn) =>
        btn.text().includes('Perfect, Thanks!')
      )
      expect(perfectButton).toBeDefined()
      await perfectButton?.trigger('click')
      await nextTick()

      expect(wrapper.emitted('update:visible')).toBeTruthy()
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])

      wrapper.unmount()
    })
  })

  describe('Side positioning', () => {
    it('renders on the right side when side prop is "right"', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      const dialog = wrapper.find('[role="dialog"]')
      expect(dialog.classes()).toContain('justify-end')
    })

    it('renders on the left side when side prop is "left"', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'left',
        },
      })

      const dialog = wrapper.find('[role="dialog"]')
      expect(dialog.classes()).toContain('justify-start')
    })
  })

  describe('Loading state', () => {
    it('shows loading state initially before iframe loads', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(true)
      expect(wrapper.text()).toContain('Loading booking calendar...')
    })

    it('hides loading state after iframe loads', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      const iframe = wrapper.find('iframe')
      await iframe.trigger('load')
      await nextTick()

      expect(wrapper.find('.animate-spin').exists()).toBe(false)
      expect(wrapper.find('.calendly-embed-container.hidden').exists()).toBe(false)
    })
  })
})
