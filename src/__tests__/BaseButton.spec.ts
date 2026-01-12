import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../components/BaseButton.vue'

describe('BaseButton.vue', () => {
  describe('Click event emission', () => {
    it('emits click event when clicked and not disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: false,
          loading: false,
        },
        slots: {
          default: 'Click me',
        },
      })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.length).toBe(1)
    })

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: true,
          loading: false,
        },
        slots: {
          default: 'Click me',
        },
      })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click event when loading', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: false,
          loading: true,
        },
        slots: {
          default: 'Click me',
        },
      })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click event when both disabled and loading', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: true,
          loading: true,
        },
        slots: {
          default: 'Click me',
        },
      })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Disabled state', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: true,
        },
      })

      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('applies opacity and cursor styles when disabled', () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: true,
        },
      })

      expect(wrapper.classes()).toContain('cursor-not-allowed')
      expect(wrapper.classes()).toContain('opacity-50')
    })

    it('applies opacity and cursor styles when loading', () => {
      const wrapper = mount(BaseButton, {
        props: {
          loading: true,
        },
      })

      expect(wrapper.classes()).toContain('cursor-not-allowed')
      expect(wrapper.classes()).toContain('opacity-50')
    })
  })

  describe('Loading state', () => {
    it('displays loading spinner when loading is true', () => {
      const wrapper = mount(BaseButton, {
        props: {
          loading: true,
        },
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(true)
    })

    it('does not display loading spinner when loading is false', () => {
      const wrapper = mount(BaseButton, {
        props: {
          loading: false,
        },
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(false)
    })
  })

  describe('Variants', () => {
    it('applies primary variant classes by default', () => {
      const wrapper = mount(BaseButton)

      expect(wrapper.classes()).toContain('bg-neutral-950')
      expect(wrapper.classes()).toContain('text-neutral-50')
    })

    it('applies secondary variant classes when specified', () => {
      const wrapper = mount(BaseButton, {
        props: {
          variant: 'secondary',
        },
      })

      expect(wrapper.classes()).toContain('bg-neutral-100')
      expect(wrapper.classes()).toContain('text-neutral-950')
    })

    it('applies outline variant classes when specified', () => {
      const wrapper = mount(BaseButton, {
        props: {
          variant: 'outline',
        },
      })

      expect(wrapper.classes()).toContain('bg-transparent')
      expect(wrapper.classes()).toContain('border-neutral-950')
    })

    it('applies ghost variant classes when specified', () => {
      const wrapper = mount(BaseButton, {
        props: {
          variant: 'ghost',
        },
      })

      expect(wrapper.classes()).toContain('bg-transparent')
      expect(wrapper.classes()).toContain('border-transparent')
    })
  })

  describe('Sizes', () => {
    it('applies medium size classes by default', () => {
      const wrapper = mount(BaseButton)

      expect(wrapper.classes()).toContain('h-12')
    })

    it('applies small size classes when specified', () => {
      const wrapper = mount(BaseButton, {
        props: {
          size: 'sm',
        },
      })

      expect(wrapper.classes()).toContain('h-10')
      expect(wrapper.classes()).toContain('text-sm')
    })

    it('applies large size classes when specified', () => {
      const wrapper = mount(BaseButton, {
        props: {
          size: 'lg',
        },
      })

      expect(wrapper.classes()).toContain('h-[calc(48px+8px)]')
    })
  })

  describe('Arrow feature', () => {
    it('displays arrow when hasArrow is true', () => {
      const wrapper = mount(BaseButton, {
        props: {
          hasArrow: true,
        },
      })

      expect(wrapper.find('svg path[d*="M8.14645"]').exists()).toBe(true)
    })

    it('does not display arrow when hasArrow is false', () => {
      const wrapper = mount(BaseButton, {
        props: {
          hasArrow: false,
        },
      })

      expect(wrapper.find('svg path[d*="M8.14645"]').exists()).toBe(false)
    })

    it('adjusts padding when arrow is present', () => {
      const wrapper = mount(BaseButton, {
        props: {
          hasArrow: true,
          size: 'md',
        },
      })

      expect(wrapper.classes()).toContain('pr-14')
    })

    it('uses standard padding when arrow is not present', () => {
      const wrapper = mount(BaseButton, {
        props: {
          hasArrow: false,
          size: 'md',
        },
      })

      expect(wrapper.classes()).toContain('px-6')
    })
  })

  describe('Link behavior', () => {
    it('renders as anchor tag when href is provided', () => {
      const wrapper = mount(BaseButton, {
        props: {
          href: 'https://example.com',
        },
      })

      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('https://example.com')
    })

    it('renders as button tag when href is not provided', () => {
      const wrapper = mount(BaseButton)

      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('applies target and rel attributes for links', () => {
      const wrapper = mount(BaseButton, {
        props: {
          href: 'https://example.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      })

      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    })

    it('applies type attribute for buttons', () => {
      const wrapper = mount(BaseButton, {
        props: {
          type: 'submit',
        },
      })

      expect(wrapper.attributes('type')).toBe('submit')
    })
  })

  describe('Custom colors', () => {
    it('applies custom color when provided', () => {
      const wrapper = mount(BaseButton, {
        props: {
          customColor: '#ff0000',
        },
      })

      expect(wrapper.attributes('style')).toContain('color: rgb(255, 0, 0)')
      expect(wrapper.attributes('style')).toContain('border-color: rgb(255, 0, 0)')
    })

    it('applies custom border color when provided', () => {
      const wrapper = mount(BaseButton, {
        props: {
          customColor: '#ff0000',
          customBorderColor: '#00ff00',
        },
      })

      expect(wrapper.attributes('style')).toContain('color: rgb(255, 0, 0)')
      expect(wrapper.attributes('style')).toContain('border-color: rgb(0, 255, 0)')
    })
  })

  describe('Slot content', () => {
    it('renders slot content correctly', () => {
      const wrapper = mount(BaseButton, {
        slots: {
          default: 'Test Button',
        },
      })

      expect(wrapper.text()).toContain('Test Button')
    })

    it('renders slot content with loading spinner', () => {
      const wrapper = mount(BaseButton, {
        props: {
          loading: true,
        },
        slots: {
          default: 'Loading...',
        },
      })

      expect(wrapper.text()).toContain('Loading...')
      expect(wrapper.find('.animate-spin').exists()).toBe(true)
    })
  })
})
