import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import App from '../App.vue'
import router from '@/router'

// Create shared reactive state for the mock
const mockIsDark = ref(false)
const mockInitTheme = vi.fn()

// Mock the useTheme composable
vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    isDark: mockIsDark,
    initTheme: mockInitTheme,
  }),
}))

// Mock @unhead/vue (SEO is applied from route meta in production)
vi.mock('@unhead/vue', () => ({
  useSeoMeta: vi.fn(),
  useHead: vi.fn(),
}))

// Mock child components to isolate App.vue
vi.mock('@/modals/ContactModal.vue', () => ({
  default: {
    name: 'ContactModal',
    template: '<div></div>',
  },
}))

vi.mock('@/components/BaseButton.vue', () => ({
  default: {
    name: 'BaseButton',
    template: '<button><slot /></button>',
  },
}))

vi.mock('@/components/FloatingContactButton.vue', () => ({
  default: {
    name: 'FloatingContactButton',
    template: '<div></div>',
  },
}))

vi.mock('@/components/RecentProjects.vue', () => ({
  default: {
    name: 'RecentProjects',
    template: '<div></div>',
  },
}))

vi.mock('@/components/ScrollToTop.vue', () => ({
  default: {
    name: 'ScrollToTop',
    template: '<div></div>',
  },
}))

vi.mock('@/components/FAQ.vue', () => ({
  default: {
    name: 'FAQ',
    template: '<div></div>',
  },
}))

vi.mock('@/components/Testimonials.vue', () => ({
  default: {
    name: 'Testimonials',
    template: '<div></div>',
  },
}))

vi.mock('@/components/ThemeToggle.vue', () => ({
  default: {
    name: 'ThemeToggle',
    template: '<div></div>',
  },
}))

describe('App.vue', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    mockIsDark.value = false
    await router.replace('/')
  })

  describe('Theme initialization', () => {
    it('initializes theme correctly on mount', async () => {
      mount(App, {
        global: {
          plugins: [router],
          stubs: {
            ContactModal: true,
            BaseButton: true,
            FloatingContactButton: true,
            RecentProjects: true,
            ScrollToTop: true,
            FAQ: true,
            Testimonials: true,
            ThemeToggle: true,
            RouterView: true,
          },
        },
      })

      await nextTick()

      expect(mockInitTheme).toHaveBeenCalled()
    })
  })

  describe('Logo color updates', () => {
    it('updates logo color correctly based on scroll position and theme', async () => {
      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs: {
            ContactModal: true,
            BaseButton: true,
            FloatingContactButton: true,
            RecentProjects: true,
            ScrollToTop: true,
            FAQ: true,
            Testimonials: true,
            ThemeToggle: true,
            RouterView: true,
          },
        },
        attachTo: document.body,
      })

      await flushPromises()
      await nextTick()

      // Find the logo SVG path element
      const logoPath = wrapper.find('header svg path')
      expect(logoPath.exists()).toBe(true)

      // In light mode, logo should start as black
      mockIsDark.value = false
      await nextTick()
      expect(logoPath.attributes('fill')).toBe('#000')

      // Switch to dark mode
      mockIsDark.value = true
      await nextTick()
      await flushPromises()

      // In dark mode, logo should be white
      expect(logoPath.attributes('fill')).toBe('#fff')

      wrapper.unmount()
    })

    it('sets initial logo color based on theme after mount', async () => {
      // Set dark mode before mounting
      mockIsDark.value = true

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs: {
            ContactModal: true,
            BaseButton: true,
            FloatingContactButton: true,
            RecentProjects: true,
            ScrollToTop: true,
            FAQ: true,
            Testimonials: true,
            ThemeToggle: true,
            RouterView: true,
          },
        },
        attachTo: document.body,
      })

      await flushPromises()
      await nextTick()

      const logoPath = wrapper.find('header svg path')
      expect(logoPath.attributes('fill')).toBe('#fff')

      wrapper.unmount()
    })
  })
})
