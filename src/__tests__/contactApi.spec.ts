import { beforeEach, describe, expect, it, vi } from 'vitest'

const payload = {
  name: 'Martin Greenwood',
  email: 'hello@martingreenwood.com',
  company: 'Neurospicy Studio Ltd',
  projectType: 'Website or CMS',
  message: 'Help with a contact form.',
}

describe('contactApi', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
    document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/'
  })

  it('refreshes the CSRF cookie and sends it with the contact request', async () => {
    document.cookie = `XSRF-TOKEN=${encodeURIComponent('csrf-token-value')}; path=/`
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))

    vi.stubGlobal('fetch', fetchMock)

    const { submitContactForm } = await import('../services/contactApi')

    await submitContactForm(payload)

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://api.martingreenwood.com/sanctum/csrf-cookie',
      {
        credentials: 'include',
      },
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://api.martingreenwood.com/api/contact',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': 'csrf-token-value',
        }),
      }),
    )
  })

  it('refreshes the CSRF cookie and retries once after a token mismatch', async () => {
    document.cookie = `XSRF-TOKEN=${encodeURIComponent('fresh-csrf-token')}; path=/`
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: 'CSRF token mismatch.' }), {
        status: 419,
        headers: { 'Content-Type': 'application/json' },
      }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))

    vi.stubGlobal('fetch', fetchMock)

    const { submitContactForm } = await import('../services/contactApi')

    await submitContactForm(payload)

    expect(fetchMock).toHaveBeenCalledTimes(4)
    expect(fetchMock).toHaveBeenNthCalledWith(
      4,
      'https://api.martingreenwood.com/api/contact',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: expect.objectContaining({
          'X-XSRF-TOKEN': 'fresh-csrf-token',
        }),
      }),
    )
  })
})
