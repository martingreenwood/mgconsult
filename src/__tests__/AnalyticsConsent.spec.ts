import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AnalyticsConsent from '@/components/AnalyticsConsent.vue'
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
} from '@/services/analyticsConsent'

vi.mock('@/services/analyticsConsent', () => ({
  getAnalyticsConsent: vi.fn(),
  setAnalyticsConsent: vi.fn(),
}))

const mockedGetConsent = vi.mocked(getAnalyticsConsent)
const mockedSetConsent = vi.mocked(setAnalyticsConsent)

describe('AnalyticsConsent', () => {
  beforeEach(() => {
    mockedGetConsent.mockReset()
    mockedSetConsent.mockReset()
    mockedGetConsent.mockReturnValue(null)
  })

  it('offers equally available accept and reject choices when no preference exists', () => {
    const wrapper = mount(AnalyticsConsent)

    expect(wrapper.get('button:nth-of-type(1)').text()).toBe('Reject analytics')
    expect(wrapper.get('button:nth-of-type(2)').text()).toBe('Accept analytics')

    wrapper.unmount()
  })

  it('stores acceptance and closes the prompt', async () => {
    const wrapper = mount(AnalyticsConsent)

    await wrapper.get('button:nth-of-type(2)').trigger('click')

    expect(mockedSetConsent).toHaveBeenCalledWith('granted')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('stores rejection and can be reopened from the footer event', async () => {
    const wrapper = mount(AnalyticsConsent)

    await wrapper.get('button:nth-of-type(1)').trigger('click')
    expect(mockedSetConsent).toHaveBeenCalledWith('denied')

    mockedGetConsent.mockReturnValue('denied')
    window.dispatchEvent(new CustomEvent('open-analytics-settings'))
    await wrapper.vm.$nextTick()

    expect(wrapper.get('[role="dialog"]').text()).toContain('Current choice: analytics rejected')

    wrapper.unmount()
  })
})
