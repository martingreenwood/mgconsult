import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'
import router from '@/router'

vi.mock('@unhead/vue', () => ({
  useSeoMeta: vi.fn(),
  useHead: vi.fn(),
}))

vi.mock('@/modals/ContactModal.vue', () => ({
  default: {
    name: 'ContactModal',
    props: ['visible', 'side'],
    template: '<aside data-test="contact-modal" :data-visible="String(visible)" :data-side="side"></aside>',
  },
}))

describe('App.vue', () => {
  beforeEach(async () => {
    window.scrollTo = vi.fn()
    await router.replace('/')
    await router.isReady()
  })

  const mountApp = () => mount(App, {
    global: {
      plugins: [router],
      stubs: {
        RouterView: true,
      },
    },
  })

  it('renders the global site shell', async () => {
    const wrapper = mountApp()
    await flushPromises()

    expect(wrapper.find('header[role="banner"]').exists()).toBe(true)
    expect(wrapper.find('main#main-content').exists()).toBe(true)
    expect(wrapper.find('footer[role="contentinfo"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Services')
    expect(wrapper.text()).toContain('Projects')
    expect(wrapper.text()).toContain('Insights')

    wrapper.unmount()
  })

  it('renders contact as a primary navigation route', async () => {
    const wrapper = mountApp()
    await flushPromises()

    const contactLink = wrapper.find('.site-nav__group--right a[href="/contact"]')

    expect(contactLink.exists()).toBe(true)
    expect(contactLink.text()).toBe('Contact')

    wrapper.unmount()
  })

  it('opens the contact modal from the global contact event', async () => {
    const wrapper = mountApp()
    await flushPromises()

    window.dispatchEvent(new CustomEvent('open-contact-modal'))
    await flushPromises()

    expect(wrapper.find('[data-test="contact-modal"]').attributes('data-visible')).toBe('true')

    wrapper.unmount()
  })
})
