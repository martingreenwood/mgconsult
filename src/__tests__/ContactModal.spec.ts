import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
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
    document.querySelectorAll('script[src*="scheduling.choom.app"]').forEach((script) => script.remove())
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

  describe('Booking widget', () => {
    it('displays the Choom booking widget when currentStep is booking', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      const widget = wrapper.find('#choom-booking-widget')
      expect(widget.exists()).toBe(true)
      expect(widget.attributes('data-event-type-uuid')).toBe('b04a60f0-8ec4-4ac8-bb0a-20cfe2379b3e')
      expect(wrapper.find('[role="status"]').exists()).toBe(false)
    })

    it('loads the Choom script when modal opens', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      expect(document.querySelector('script[src*="scheduling.choom.app"]')).toBeTruthy()

      wrapper.unmount()
    })

    it('keeps the widget hidden until the Choom script has loaded', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(true)
      expect(wrapper.text()).toContain('Loading call calendar...')
      expect(wrapper.find('#choom-booking-widget').element.parentElement?.classList.contains('hidden')).toBe(true)
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
    it('shows loading state initially before script loads', () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(true)
      expect(wrapper.text()).toContain('Loading call calendar...')
    })

    it('hides loading state after Choom script loads', async () => {
      const wrapper = mount(ContactModal, {
        props: {
          visible: true,
          side: 'right',
        },
      })

      const script = document.querySelector<HTMLScriptElement>('script[src*="scheduling.choom.app"]')
      script?.dispatchEvent(new Event('load'))
      await nextTick()

      expect(wrapper.find('.animate-spin').exists()).toBe(false)
      expect(wrapper.find('#choom-booking-widget').element.parentElement?.classList.contains('hidden')).toBe(false)
    })
  })
})
